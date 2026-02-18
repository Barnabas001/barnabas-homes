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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      {/* Property Image */}
      <div className="h-48 bg-gray-200">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Property Details */}
      <div className="p-4">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">
          {property.title}
        </h4>
        <p className="text-2xl font-bold text-green-600 mb-2">
          {formatPrice(property.price)}
        </p>
        <p className="text-gray-600 mb-1">📍 {property.address}</p>
        <p className="text-gray-600 mb-4">
          🛏️ {property.bedrooms} Bedroom{property.bedrooms > 1 ? "s" : ""}
        </p>

        <button
          onClick={() => onViewDetails(property)}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;
