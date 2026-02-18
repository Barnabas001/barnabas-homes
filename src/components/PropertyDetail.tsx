import React from "react";

interface PropertyDetailProps {
  property: {
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
  };
  onClose: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({
  property,
  onClose,
}) => {
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}/year`;
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${property.whatsappNumber}?text=Hi, I'm interested in ${property.title}`,
      "_blank",
    );
  };

  const handleCall = () => {
    window.location.href = `tel:${property.phoneNumber}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Image Gallery */}
          <div className="px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.title} - ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Property Info */}
          <div className="px-6 pb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {property.title}
            </h2>
            <p className="text-4xl font-bold text-green-600 mb-4">
              {formatPrice(property.price)}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Location</p>
                <p className="font-semibold">{property.city}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Bedrooms</p>
                <p className="font-semibold">{property.bedrooms}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Type</p>
                <p className="font-semibold">{property.propertyType}</p>
              </div>
              {property.bathrooms && (
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Bathrooms</p>
                  <p className="font-semibold">{property.bathrooms}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-700">📍 {property.address}</p>
            </div>

            {property.description && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{property.description}</p>
              </div>
            )}

            {/* Contact Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <button
                onClick={handleWhatsApp}
                className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition font-semibold flex items-center justify-center gap-2"
              >
                <span>📱</span> Contact via WhatsApp
              </button>
              <button
                onClick={handleCall}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
              >
                <span>📞</span> Call Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
