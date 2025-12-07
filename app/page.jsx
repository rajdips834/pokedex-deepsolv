"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import PokeList from "../components/PokeList";
import { fetchData, fetchPokemonWithTypes, fetchTypes } from "../api";
import PokeDetails from "../components/PokeDetails";
import SearchBar from "../components/SearchBar";
import PokemonFilters from "../components/PokemonFilters";

export default function Home() {
  const [activeType, setActiveType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [favoritesMap, setFavoritesMap] = useState(new Map());
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const observer = useRef(null);

  // Unified data fetcher
  const fetchPokemons = useCallback(
    async (limit, offsetVal, typeFilter = null) => {
      setLoading(true);
      const data = await (typeFilter
        ? fetchPokemonWithTypes(limit, offsetVal, typeFilter)
        : fetchData(limit, offsetVal));
      setPokemons(data);
      setOffset(limit);
      setLoading(false);
    },
    []
  );

  // Load initial data + types
  useEffect(() => {
    fetchPokemons(20, 0);
    fetchTypes().then(setPokemonTypes);
  }, [fetchPokemons]);

  // Refetch on type change (resets pagination)
  useEffect(() => {
    if (activeType) {
      fetchPokemons(20, 0, activeType);
    } else {
      fetchPokemons(20, 0);
    }
  }, [activeType, fetchPokemons]);

  // Load more for infinite scroll
  const loadMore = useCallback(async () => {
    if (loadingMore || activeType) return; // Disable infinite scroll when type filtered
    setLoadingMore(true);
    const newData = await fetchData(20, offset);
    setPokemons((prev) => [...prev, ...newData]);
    setOffset((prev) => prev + 20);
    setLoadingMore(false);
  }, [offset, loadingMore, activeType]);

  // Search filter (inline)
  const filteredPokemons = searchValue.trim()
    ? pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchValue.toLowerCase().trim())
      )
    : pokemons;

  // Reset offset on search
  useEffect(() => {
    setOffset(activeType ? 20 : 20);
  }, [searchValue, activeType]);

  // Intersection Observer
  useEffect(() => {
    const currentObserver = observer.current;
    if (!currentObserver || filteredPokemons.length === 0) return;

    const callback = (entries) => {
      const [target] = entries;
      if (target.isIntersecting && !loadingMore && !activeType) {
        loadMore();
      }
    };

    const options = { root: null, rootMargin: "20px", threshold: 0.1 };
    const newObserver = new IntersectionObserver(callback, options);
    newObserver.observe(currentObserver);

    return () => newObserver.disconnect();
  }, [filteredPokemons, loadMore, loadingMore, activeType]);

  // Favorites persistence
  useEffect(() => {
    const saved = localStorage.getItem("pokemonFavorites");
    if (saved) {
      const ids = JSON.parse(saved);
      setFavoritesMap(new Map(ids.map((id) => [id, true])));
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

  const openPokemonDetails = useCallback((pokemonId) => {
    setSelectedPokemonId(pokemonId);
  }, []);

  const closePokemonDetails = useCallback(() => {
    setSelectedPokemonId(null);
  }, []);

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

          {isSearching && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl text-sm text-blue-800">
              Found {searchResultsCount} of {totalPokemonsCount} Pokémon
              {searchResultsCount === 0 && ` for "${searchValue}"`}
            </div>
          )}

          <PokemonFilters data={pokemonTypes} onTypeSelect={setActiveType} />

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
