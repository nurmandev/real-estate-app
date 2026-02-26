import mongoose, { Schema, Document } from "mongoose";

export interface IProperty extends Document {
  ownerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: "apartment" | "house" | "villa" | "land" | "commercial";
  status: "active" | "pending" | "sold" | "rented";
  views: number;
  favouritedBy: mongoose.Types.ObjectId[];
  images: string[];
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    propertyType: {
      type: String,
      enum: ["apartment", "house", "villa", "land", "commercial"],
      default: "apartment",
    },
    status: {
      type: String,
      enum: ["active", "pending", "sold", "rented"],
      default: "pending",
    },
    views: { type: Number, default: 0 },
    favouritedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    images: [{ type: String }],
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    area: { type: Number },
  },
  { timestamps: true },
);

export default mongoose.model<IProperty>("Property", PropertySchema);
