import Image from "next/image";
import Fancybox from "@/components/common/Fancybox";

const MediaGallery = ({ property }: any) => {
  if (!property || !property.carousel_thumb) return null;

  const images = property.carousel_thumb.map((item: any) => item.img);

  return (
    <div className="media-gallery-grid p0 mb-60">
      <div
        id="media_slider"
        className="carousel slide d-flex flex-wrap flex-lg-nowrap gap-3"
      >
        <div className="flex-grow-1" style={{ minWidth: "0" }}>
          <div className="bg-white shadow4 border-20 p-30 md-mb-20">
            <div className="position-relative z-1 overflow-hidden border-20">
              <div className="img-fancy-btn border-10 fw-500 fs-16 color-dark">
                See all {images.length} Photos
                <Fancybox
                  options={{
                    Carousel: {
                      infinite: true,
                    },
                  }}
                >
                  {images.map((img: string, index: number) => (
                    <a
                      key={index}
                      className="d-block"
                      data-fancybox="img4"
                      href={img}
                    ></a>
                  ))}
                </Fancybox>
              </div>

              <div className="carousel-inner">
                {images.map((img: string, index: number) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <Image
                      src={img}
                      alt=""
                      className="border-20 w-100"
                      width={1000}
                      height={600}
                      style={{
                        objectFit: "cover",
                        height: "auto",
                        minHeight: "400px",
                        maxHeight: "600px",
                      }}
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#media_slider"
                data-bs-slide="prev"
              >
                <i className="bi bi-chevron-left"></i>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#media_slider"
                data-bs-slide="next"
              >
                <i className="bi bi-chevron-right"></i>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

        <div
          className="flex-shrink-0 d-none d-lg-block"
          style={{ width: "180px" }}
        >
          <div className="carousel-indicators d-flex flex-column position-relative w-100 h-100 mt-0 gap-3 border-0 bg-transparent p-0 m-0">
            {images.slice(0, 3).map((img: string, i: number) => (
              <button
                key={i}
                type="button"
                data-bs-target="#media_slider"
                data-bs-slide-to={`${i}`}
                className={
                  i === 0
                    ? "active m-0 w-100 border-0 p-0"
                    : "m-0 w-100 border-0 p-0"
                }
                aria-current={i === 0 ? "true" : "false"}
                aria-label={`Slide ${i + 1}`}
                style={{ height: "calc(33.33% - 11px)", width: "100%" }}
              >
                <Image
                  src={img}
                  alt=""
                  className="rounded-3 w-100 h-100"
                  width={200}
                  height={150}
                  style={{ objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaGallery;
