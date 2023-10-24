import React from "react";
import Link from "next/link";

const SearchAndAddBar = ({ searchTerm, onSearchChange, linkHref }) => (
  <div className="my-2 p-4 bg-white shadow-md">
    <div className="flex items-center space-x-4">
      {/* Search Input */}
      <div className="flex-1">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 6h13M8 12h13m-7 6h7"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Buscar por nombre, email, especialidad..."
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
      </div>

      {/* Search Button */}
      <div className="flex-1">
        <button className="w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
          Buscar
        </button>
      </div>

      {/* Add Button */}
      <div className="flex-1">
        <Link href={linkHref}>
          <href className="block w-full px-4 py-2 text-sm text-white text-center bg-green-600 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500">
            Nueva Cita
          </href>
        </Link>
      </div>
    </div>
  </div>
);

export default SearchAndAddBar;
