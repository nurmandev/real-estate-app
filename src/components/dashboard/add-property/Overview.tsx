import NiceSelect from "@/ui/NiceSelect";
import React from "react";

interface OverviewProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Overview: React.FC<OverviewProps> = ({ formData, setFormData }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, propertyType: e.target.value });
  };

  const handleListedInChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, listedIn: e.target.value });
  };

  return (
    <div className="bg-white card-box border-20">
      <h4 className="dash-title-three">Overview</h4>
      <div className="dash-input-wrapper mb-30">
        <label htmlFor="title">Property Title*</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Your Property Name"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="dash-input-wrapper mb-30">
        <label htmlFor="description">Description*</label>
        <textarea
          className="size-lg"
          id="description"
          name="description"
          placeholder="Write about property..."
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="row align-items-end">
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Category*</label>
            <NiceSelect
              className="nice-select"
              options={[
                { value: "apartment", text: "Apartments" },
                { value: "condo", text: "Condos" },
                { value: "house", text: "Houses" },
                { value: "commercial", text: "Commercial" },
                { value: "villa", text: "Villas" },
              ]}
              value={formData.propertyType}
              onChange={handleCategoryChange}
              name="propertyType"
              placeholder=""
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Listed in*</label>
            <NiceSelect
              className="nice-select"
              options={[
                { value: "all", text: "All Listing" },
                { value: "buy", text: "Buy" },
                { value: "sell", text: "Sell" },
                { value: "rent", text: "Rent" },
              ]}
              value={formData.listedIn}
              onChange={handleListedInChange}
              name="listedIn"
              placeholder=""
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="price">Price*</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Your Price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="yearlyTaxRate">Yearly Tax Rate*</label>
            <input
              type="text"
              id="yearlyTaxRate"
              name="yearlyTaxRate"
              placeholder="Tax Rate"
              value={formData.yearlyTaxRate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
