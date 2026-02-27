"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const User_1 = __importDefault(require("../../models/User"));
const auth_service_1 = require("../services/auth.service");
const jwt_service_1 = require("../tokens/jwt.service");
const mfa_1 = require("../../utils/mfa");
const email_1 = require("../../utils/email");
const session_1 = require("../../utils/session");
class AuthController {
    static async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const deviceInfo = (0, session_1.getDeviceInfo)(req);
            const existingUser = await User_1.default.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            const user = new User_1.default({ name, email, password });
            await user.save();
            await auth_service_1.AuthService.logSecurityEvent(user.id, "REGISTER", deviceInfo, "success");
            // Auto-generate tokens for immediate login after registration (since verification is disabled)
            const sessionId = jwt_service_1.JwtService.generateSessionId();
            const accessToken = jwt_service_1.JwtService.generateAccessToken({
                userId: user.id,
                sessionId,
            });
            const refreshToken = jwt_service_1.JwtService.generateRefreshToken({
                userId: user.id,
                sessionId,
            });
            // Save session
            user.sessions.push({
                sessionId,
                refreshTokenHash: jwt_service_1.JwtService.hashToken(refreshToken),
                device: deviceInfo.deviceName,
                ip: deviceInfo.ip,
                userAgent: deviceInfo.userAgent,
                lastActive: new Date(),
            });
            await user.save();
            res.status(201).json({
                message: "User registered successfully! Redirecting...",
                accessToken,
                refreshToken,
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async login(req, res) {
        try {
            const { email, password, mfaToken } = req.body;
            const deviceInfo = (0, session_1.getDeviceInfo)(req);
            const user = await User_1.default.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            // Check account lock
            if (user.lockUntil && user.lockUntil > new Date()) {
                return res
                    .status(403)
                    .json({ message: "Account locked. Try again later." });
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                user.failedLoginAttempts += 1;
                if (user.failedLoginAttempts >= 5) {
                    user.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 mins lock
                }
                await user.save();
                await auth_service_1.AuthService.logSecurityEvent(user.id, "LOGIN_FAIL", deviceInfo, "failure", "Invalid password");
                return res.status(401).json({ message: "Invalid credentials" });
            }
            // Reset failed attempts
            user.failedLoginAttempts = 0;
            user.lockUntil = undefined;
            // MFA Check
            if (user.isMfaEnabled) {
                if (!mfaToken) {
                    return res
                        .status(200)
                        .json({ mfaRequired: true, message: "MFA token required" });
                }
                const isMfaValid = mfa_1.MfaService.verifyToken(mfaToken, user.mfaSecret);
                if (!isMfaValid) {
                    await auth_service_1.AuthService.logSecurityEvent(user.id, "MFA_FAIL", deviceInfo, "failure");
                    return res.status(401).json({ message: "Invalid MFA token" });
                }
            }
            // Generate Tokens
            const sessionId = jwt_service_1.JwtService.generateSessionId();
            const accessToken = jwt_service_1.JwtService.generateAccessToken({
                userId: user.id,
                sessionId,
            });
            const refreshToken = jwt_service_1.JwtService.generateRefreshToken({
                userId: user.id,
                sessionId,
            });
            // Save session
            user.sessions.push({
                sessionId,
                refreshTokenHash: jwt_service_1.JwtService.hashToken(refreshToken),
                device: deviceInfo.deviceName,
                ip: deviceInfo.ip,
                userAgent: deviceInfo.userAgent,
                lastActive: new Date(),
            });
            await user.save();
            await auth_service_1.AuthService.logSecurityEvent(user.id, "LOGIN_SUCCESS", deviceInfo, "success");
            // Notify if new device — fire-and-forget so mail failure doesn't break login
            const isNewDevice = !user.sessions.some((s) => s.device === deviceInfo.deviceName && s.sessionId !== sessionId);
            if (isNewDevice) {
                (0, email_1.sendEmail)(user.email, "New Login Detected", email_1.emailTemplates.newDeviceLogin(deviceInfo.deviceName, deviceInfo.ip)).catch((err) => console.error("[Email] New device email failed:", err.message));
            }
            res.status(200).json({ accessToken, refreshToken });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            const deviceInfo = (0, session_1.getDeviceInfo)(req);
            const decoded = jwt_service_1.JwtService.verifyRefreshToken(refreshToken);
            const user = await User_1.default.findById(decoded.userId);
            if (!user)
                return res.status(401).json({ message: "Unauthorized" });
            const sessionIndex = user.sessions.findIndex((s) => s.sessionId === decoded.sessionId);
            if (sessionIndex === -1)
                return res.status(401).json({ message: "Session invalid" });
            const incomingTokenHash = jwt_service_1.JwtService.hashToken(refreshToken);
            if (user.sessions[sessionIndex].refreshTokenHash !== incomingTokenHash) {
                // Token reuse detected! Revoke all sessions for security
                user.sessions = [];
                await user.save();
                await auth_service_1.AuthService.logSecurityEvent(user.id, "TOKEN_REUSE_DETECTED", deviceInfo, "failure");
                return res
                    .status(401)
                    .json({ message: "Token reuse detected. All sessions revoked." });
            }
            // Rotate Refresh Token
            const newSessionId = jwt_service_1.JwtService.generateSessionId();
            const newAccessToken = jwt_service_1.JwtService.generateAccessToken({
                userId: user.id,
                sessionId: newSessionId,
            });
            const newRefreshToken = jwt_service_1.JwtService.generateRefreshToken({
                userId: user.id,
                sessionId: newSessionId,
            });
            user.sessions[sessionIndex] = {
                sessionId: newSessionId,
                refreshTokenHash: jwt_service_1.JwtService.hashToken(newRefreshToken),
                device: deviceInfo.deviceName,
                ip: deviceInfo.ip,
                userAgent: deviceInfo.userAgent,
                lastActive: new Date(),
            };
            await user.save();
            res
                .status(200)
                .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
        }
        catch (error) {
            res.status(401).json({ message: "Invalid refresh token" });
        }
    }
    static async setupMfa(req, res) {
        try {
            const user = await User_1.default.findById(req.user.userId);
            if (!user)
                return res.status(404).json({ message: "User not found" });
            const mfa = mfa_1.MfaService.generateSecret(user.email);
            user.mfaSecret = mfa.encryptedSecret;
            await user.save();
            const qrCode = await mfa_1.MfaService.generateQrCode(mfa.otpauth_url);
            res.status(200).json({ qrCode, secret: mfa.base32 });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async verifyMfaAndEnable(req, res) {
        try {
            const { token } = req.body;
            const user = await User_1.default.findById(req.user.userId);
            if (!user || !user.mfaSecret)
                return res.status(400).json({ message: "MFA not setup" });
            const isValid = mfa_1.MfaService.verifyToken(token, user.mfaSecret);
            if (isValid) {
                user.isMfaEnabled = true;
                await user.save();
                await auth_service_1.AuthService.logSecurityEvent(user.id, "MFA_ENABLED", (0, session_1.getDeviceInfo)(req), "success");
                res.status(200).json({ message: "MFA enabled successfully" });
            }
            else {
                res.status(400).json({ message: "Invalid token" });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async logout(req, res) {
        try {
            const { sessionId } = req.user;
            const user = await User_1.default.findById(req.user.userId);
            if (user) {
                user.sessions = user.sessions.filter((s) => s.sessionId !== sessionId);
                await user.save();
            }
            res.status(200).json({ message: "Logged out" });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async logoutAll(req, res) {
        try {
            const user = await User_1.default.findById(req.user.userId);
            if (user) {
                user.sessions = [];
                await user.save();
            }
            res.status(200).json({ message: "Logged out from all devices" });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async disableMfa(req, res) {
        try {
            const { password } = req.body;
            const user = await User_1.default.findById(req.user.userId);
            if (!user)
                return res.status(404).json({ message: "User not found" });
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid password" });
            }
            user.isMfaEnabled = false;
            user.mfaSecret = undefined;
            await user.save();
            await auth_service_1.AuthService.logSecurityEvent(user.id, "MFA_DISABLED", (0, session_1.getDeviceInfo)(req), "success");
            res.status(200).json({ message: "MFA disabled" });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.AuthController = AuthController;
