import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { api } from "@/utils/api";

import icon_1 from "@/assets/images/dashboard/icon/icon_18.svg";
import icon_2 from "@/assets/images/dashboard/icon/icon_19.svg";
import icon_3 from "@/assets/images/dashboard/icon/icon_20.svg";
import icon_4 from "@/assets/images/dashboard/icon/icon_21.svg";

import listImg_1 from "@/assets/images/dashboard/img_01.jpg";
import listImg_2 from "@/assets/images/dashboard/img_02.jpg";
import listImg_3 from "@/assets/images/dashboard/img_03.jpg";
import listImg_4 from "@/assets/images/dashboard/img_04.jpg";
import listImg_5 from "@/assets/images/dashboard/img_05.jpg";

const PropertyTableBody = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const { data } = await api.get("/api/dashboard/properties");
      if (data && data.properties) {
        setProperties(data.properties);
      }
    } catch (error) {
      console.error("Error fetching dashboard properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await api.delete(`/api/dashboard/properties/${id}`);
        setProperties(properties.filter((p) => (p._id || p.id) !== id));
        alert("Property deleted successfully");
      } catch (error) {
        console.error("Error deleting property:", error);
        alert("Failed to delete property");
      }
    }
  };

  const handleShare = (id: string) => {
    const url = `${window.location.origin}/listing_details?id=${id}`;
    navigator.clipboard.writeText(url);
    alert("Property link copied to clipboard!");
  };

  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="border-0">
      {properties.length > 0 ? (
        properties.map((item) => (
          <tr key={item._id || item.id}>
            <td>
              <div className="d-lg-flex align-items-center position-relative">
                <img
                  src={item.images?.[0] || "/assets/images/placeholder.png"}
                  alt=""
                  className="p-img"
                  style={{
                    width: "100px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div className="ps-lg-4 md-pt-10">
                  <Link
                    href={`/listing_details?id=${item._id || item.id}`}
                    className="property-name tran3s color-dark fw-500 fs-20 stretched-link"
                  >
                    {item.title}
                  </Link>
                  <div className="address">{item.location}</div>
                  <strong className="price color-dark">
                    ${Number(item.price).toLocaleString()}
                  </strong>
                </div>
              </div>
            </td>
            <td>
              {new Date(item.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </td>
            <td>{item.views || 0}</td>
            <td>
              <div
                className={`property-status ${item.status === "pending" ? "pending" : item.status === "active" ? "active" : ""}`}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </div>
            </td>
            <td>
              <div className="action-dots float-end">
                <button
                  className="action-btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span></span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link
                      className="dropdown-item"
                      href={`/listing_details?id=${item._id || item.id}`}
                    >
                      <Image src={icon_1} alt="" className="lazy-img" /> View
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleShare(item._id || item.id)}
                    >
                      <Image src={icon_2} alt="" className="lazy-img" /> Share
                    </button>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      href={`/dashboard/add-property?id=${item._id || item.id}`}
                    >
                      <Image src={icon_3} alt="" className="lazy-img" /> Edit
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleDelete(item._id || item.id)}
                    >
                      <Image src={icon_4} alt="" className="lazy-img" /> Delete
                    </button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="text-center p-5">
            <p>You have no properties listed.</p>
            <Link href="/dashboard/add-property" className="btn-two">
              Add a Property
            </Link>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default PropertyTableBody;
