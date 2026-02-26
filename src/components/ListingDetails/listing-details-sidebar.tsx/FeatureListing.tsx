import Image from "next/image";
import Link from "next/link";
import Fancybox from "@/components/common/Fancybox";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

const FeatureListing = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await api.get("/api/public/properties");
        if (data && data.properties) {
          // Take first 3 for featured listing
          setProperties(data.properties.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="feature-listing bg-white border-20 p-30 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return null;
  }

  return (
    <div className="feature-listing bg-white border-20 p-30">
      <h5 className="mb-40">Featured Listing</h5>
      <div id="F-listing" className="carousel slide">
        <div className="carousel-indicators">
          {properties.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target="#F-listing"
              data-bs-slide-to={i}
              className={i === 0 ? "active" : ""}
              aria-current={i === 0 ? "true" : "false"}
              aria-label={`Slide ${i + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {properties.map((item, index) => (
            <div
              key={item.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="listing-card-one style-three border-10">
                <div className="img-gallery">
                  <div className="position-relative border-10 overflow-hidden">
                    <div className="tag bg-white text-dark fw-500 border-20">
                      {item.tag}
                    </div>
                    <Link href="#" className="fav-btn tran3s">
                      <i className="fa-light fa-heart"></i>
                    </Link>
                    <Image
                      src={
                        item.carousel_thumb?.[0]?.img ||
                        "/assets/images/placeholder.png"
                      }
                      className="w-100 border-10"
                      width={400}
                      height={300}
                      style={{ objectFit: "cover", height: "250px" }}
                      alt={item.title}
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
                        {item.carousel_thumb?.map((thumb: any, i: any) => (
                          <a
                            key={i}
                            className="d-none"
                            data-fancybox={`img-featured-${item.id}`}
                            href={thumb.img}
                          ></a>
                        ))}
                      </Fancybox>
                    </div>
                  </div>
                </div>
                <div className="property-info mt-15">
                  <div className="d-flex justify-content-between align-items-end">
                    <div style={{ flex: 1, minWidth: 0, paddingRight: "10px" }}>
                      <strong className="price fw-500 color-dark">
                        ${Number(item.price).toLocaleString()}
                        {item.price_text && `/${item.price_text}`}
                      </strong>
                      <div
                        className="address m0 pt-5 text-truncate"
                        title={item.address}
                      >
                        {item.address}
                      </div>
                    </div>
                    <Link
                      href={`/listing_details?id=${item.id}`}
                      className="btn-four rounded-circle flex-shrink-0"
                    >
                      <i className="bi bi-arrow-up-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureListing;
