import Link from "next/link";

const CommonBanner = ({ style_3, property }: any) => {
  if (!property) return null;

  return (
    <div className="row">
      <div className="col-lg-6">
        <h3 className="property-titlee">{property.title}</h3>
        <div className="d-flex flex-wrap mt-10">
          <div
            className={`list-type text-uppercase mt-15 me-3 ${style_3 ? "border-1 ps-3 pe-3" : "text-uppercase border-20"}`}
            style={{
              border: "1px solid #000",
              borderRadius: "0px",
              display: "inline-block",
              fontSize: "12px",
              padding: "4px 10px",
            }}
          >
            {property.tag || "FOR SELL"}
          </div>
          <div className="address mt-15">
            <i className="bi bi-geo-alt"></i> {property.address}
          </div>
        </div>
      </div>
      <div className="col-lg-6 text-lg-end">
        <div className="d-inline-block md-mt-40">
          <div className="price color-dark fw-500" style={{ fontSize: "34px" }}>
            Price: ${Number(property.price).toLocaleString()}
            {property.price_text && (
              <>
                /<sub>m</sub>
              </>
            )}
          </div>
          {property.price > 0 && (
            <div className="est-price fs-20 mt-2 medio-font mb-35 md-mb-30">
              Est. Payment{" "}
              <span className="fw-500 color-dark">
                ${Number(property.price / 20).toLocaleString()}/mo*
              </span>
            </div>
          )}
          <ul className="style-none d-flex align-items-center action-btns">
            <li className="me-4 fw-500 color-dark">
              <i className="fa-sharp fa-regular fa-share-nodes me-2"></i>
              Share
            </li>
            <li className="me-3">
              <Link
                href="#"
                className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "border rounded-1" : "rounded-circle"}`}
                style={{
                  width: "45px",
                  height: "40px",
                  border: "1px solid #000",
                }}
              >
                <i className="fa-light fa-heart"></i>
              </Link>
            </li>
            <li className="me-3">
              <Link
                href="#"
                className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "border rounded-1" : "rounded-circle"}`}
                style={{
                  width: "45px",
                  height: "40px",
                  border: "1px solid #000",
                }}
              >
                <i className="fa-light fa-bookmark"></i>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "border rounded-1" : "rounded-circle"}`}
                style={{
                  width: "45px",
                  height: "40px",
                  border: "1px solid #000",
                }}
              >
                <i className="fa-light fa-circle-plus"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
