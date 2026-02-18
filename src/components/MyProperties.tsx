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

interface MyPropertiesProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (propertyId: string) => void;
  onToggleFeatured: (propertyId: string) => void;
  onClose: () => void;
}

export default function MyProperties({
  properties,
  onEdit,
  onDelete,
  onToggleFeatured,
  onClose,
}: MyPropertiesProps) {
  function formatPrice(price: number) {
    return `₦${price.toLocaleString()}/year`;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">My Properties</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Properties List */}
          <div className="p-6">
            {properties.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  You haven't posted any properties yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className="border rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex gap-4">
                      {/* Property Image */}
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-32 h-32 object-cover rounded-lg"
                      />

                      {/* Property Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                              {property.title}
                            </h3>
                            {property.isFeatured && (
                              <span className="inline-block bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full mt-1">
                                ⭐ Featured
                              </span>
                            )}
                          </div>
                          <p className="text-xl font-bold text-green-600">
                            {formatPrice(property.price)}
                          </p>
                        </div>

                        <p className="text-gray-600 mb-1">
                          📍 {property.address}
                        </p>
                        <p className="text-gray-600 mb-3">
                          🛏️ {property.bedrooms} Bedroom
                          {property.bedrooms > 1 ? "s" : ""} •
                          {property.bathrooms &&
                            ` 🚿 ${property.bathrooms} Bathroom${property.bathrooms > 1 ? "s" : ""}`}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => onToggleFeatured(property.id)}
                            className={`px-4 py-2 rounded-lg transition ${
                              property.isFeatured
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {property.isFeatured
                              ? "⭐ Featured"
                              : "☆ Mark Featured"}
                          </button>
                          <button
                            onClick={() => onEdit(property)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this property?",
                                )
                              ) {
                                onDelete(property.id);
                              }
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
