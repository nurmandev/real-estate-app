"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/utils/api";

import titleShape from "@/assets/images/shape/title_shape_03.svg";

const PropertyOne = () => {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await api.get("/api/public/properties");
        if (data && data.properties) {
          setProperties(data.properties.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  const item1 = properties[0];
  const item2 = properties[1];
  const item3 = properties[2];

  return (
    <div className="property-listing-three position-relative z-1 mt-170 xl-mt-120">
      <div className="container container-large">
        <div className="position-relative">
          <div className="title-one mb-60 xl-mb-40 wow fadeInUp">
            <h3>
              <span>
                Featured
                <Image src={titleShape} alt="" className="lazy-img" />
              </span>{" "}
              Listing
            </h3>
            <p className="fs-22 mt-xs">
              Explore exclusive featured properties for sale.
            </p>
          </div>

          <div className="row gx-xxl-5">
            <div className="col-xxl-8 col-lg-7 d-flex">
              {item1 && (
                <div
                  className="listing-card-six w-100 position-relative z-1 wow fadeInUp"
                  style={{
                    backgroundImage: `url(${item1.images?.[0] || "/assets/images/listing/img_25.jpg"})`,
                  }}
                >
                  <div className="w-100 h-100 d-flex flex-column">
                    <div className="tag fw-500 text-uppercase">
                      {item1.propertyType || item1.status || "PREMIUM"}
                    </div>
                    <h4>{item1.title || "Luxury Estate Overview"}</h4>
                    <Link
                      href={`/listing_details?id=${item1._id || item1.id}`}
                      className="btn-four inverse rounded-circle"
                    >
                      <i className="bi bi-arrow-up-right"></i>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="col-xxl-4 col-lg-5 d-flex">
              <div className="w-100 h-100">
                <div className="row">
                  <div className="col-lg-12 col-md-6">
                    {item2 && (
                      <div
                        className="listing-card-five w-100 position-relative z-1 md-mt-40 wow fadeInUp"
                        style={{
                          backgroundImage: `url(${item2.images?.[0] || "/assets/images/listing/img_23.jpg"})`,
                        }}
                      >
                        <div className="w-100 h-100 d-flex flex-column">
                          <div className="tag fw-500 text-uppercase">
                            {item2.propertyType || item2.status || "EXCLUSIVE"}
                          </div>
                          <h4>{item2.title || "Sky Duplex Villa."}</h4>
                          <Link
                            href={`/listing_details?id=${item2._id || item2.id}`}
                            className="btn-four rounded-circle"
                          >
                            <i className="bi bi-arrow-up-right"></i>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12 col-md-6">
                    {item3 && (
                      <div
                        className="listing-card-five w-100 position-relative z-1 mt-40 wow fadeInUp"
                        style={{
                          backgroundImage: `url(${item3.images?.[0] || "/assets/images/listing/img_24.jpg"})`,
                        }}
                      >
                        <div className="w-100 h-100 d-flex flex-column">
                          <div className="tag fw-500 text-uppercase">
                            {item3.propertyType || item3.status || "LUXURY"}
                          </div>
                          <h4>{item3.title || "Galaxy Touch House."}</h4>
                          <Link
                            href={`/listing_details?id=${item3._id || item3.id}`}
                            className="btn-four rounded-circle"
                          >
                            <i className="bi bi-arrow-up-right"></i>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-btn text-center md-mt-60">
            <Link href="/listing" className="btn-eight">
              <span>Explore All</span> <i className="bi bi-arrow-up-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyOne;
