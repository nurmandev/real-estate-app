"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceInfo = void 0;
const ua_parser_js_1 = require("ua-parser-js");
const getDeviceInfo = (req) => {
    const ua = new ua_parser_js_1.UAParser(req.headers['user-agent']);
    const device = ua.getDevice();
    const os = ua.getOS();
    const browser = ua.getBrowser();
    const deviceName = `${device.vendor || ''} ${device.model || ''} ${os.name || ''} ${os.version || ''} (${browser.name || ''})`.trim() || 'Unknown Device';
    return {
        deviceName,
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP',
        userAgent: req.headers['user-agent'] || 'Unknown User Agent',
    };
};
exports.getDeviceInfo = getDeviceInfo;
