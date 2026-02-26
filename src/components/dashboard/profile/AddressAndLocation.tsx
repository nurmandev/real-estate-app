import React from "react";
import Image from "next/image";
import locationImage from "@/assets/images/dashboard/icon/icon_16.svg";

interface AddressAndLocationProps {
  address: string;
  setAddress: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  state: string;
  setState: (val: string) => void;
  zipCode: string;
  setZipCode: (val: string) => void;
  country: string;
  setCountry: (val: string) => void;
}

const AddressAndLocation: React.FC<AddressAndLocationProps> = ({
  address,
  setAddress,
  city,
  setCity,
  state,
  setState,
  zipCode,
  setZipCode,
  country,
  setCountry,
}) => {
  return (
    <div className="bg-white card-box border-20 mt-40">
      <h4 className="dash-title-three">Address & Location</h4>
      <div className="row">
        <div className="col-12">
          <div className="dash-input-wrapper mb-25">
            <label htmlFor="address">Address*</label>
            <input
              id="address"
              type="text"
              placeholder="19 Yawkey Way"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="dash-input-wrapper mb-25">
            <label htmlFor="country">Country*</label>
            <input
              id="country"
              type="text"
              placeholder="e.g. USA"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="dash-input-wrapper mb-25">
            <label htmlFor="city">City*</label>
            <input
              id="city"
              type="text"
              placeholder="e.g. New York"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="dash-input-wrapper mb-25">
            <label htmlFor="zipCode">Zip Code*</label>
            <input
              id="zipCode"
              type="text"
              placeholder="e.g. 10001"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="dash-input-wrapper mb-25">
            <label htmlFor="state">State*</label>
            <input
              id="state"
              type="text"
              placeholder="e.g. NY"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="dash-input-wrapper mb-25">
          <label htmlFor="mapLocation">Map Location (optional)</label>
          <div className="position-relative">
            <input
              id="mapLocation"
              type="text"
              placeholder="XC23+6XC, Moiran, N105"
            />
            <button className="location-pin tran3s">
              <Image src={locationImage} alt="" className="lazy-img m-auto" />
            </button>
          </div>
          <div className="map-frame mt-30">
            <div className="gmap_canvas h-100 w-100">
              <iframe
                className="gmap_iframe h-100 w-100"
                src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${encodeURIComponent(
                  address + ", " + city,
                )}&t=&z=12&ie=UTF8&iwloc=B&output=embed`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressAndLocation;
