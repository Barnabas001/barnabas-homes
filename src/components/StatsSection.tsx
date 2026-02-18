import React from "react";

interface StatsSectionProps {
  totalProperties: number;
}

export default function StatsSection({ totalProperties }: StatsSectionProps) {
  return (
    <section className="bg-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">
              {totalProperties}+
            </div>
            <p className="text-gray-700 font-medium">Active Listings</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">2</div>
            <p className="text-gray-700 font-medium">Cities Covered</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
            <p className="text-gray-700 font-medium">Verified Properties</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">0₦</div>
            <p className="text-gray-700 font-medium">Service Fees</p>
          </div>
        </div>
      </div>
    </section>
  );
}
