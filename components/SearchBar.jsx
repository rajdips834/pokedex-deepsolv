import React from "react";

const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Search Pokémon...",
}) => {
  return (
    <div className="relative w-full mb-10">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <svg
          className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            w-full pl-12 pr-12 py-3.5 text-base bg-white/80 backdrop-blur-sm
            border-2 border-gray-200 rounded-2xl shadow-lg
            focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
            focus:outline-none transition-all duration-200
            placeholder-gray-500 hover:border-gray-300 hover:shadow-md
            text-gray-900
          "
        />

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange({ target: { value: "" } });
            }}
            className="
              absolute right-3 p-1 rounded-full hover:bg-gray-200/50
              hover:text-red-500 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
            "
            aria-label="Clear search"
          >
            <svg
              className="w-4.5 h-4.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
