import { Router } from "express";
import { DashboardController } from "./controllers/dashboard.controller";
import { authenticate } from "../auth/middlewares/auth.middleware";

const router = Router();

// All dashboard routes are protected — require a valid JWT
router.use(authenticate);

// GET /api/dashboard/stats   — summary cards
router.get("/stats", DashboardController.getStats);

// GET /api/dashboard/views-chart   — 7-day bar chart data
router.get("/views-chart", DashboardController.getViewsChart);

// GET /api/dashboard/recent-messages   — activity feed / recent messages
router.get("/recent-messages", DashboardController.getRecentMessages);

// GET /api/dashboard/properties   — paginated property list
router.get("/properties", DashboardController.getProperties);

import { PropertyController } from "./controllers/property.controller";
import { upload } from "../middlewares/upload.middleware";

// POST /api/dashboard/properties — create a new property
router.post(
  "/properties",
  upload.array("images", 10),
  PropertyController.createProperty,
);

export default router;
