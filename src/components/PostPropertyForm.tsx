import React, { useState, useEffect } from "react";

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

interface PostPropertyFormProps {
  onClose: () => void;
  onSubmit: (property: Property) => void;
  editingProperty?: Property | null;
}

function PostPropertyForm({
  onClose,
  onSubmit,
  editingProperty = null,
}: PostPropertyFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    address: "",
    description: "",
    phoneNumber: "",
    whatsappNumber: "",
  });

  // Populate form if editing
  useEffect(() => {
    if (editingProperty) {
      setFormData({
        title: editingProperty.title,
        city: editingProperty.city,
        price: editingProperty.price.toString(),
        bedrooms: editingProperty.bedrooms.toString(),
        bathrooms: editingProperty.bathrooms?.toString() || "",
        propertyType: editingProperty.propertyType,
        address: editingProperty.address,
        description: editingProperty.description || "",
        phoneNumber: editingProperty.phoneNumber,
        whatsappNumber: editingProperty.whatsappNumber,
      });
      setImageURLs(
        editingProperty.images.length > 0 ? editingProperty.images : [""],
      );
    }
  }, [editingProperty]);

  const [imageURLs, setImageURLs] = useState<string[]>([""]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  function handleImageURLChange(index: number, value: string) {
    const newURLs = [...imageURLs];
    newURLs[index] = value;
    setImageURLs(newURLs);
  }

  function addImageURL() {
    if (imageURLs.length < 6) {
      setImageURLs([...imageURLs, ""]);
    }
  }

  function removeImageURL(index: number) {
    if (imageURLs.length > 1) {
      setImageURLs(imageURLs.filter((_, i) => i !== index));
    }
  }

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.price || parseInt(formData.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.bedrooms)
      newErrors.bedrooms = "Number of bedrooms is required";
    if (!formData.propertyType)
      newErrors.propertyType = "Property type is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.whatsappNumber.trim())
      newErrors.whatsappNumber = "WhatsApp number is required";

    const validImages = imageURLs.filter((url) => url.trim() !== "");
    if (validImages.length === 0)
      newErrors.images = "At least one image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const validImages = imageURLs.filter((url) => url.trim() !== "");

    const newProperty = {
      id: editingProperty ? editingProperty.id : Date.now().toString(),
      title: formData.title,
      city: formData.city,
      price: parseInt(formData.price),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
      propertyType: formData.propertyType,
      address: formData.address,
      description: formData.description,
      phoneNumber: formData.phoneNumber,
      whatsappNumber: formData.whatsappNumber,
      images: validImages,
      isFeatured: editingProperty?.isFeatured || false,
    };

    onSubmit(newProperty);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingProperty ? "Edit Property" : "Post a Property"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Property Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., 2 Bedroom Apartment in Bodija"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* City and Property Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select City</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Ibadan">Ibadan</option>
                </select>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Property Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                    errors.propertyType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                </select>
                {errors.propertyType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.propertyType}
                  </p>
                )}
              </div>
            </div>

            {/* Price and Bedrooms */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Price (₦/year) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="250000"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Bedrooms <span className="text-red-500">*</span>
                </label>
                <select
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                    errors.bedrooms ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
                {errors.bedrooms && (
                  <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Bathrooms
                </label>
                <select
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Full Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g., Bodija Estate, Ibadan, Oyo State"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the property, amenities, nearby facilities..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Image URLs */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Property Images (URLs) <span className="text-red-500">*</span>
              </label>
              {imageURLs.map((url, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) =>
                      handleImageURLChange(index, e.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  {imageURLs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageURL(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {imageURLs.length < 6 && (
                <button
                  type="button"
                  onClick={addImageURL}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  + Add Another Image (Max 6)
                </button>
              )}
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="08012345678"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  placeholder="2348012345678"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                    errors.whatsappNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.whatsappNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.whatsappNumber}
                  </p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  Format: 2348012345678
                </p>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                {editingProperty ? "Update Property" : "Post Property"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostPropertyForm;
