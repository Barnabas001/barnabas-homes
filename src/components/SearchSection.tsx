import React from "react";
import SearchBar from "./SearchBar";

interface SearchSectionProps {
  searchCity: string;
  maxPrice: string;
  minBedrooms: string;
  onSearchCityChange: (city: string) => void;
  onMaxPriceChange: (price: string) => void;
  onMinBedroomsChange: (bedrooms: string) => void;
}

function SearchSection({
  searchCity,
  maxPrice,
  minBedrooms,
  onSearchCityChange,
  onMaxPriceChange,
  onMinBedroomsChange,
}: SearchSectionProps) {
  return (
    <section className="bg-green-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Find Your Next Home in Lagos & Ibadan
        </h2>
        <p className="text-xl mb-8">
          Discover quality rental properties across Southwest Nigeria
        </p>

        <SearchBar
          searchCity={searchCity}
          maxPrice={maxPrice}
          minBedrooms={minBedrooms}
          onSearchCityChange={onSearchCityChange}
          onMaxPriceChange={onMaxPriceChange}
          onMinBedroomsChange={onMinBedroomsChange}
        />
      </div>
    </section>
  );
}

export default SearchSection;
