"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("./controllers/dashboard.controller");
const auth_middleware_1 = require("../auth/middlewares/auth.middleware");
const router = (0, express_1.Router)();
// All dashboard routes are protected — require a valid JWT
router.use(auth_middleware_1.authenticate);
// GET /api/dashboard/stats   — summary cards
router.get("/stats", dashboard_controller_1.DashboardController.getStats);
// GET /api/dashboard/views-chart   — 7-day bar chart data
router.get("/views-chart", dashboard_controller_1.DashboardController.getViewsChart);
// GET /api/dashboard/recent-messages   — activity feed / recent messages
router.get("/recent-messages", dashboard_controller_1.DashboardController.getRecentMessages);
// GET /api/dashboard/properties   — paginated property list
router.get("/properties", dashboard_controller_1.DashboardController.getProperties);
const property_controller_1 = require("./controllers/property.controller");
const upload_middleware_1 = require("../middlewares/upload.middleware");
// POST /api/dashboard/properties — create a new property
router.post("/properties", upload_middleware_1.upload.fields([
    { name: "images", maxCount: 10 },
    { name: "video", maxCount: 1 },
    { name: "floorPlans", maxCount: 5 },
]), property_controller_1.PropertyController.createProperty);
// PATCH /api/dashboard/properties/:id — update a property
router.patch("/properties/:id", upload_middleware_1.upload.fields([
    { name: "images", maxCount: 10 },
    { name: "video", maxCount: 1 },
    { name: "floorPlans", maxCount: 5 },
]), property_controller_1.PropertyController.updateProperty);
// DELETE /api/dashboard/properties/:id — delete a property
router.delete("/properties/:id", property_controller_1.PropertyController.deleteProperty);
exports.default = router;
