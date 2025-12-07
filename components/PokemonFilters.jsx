import React from "react";

const typeColors = {
  normal: "bg-gray-100 text-gray-800 border-gray-200",
  fighting: "bg-orange-100 text-orange-800 border-orange-200",
  flying: "bg-blue-100 text-blue-800 border-blue-200",
  poison: "bg-purple-100 text-purple-800 border-purple-200",
  ground: "bg-yellow-100 text-yellow-800 border-yellow-200",
  rock: "bg-stone-100 text-stone-800 border-stone-200",
  bug: "bg-green-100 text-green-800 border-green-200",
  ghost: "bg-indigo-100 text-indigo-800 border-indigo-200",
  steel: "bg-slate-100 text-slate-800 border-slate-200",
  fire: "bg-red-100 text-red-800 border-red-200",
  water: "bg-blue-200 text-blue-900 border-blue-300",
  grass: "bg-emerald-100 text-emerald-800 border-emerald-200",
  electric: "bg-yellow-200 text-yellow-900 border-yellow-300",
  psychic: "bg-pink-100 text-pink-800 border-pink-200",
  ice: "bg-cyan-100 text-cyan-800 border-cyan-200",
  dragon: "bg-purple-200 text-purple-900 border-purple-300",
  dark: "bg-gray-200 text-gray-900 border-gray-300",
  fairy: "bg-pink-200 text-pink-900 border-pink-300",
  stellar:
    "bg-gradient-to-r from-yellow-400 to-purple-400 text-white border-transparent shadow-lg",
  unknown: "bg-gray-50 text-gray-500 border-gray-100",
};

const PokemonFilters = ({ data, selectedType, onTypeSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 max-w-4xl mx-auto">
      {data.map((type) => {
        const isSelected = selectedType === type.name;
        const colorClass =
          typeColors[type.name] || "bg-gray-100 text-gray-800 border-gray-200";

        return (
          <button
            key={type.name}
            onClick={() => onTypeSelect(type.name)}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all duration-200
              hover:shadow-md hover:scale-105 active:scale-95
              ${
                isSelected
                  ? "ring-4 ring-blue-500/30 shadow-lg scale-105 font-semibold"
                  : "hover:shadow-lg"
              }
              ${colorClass}
              ${
                isSelected
                  ? "ring-2 ring-blue-500 border-blue-500 shadow-blue-500/25"
                  : "border-current/50"
              }
            `}
          >
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </button>
        );
      })}{" "}
      <button
        key={-1}
        onClick={() => onTypeSelect(null)}
        className={`
              px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all duration-200
              hover:shadow-md hover:scale-105 active:scale-95
            `}
      >
        Reset
      </button>
    </div>
  );
};

export default PokemonFilters;
