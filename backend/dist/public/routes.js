"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const public_controller_1 = require("./controllers/public.controller");
const router = (0, express_1.Router)();
// GET /api/public/properties
router.get("/properties", public_controller_1.PublicController.getProperties);
router.get("/properties/:id", public_controller_1.PublicController.getPropertyById);
exports.default = router;
