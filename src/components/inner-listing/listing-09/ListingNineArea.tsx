"use client";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import NiceSelect from "@/ui/NiceSelect";
import UseShortedProperty from "@/hooks/useShortedProperty";
import DropdownOne from "@/components/search-dropdown/inner-dropdown/DropdownOne";

import icon from "@/assets/images/icon/icon_46.svg";
import featureIcon_1 from "@/assets/images/icon/icon_04.svg";
import featureIcon_2 from "@/assets/images/icon/icon_05.svg";
import featureIcon_3 from "@/assets/images/icon/icon_06.svg";

const ListingNineArea = () => {
  const itemsPerPage = 9;
  const page = "listing_5";

  const {
    itemOffset,
    sortedProperties,
    currentItems,
    pageCount,
    handlePageClick,
    handleBathroomChange,
    handleBedroomChange,
    handleSearchChange,
    handlePriceChange,
    maxPrice,
    priceValue,
    resetFilters,
    selectedAmenities,
    handleAmenityChange,
    handleLocationChange,
    handleStatusChange,
    handleTypeChange,
    handlePropertyTypeChange,
    locations,
    statuses,
    propertyTypes,
    loading,
  } = UseShortedProperty({ itemsPerPage, page });

  const handleResetFilter = () => {
    resetFilters();
  };

  return (
    <div className="property-listing-six bg-pink-two pt-110 md-pt-80 pb-150 xl-pb-120 mt-150 xl-mt-120">
      <div className="container container-large">
        <div className="row">
          <div className="col-lg-8">
            <div className="ps-xxl-5">
              <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
                <div>
                  Showing{" "}
                  <span className="color-dark fw-500">
                    {itemOffset + 1}–{itemOffset + currentItems.length}
                  </span>{" "}
                  of{" "}
                  <span className="color-dark fw-500">
                    {sortedProperties.length}
                  </span>{" "}
                  results
                </div>
                <div className="d-flex align-items-center xs-mt-20">
                  <div className="short-filter d-flex align-items-center">
                    <div className="fs-16 me-2">Short by:</div>
                    <NiceSelect
                      className="nice-select"
                      options={[
                        { value: "newest", text: "Newest" },
                        { value: "best_seller", text: "Best Seller" },
                        { value: "best_match", text: "Best Match" },
                        { value: "price_low", text: "Price Low" },
                        { value: "price_high", text: "Price High" },
                      ]}
                      defaultCurrent={0}
                      onChange={handleTypeChange}
                      name=""
                      placeholder=""
                    />
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="text-center pt-50 pb-50">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Fetching properties...</p>
                </div>
              ) : (
                <div className="row gx-xxl-5">
                  {currentItems.length > 0 ? (
                    currentItems.map((item: any) => (
                      <div
                        key={item.id}
                        className="col-md-6 d-flex mb-50 wow fadeInUp"
                        data-wow-delay={item.data_delay_time}
                      >
                        <div className="listing-card-one border-25 h-100 w-100">
                          <div className="img-gallery p-15">
                            <div className="position-relative border-25 overflow-hidden">
                              <div className={`tag border-25 ${item.tag_bg}`}>
                                {item.tag}
                              </div>
                              <Link href="#" className="fav-btn tran3s">
                                <i className="fa-light fa-heart"></i>
                              </Link>
                              <div
                                id={`carousel${item.carousel}`}
                                className="carousel slide"
                              >
                                <div className="carousel-inner">
                                  {item.carousel_thumb.map(
                                    (thumb: any, i: any) => (
                                      <div
                                        key={i}
                                        className={`carousel-item ${thumb.active}`}
                                        data-bs-interval="1000000"
                                      >
                                        <Link
                                          href={`/listing_details?id=${item.id || item._id}`}
                                          className="d-block"
                                        >
                                          <Image
                                            src={thumb.img}
                                            className="w-100"
                                            width={400}
                                            height={300}
                                            style={{
                                              objectFit: "cover",
                                              height: "300px",
                                            }}
                                            alt="..."
                                          />
                                        </Link>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="property-info p-25">
                            <Link
                              href={`/listing_details?id=${item.id || item._id}`}
                              className="title tran3s"
                            >
                              {item.title}
                            </Link>
                            <div className="address">{item.address}</div>
                            <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between">
                              <li className="d-flex align-items-center">
                                <Image
                                  src={featureIcon_1}
                                  alt=""
                                  className="lazy-img icon me-2"
                                />
                                <span className="fs-16">
                                  {item.property_info.sqft} sqft
                                </span>
                              </li>
                              <li className="d-flex align-items-center">
                                <Image
                                  src={featureIcon_2}
                                  alt=""
                                  className="lazy-img icon me-2"
                                />
                                <span className="fs-16">
                                  {item.property_info.bed} bed
                                </span>
                              </li>
                              <li className="d-flex align-items-center">
                                <Image
                                  src={featureIcon_3}
                                  alt=""
                                  className="lazy-img icon me-2"
                                />
                                <span className="fs-16">
                                  {item.property_info.bath} bath
                                </span>
                              </li>
                            </ul>
                            <div className="pl-footer top-border d-flex align-items-center justify-content-between">
                              <strong className="price fw-500 color-dark">
                                ${Number(item.price).toLocaleString()}
                                {item.price_text && (
                                  <>
                                    /<sub>m</sub>
                                  </>
                                )}
                              </strong>
                              <Link
                                href={`/listing_details?id=${item.id || item._id}`}
                                className="btn-four rounded-circle"
                              >
                                <i className="bi bi-arrow-up-right"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center pt-50 pb-50">
                      <h4>No properties found matching your filters.</h4>
                      <button
                        onClick={handleResetFilter}
                        className="btn-one mt-20"
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </div>
              )}

              <ReactPaginate
                breakLabel="..."
                nextLabel={<Image src={icon} alt="" className="ms-2" />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={pageCount}
                pageCount={pageCount}
                previousLabel={<Image src={icon} alt="" className="ms-2" />}
                renderOnZeroPageCount={null}
                className="pagination-one d-flex align-items-center justify-content-center justify-content-sm-start style-none pt-30"
              />
            </div>
          </div>

          <div className="col-lg-4 order-lg-first">
            <div className="advance-search-panel dot-bg md-mt-80">
              <div className="main-bg rounded-0">
                <DropdownOne
                  handleSearchChange={handleSearchChange}
                  handleBedroomChange={handleBedroomChange}
                  handleBathroomChange={handleBathroomChange}
                  handlePriceChange={handlePriceChange}
                  maxPrice={maxPrice}
                  priceValue={priceValue}
                  handleResetFilter={handleResetFilter}
                  selectedAmenities={selectedAmenities}
                  handleAmenityChange={handleAmenityChange}
                  handleLocationChange={handleLocationChange}
                  handleStatusChange={handleStatusChange}
                  handlePropertyTypeChange={handlePropertyTypeChange}
                  locations={locations}
                  statuses={statuses}
                  propertyTypes={propertyTypes}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingNineArea;
