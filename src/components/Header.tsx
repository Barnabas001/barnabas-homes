import React from "react";

interface HeaderProps {
  onPostPropertyClick: () => void;
  onMyPropertiesClick: () => void;
  onMyFavoritesClick: () => void;
  favoritesCount: number;
}

export default function Header({
  onPostPropertyClick,
  onMyPropertiesClick,
  onMyFavoritesClick,
  favoritesCount,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="w-full px-3 py-3 md:max-w-7xl md:mx-auto md:px-4 md:py-4">
        <div className="flex justify-between items-center gap-2">
          {/* Logo - Flexible width */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <div className="text-xl md:text-3xl">🏠</div>
            <h1 className="text-base md:text-3xl font-bold text-gray-900 whitespace-nowrap">
              Barnabas <span className="text-green-600">Homes</span>
            </h1>
          </div>

          <div className="hidden lg:flex gap-3">
            <button
              onClick={onMyFavoritesClick}
              className="relative px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition"
            >
              ❤️ Favorites
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={onMyPropertiesClick}
              className="px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition"
            >
              My Properties
            </button>

            <button
              onClick={onPostPropertyClick}
              className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition font-semibold shadow-md whitespace-nowrap"
            >
              + Post Property
            </button>
          </div>

          <div className="flex lg:hidden gap-1.5 items-center">
            {/* Favorites Button */}
            <button
              onClick={onMyFavoritesClick}
              className="relative flex items-center gap-1 px-2.5 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition text-xs font-medium"
              aria-label="View favorites"
            >
              <span className="text-lg">❤️</span>
              <span className="hidden sm:inline">Favs</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={onMyPropertiesClick}
              className="flex items-center gap-1 px-2.5 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition text-xs font-medium"
              aria-label="My properties"
            >
              <span className="text-lg">📋</span>
              <span className="hidden sm:inline">Mine</span>
            </button>

            {/* Post Property Button */}
            <button
              onClick={onPostPropertyClick}
              className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition font-semibold text-xs whitespace-nowrap shadow-md"
            >
              + Post
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
