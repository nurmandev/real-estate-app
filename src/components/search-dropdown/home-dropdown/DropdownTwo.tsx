"use client";
import { useState, useEffect } from "react";
import NiceSelect from "@/ui/NiceSelect";
import { api } from "@/utils/api";

const tab_title: string[] = ["Off-Plan", "Buy", "Rent"];

const DropdownTwo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [locations, setLocations] = useState<string[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [searchKey, setSearchKey] = useState("");

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
            new Set(data.properties.map((p: any) => p.type).filter(Boolean)),
          ) as string[];
          setLocations(locs);
          setPropertyTypes(types);
        }
      } catch (err) {
        console.error("Error fetching defaults in DropdownTwo:", err);
      }
    };
    fetchData();
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const searchHandler = () => {
    // Map tabs to statuses
    const statusMap = ["active", "rented", "pending"];
    const statusValue = statusMap[activeTab];

    const query = new URLSearchParams();
    if (statusValue) query.set("status", statusValue);
    if (selectedLocation) query.set("location", selectedLocation);
    if (selectedType) query.set("type", selectedType);
    if (searchKey) query.set("search", searchKey);

    window.location.href = `/listing?${query.toString()}`;
  };

  return (
    <div className="search-wrapper-one layout-two mt-60 lg-mt-40 position-relative">
      <nav className="search-filter-nav-one d-flex">
        <div className="nav nav-tabs border-0" role="tablist">
          {tab_title.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`nav-link ${activeTab === index ? "active" : ""}`}
              id={`${tab.toLowerCase()}-tab`}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <div className="bg-wrapper border-0 rounded-0">
        <div className="tab-content">
          <div className="tab-pane active show">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchHandler();
              }}
            >
              <div className="row gx-0 align-items-center">
                <div className="col-xl-2 col-md-6">
                  <div className="input-box-one border-left">
                    <div className="label">I’m looking to...</div>
                    <NiceSelect
                      className="nice-select fw-normal"
                      options={
                        propertyTypes.length > 0
                          ? propertyTypes.map((t) => ({
                              value: t,
                              text:
                                t.charAt(0).toUpperCase() + t.slice(1) + "s",
                            }))
                          : [
                              { value: "apartment", text: "Apartments" },
                              { value: "condo", text: "Condos" },
                              { value: "house", text: "Houses" },
                              { value: "villa", text: "Villas" },
                            ]
                      }
                      defaultCurrent={0}
                      onChange={(e: any) => setSelectedType(e.target.value)}
                      name=""
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="input-box-one border-left">
                    <div className="label">Location</div>
                    <NiceSelect
                      className="nice-select location fw-normal"
                      options={
                        locations.length > 0
                          ? locations.map((l) => ({ value: l, text: l }))
                          : [
                              { value: "dubai", text: "Dubai, UAE" },
                              { value: "sharjah", text: "Sharjah, UAE" },
                            ]
                      }
                      defaultCurrent={0}
                      onChange={(e: any) => setSelectedLocation(e.target.value)}
                      name=""
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="input-box-one border-left">
                    <div className="label">Keyword</div>
                    <input
                      type="text"
                      placeholder="buy, home, loft, apartment"
                      className="type-input"
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="input-box-one border-left">
                    <div className="label">Price Range</div>
                    <NiceSelect
                      className="nice-select fw-normal"
                      options={[
                        { value: "1", text: "AED 500,000 - AED 2,000,000" },
                        { value: "2", text: "AED 2,000,000 - AED 5,000,000" },
                        { value: "3", text: "AED 5,000,000 - AED 20,000,000" },
                        { value: "4", text: "AED 20,000,000+" },
                      ]}
                      defaultCurrent={0}
                      onChange={(e: any) => {}}
                      name=""
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="col-xl-1">
                  <div className="input-box-one lg-mt-10">
                    <button
                      type="submit"
                      className="fw-500 text-uppercase tran3s search-btn-two"
                    >
                      <i className="fa-light fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownTwo;
