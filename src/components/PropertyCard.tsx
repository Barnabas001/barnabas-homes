import React from "react";

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
}

function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  function formatPrice(price: number) {
    return `₦${price.toLocaleString()}/year`;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group">
      {/* Property Image */}
      <div className="relative h-56 bg-gray-200 overflow-hidden">
        <img
          src={property.images?.[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {property.isFeatured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            ⭐ Featured
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700 shadow-md">
          {property.propertyType}
        </div>
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

export default PropertyCard;
