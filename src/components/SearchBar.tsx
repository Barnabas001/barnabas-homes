import React from "react";

interface SearchBarProps {
  searchCity: string;
  maxPrice: string;
  minBedrooms: string;
  onSearchCityChange: (city: string) => void;
  onMaxPriceChange: (price: string) => void;
  onMinBedroomsChange: (bedrooms: string) => void;
}

function SearchBar({
  searchCity,
  maxPrice,
  minBedrooms,
  onSearchCityChange,
  onMaxPriceChange,
  onMinBedroomsChange,
}: SearchBarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Location
          </label>
          <select
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-green-600 transition"
            value={searchCity}
            onChange={(e) => onSearchCityChange(e.target.value)}
          >
            <option value="">All Cities</option>
            <option value="Lagos">Lagos</option>
            <option value="Ibadan">Ibadan</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Max Price
          </label>
          <input
            type="number"
            placeholder="Any price"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-green-600 transition"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Bedrooms
          </label>
          <select
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-green-600 transition"
            value={minBedrooms}
            onChange={(e) => onMinBedroomsChange(e.target.value)}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div className="flex items-end">
          <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold text-lg shadow-lg">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
