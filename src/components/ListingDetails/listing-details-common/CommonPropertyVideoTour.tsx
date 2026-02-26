"use client";
import { useState } from "react";
import VideoPopup from "@/modals/VideoPopup";
import Image from "next/image";
import videoImg from "@/assets/images/listing/img_47.jpg";

import Fancybox from "@/components/common/Fancybox";

const CommonPropertyVideoTour = ({ property }: any) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoUrl =
    property?.videoUrl || "https://www.youtube.com/embed/tUP5S4YdEJo";
  const isYoutube =
    videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");
  const videoId = isYoutube
    ? videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/").pop()
    : "";
  const thumbImg = property?.carousel_thumb?.[0]?.img || videoImg;

  return (
    <>
      <h4 className="mb-40">Video Tour</h4>
      <div className="bg-white shadow4 border-20 p-15">
        <div className="position-relative border-15 image-bg overflow-hidden z-1">
          <Image
            src={thumbImg}
            alt=""
            width={800}
            height={450}
            className="lazy-img w-100"
            style={{ objectFit: "cover", height: "auto", minHeight: "300px" }}
          />

          <Fancybox
            options={{
              Carousel: {
                infinite: true,
              },
            }}
          >
            <a
              href={videoUrl}
              data-fancybox="video"
              className="video-icon tran3s rounded-circle d-flex align-items-center justify-content-center"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-thin fa-play"></i>
            </a>
          </Fancybox>
        </div>
      </div>

      {/* Fallback for YouTube explicit Modal if needed, otherwise Fancybox is better */}
      {isYoutube && !videoUrl.startsWith("http") && (
        <VideoPopup
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={videoId}
        />
      )}
    </>
  );
};

export default CommonPropertyVideoTour;
