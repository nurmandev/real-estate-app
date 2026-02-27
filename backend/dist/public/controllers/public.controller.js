"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicController = void 0;
const Property_1 = __importDefault(require("../../models/Property"));
class PublicController {
    /**
     * Get all properties
     * GET /api/public/properties
     */
    static async getProperties(req, res) {
        try {
            const { status, location, type, search } = req.query;
            const query = {};
            if (status && status !== "Select Status") {
                if (status === "buy" || status === "sell") {
                    query.status = "active";
                }
                else if (status === "rent") {
                    query.status = "rented";
                }
                else {
                    query.status = status;
                }
            }
            if (location && location !== "Location" && location !== "all") {
                query.location = { $regex: location, $options: "i" };
            }
            if (type && type !== "Property Type" && type !== "all") {
                query.propertyType = type;
            }
            if (search) {
                query.$or = [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                ];
            }
            const properties = await Property_1.default.find(query).populate("ownerId", "name email");
            // Map to frontend expected format
            const formattedProperties = properties.map((prop) => ({
                id: prop._id,
                tag: prop.status === "active" ? "FOR SELL" : prop.status.toUpperCase(),
                tag_bg: prop.status === "active"
                    ? "sale"
                    : prop.status === "rented"
                        ? "rent"
                        : "pending",
                carousel: prop._id.toString().substring(0, 5),
                carousel_thumb: prop.images && prop.images.length > 0
                    ? prop.images.map((img, i) => ({
                        img: PublicController.getFullUrl(img),
                        active: i === 0 ? "active" : "",
                    }))
                    : [{ img: "/assets/images/placeholder.png", active: "active" }],
                title: prop.title,
                address: prop.location,
                property_info: {
                    sqft: prop.area || 0,
                    bed: prop.bedrooms || 0,
                    bath: prop.bathrooms || 0,
                },
                price: prop.price,
                price_text: prop.status === "rented" ? "m" : "",
                data_delay_time: "0.1s",
                status: prop.status,
                location: prop.location,
                city: prop.city,
                state: prop.state,
                country: prop.country,
                amenities: prop.amenities,
                type: prop.propertyType,
            }));
            res.status(200).json({ properties: formattedProperties });
        }
        catch (error) {
            console.error("Error fetching properties:", error);
            res.status(500).json({ message: "Failed to fetch properties" });
        }
    }
    /**
     * Get a single property by ID
     * GET /api/public/properties/:id
     */
    static async getPropertyById(req, res) {
        try {
            const { id } = req.params;
            const prop = await Property_1.default.findById(id).populate("ownerId", "name email");
            if (!prop) {
                return res.status(404).json({ message: "Property not found" });
            }
            // Format for frontend
            const formatted = {
                id: prop._id,
                tag: prop.listedIn === "rent" ? "FOR RENT" : "FOR SELL",
                tag_bg: prop.listedIn === "rent" ? "rent" : "sale",
                carousel: prop._id.toString().substring(0, 5),
                carousel_thumb: prop.images && prop.images.length > 0
                    ? prop.images.map((img, i) => ({
                        img: PublicController.getFullUrl(img),
                        active: i === 0 ? "active" : "",
                    }))
                    : [{ img: "/assets/images/placeholder.png", active: "active" }],
                title: prop.title,
                description: prop.description,
                address: prop.location,
                property_info: {
                    sqft: prop.area || 0,
                    bed: prop.bedrooms || 0,
                    bath: prop.bathrooms || 0,
                },
                price: prop.price,
                price_text: prop.status === "rented" ? "m" : "",
                data_delay_time: "0.1s",
                status: prop.status,
                location: prop.location,
                amenities: prop.amenities,
                type: prop.propertyType,
                yearBuilt: prop.yearBuilt,
                kitchens: prop.kitchens,
                garages: prop.garages,
                garageSize: prop.garageSize,
                floorsNo: prop.floorsNo,
                city: prop.city,
                state: prop.state,
                country: prop.country,
                zipCode: prop.zipCode,
                listedIn: prop.listedIn,
                owner: prop.ownerId,
                videoUrl: PublicController.getFullUrl(prop.videoUrl || ""),
                floorPlans: prop.floorPlans?.map((img) => PublicController.getFullUrl(img)),
            };
            res.status(200).json({ property: formatted });
        }
        catch (error) {
            console.error("Error fetching property by ID:", error);
            res.status(500).json({ message: "Failed to fetch property details" });
        }
    }
    static getFullUrl(path) {
        if (!path)
            return "";
        if (path.startsWith("http"))
            return path.replace(/\\/g, "/");
        const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
        return `${baseUrl}/${path.replace(/\\/g, "/")}`;
    }
}
exports.PublicController = PublicController;
