import React from "react";
import { useState } from "react";

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

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
  isFavorited?: boolean;
  onToggleFavorite?: (propertyId: string) => void;
}

export default function PropertyCard({
  property,
  onViewDetails,
  isFavorited = false,
  onToggleFavorite,
}: PropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  function formatPrice(price: number) {
    return `₦${price.toLocaleString()}/year`;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group">
      {/* Property Image */}

      {/* // In the image div: */}
      <div className="relative h-56 bg-gray-200 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        )}
        <img
          src={property.images[0]}
          alt={property.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
        />
        {/* rest of code */}
      </div>

      {/* Property Details */}
      <div className="p-5">
        <p className="text-2xl font-bold text-green-600 mb-2">
          {formatPrice(property.price)}
        </p>
        <h4 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
          {property.title}
        </h4>

        <div className="space-y-2 mb-4">
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <span>📍</span> {property.city}
          </p>
          <div className="flex gap-4 text-gray-700 text-sm font-medium">
            <span className="flex items-center gap-1">
              🛏️ {property.bedrooms} Bed{property.bedrooms > 1 ? "s" : ""}
            </span>
            {property.bathrooms && (
              <span className="flex items-center gap-1">
                🚿 {property.bathrooms} Bath{property.bathrooms > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onViewDetails(property)}
          className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
