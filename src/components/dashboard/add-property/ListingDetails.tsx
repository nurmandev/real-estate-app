import NumberNiceSelect from "@/ui/NumberNiceSelect";
import React from "react";

interface ListingDetailsProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange =
    (name: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFormData({ ...formData, [name]: Number(e.target.value) });
    };

  return (
    <div className="bg-white card-box border-20 mt-40">
      <h4 className="dash-title-three">Listing Details</h4>
      <div className="row align-items-end">
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="area">Size in ft*</label>
            <input
              type="text"
              id="area"
              name="area"
              placeholder="Ex: 3,210 sqft"
              value={formData.area}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="bedrooms">Bedrooms*</label>
            <NumberNiceSelect
              className="nice-select"
              options={[
                { value: 0, text: 0 },
                { value: 1, text: 1 },
                { value: 2, text: 2 },
                { value: 3, text: 3 },
                { value: 4, text: 4 },
                { value: 5, text: 5 },
              ]}
              defaultCurrent={parseInt(formData.bedrooms) || 0}
              onChange={handleSelectChange("bedrooms")}
              name="bedrooms"
              placeholder=""
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="bathrooms">Bathrooms*</label>
            <NumberNiceSelect
              className="nice-select"
              options={[
                { value: 0, text: 0 },
                { value: 1, text: 1 },
                { value: 2, text: 2 },
                { value: 3, text: 3 },
                { value: 4, text: 4 },
                { value: 5, text: 5 },
              ]}
              defaultCurrent={parseInt(formData.bathrooms) || 0}
              onChange={handleSelectChange("bathrooms")}
              name="bathrooms"
              placeholder=""
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="kitchens">Kitchens*</label>
            <NumberNiceSelect
              className="nice-select"
              options={[
                { value: 0, text: 0 },
                { value: 1, text: 1 },
                { value: 2, text: 2 },
                { value: 3, text: 3 },
                { value: 4, text: 4 },
                { value: 5, text: 5 },
              ]}
              defaultCurrent={parseInt(formData.kitchens) || 0}
              onChange={handleSelectChange("kitchens")}
              name="kitchens"
              placeholder=""
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="garages">Garages</label>
            <NumberNiceSelect
              className="nice-select"
              options={[
                { value: 0, text: 0 },
                { value: 1, text: 1 },
                { value: 2, text: 2 },
                { value: 3, text: 3 },
                { value: 4, text: 4 },
              ]}
              defaultCurrent={parseInt(formData.garages) || 0}
              onChange={handleSelectChange("garages")}
              name="garages"
              placeholder=""
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="garageSize">Garage Size</label>
            <input
              type="text"
              id="garageSize"
              name="garageSize"
              placeholder="Ex: 1,230 sqft"
              value={formData.garageSize}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="yearBuilt">Year Built*</label>
            <input
              type="text"
              id="yearBuilt"
              name="yearBuilt"
              placeholder="Type Year"
              value={formData.yearBuilt}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="floorsNo">Floors No*</label>
            <NumberNiceSelect
              className="nice-select"
              options={[
                { value: 0, text: 0 },
                { value: 1, text: 1 },
                { value: 2, text: 2 },
                { value: 3, text: 3 },
                { value: 4, text: 4 },
              ]}
              defaultCurrent={parseInt(formData.floorsNo) || 0}
              onChange={handleSelectChange("floorsNo")}
              name="floorsNo"
              placeholder=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
