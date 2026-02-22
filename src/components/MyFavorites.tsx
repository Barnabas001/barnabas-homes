import React from "react";
import PropertyCard from "./PropertyCard";

interface Property {
  id: string;
  title: string;
  city: string;
  price: number;
  bedrooms: number;
  propertyType: string;
  address: string;
  images: string[];
  phoneNumber: string;
  whatsappNumber: string;
  description?: string;
  bathrooms?: number;
  isFeatured?: boolean;
}

interface MyFavoritesProps {
  properties: Property[];
  favorites: string[];
  onViewDetails: (property: Property) => void;
  onToggleFavorite: (propertyId: string) => void;
  onClose: () => void;
}

function MyFavorites({
  properties,
  favorites,
  onViewDetails,
  onToggleFavorite,
  onClose,
}: MyFavoritesProps) {
  const favoritedProperties = properties.filter((p) =>
    favorites.includes(p.id),
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">My Favorites</h2>
              <p className="text-gray-600 mt-1">
                {favoritedProperties.length}{" "}
                {favoritedProperties.length === 1 ? "property" : "properties"}{" "}
                saved
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {favoritedProperties.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">💔</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No favorites yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start saving properties you like by clicking the heart icon
                </p>
                <button
                  onClick={onClose}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Browse Properties
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoritedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={onViewDetails}
                    isFavorited={true}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyFavorites;
