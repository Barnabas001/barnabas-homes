import React from "react";

interface HeaderProps {
  onPostPropertyClick: () => void;
  onMyPropertiesClick: () => void;
}

function Header({ onPostPropertyClick, onMyPropertiesClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-600">Barnabas Homes</h1>
          <div className="flex gap-3">
            <button
              onClick={onMyPropertiesClick}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              My Properties
            </button>
            <button
              onClick={onPostPropertyClick}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Post a Property
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
