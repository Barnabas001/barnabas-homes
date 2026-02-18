import React, { useState, useEffect } from "react";
import Header from "./Header";
import SearchSection from "./SearchSection";
import StatsSection from "./StatsSection";
import PropertyGrid from "./PropertyGrid";
import PropertyDetail from "./PropertyDetail";
import PostPropertyForm from "./PostPropertyForm";
import MyProperties from "./MyProperties";
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
  isFeatured?: boolean;
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
  const [showMyProperties, setShowMyProperties] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

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
          images: [
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23e8f5e9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='48' fill='%232e7d32'%3E2 Bedroom Apartment%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='32' fill='%23558b2f'%3EBodija, Ibadan%3C/text%3E%3C/svg%3E",
          ],
          phoneNumber: "08012345678",
          whatsappNumber: "2348012345678",
          description:
            "Beautiful 2 bedroom apartment in a serene environment. Features include constant water supply, 24/7 security, and easy access to major roads.",
          isFeatured: false,
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
          images: [
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23e3f2fd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='48' fill='%231565c0'%3E3 Bedroom House%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='32' fill='%231976d2'%3ELekki, Lagos%3C/text%3E%3C/svg%3E",
          ],
          phoneNumber: "08087654321",
          whatsappNumber: "2348087654321",
          description:
            "Spacious 3 bedroom detached house with modern amenities. Includes a garden, parking space, and proximity to shopping centers.",
          isFeatured: true,
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
          images: [
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23fff3e0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='48' fill='%23f57c00'%3EStudio Apartment%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='32' fill='%23fb8c00'%3EMokola, Ibadan%3C/text%3E%3C/svg%3E",
          ],
          phoneNumber: "08098765432",
          whatsappNumber: "2348098765432",
          description:
            "Cozy studio apartment perfect for students or young professionals. Close to University of Ibadan and major transport routes.",
          isFeatured: false,
        },
      ];
      setProperties(sampleProperties);
      localStorage.setItem(
        "barnabasHomes_properties",
        JSON.stringify(sampleProperties),
      );
    }
  }, []);

  // Save to localStorage whenever properties change
  function saveProperties(updatedProperties: Property[]) {
    setProperties(updatedProperties);
    localStorage.setItem(
      "barnabasHomes_properties",
      JSON.stringify(updatedProperties),
    );
  }

  // Filter properties based on search criteria
  // Featured properties should appear first
  const filteredProperties = properties
    .filter((property) => {
      const cityMatch = !searchCity || property.city === searchCity;
      const priceMatch = !maxPrice || property.price <= parseInt(maxPrice);
      const bedroomsMatch =
        !minBedrooms || property.bedrooms >= parseInt(minBedrooms);

      return cityMatch && priceMatch && bedroomsMatch;
    })
    .sort((a, b) => {
      // Featured properties first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });

  // Handle new property submission
  function handlePropertySubmit(propertyData: Property) {
    if (editingProperty) {
      // Update existing property
      const updatedProperties = properties.map((p) =>
        p.id === propertyData.id ? propertyData : p,
      );
      saveProperties(updatedProperties);
    } else {
      // Add new property
      const updatedProperties = [...properties, propertyData];
      saveProperties(updatedProperties);
    }
    setEditingProperty(null);
  }

  // Handle property deletion
  function handleDeleteProperty(propertyId: string) {
    const updatedProperties = properties.filter((p) => p.id !== propertyId);
    saveProperties(updatedProperties);
  }

  // Handle toggle featured status
  function handleToggleFeatured(propertyId: string) {
    const updatedProperties = properties.map((p) =>
      p.id === propertyId ? { ...p, isFeatured: !p.isFeatured } : p,
    );
    saveProperties(updatedProperties);
  }

  // Handle edit property
  function handleEditProperty(property: Property) {
    setEditingProperty(property);
    setShowMyProperties(false);
    setShowPostForm(true);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onPostPropertyClick={() => {
          setEditingProperty(null);
          setShowPostForm(true);
        }}
        onMyPropertiesClick={() => setShowMyProperties(true)}
      />

      <SearchSection
        searchCity={searchCity}
        maxPrice={maxPrice}
        minBedrooms={minBedrooms}
        onSearchCityChange={setSearchCity}
        onMaxPriceChange={setMaxPrice}
        onMinBedroomsChange={setMinBedrooms}
      />

      <StatsSection totalProperties={properties.length} />

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
          onClose={() => {
            setShowPostForm(false);
            setEditingProperty(null);
          }}
          onSubmit={handlePropertySubmit}
          editingProperty={editingProperty}
        />
      )}

      {showMyProperties && (
        <MyProperties
          properties={properties}
          onEdit={handleEditProperty}
          onDelete={handleDeleteProperty}
          onToggleFeatured={handleToggleFeatured}
          onClose={() => setShowMyProperties(false)}
        />
      )}
    </div>
  );
}

export default HomePage;
