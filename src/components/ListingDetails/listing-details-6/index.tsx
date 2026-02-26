import { Suspense } from "react";
import ListingDetailsSixArea from "./ListingDetailsSixArea";
import FancyBanner from "@/components/common/FancyBanner";
import FooterFour from "@/layouts/footers/FooterFour";
import HeaderFour from "@/layouts/headers/HeaderFour";

const ListingDetailsSix = () => {
  return (
    <>
      <HeaderFour />
      <Suspense fallback={<div>Loading...</div>}>
        <ListingDetailsSixArea />
      </Suspense>
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default ListingDetailsSix;
