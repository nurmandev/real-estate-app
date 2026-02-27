"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AuditLog_1 = __importDefault(require("../../models/AuditLog"));
class AuthService {
    static async logSecurityEvent(userId, action, reqInfo, status, details) {
        await AuditLog_1.default.create({
            userId,
            action,
            ip: reqInfo.ip,
            device: reqInfo.deviceName,
            userAgent: reqInfo.userAgent,
            status,
            details,
        });
    }
    static async clearExpiredSessions(user) {
        const now = new Date();
        // Assuming 7 days expiry for session tracking
        user.sessions = user.sessions.filter(s => {
            const expiry = new Date(s.lastActive);
            expiry.setDate(expiry.getDate() + 7);
            return expiry > now;
        });
    }
}
exports.AuthService = AuthService;
