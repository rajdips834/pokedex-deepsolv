"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import PokeList from "../components/PokeList";
import { fetchData } from "../data";
import PokeDetails from "../components/PokeDetails";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [favoritesMap, setFavoritesMap] = useState(new Map());
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const observer = useRef(null);
  const isSearchActive = useRef(false);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pokemonFavorites");
    if (saved) {
      const ids = JSON.parse(saved);
      setFavoritesMap(new Map(ids.map((id) => [id, true])));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    const ids = Array.from(favoritesMap.keys());
    localStorage.setItem("pokemonFavorites", JSON.stringify(ids));
  }, [favoritesMap]);

  // Toggle favorite
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

  // Modal handlers
  const openPokemonDetails = useCallback((pokemonId) => {
    setSelectedPokemonId(pokemonId);
  }, []);

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

  // Track search state
  useEffect(() => {
    isSearchActive.current = searchValue.trim().length > 0;
  }, [searchValue]);

  // Infinite scroll - ALWAYS loads in background
  const loadMore = useCallback(async () => {
    if (loadingMore) return;

    setLoadingMore(true);
    const newData = await fetchData(20, offset);

    // Only append if search is NOT active OR if data matches search
    setPokemons((prev) => {
      // Skip duplicates
      const existingIds = new Set(prev.map((p) => p.id));
      const newUniqueData = newData.filter((p) => !existingIds.has(p.id));
      return [...prev, ...newUniqueData];
    });

    setOffset((prev) => prev + 20);
    setLoadingMore(false);
  }, [offset, loadingMore]);

  // Filter pokemons based on search
  const filteredPokemons = !searchValue.trim()
    ? pokemons
    : pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchValue.toLowerCase().trim())
      );

  // Intersection Observer - works on FULL list (background loading)
  useEffect(() => {
    const currentObserver = observer.current;
    if (!currentObserver || pokemons.length === 0) return;

    const callback = (entries) => {
      const [target] = entries;
      if (target.isIntersecting && !loadingMore) {
        loadMore(); // Always loads regardless of search
      }
    };

    const options = { root: null, rootMargin: "20px", threshold: 0.1 };
    const newObserver = new IntersectionObserver(callback, options);
    newObserver.observe(currentObserver);

    return () => newObserver.disconnect();
  }, [pokemons.length, loadMore, loadingMore]); // Depend on total length

  // ESC key handler
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

  // Search results count
  const searchResultsCount = filteredPokemons.length;
  const totalPokemonsCount = pokemons.length;
  const isSearching = searchValue.trim();

  return (
    <>
      <section className="w-full px-4 py-10 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-6 gap-4 lg:gap-0">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900">
              Pokedex
            </h2>
          </div>

          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search Pokémon by name..."
          />

          {/* Search results info */}
          {isSearching && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl text-sm text-blue-800 flex items-center gap-2">
              <span>
                Found {searchResultsCount} of {totalPokemonsCount} Pokémon
                {searchResultsCount === 0 && ` for "${searchValue}"`}
              </span>
              {totalPokemonsCount > searchResultsCount && (
                <span className="text-xs bg-blue-200 px-2 py-1 rounded-full">
                  Loading more...
                </span>
              )}
            </div>
          )}

          <PokeList
            pokemons={filteredPokemons}
            loading={loading}
            loadingMore={loadingMore}
            observerRef={observer}
            onPokemonClick={openPokemonDetails}
            favoritesMap={favoritesMap}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </section>

      {selectedPokemonId && (
        <PokeDetails
          pokemonId={selectedPokemonId}
          isOpen={!!selectedPokemonId}
          onClose={closePokemonDetails}
        />
      )}
    </>
  );
}
