"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplates = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});
const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: `"OMNIS Security" <${process.env.GMAIL_USER}>`,
        to,
        subject,
        html,
    };
    return transporter.sendMail(mailOptions);
};
exports.sendEmail = sendEmail;
exports.emailTemplates = {
    verification: (token) => `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2>Verify Your Email</h2>
      <p>Please use the following token to verify your email address. This token expires in 15 minutes.</p>
      <div style="font-size: 24px; font-weight: bold; padding: 10px; background: #f4f4f4; display: inline-block;">
        ${token}
      </div>
      <p>If you didn't request this, please ignore this email.</p>
    </div>
  `,
    passwordReset: (token) => `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2>Reset Your Password</h2>
      <p>You requested a password reset. Use the token below to proceed. Expires in 15 minutes.</p>
      <div style="font-size: 24px; font-weight: bold; padding: 10px; background: #f4f4f4; display: inline-block;">
        ${token}
      </div>
    </div>
  `,
    newDeviceLogin: (device, ip) => `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2>New Login Detected</h2>
      <p>A new login was detected on your account.</p>
      <ul>
        <li><strong>Device:</strong> ${device}</li>
        <li><strong>IP Address:</strong> ${ip}</li>
      </ul>
      <p>If this wasn't you, please change your password immediately.</p>
    </div>
  `,
};
