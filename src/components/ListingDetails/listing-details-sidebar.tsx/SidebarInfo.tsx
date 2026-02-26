import Image from "next/image";
import Link from "next/link";

import infoAvatar from "@/assets/images/agent/img_06.jpg";

const SidebarInfo = ({ property }: any) => {
  const owner = property?.owner || {};
  return (
    <>
      <Image
        src={infoAvatar}
        alt=""
        className="lazy-img rounded-circle ms-auto me-auto mt-3 avatar"
      />
      <div className="text-center mt-25">
        <h6 className="name">{owner.name || "OMNIS Agent"}</h6>
        <p className="fs-16">Property Agent & Broker</p>
        <ul className="style-none d-flex align-items-center justify-content-center social-icon">
          <li>
            <Link href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </Link>
          </li>
          <li>
            <Link href="#">
              <i className="fa-brands fa-twitter"></i>
            </Link>
          </li>
          <li>
            <Link href="#">
              <i className="fa-brands fa-instagram"></i>
            </Link>
          </li>
          <li>
            <Link href="#">
              <i className="fa-brands fa-linkedin"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="divider-line mt-40 mb-45 pt-20">
        <ul className="style-none">
          <li>
            Location:{" "}
            <span>{property?.city || property?.location || "Dubai"}</span>
          </li>
          <li>
            Email:{" "}
            <span>
              <Link href={`mailto:${owner.email || "Email@gmail.com"}`}>
                {owner.email || "Email@gmail.com"}
              </Link>
            </span>
          </li>
          <li>
            Phone:{" "}
            <span>
              <Link href="tel:+971000000000">+971 000 0000</Link>
            </span>
          </li>
        </ul>
      </div>
      <Link
        href="/contact"
        className="btn-nine text-uppercase rounded-3 w-100 mb-10"
      >
        CONTACT AGENT
      </Link>
    </>
  );
};

export default SidebarInfo;
