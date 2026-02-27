import Image from "next/image";
import Fancybox from "@/components/common/Fancybox";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

import offcanvasLogo from "@/assets/images/logo/logo_omnis.png";

const Offcanvas = ({ offCanvas, setOffCanvas }: any) => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await api.get("/api/public/properties");
        if (data && data.properties) {
          // Take first 2 for offcanvas featured listing
          setProperties(data.properties.slice(0, 2));
        }
      } catch (error) {
        console.error("Error fetching offcanvas properties:", error);
      } finally {
        setLoading(false);
      }
    };
    if (offCanvas) {
      fetchProperties();
    }
  }, [offCanvas]);

  return (
    <>
      <div
        className={`offcanvas offcanvas-end sidebar-nav ${offCanvas ? "show" : ""}`}
        id="sideNav"
      >
        <div className="offcanvas-header">
          <div className="logo order-lg-0">
            <Link href="/" className="d-flex align-items-center">
              <Image src={offcanvasLogo} alt="" />
            </Link>
          </div>
          <button
            onClick={() => setOffCanvas(false)}
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="wrapper mt-60">
          <div className="d-flex flex-column h-100">
            <div className="property-block">
              <h4 className="title pb-25">Featured Listing </h4>
              <div className="row">
                {loading ? (
                  <div className="col-12 text-center p-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : properties.length > 0 ? (
                  properties.map((item) => (
                    <div key={item.id} className="col-12">
                      <div className="listing-card-one shadow-none style-two mb-40">
                        <div className="img-gallery">
                          <div className="position-relative overflow-hidden">
                            <div className="tag bg-white text-dark fw-500">
                              {item.tag}
                            </div>
                            <Image
                              src={
                                item.carousel_thumb?.[0]?.img ||
                                "/assets/images/placeholder.png"
                              }
                              className="w-100"
                              width={400}
                              height={300}
                              style={{ objectFit: "cover", height: "180px" }}
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
                                {item.carousel_thumb?.map(
                                  (thumb: any, i: any) => (
                                    <a
                                      key={i}
                                      className="d-none"
                                      data-fancybox={`offcanvas-gallery-${item.id}`}
                                      href={thumb.img}
                                    ></a>
                                  ),
                                )}
                              </Fancybox>
                            </div>
                          </div>
                        </div>
                        <div className="property-info d-flex justify-content-between align-items-end pt-30">
                          <div
                            style={{
                              flex: 1,
                              minWidth: 0,
                              paddingRight: "10px",
                            }}
                          >
                            <strong className="price fw-500 color-dark fs-3">
                              ${Number(item.price).toLocaleString()}
                              {item.price_text && `/${item.price_text}`}
                            </strong>
                            <div
                              className="address pt-5 m0 text-truncate"
                              title={item.address}
                            >
                              {item.address}
                            </div>
                          </div>
                          <Link
                            href={`/listing_details?id=${item.id}`}
                            className="btn-four mb-5 flex-shrink-0"
                          >
                            <i className="bi bi-arrow-up-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center p-4">
                    <p>No listings available.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="address-block mt-50">
              <h4 className="title pb-15">Our Address</h4>
              <p>
                Business Bay, <br />
                Dubai, UAE
              </p>
              <p>
                Urgent issue? call us at <br />
                <Link href="tel:+971588251088">+971 58 825 1088</Link>
              </p>
            </div>
            <ul className="style-none d-flex flex-wrap w-100 justify-content-between align-items-center social-icon pt-25 mt-auto">
              <li>
                <Link href="#">
                  <i className="fa-brands fa-whatsapp"></i>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fa-brands fa-x-twitter"></i>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fa-brands fa-instagram"></i>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fa-brands fa-viber"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        onClick={() => setOffCanvas(false)}
        className={`offcanvas-backdrop fade ${offCanvas ? "show" : ""}`}
      ></div>
    </>
  );
};

export default Offcanvas;
