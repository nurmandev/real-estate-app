"use client";
import Fancybox from "@/components/common/Fancybox";
import property_data from "@/data/home-data/PropertyData";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

const setting = {
  dots: true,
  arrows: false,
  centerPadding: "0px",
  slidesToShow: 2,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

import { useEffect, useState } from "react";
import { api } from "@/utils/api";

const SimilarProperty = ({ property }: any) => {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const { data } = await api.get("/api/public/properties");
        if (data && data.properties) {
          // Filter out the current property and show a few similar ones
          const filtered = data.properties
            .filter(
              (p: any) => p.id !== property?.id && p.type === property?.type,
            )
            .slice(0, 4);
          setProperties(
            filtered.length > 0
              ? filtered
              : data.properties
                  .filter((p: any) => p.id !== property?.id)
                  .slice(0, 4),
          );
        }
      } catch (err) {
        console.error("Error fetching similar properties:", err);
      }
    };
    fetchSimilar();
  }, [property]);

  return (
    <div className="similar-property bottom-line-dark pb-20 mb-60 position-relative">
      <h4 className="mb-40">Similar Homes You May Like</h4>
      <Slider {...setting} className="similar-listing-slider-two">
        {properties.map((item) => (
          <div key={item.id} className="item">
            <div
              className="listing-card-one shadow-none style-two mb-50"
              style={{ padding: "0 10px" }}
            >
              <div className="img-gallery">
                <div className="position-relative overflow-hidden">
                  <div
                    className="tag bg-white text-dark fw-500"
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      zIndex: 2,
                      fontSize: "10px",
                      padding: "2px 8px",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.tag || "FOR SELL"}
                  </div>
                  <Image
                    src={
                      item.carousel_thumb?.[0]?.img ||
                      "/assets/images/placeholder.png"
                    }
                    className="w-100"
                    alt={item.title}
                    width={500}
                    height={350}
                    style={{
                      objectFit: "cover",
                      height: "300px",
                    }}
                  />

                  <div className="img-slider-btn">
                    {item.carousel_thumb?.length || 0}{" "}
                    <i className="fa-regular fa-image"></i>
                    <Fancybox
                      options={{
                        Carousel: {
                          infinite: true,
                        },
                      }}
                    >
                      {item.carousel_thumb?.map((thumb: any, index: any) => (
                        <a
                          key={index}
                          className="d-block"
                          data-fancybox={`gallery-${item.id}`}
                          href={thumb.img}
                        ></a>
                      ))}
                    </Fancybox>
                  </div>
                </div>
              </div>
              <div className="property-info d-flex justify-content-between align-items-end pt-20">
                <div>
                  <strong
                    className="price fw-500 color-dark"
                    style={{ fontSize: "22px" }}
                  >
                    ${Number(item.price).toLocaleString()}
                  </strong>
                  <div className="address m0 fs-16" style={{ color: "#888" }}>
                    {item.address}
                  </div>
                </div>
                <Link
                  href={`/listing_details?id=${item.id}`}
                  className="btn-four mb-5 d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                    backgroundColor: "#1a1a1a",
                    color: "#fff",
                    borderRadius: "0px",
                  }}
                >
                  <i
                    className="bi bi-arrow-up-right"
                    style={{ fontSize: "20px" }}
                  ></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <style jsx global>{`
        .similar-listing-slider-two .slick-dots {
          position: absolute;
          top: -65px;
          right: 0;
          width: auto;
        }
        .similar-listing-slider-two .slick-dots li button:before {
          font-size: 12px;
          color: #000;
        }
        .similar-listing-slider-two .slick-dots li.slick-active button:before {
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default SimilarProperty;
