"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./controllers/auth.controller");
const profile_controller_1 = require("./controllers/profile.controller");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const auth_validator_1 = require("./validators/auth.validator");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const router = (0, express_1.Router)();
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login/register requests per windowMs
    message: { message: "Too many requests, please try again after 15 minutes" },
});
router.post("/register", (0, validation_middleware_1.validate)(auth_validator_1.registerSchema), auth_controller_1.AuthController.register);
router.post("/login", authLimiter, (0, validation_middleware_1.validate)(auth_validator_1.loginSchema), auth_controller_1.AuthController.login);
router.post("/refresh-token", auth_controller_1.AuthController.refreshToken);
// Profile routes
router.get("/profile", auth_middleware_1.authenticate, profile_controller_1.ProfileController.getProfile);
router.put("/profile", auth_middleware_1.authenticate, profile_controller_1.ProfileController.updateProfile);
// Protected routes
router.post("/logout", auth_middleware_1.authenticate, auth_controller_1.AuthController.logout);
router.post("/mfa/setup", auth_middleware_1.authenticate, auth_controller_1.AuthController.setupMfa);
router.post("/mfa/verify", auth_middleware_1.authenticate, (0, validation_middleware_1.validate)(auth_validator_1.mfaVerifySchema), auth_controller_1.AuthController.verifyMfaAndEnable);
exports.default = router;
