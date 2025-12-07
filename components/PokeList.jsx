"use client";
import PokeCard from "./PokeCard";
import PokeDetails from "./PokeDetails";
import { fetchData } from "../api";
import { useEffect, useState, useCallback, useRef } from "react";

const PokeList = () => {
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const observer = useRef(null);
  const [favoritesMap, setFavoritesMap] = useState(new Map());
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pokemonFavorites");
    if (saved) {
      const ids = JSON.parse(saved);
      const map = new Map(ids.map((id) => [id, true]));
      setFavoritesMap(map);
    }
  }, []);

  useEffect(() => {
    const ids = Array.from(favoritesMap.keys());
    localStorage.setItem("pokemonFavorites", JSON.stringify(ids));
  }, [favoritesMap]);

  const toggleFavorite = useCallback((pokemonId) => {
    setFavoritesMap((prev) => {
      const newMap = new Map(prev);
      if (newMap.has(pokemonId)) {
        newMap.delete(pokemonId);
      } else {
        newMap.set(pokemonId, true);
      }
      return newMap;
    });
  }, []);

  // Open Pokemon details modal
  const openPokemonDetails = useCallback((pokemonId) => {
    setSelectedPokemonId(pokemonId);
  }, []);

  // Close modal (backdrop click + ESC key)
  const closePokemonDetails = useCallback(() => {
    setSelectedPokemonId(null);
  }, []);

  // Initial load
  useEffect(() => {
    const handleFetchData = async () => {
      setLoading(true);
      const data = await fetchData(20, 0);
      setPokemons(data);
      setOffset(20);
      setLoading(false);
    };
    handleFetchData();
  }, []);

  // Infinite scroll
  const loadMore = useCallback(async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const newData = await fetchData(20, offset);
    setPokemons((prev) => [...prev, ...newData]);
    setOffset((prev) => prev + 20);
    setLoadingMore(false);
  }, [offset, loadingMore]);

  // Intersection Observer
  useEffect(() => {
    const currentObserver = observer.current;
    if (!currentObserver || pokemons.length === 0) return;

    const callback = (entries) => {
      const [target] = entries;
      if (target.isIntersecting && !loadingMore) {
        loadMore();
      }
    };

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    };

    const sentinel = currentObserver;
    const newObserver = new IntersectionObserver(callback, options);
    newObserver.observe(sentinel);

    return () => {
      if (currentObserver) {
        newObserver.unobserve(sentinel);
        newObserver.disconnect();
      }
    };
  }, [pokemons, loadMore, loadingMore]);

  // ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closePokemonDetails();
      }
    };
    if (selectedPokemonId) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [selectedPokemonId, closePokemonDetails]);

  return (
    <>
      <section className="w-full px-4 py-10 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Pokemon Gallery
            </h2>
            <div className="text-sm text-gray-500">
              {favoritesMap.size} favorite{favoritesMap.size !== 1 ? "s" : ""}
            </div>
          </div>

          <div
            className="
              grid gap-6
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
            "
          >
            {loading
              ? Array.from({ length: 12 }).map((_, index) => (
                  <PokeCard key={index} loading />
                ))
              : pokemons.map((pokemon) => (
                  <div
                    key={pokemon.id}
                    className="group"
                    onClick={() => openPokemonDetails(pokemon.id)}
                  >
                    <PokeCard
                      title={pokemon.name}
                      image={pokemon.image}
                      id={pokemon.id}
                      isFavourite={favoritesMap.has(pokemon.id)}
                      onToggleFavourite={() => toggleFavorite(pokemon.id)}
                    />
                  </div>
                ))}

            {loadingMore && (
              <div className="col-span-full flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}

            <div ref={observer} className="h-10" />
          </div>
        </div>
      </section>

      <PokeDetails
        pokemonId={selectedPokemonId}
        isOpen={!!selectedPokemonId}
        onClose={closePokemonDetails}
      />
    </>
  );
};

export default PokeList;
