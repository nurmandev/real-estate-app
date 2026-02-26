"use client";
import MediaGallery from "./MediaGallery";
import CommonAmenities from "../listing-details-common/CommonAmenities";
import CommonBanner from "../listing-details-common/CommonBanner";
import CommonLocation from "../listing-details-common/CommonLocation";
import CommonNearbyList from "../listing-details-common/CommonNearbyList";
import CommonPropertyFeatureList from "../listing-details-common/CommonPropertyFeatureList";
import CommonPropertyFloorPlan from "../listing-details-common/CommonPropertyFloorPlan";
import CommonPropertyVideoTour from "../listing-details-common/CommonPropertyVideoTour";
import Sidebar from "../listing-details-1/Sidebar";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/utils/api";

const ListingDetailsSixArea = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const { data } = await api.get(`/api/public/properties/${id}`);
        if (data && data.property) {
          setProperty(data.property);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const selectHandler = (e: any) => {};

  if (loading) {
    return (
      <div className="text-center pt-200 pb-200">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Fetching property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center pt-200 pb-200">
        <h3>Property not found.</h3>
      </div>
    );
  }

  return (
    <>
      <div className="listing-details-one theme-details-one mt-200 xl-mt-150 pb-150 xl-mb-120">
        <div className="container">
          <CommonBanner style_3={true} property={property} />
          <MediaGallery property={property} />
          <div className="d-flex flex-wrap flex-xl-nowrap gap-4 pt-80 lg-pt-50">
            <div className="flex-grow-1" style={{ minWidth: "0" }}>
              <div className="property-overview bottom-line-dark pb-40 mb-60">
                <h4 className="mb-20">Overview</h4>
                <p className="fs-20 lh-lg">{property.description}</p>
              </div>
              <div className="property-feature-accordion bottom-line-dark pb-40 mb-60">
                <h4 className="mb-20">Property Features</h4>
                <div className="accordion-style-two grey-bg mt-30">
                  <CommonPropertyFeatureList property={property} />
                </div>
              </div>
              <div className="property-amenities bottom-line-dark pb-40 mb-60">
                <CommonAmenities property={property} />
              </div>
              <div className="property-video-tour bottom-line-dark pb-40 mb-60">
                <CommonPropertyVideoTour property={property} />
              </div>
              <CommonPropertyFloorPlan style={true} property={property} />
              <div className="property-nearby bottom-line-dark pb-40 mb-60">
                <CommonNearbyList property={property} />
              </div>

              <div className="property-location bottom-line-dark pb-60 mb-60">
                <CommonLocation property={property} />
              </div>
            </div>
            <Sidebar property={property} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetailsSixArea;
