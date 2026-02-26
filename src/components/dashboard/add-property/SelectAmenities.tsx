import React from "react";

const amenitiesList: string[] = [
  "A/C & Heating",
  "Garages",
  "Swimming Pool",
  "Parking",
  "Lake View",
  "Garden",
  "Disabled Access",
  "Pet Friendly",
  "Ceiling Height",
  "Outdoor Shower",
  "Refrigerator",
  "Fireplace",
  "Wifi",
  "TV Cable",
  "Barbeque",
  "Laundry",
  "Dryer",
  "Lawn",
  "Elevator",
];

interface SelectAmenitiesProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const SelectAmenities: React.FC<SelectAmenitiesProps> = ({
  formData,
  setFormData,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFormData({ ...formData, amenities: [...formData.amenities, value] });
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((item: string) => item !== value),
      });
    }
  };

  return (
    <div className="bg-white card-box border-20 mt-40">
      <h4 className="dash-title-three m0 pb-5">Select Amenities</h4>
      <ul className="style-none d-flex flex-wrap filter-input">
        {amenitiesList.map((amenity, index) => (
          <li key={index}>
            <input
              type="checkbox"
              name="Amenities"
              value={amenity}
              checked={formData.amenities.includes(amenity)}
              onChange={handleCheckboxChange}
            />
            <label>{amenity}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectAmenities;
