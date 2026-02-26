"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/utils/api";

import titleShape from "@/assets/images/shape/title_shape_03.svg";
import propertyIcon_1 from "@/assets/images/icon/icon_04.svg";
import propertyIcon_2 from "@/assets/images/icon/icon_05.svg";
import propertyIcon_3 from "@/assets/images/icon/icon_06.svg";

const PropertyOne = ({ style_1, style_2 }: any) => {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await api.get("/api/public/properties");
        if (data && data.properties) {
          setProperties(data.properties.slice(0, 6)); // Display 6 newest properties
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="property-listing-five mt-170 xl-mt-120">
      <div className="container container-large">
        <div className="position-relative">
          <div className="title-one mb-25 lg-mb-10 wow fadeInUp">
            {style_2 ? (
              <h3>
                <span>
                  New
                  <Image src={titleShape} alt="" className="lazy-img" />
                </span>{" "}
                Listings
              </h3>
            ) : (
              <h3>{style_1 ? "Popular Listings" : "New Listings"}</h3>
            )}
            <p className="fs-22">
              Explore latest and featured properties for sale, rent & mortgage
              in Dubai.
            </p>
          </div>

          <div className="row gx-xxl-5">
            {properties.map((item) => (
              <div
                key={item._id || item.id}
                className="col-lg-4 col-md-6 d-flex mt-40 wow fadeInUp"
              >
                <div className="listing-card-one style-two shadow-none h-100 w-100">
                  <div className="img-gallery">
                    <div className="position-relative overflow-hidden">
                      <div className="tag fw-500 text-uppercase">
                        {item.propertyType || item.status}
                      </div>
                      <div
                        id={`carousel${item._id || item.id}`}
                        className="carousel slide"
                      >
                        <div className="carousel-indicators">
                          {(item.images?.length > 0
                            ? item.images
                            : ["/assets/images/placeholder.png"]
                          )
                            .slice(0, 3)
                            .map((_: any, i: number) => (
                              <button
                                key={i}
                                type="button"
                                data-bs-target={`#carousel${item._id || item.id}`}
                                data-bs-slide-to={i}
                                className={i === 0 ? "active" : ""}
                                aria-current={i === 0 ? "true" : "false"}
                                aria-label={`Slide ${i + 1}`}
                              ></button>
                            ))}
                        </div>
                        <div className="carousel-inner">
                          {(item.images?.length > 0
                            ? item.images
                            : ["/assets/images/placeholder.png"]
                          )
                            .slice(0, 3)
                            .map((imgUrl: string, i: number) => (
                              <div
                                key={i}
                                className={`carousel-item ${i === 0 ? "active" : ""}`}
                                data-bs-interval="1000000"
                              >
                                <Link
                                  href={`/listing_details?id=${item._id || item.id}`}
                                  className="d-block"
                                >
                                  <Image
                                    src={imgUrl}
                                    className="w-100"
                                    width={400}
                                    height={300}
                                    style={{
                                      objectFit: "cover",
                                      height: "280px",
                                    }}
                                    alt="..."
                                  />
                                </Link>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="property-info pt-20">
                    <Link
                      href={`/listing_details?id=${item._id || item.id}`}
                      className="title tran3s"
                    >
                      {item.title}
                    </Link>
                    <div className="address">
                      {item.location || item.address}
                    </div>
                    <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between pb-15 pt-5">
                      <li className="d-flex align-items-center">
                        <Image
                          src={propertyIcon_1}
                          alt=""
                          className="lazy-img icon me-2"
                        />
                        <span className="fs-16">
                          {item.area ? item.area : 1200} sqft
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <Image
                          src={propertyIcon_2}
                          alt=""
                          className="lazy-img icon me-2"
                        />
                        <span className="fs-16">
                          {item.bedrooms ? item.bedrooms : 2} bed
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <Image
                          src={propertyIcon_3}
                          alt=""
                          className="lazy-img icon me-2"
                        />
                        <span className="fs-16">
                          {item.bathrooms ? item.bathrooms : 2} bath
                        </span>
                      </li>
                    </ul>
                    <div className="pl-footer top-border bottom-border d-flex align-items-center justify-content-between">
                      <strong className="price fw-500 color-dark">
                        ${Number(item.price).toLocaleString()}
                      </strong>
                      <Link
                        href={`/listing_details?id=${item._id || item.id}`}
                        className="btn-four"
                      >
                        <i className="bi bi-arrow-up-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
