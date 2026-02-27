"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
class JwtService {
    static generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.ACCESS_SECRET, { expiresIn: this.ACCESS_EXPIRY });
    }
    static generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.REFRESH_SECRET, { expiresIn: this.REFRESH_EXPIRY });
    }
    static verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, this.ACCESS_SECRET);
    }
    static verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, this.REFRESH_SECRET);
    }
    static hashToken(token) {
        return crypto_1.default.createHash('sha256').update(token).digest('hex');
    }
    static generateSessionId() {
        return crypto_1.default.randomBytes(32).toString('hex');
    }
}
exports.JwtService = JwtService;
JwtService.ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access-secret';
JwtService.REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret';
JwtService.ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY || '15m';
JwtService.REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '7d';
