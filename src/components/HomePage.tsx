import React, { useState, useEffect } from "react";
import Header from "./Header";
import SearchSection from "./SearchSection";
import PropertyGrid from "./PropertyGrid";
import PropertyDetail from "./PropertyDetail";
import PostPropertyForm from "./PostPropertyForm";
import Footer from "./Footer";

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

function HomePage() {
  // State for search filters
  const [searchCity, setSearchCity] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");

  // State for modals
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [showPostForm, setShowPostForm] = useState(false);

  // State for properties (with localStorage)
  const [properties, setProperties] = useState<Property[]>([]);

  // Load properties from localStorage on mount
  useEffect(() => {
    const savedProperties = localStorage.getItem("barnabasHomes_properties");
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    } else {
      // Initialize with sample data if nothing in storage
      const sampleProperties: Property[] = [
        {
          id: "1",
          title: "2 Bedroom Apartment in Bodija",
          city: "Ibadan",
          price: 250000,
          bedrooms: 2,
          bathrooms: 2,
          propertyType: "Apartment",
          address: "Bodija Estate, Ibadan, Oyo State",
          images: ["https://via.placeholder.com/400x300?text=Property+1"],
          phoneNumber: "08012345678",
          whatsappNumber: "2348012345678",
          description:
            "Beautiful 2 bedroom apartment in a serene environment. Features include constant water supply, 24/7 security, and easy access to major roads.",
        },
        {
          id: "2",
          title: "3 Bedroom House in Lekki",
          city: "Lagos",
          price: 500000,
          bedrooms: 3,
          bathrooms: 3,
          propertyType: "House",
          address: "Lekki Phase 1, Lagos State",
          images: ["https://via.placeholder.com/400x300?text=Property+2"],
          phoneNumber: "08087654321",
          whatsappNumber: "2348087654321",
          description:
            "Spacious 3 bedroom detached house with modern amenities. Includes a garden, parking space, and proximity to shopping centers.",
        },
        {
          id: "3",
          title: "Studio Apartment in Mokola",
          city: "Ibadan",
          price: 150000,
          bedrooms: 1,
          bathrooms: 1,
          propertyType: "Apartment",
          address: "Mokola, Ibadan, Oyo State",
          images: ["https://via.placeholder.com/400x300?text=Property+3"],
          phoneNumber: "08098765432",
          whatsappNumber: "2348098765432",
          description:
            "Cozy studio apartment perfect for students or young professionals. Close to University of Ibadan and major transport routes.",
        },
      ];
      setProperties(sampleProperties);
      localStorage.setItem(
        "barnabasHomes_properties",
        JSON.stringify(sampleProperties),
      );
    }
  }, []);

  // Filter properties based on search criteria
  const filteredProperties = properties.filter((property) => {
    const cityMatch = !searchCity || property.city === searchCity;
    const priceMatch = !maxPrice || property.price <= parseInt(maxPrice);
    const bedroomsMatch =
      !minBedrooms || property.bedrooms >= parseInt(minBedrooms);

    return cityMatch && priceMatch && bedroomsMatch;
  });

  // Handle new property submission
  function handlePropertySubmit(newProperty: Property) {
    const updatedProperties = [...properties, newProperty];
    setProperties(updatedProperties);
    localStorage.setItem(
      "barnabasHomes_properties",
      JSON.stringify(updatedProperties),
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onPostPropertyClick={() => setShowPostForm(true)}
        onMyPropertiesClick={() => {}}
      />
      <SearchSection
        searchCity={searchCity}
        maxPrice={maxPrice}
        minBedrooms={minBedrooms}
        onSearchCityChange={setSearchCity}
        onMaxPriceChange={setMaxPrice}
        onMinBedroomsChange={setMinBedrooms}
      />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Available Properties{" "}
          {filteredProperties.length < properties.length &&
            `(${filteredProperties.length} found)`}
        </h3>

        <PropertyGrid
          properties={filteredProperties}
          onViewDetails={setSelectedProperty}
        />
      </section>

      <Footer />

      {/* Modals */}
      {selectedProperty && (
        <PropertyDetail
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {showPostForm && (
        <PostPropertyForm
          onClose={() => setShowPostForm(false)}
          onSubmit={handlePropertySubmit}
        />
      )}
    </div>
  );
}

export default HomePage;
