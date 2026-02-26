import NiceSelect from "@/ui/NiceSelect";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

const DropdownOne = ({ style }: any) => {
  const [locations, setLocations] = useState<string[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data } = await api.get("/api/public/properties");
        if (data && data.properties) {
          const locs = Array.from(
            new Set([
              ...data.properties.map((p: any) => p.city).filter(Boolean),
              ...data.properties.map((p: any) => p.location).filter(Boolean),
            ]),
          );
          const types = Array.from(
            new Set(data.properties.map((p: any) => p.type).filter(Boolean)),
          );
          setLocations(locs as string[]);
          setPropertyTypes(types as string[]);
        }
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };
    fetchFilters();
  }, []);

  const searchHandler = () => {
    const params = new URLSearchParams();
    if (selectedLocation) params.append("location", selectedLocation);
    if (selectedType) params.append("type", selectedType);
    if (selectedPrice) params.append("price", selectedPrice);
    window.location.href = `/listing?${params.toString()}`;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchHandler();
      }}
    >
      <div className="row gx-0 align-items-center">
        <div className="col-xl-3 col-lg-4">
          <div className="input-box-one border-left">
            <div className="label">I’m looking to...</div>
            <NiceSelect
              className={`nice-select ${style ? "fw-normal" : ""}`}
              options={
                propertyTypes.length > 0
                  ? propertyTypes.map((t) => ({
                      value: t,
                      text: t.charAt(0).toUpperCase() + t.slice(1),
                    }))
                  : [
                      { value: "apartment", text: "Buy Apartments" },
                      { value: "condo", text: "Rent Condos" },
                      { value: "house", text: "Sell Houses" },
                      { value: "villa", text: "Sell Villas" },
                    ]
              }
              defaultCurrent={0}
              onChange={(e: any) => setSelectedType(e.target.value)}
              name=""
              placeholder=""
            />
          </div>
        </div>
        <div className={`${style ? "col-xl-3" : "col-xl-4"} col-lg-4`}>
          <div className="input-box-one border-left">
            <div className="label">Location</div>
            <NiceSelect
              className={`nice-select location ${style ? "fw-normal" : ""}`}
              options={
                locations.length > 0
                  ? locations.map((loc) => ({ value: loc, text: loc }))
                  : [
                      { value: "dubai", text: "Dubai, UAE" },
                      { value: "new-york", text: "New York, USA" },
                    ]
              }
              defaultCurrent={0}
              onChange={(e: any) => setSelectedLocation(e.target.value)}
              name=""
              placeholder=""
            />
          </div>
        </div>
        <div className="col-xl-3 col-lg-4">
          <div className="input-box-one border-left border-lg-0">
            <div className="label">Price Range</div>
            <NiceSelect
              className={`nice-select ${style ? "fw-normal" : ""}`}
              options={[
                { value: "1", text: "$10,000 - $200,000" },
                { value: "2", text: "$20,000 - $300,000" },
                { value: "3", text: "$30,000 - $400,000" },
              ]}
              defaultCurrent={0}
              onChange={(e: any) => setSelectedPrice(e.target.value)}
              name=""
              placeholder=""
            />
          </div>
        </div>
        <div className={`${style ? "col-xl-3" : "col-xl-2"}`}>
          <div className="input-box-one lg-mt-10">
            <button
              className={`fw-500 tran3s ${style ? "w-100 tran3s search-btn-three" : "text-uppercase search-btn"}`}
            >
              {style ? "Search Now" : "Search"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DropdownOne;
