"use client";
import PokeCard from "./PokeCard";

const PokeList = ({
  pokemons,
  loading,
  loadingMore,
  observerRef,
  onPokemonClick,
  favoritesMap,
  onToggleFavorite,
}) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {loading
        ? Array.from({ length: 12 }).map((_, index) => (
            <PokeCard key={index} loading />
          ))
        : pokemons?.map((pokemon, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => onPokemonClick(pokemon.id)}
            >
              <PokeCard
                title={pokemon.name}
                image={pokemon.image}
                id={pokemon.id}
                isFavourite={favoritesMap.has(pokemon.id)}
                onToggleFavourite={() => onToggleFavorite(pokemon.id)}
              />
            </div>
          ))}

      {loadingMore && (
        <div className="col-span-full flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      )}

      <div ref={observerRef} className="h-10 col-span-full" />
    </div>
  );
};

export default PokeList;
