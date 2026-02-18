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
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
            City
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
            value={searchCity}
            onChange={(e) => onSearchCityChange(e.target.value)}
          >
            <option value="">All Cities</option>
            <option value="Lagos">Lagos</option>
            <option value="Ibadan">Ibadan</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
            Max Price
          </label>
          <input
            type="number"
            placeholder="₦ Max Price"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
            Min Bedrooms
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
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
          <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
