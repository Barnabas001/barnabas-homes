import React from "react";
import PropertyCard from "./PropertyCard";
import ScrollReveal from "./ScrollReveal";

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

interface PropertyGridProps {
  properties: Property[];
  onViewDetails: (property: Property) => void;
  favorites?: string[];
  onToggleFavorite?: (propertyId: string) => void;
}

function PropertyGrid({
  properties,
  onViewDetails,
  favorites = [],
  onToggleFavorite,
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">
          No properties match your search criteria. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property, index) => (
        <ScrollReveal key={property.id} delay={index * 100}>
          <PropertyCard
            property={property}
            onViewDetails={onViewDetails}
            isFavorited={favorites.includes(property.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </ScrollReveal>
      ))}
    </div>
  );
}

export default PropertyGrid;
