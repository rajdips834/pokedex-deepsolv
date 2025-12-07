import Image from "next/image";
import React from "react";

const PokeCard = ({
  image,
  title,
  id,
  loading = false,
  isFavourite = false,
  onToggleFavourite,
}) => {
  if (loading) {
    return (
      <div className=" rounded-2xl bg-gray-200 overflow-hidden animate-pulse">
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
        rounded-2xl bg-white overflow-hidden shadow-md cursor-pointer
        transform transition duration-300 hover:-translate-y-2 hover:shadow-xl
        relative
      "
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavourite();
        }}
        className="
          absolute top-3 right-3 z-20 w-10 h-10 rounded-full flex items-center justify-center
          bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200
          shadow-lg hover:shadow-xl border-2
          group
          data-[state=favorited]:bg-red-500 data-[state=favorited]:border-red-500
          data-[state=favorited]:text-white data-[state=favorited]:shadow-red-500/25
          data-[state=unfavorited]:border-gray-300 data-[state=unfavorited]:text-gray-600
          data-[state=unfavorited]:hover:border-red-400 data-[state=unfavorited]:hover:text-red-500
          hover:scale-110
        "
        data-state={isFavourite ? "favorited" : "unfavorited"}
        aria-label={`${isFavourite ? "Remove" : "Add"} ${title} to favorites`}
      >
        <svg
          className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="relative h-44 overflow-hidden">
        <Image
          fill={true}
          src={image || "/placeholder.png"}
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
      </div>
    </div>
  );
};

export default PokeCard;
