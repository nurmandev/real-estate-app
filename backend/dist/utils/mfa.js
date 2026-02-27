"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfaService = void 0;
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-long-secret-key-32-chars!!';
class MfaService {
    static generateSecret(email) {
        const secret = speakeasy_1.default.generateSecret({
            name: `OMNIS:${email}`,
        });
        // Encrypt the secret before returning it for storage
        const encryptedSecret = crypto_js_1.default.AES.encrypt(secret.base32, ENCRYPTION_KEY).toString();
        return {
            otpauth_url: secret.otpauth_url,
            base32: secret.base32,
            encryptedSecret,
        };
    }
    static async generateQrCode(otpauthUrl) {
        return qrcode_1.default.toDataURL(otpauthUrl);
    }
    static verifyToken(token, encryptedSecret) {
        const bytes = crypto_js_1.default.AES.decrypt(encryptedSecret, ENCRYPTION_KEY);
        const secret = bytes.toString(crypto_js_1.default.enc.Utf8);
        return speakeasy_1.default.totp.verify({
            secret,
            encoding: 'base32',
            token,
            window: 1, // Allow 30s drift
        });
    }
}
exports.MfaService = MfaService;
