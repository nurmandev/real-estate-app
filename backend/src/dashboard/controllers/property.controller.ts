import { Request, Response } from "express";
import Property from "../../models/Property";

export class PropertyController {
  /**
   * Create a new property
   * POST /api/dashboard/properties
   */
  static async createProperty(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;

      const {
        title,
        description,
        price,
        location,
        propertyType,
        status,
        bedrooms,
        bathrooms,
        area,
        amenities,
        yearBuilt,
        kitchens,
        garages,
        garageSize,
        floorsNo,
        listedIn,
        yearlyTaxRate,
        city,
        state,
        zipCode,
        country,
      } = req.body;

      // Extract uploaded files
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const uploadedImages = files["images"]
        ? files["images"].map((file) => file.path)
        : [];
      const uploadedVideo = files["video"] ? files["video"][0].path : undefined;
      const uploadedFloorPlans = files["floorPlans"]
        ? files["floorPlans"].map((file) => file.path)
        : [];

      if (!title || !description || !price || !location) {
        return res.status(400).json({
          message: "Title, description, price, and location are required.",
        });
      }

      // Helper to safely parse numbers and handle strings like "3,210 sqft"
      const parseNum = (val: any) => {
        if (val === undefined || val === null || val === "") return undefined;
        if (typeof val === "number") return val;
        // Strip everything except digits and decimal point
        const sanitized = String(val).replace(/[^0-9.]/g, "");
        const num = parseFloat(sanitized);
        return isNaN(num) ? undefined : num;
      };

      const newProperty = new Property({
        ownerId: userId,
        title,
        description,
        price: parseNum(price) || 0,
        location,
        propertyType: propertyType || "apartment",
        status: status || "pending",
        images: uploadedImages,
        videoUrl: uploadedVideo,
        floorPlans: uploadedFloorPlans,
        bedrooms: parseNum(bedrooms),
        bathrooms: parseNum(bathrooms),
        area: parseNum(area),
        amenities: amenities || [],
        yearBuilt: parseNum(yearBuilt),
        kitchens: parseNum(kitchens),
        garages: parseNum(garages),
        garageSize: parseNum(garageSize),
        floorsNo: parseNum(floorsNo),
        listedIn,
        yearlyTaxRate: parseNum(yearlyTaxRate),
        city,
        state,
        zipCode,
        country,
      });

      await newProperty.save();

      res.status(201).json({
        message: "Property created successfully",
        property: newProperty,
      });
    } catch (error: any) {
      console.error("Error creating property:", error);
      res
        .status(500)
        .json({ message: error.message || "Failed to create property" });
    }
  }
}
