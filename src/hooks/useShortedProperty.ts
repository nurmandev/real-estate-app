"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useSearchParams } from "next/navigation";

interface DataType {
  itemsPerPage: number;
  page: string;
}

const UseShortedProperty = ({ itemsPerPage, page }: DataType) => {
  const searchParams = useSearchParams();
  const [all_property, setAllProperty] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch from database
  useEffect(() => {
    const fetchDbProperties = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/api/public/properties");
        if (data && Array.isArray(data.properties)) {
          const dbProps = data.properties.map((p: any) => ({
            ...p,
            page: page,
          }));
          setAllProperty(dbProps);
        }
      } catch (error) {
        console.error("Error fetching db properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDbProperties();
  }, [page]);

  const [itemOffset, setItemOffset] = useState(0);
  const [sortOption, setSortOption] = useState<string>("");
  const [status, setStatus] = useState<string | null>(
    searchParams.get("status"),
  );
  const [location, setLocation] = useState<string | null>(
    searchParams.get("location"),
  );
  const [propertyType, setPropertyType] = useState<string | null>(
    searchParams.get("type"),
  );
  const [selectedBedrooms, setSelectedBedrooms] = useState<string | null>(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState<string | null>(
    null,
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("search") || "",
  );

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    setItemOffset(0);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement> | any) => {
    const val = event.target ? event.target.value : event;
    // Map "Buy"/"Sell" -> "active", "Rent" -> "rented"
    let mappedStatus = val;
    if (val.toLowerCase() === "buy" || val.toLowerCase() === "sell")
      mappedStatus = "active";
    if (val.toLowerCase() === "rent") mappedStatus = "rented";

    setStatus(mappedStatus);
    setItemOffset(0);
  };

  const handlePropertyTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(event.target.value);
    setItemOffset(0);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value);
    setItemOffset(0);
  };

  const handleBedroomChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBedrooms(event.target.value);
    setItemOffset(0);
  };

  const handleBathroomChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBathrooms(event.target.value);
    setItemOffset(0);
  };

  const handleAmenityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const amenity = event.target.value;
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setItemOffset(0);
  };

  useEffect(() => {
    setItemOffset(0);
  }, [selectedAmenities]);

  const maxPrice =
    all_property.reduce(
      (max: number, item: any) => (item.price > max ? item.price : max),
      0,
    ) || 1000000;
  const [priceValue, setPriceValue] = useState([0, maxPrice]);

  useEffect(() => {
    setPriceValue([0, maxPrice]);
  }, [maxPrice]);

  const getSortedProperties = () => {
    let filtered = all_property.filter(
      (j: any) =>
        j.page === page && j.price >= priceValue[0] && j.price <= priceValue[1],
    );

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title &&
          item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (status) {
      filtered = filtered.filter(
        (item) =>
          item.status && item.status.toLowerCase() === status.toLowerCase(),
      );
    }

    if (propertyType) {
      filtered = filtered.filter(
        (item) =>
          item.type && item.type.toLowerCase() === propertyType.toLowerCase(),
      );
    }

    if (location) {
      filtered = filtered.filter(
        (item) =>
          item.location &&
          item.location.toLowerCase().includes(location.toLowerCase()),
      );
    }

    if (selectedBedrooms) {
      filtered = filtered.filter(
        (item) => item.property_info?.bed == selectedBedrooms,
      );
    }

    if (selectedBathrooms) {
      filtered = filtered.filter(
        (item) => item.property_info?.bath == selectedBathrooms,
      );
    }

    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((item) =>
        selectedAmenities.every((a) => (item.amenities || []).includes(a)),
      );
    }

    switch (sortOption) {
      case "price_low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price_high":
        return filtered.sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  };

  const sortedProperties = getSortedProperties();
  const currentItems = sortedProperties.slice(
    itemOffset,
    itemOffset + itemsPerPage,
  );
  const pageCount = Math.ceil(sortedProperties.length / itemsPerPage);

  const handlePageClick = (event: any) =>
    setItemOffset(event.selected * itemsPerPage);
  const handlePriceChange = (val: number[]) => setPriceValue(val);

  const handlePriceDropChange = (selectedValue: string) => {
    const ranges: any = {
      "1": [10000, 200000],
      "2": [20000, 300000],
      "3": [30000, 400000],
    };
    setPriceValue(ranges[selectedValue] || [0, maxPrice]);
  };

  const resetFilters = () => {
    setSortOption("");
    setItemOffset(0);
    setStatus(null);
    setLocation(null);
    setPropertyType(null);
    setSelectedBedrooms(null);
    setSelectedBathrooms(null);
    setSelectedAmenities([]);
    setSearchQuery("");
    setPriceValue([0, maxPrice]);
  };

  const locations = Array.from(
    new Set([
      ...all_property.map((p) => p.city).filter(Boolean),
      ...all_property.map((p) => p.location).filter(Boolean),
    ]),
  );
  const propertyTypes = Array.from(
    new Set(all_property.map((p) => p.type).filter(Boolean)),
  );
  const statuses = Array.from(
    new Set(all_property.map((p) => p.status).filter(Boolean)),
  );

  return {
    handlePriceDropChange,
    itemOffset,
    sortedProperties,
    currentItems,
    pageCount,
    handlePageClick,
    handleSearchChange,
    handleBedroomChange,
    handleLocationChange,
    handleTypeChange,
    handleStatusChange,
    handlePropertyTypeChange,
    handleBathroomChange,
    handlePriceChange,
    maxPrice,
    priceValue,
    resetFilters,
    selectedAmenities,
    handleAmenityChange,
    loading,
    locations,
    propertyTypes,
    statuses,
  };
};

export default UseShortedProperty;
