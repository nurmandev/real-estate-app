import NiceSelect from "@/ui/NiceSelect";
import PriceRange from "../../common/PriceRange";
import Link from "next/link";
import { useState } from "react";

const ammenities_data: string[] = [
  "A/C & Heating",
  "Garages",
  "Garden",
  "Disabled Access",
  "Swimming Pool",
  "Parking",
  "Wifi",
  "Pet Friendly",
  "Ceiling Height",
  "Fireplace",
  "Play Ground",
  "Elevator",
];

const DropdownOne = ({
  handleBathroomChange,
  handleBedroomChange,
  handleSearchChange,
  handlePriceChange,
  maxPrice,
  priceValue,
  handleResetFilter,
  selectedAmenities,
  handleAmenityChange,
  handleLocationChange,
  handleStatusChange,
  handlePropertyTypeChange,
  locations = [],
  statuses = [],
  propertyTypes = [],
}: any) => {
  const [activeTab, setActiveTab] = useState(0);

  const tab_title: string[] = ["Buy", "Rent", "Sell"];

  const handleTabClick = (index: any, status: string) => {
    setActiveTab(index);
    handleStatusChange(status.toLowerCase());
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="row gx-lg-5">
        <div className="col-12 mb-30">
          <nav className="search-filter-nav-one d-flex">
            <div
              className="nav nav-tabs border-0 w-100 justify-content-between"
              role="tablist"
            >
              {tab_title.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(index, tab)}
                  className={`nav-link m0 flex-grow-1 p-2 ${activeTab === index ? "active border-bottom border-primary" : ""}`}
                  style={{ fontSize: "14px" }}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>
          </nav>
        </div>

        <div className="col-12">
          <div className="input-box-one mb-25">
            <div className="label">I’m looking to...</div>
            <NiceSelect
              className="nice-select fw-normal"
              options={
                propertyTypes.length > 0
                  ? propertyTypes.map((t: string) => ({
                      value: t,
                      text: t.charAt(0).toUpperCase() + t.slice(1) + "s",
                    }))
                  : [
                      { value: "apartment", text: "Apartments" },
                      { value: "condo", text: "Condos" },
                      { value: "house", text: "Houses" },
                      { value: "villa", text: "Villas" },
                    ]
              }
              defaultCurrent={0}
              onChange={handlePropertyTypeChange}
              name=""
              placeholder=""
            />
          </div>
        </div>

        <div className="col-12">
          <div className="input-box-one mb-25">
            <div className="label">Keyword</div>
            <input
              onChange={handleSearchChange}
              type="text"
              placeholder="buy, home, loft, apartment"
              className="type-input"
            />
          </div>
        </div>

        <div className="col-12">
          <div className="input-box-one mb-35">
            <div className="label">Location</div>
            <NiceSelect
              className="nice-select location fw-normal"
              options={
                locations.length > 0
                  ? locations.map((loc: string) => ({
                      value: loc,
                      text: loc,
                    }))
                  : [
                      { value: "washington", text: "Washington DC" },
                      { value: "mexico", text: "Acapulco, Mexico" },
                      { value: "germany", text: "Berlin, Germany" },
                      { value: "france", text: "Cannes, France" },
                    ]
              }
              defaultCurrent={0}
              onChange={handleLocationChange}
              name=""
              placeholder=""
            />
          </div>
        </div>

        <div className="col-sm-6 text-dark fw-500">
          <div className="input-box-one mb-30">
            <div className="label">Bedroom</div>
            <NiceSelect
              className="nice-select fw-normal"
              options={[
                { value: "1", text: "1" },
                { value: "2", text: "2" },
                { value: "3", text: "3" },
                { value: "4", text: "4" },
              ]}
              defaultCurrent={0}
              onChange={handleBedroomChange}
              name=""
              placeholder=""
            />
          </div>
        </div>

        <div className="col-sm-6 text-dark fw-500">
          <div className="input-box-one mb-30">
            <div className="label">Bath</div>
            <NiceSelect
              className="nice-select fw-normal"
              options={[
                { value: "1", text: "1" },
                { value: "2", text: "2" },
                { value: "3", text: "3" },
                { value: "4", text: "4" },
              ]}
              defaultCurrent={0}
              onChange={handleBathroomChange}
              name=""
              placeholder=""
            />
          </div>
        </div>

        <div className="col-12">
          <h6 className="block-title fw-bold mb-15">Amenities</h6>
          <ul className="style-none d-flex flex-wrap justify-content-between filter-input">
            {ammenities_data.map((list, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  name="Amenities"
                  value={list}
                  checked={selectedAmenities.includes(list)}
                  onChange={handleAmenityChange}
                />
                <label>{list}</label>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-12">
          <h6 className="block-title fw-bold mt-20 mb-15">Price range</h6>
          <div className="price-ranger">
            <div className="price-input d-flex align-items-center justify-content-between pt-5 mb-10">
              <div className="field d-flex align-items-center">
                <input
                  type="number"
                  className="input-min"
                  value={priceValue[0]}
                  readOnly
                />
              </div>
              <div className="divider-line"></div>
              <div className="field d-flex align-items-center">
                <input
                  type="number"
                  className="input-max"
                  value={priceValue[1]}
                  readOnly
                />
              </div>
              <div className="currency ps-1">$</div>
            </div>
          </div>
          <PriceRange
            MAX={maxPrice}
            MIN={0}
            STEP={1}
            values={priceValue}
            handleChanges={handlePriceChange}
          />
        </div>

        <div className="col-12">
          <button className="fw-500 text-uppercase tran3s apply-search w-100 mt-40 mb-25">
            <i className="fa-light fa-magnifying-glass"></i>
            <span>Search</span>
          </button>
        </div>

        <div className="col-12">
          <div className="d-flex justify-content-between form-widget align-items-center">
            <a
              onClick={handleResetFilter}
              style={{ cursor: "pointer" }}
              className="tran3s text-dark"
            >
              <i className="fa-regular fa-arrows-rotate me-1"></i>
              <span>Reset</span>
            </a>
            <Link href="#" className="tran3s text-dark">
              <i className="fa-regular fa-star me-1"></i>
              <span>Save Search</span>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DropdownOne;
