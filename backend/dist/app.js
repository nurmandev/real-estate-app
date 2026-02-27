"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./auth/routes"));
const routes_2 = __importDefault(require("./dashboard/routes"));
const routes_3 = __importDefault(require("./public/routes"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Connect to Database
(0, db_1.connectDB)();
// Middleware
app.use((0, helmet_1.default)());
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://omnis-real-estate.vercel.app", // Add a production URL just in case
].map((url) => url?.replace(/\/$/, "")); // remove trailing slashes
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/public", express_1.default.static("public"));
// Routes
app.use("/api/auth", routes_1.default);
app.use("/api/dashboard", routes_2.default);
app.use("/api/public", routes_3.default);
// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});
// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: "Resource not found" });
});
// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err : {},
    });
});
exports.default = app;
