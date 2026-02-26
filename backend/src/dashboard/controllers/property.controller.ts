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

      // Extract uploaded images
      const files = req.files as Express.Multer.File[];
      const uploadedImages = files ? files.map((file) => file.path) : [];

      if (!title || !description || !price || !location) {
        return res.status(400).json({
          message: "Title, description, price, and location are required.",
        });
      }

      const newProperty = new Property({
        ownerId: userId,
        title,
        description,
        price: Number(price),
        location,
        propertyType: propertyType || "apartment",
        status: status || "pending",
        images: uploadedImages,
        bedrooms: bedrooms ? Number(bedrooms) : undefined,
        bathrooms: bathrooms ? Number(bathrooms) : undefined,
        area: area ? Number(area) : undefined,
        amenities: amenities || [],
        yearBuilt: yearBuilt ? Number(yearBuilt) : undefined,
        kitchens: kitchens ? Number(kitchens) : undefined,
        garages: garages ? Number(garages) : undefined,
        garageSize: garageSize ? Number(garageSize) : undefined,
        floorsNo: floorsNo ? Number(floorsNo) : undefined,
        listedIn,
        yearlyTaxRate: yearlyTaxRate ? Number(yearlyTaxRate) : undefined,
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
