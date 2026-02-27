"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const PropertySchema = new mongoose_1.Schema({
    ownerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, trim: true },
    location: { type: String, required: true },
    propertyType: {
        type: String,
        enum: ["apartment", "condo", "house", "villa", "land", "commercial"],
        default: "apartment",
    },
    status: {
        type: String,
        enum: ["active", "pending", "sold", "rented"],
        default: "pending",
    },
    views: { type: Number, default: 0 },
    favouritedBy: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    images: [{ type: String }],
    videoUrl: { type: String },
    floorPlans: [{ type: String }],
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    area: { type: Number },
    amenities: [{ type: String }],
    yearBuilt: { type: Number },
    kitchens: { type: Number },
    garages: { type: Number },
    garageSize: { type: Number },
    floorsNo: { type: Number },
    listedIn: { type: String },
    yearlyTaxRate: { type: Number },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Property", PropertySchema);
