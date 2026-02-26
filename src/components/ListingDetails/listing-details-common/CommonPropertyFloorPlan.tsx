import Image from "next/image";

import floorPlan_1 from "@/assets/images/listing/floor_1.jpg";
import floorPlan_2 from "@/assets/images/listing/floor_2.jpg";

const CommonPropertyFloorPlan = ({ style, property }: any) => {
  const floorPlans = property?.floorPlans || [floorPlan_1, floorPlan_2];

  return (
    <div
      className={`property-floor-plan ${style ? "bottom-line-dark pb-40 mb-60" : "mb-50"}`}
    >
      <h4 className="mb-40">Floor Plans</h4>
      <div
        className={` p-30 ${style ? "bg-dot" : "bg-white shadow4 border-20"}`}
      >
        <div id="floor-plan" className="carousel slide">
          <div className="carousel-indicators">
            {floorPlans.map((_: any, i: number) => (
              <button
                key={i}
                type="button"
                data-bs-target="#floor-plan"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-current={i === 0 ? "true" : "false"}
                aria-label={`Slide ${i + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {floorPlans.map((plan: any, i: number) => (
              <div
                key={i}
                className={`carousel-item ${i === 0 ? "active" : ""}`}
              >
                <Image
                  src={plan}
                  alt=""
                  className="w-100"
                  width={800}
                  height={500}
                  style={{
                    objectFit: "contain",
                    height: "auto",
                    minHeight: "300px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonPropertyFloorPlan;
