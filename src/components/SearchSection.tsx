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
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-32">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80')",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Find Your Perfect Home
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Quality rental properties in Lagos & Ibadan
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-4xl mx-auto">
          <SearchBar
            searchCity={searchCity}
            maxPrice={maxPrice}
            minBedrooms={minBedrooms}
            onSearchCityChange={onSearchCityChange}
            onMaxPriceChange={onMaxPriceChange}
            onMinBedroomsChange={onMinBedroomsChange}
          />
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl mb-2">✓</div>
            <p className="font-semibold">Verified Listings</p>
            <p className="text-sm text-gray-300">Direct from owners</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">💬</div>
            <p className="font-semibold">Instant Contact</p>
            <p className="text-sm text-gray-300">WhatsApp & Call</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🏠</div>
            <p className="font-semibold">No Hidden Fees</p>
            <p className="text-sm text-gray-300">100% Free to browse</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchSection;
