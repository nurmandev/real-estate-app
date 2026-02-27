"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const Property_1 = __importDefault(require("../../models/Property"));
const AuditLog_1 = __importDefault(require("../../models/AuditLog"));
class DashboardController {
    /**
     * GET /api/dashboard/stats
     * Returns aggregated stats for the authenticated user's dashboard.
     */
    static async getStats(req, res) {
        try {
            const userId = req.user.userId;
            const [totalProperties, totalPending, totalFavourites, viewsAgg] = await Promise.all([
                // Total properties owned by user
                Property_1.default.countDocuments({ ownerId: userId }),
                // Pending properties
                Property_1.default.countDocuments({ ownerId: userId, status: "pending" }),
                // Total times any of user's properties were favourited
                Property_1.default.aggregate([
                    {
                        $match: {
                            ownerId: new (require("mongoose").Types.ObjectId)(userId),
                        },
                    },
                    { $project: { count: { $size: "$favouritedBy" } } },
                    { $group: { _id: null, total: { $sum: "$count" } } },
                ]),
                // Total views across all user properties
                Property_1.default.aggregate([
                    {
                        $match: {
                            ownerId: new (require("mongoose").Types.ObjectId)(userId),
                        },
                    },
                    { $group: { _id: null, total: { $sum: "$views" } } },
                ]),
            ]);
            const totalViews = viewsAgg.length > 0 ? viewsAgg[0].total : 0;
            const totalFavs = totalFavourites.length > 0 ? totalFavourites[0].total : 0;
            res.status(200).json({
                totalProperties,
                totalPending,
                totalViews,
                totalFavourites: totalFavs,
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    /**
     * GET /api/dashboard/views-chart
     * Returns daily property view data for the last 7 days.
     */
    static async getViewsChart(req, res) {
        try {
            const userId = req.user.userId;
            // Build last-7-days labels
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const today = new Date();
            const labels = [];
            const dateRanges = [];
            for (let i = 6; i >= 0; i--) {
                const d = new Date(today);
                d.setDate(today.getDate() - i);
                labels.push(days[d.getDay()]);
                const start = new Date(d.setHours(0, 0, 0, 0));
                const end = new Date(d.setHours(23, 59, 59, 999));
                dateRanges.push({ start, end });
            }
            // For a real app, you'd have a PropertyView event log.
            // Here we simulate with AuditLog entries where action = 'PROPERTY_VIEW'
            // (or just use real views tracking). For now, return seeded realistic data.
            const viewData = await Promise.all(dateRanges.map(async ({ start, end }) => {
                const count = await AuditLog_1.default.countDocuments({
                    userId,
                    action: "PROPERTY_VIEW",
                    timestamp: { $gte: start, $lte: end },
                });
                return count;
            }));
            res.status(200).json({ labels, data: viewData });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    /**
     * GET /api/dashboard/recent-messages
     * Returns the 5 most recent audit/activity log entries for the user.
     */
    static async getRecentMessages(req, res) {
        try {
            const userId = req.user.userId;
            const logs = await AuditLog_1.default.find({ userId })
                .sort({ timestamp: -1 })
                .limit(5)
                .lean();
            const messages = logs.map((log) => ({
                id: log._id,
                name: "System",
                date: new Date(log.timestamp).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                }),
                title: log.action.replace(/_/g, " "),
                desc: log.details || `Action ${log.action} performed from ${log.device}.`,
                status: log.status,
            }));
            res.status(200).json({ messages });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    /**
     * GET /api/dashboard/properties
     * Returns a paginated list of the user's properties.
     */
    static async getProperties(req, res) {
        try {
            const userId = req.user.userId;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [properties, total] = await Promise.all([
                Property_1.default.find({ ownerId: userId })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .lean(),
                Property_1.default.countDocuments({ ownerId: userId }),
            ]);
            res.status(200).json({
                properties,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.DashboardController = DashboardController;
