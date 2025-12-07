import Image from "next/image";
import React from "react";

const PokeCard = ({ image, title, loading = false }) => {
  if (loading) {
    return (
      <div className="w-64 h-80 rounded-2xl bg-gray-200 overflow-hidden animate-pulse">
        <div className="h-44 w-full bg-gray-300" />
        <div className="p-4 space-y-3">
          <div className="h-4 w-3/4 bg-gray-300 rounded" />
          <div className="h-3 w-1/2 bg-gray-300 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        w-64 h-80 rounded-2xl bg-white overflow-hidden shadow-md cursor-pointer
        transform transition duration-300 hover:-translate-y-2 hover:shadow-xl
      "
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          fill={true}
          src={image}
          alt={title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Optional description goes here.
        </p>
      </div>
    </div>
  );
};

export default PokeCard;
