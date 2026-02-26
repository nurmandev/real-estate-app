import Image from "next/image";
import titleShape from "@/assets/images/shape/shape_58.svg";
import bannerimg from "@/assets/images/assets/screen_06.png";
import Link from "next/link";
import DropdownSix from "@/components/search-dropdown/home-dropdown/DropdownSix";

const HeroBanner = () => {
  return (
    <div className="hero-banner-six z-2 pt-200 lg-pt-150">
      <div className="container container-large">
        <div className="position-relative">
          <div className="row">
            <div className="col-xxl-7 col-xl-6 col-lg-7">
              <div className="position-relative pe-xxl-5 wow fadeInLeft">
                <h1 className="hero-heading">
                  Invest in Dubai&apos;s Premium{" "}
                  <span className="d-inline-block position-relative">
                    Real Estate{" "}
                    <Image src={titleShape} alt="" className="lazy-img" />
                  </span>{" "}
                  Offerings.
                </h1>
              </div>
            </div>
            <div className="col-lg-5 ms-auto">
              <div className="ps-xxl-5 pt-35 wow fadeInRight">
                <p className="color-dark sub-heading mb-40 lg-mb-20">
                  Find exclusive off-plan, secondary, and rental properties
                  tailored for elite international investors.
                </p>
                <div className="d-flex flex-wrap justify-content-between align-items-start">
                  <div className="d-flex flex-column justify-content-center align-items-start mt-20">
                    <Image src={bannerimg} alt="" className="lazy-img" />
                    <p className="m0 pt-10 rating">
                      <span className="fw-500 color-dark">
                        Trusted by 1500+
                      </span>{" "}
                      Global Investors
                    </p>
                  </div>
                  <Link href="/contact" className="btn-five rounded-0 md mt-20">
                    <span>Contact us</span>{" "}
                    <i className="bi bi-arrow-up-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <DropdownSix />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
