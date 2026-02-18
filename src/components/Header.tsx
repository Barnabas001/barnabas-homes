import React from "react";

interface HeaderProps {
  onPostPropertyClick: () => void;
  onMyPropertiesClick: () => void;
}

export default function Header({
  onPostPropertyClick,
  onMyPropertiesClick,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🏠</div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Barnabas <span className="text-green-600">Homes</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onMyPropertiesClick}
              className="hidden md:block px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition"
            >
              My Properties
            </button>
            <button
              onClick={onPostPropertyClick}
              className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition font-semibold shadow-md"
            >
              + Post Property
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
