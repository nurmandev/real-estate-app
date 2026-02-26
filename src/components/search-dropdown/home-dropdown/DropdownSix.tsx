"use client";
import { useState, useEffect } from "react";
import NiceSelect from "@/ui/NiceSelect";
import Link from "next/link";
import DropdownModal from "./DropdownModal";
import { api } from "@/utils/api";

const tab_title: string[] = ["Off-Plan", "Buy", "Rent"];

const DropdownSix = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [locations, setLocations] = useState<string[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/api/public/properties");
        if (data && Array.isArray(data.properties)) {
          const locs = Array.from(
            new Set(
              data.properties.map((p: any) => p.location).filter(Boolean),
            ),
          ) as string[];
          const types = Array.from(
            new Set(
              data.properties
                .map((p: any) => p.propertyType || p.type)
                .filter(Boolean),
            ),
          ) as string[];
          setLocations(locs);
          setPropertyTypes(types);
        }
      } catch (err) {
        console.error("Error fetching data in DropdownSix:", err);
      }
    };
    fetchData();
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const searchHandler = (e: any) => {
    e.preventDefault();
    const statusMap = ["off-plan", "buy", "rent"];
    const statusValue = statusMap[activeTab];

    const query = new URLSearchParams();
    if (statusValue) query.set("status", statusValue);
    if (selectedLocation) query.set("location", selectedLocation);
    if (selectedType) query.set("type", selectedType);

    window.location.href = `/listing?${query.toString()}`;
  };

  const locationOptions =
    locations.length > 0
      ? locations.map((l) => ({ value: l, text: l }))
      : [
          { value: "dubai", text: "Dubai, UAE" },
          { value: "sharjah", text: "Sharjah, UAE" },
        ];

  const typeOptions =
    propertyTypes.length > 0
      ? propertyTypes.map((t) => ({
          value: t,
          text: t.charAt(0).toUpperCase() + t.slice(1) + "s",
        }))
      : [
          { value: "apartment", text: "Apartments" },
          { value: "villa", text: "Villas" },
          { value: "house", text: "Houses" },
          { value: "commercial", text: "Commercial" },
        ];

  const priceOptions = [
    { value: "1", text: "AED 500,000 - AED 2,000,000" },
    { value: "2", text: "AED 2,000,000 - AED 5,000,000" },
    { value: "3", text: "AED 5,000,000 - AED 20,000,000" },
    { value: "4", text: "AED 20,000,000+" },
  ];

  return (
    <>
      <div className="search-wrapper-one layout-one mt-150 xl-mt-100 lg-mt-80 position-relative">
        <nav className="search-filter-nav-one d-flex">
          <div className="nav nav-tabs border-0" role="tablist">
            {tab_title.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`nav-link m0 ${activeTab === index ? "active" : ""}`}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>
        <div className="bg-wrapper border-0 rounded-0">
          <div className="tab-content">
            <div className={`tab-pane show active`}>
              <form onSubmit={searchHandler}>
                <div className="row gx-0 align-items-center">
                  <div className="col-xxl-2 col-xl-3 col-lg-4">
                    <div className="input-box-one border-left">
                      <div className="label">I’m looking to...</div>
                      <NiceSelect
                        className="nice-select fw-normal"
                        options={typeOptions}
                        defaultCurrent={0}
                        onChange={(e: any) => setSelectedType(e.target.value)}
                        name=""
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4">
                    <div className="input-box-one border-left">
                      <div className="label">Location</div>
                      <NiceSelect
                        className="nice-select location fw-normal"
                        options={locationOptions}
                        defaultCurrent={0}
                        onChange={(e: any) =>
                          setSelectedLocation(e.target.value)
                        }
                        name=""
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4">
                    <div className="input-box-one border-left border-lg-0">
                      <div className="label">Price Range</div>
                      <NiceSelect
                        className="nice-select fw-normal"
                        options={priceOptions}
                        defaultCurrent={0}
                        onChange={(e: any) => {}}
                        name=""
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-3">
                    <div className="input-box-one lg-mt-10">
                      <div className="d-flex align-items-center justify-content-center">
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#advanceFilterModal"
                          className="search-modal-btn tran3s text-uppercase fw-500 d-inline-flex align-items-center me-3"
                        >
                          <span className="d-xl-none d-xxl-block">
                            ADVANCE Search
                          </span>
                          <i className="fa-light fa-sliders-up"></i>
                        </Link>
                        <button
                          type="submit"
                          className="fw-500 text-uppercase tran3s search-btn-four"
                        >
                          <span>Search</span>
                          <i className="fa-light fa-magnifying-glass"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <DropdownModal />
    </>
  );
};

export default DropdownSix;
