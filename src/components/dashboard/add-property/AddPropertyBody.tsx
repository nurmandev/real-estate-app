"use client";
import { useState } from "react";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import Overview from "./Overview";
import ListingDetails from "./ListingDetails";
import SelectAmenities from "./SelectAmenities";
import AddressAndLocation from "../profile/AddressAndLocation";
import Link from "next/link";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

const AddPropertyBody = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "apartment",
    listedIn: "all",
    price: "",
    yearlyTaxRate: "",
    area: "",
    bedrooms: 0,
    bathrooms: 0,
    kitchens: 0,
    garages: 0,
    garageSize: "",
    yearBuilt: "",
    floorsNo: 0,
    amenities: [] as string[],
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // Adapting AddressAndLocation to use the same formData object by passing individual setters
  const setAddress = (val: string) =>
    setFormData((p) => ({ ...p, address: val }));
  const setCity = (val: string) => setFormData((p) => ({ ...p, city: val }));
  const setStateField = (val: string) =>
    setFormData((p) => ({ ...p, state: val }));
  const setZipCode = (val: string) =>
    setFormData((p) => ({ ...p, zipCode: val }));
  const setCountry = (val: string) =>
    setFormData((p) => ({ ...p, country: val }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", String(formData.price));
      data.append(
        "location",
        formData.address
          ? `${formData.address}, ${formData.city}, ${formData.country}`
          : "Not specified",
      );
      data.append("propertyType", formData.propertyType);
      data.append("status", "pending");

      data.append("bedrooms", String(formData.bedrooms));
      data.append("bathrooms", String(formData.bathrooms));
      data.append("area", String(formData.area));
      data.append("yearBuilt", String(formData.yearBuilt));
      data.append("kitchens", String(formData.kitchens));
      data.append("garages", String(formData.garages));
      data.append("garageSize", String(formData.garageSize));
      data.append("floorsNo", String(formData.floorsNo));
      data.append("listedIn", formData.listedIn);
      data.append("yearlyTaxRate", String(formData.yearlyTaxRate));
      data.append("city", formData.city);
      data.append("state", formData.state);
      data.append("zipCode", formData.zipCode);
      data.append("country", formData.country);

      formData.amenities.forEach((amenity) => {
        data.append("amenities", amenity);
      });

      files.forEach((file) => {
        data.append("images", file);
      });

      await api.post("/api/dashboard/properties", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Property added successfully!");
      // Optionally reset form here
      setFiles([]);
    } catch (error: any) {
      console.error("Error creating property:", error);
      toast.error(
        error?.response?.data?.message || "Failed to create property.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title="Add New Property" />
        <h2 className="main-title d-block d-lg-none">Add New Property</h2>

        <Overview formData={formData} setFormData={setFormData} />
        <ListingDetails formData={formData} setFormData={setFormData} />

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Photo & Video Attachment</h4>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">File Attachment *</label>

            {files.map((file, index) => (
              <div
                key={index}
                className="attached-file d-flex align-items-center justify-content-between mb-15"
              >
                <span>{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="remove-btn"
                  style={{ background: "none", border: "none" }}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            ))}
          </div>
          <div className="dash-btn-one d-inline-block position-relative me-3">
            <i className="bi bi-plus"></i>
            Upload File
            <input
              type="file"
              id="uploadCV"
              name="uploadCV"
              placeholder=""
              multiple
              accept=".jpg,.jpeg,.png,.webp,.mp4"
              onChange={handleFileChange}
            />
          </div>
          <small>Upload file .jpg, .png, .mp4, .webp</small>
        </div>

        <SelectAmenities formData={formData} setFormData={setFormData} />

        <AddressAndLocation
          address={formData.address}
          setAddress={setAddress}
          city={formData.city}
          setCity={setCity}
          state={formData.state}
          setState={setStateField}
          zipCode={formData.zipCode}
          setZipCode={setZipCode}
          country={formData.country}
          setCountry={setCountry}
        />

        <div className="button-group d-inline-flex align-items-center mt-30">
          <button
            onClick={handleSubmit}
            className="dash-btn-two tran3s me-3"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Property"}
          </button>
          <Link href="#" className="dash-cancel-btn tran3s">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyBody;
