// PokeList.jsx - Infinite Scroll
"use client";
import PokeCard from "./PokeCard";
import { fetchData } from "../api";
import { useEffect, useState, useCallback, useRef } from "react";

const PokeList = () => {
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const observer = useRef(null);

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

  const loadMore = useCallback(async () => {
    if (loadingMore) return;

    setLoadingMore(true);
    const newData = await fetchData(20, offset);
    setPokemons((prev) => [...prev, ...newData]);
    setOffset((prev) => prev + 20);
    setLoadingMore(false);
  }, [offset, loadingMore]);

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

  return (
    <section className="w-full px-4 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Pokemon Gallery
        </h2>

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
                <PokeCard
                  key={pokemon.id}
                  title={pokemon.name}
                  image={pokemon.image}
                />
              ))}

          {/* Loading more indicator + Sentinel */}
          {loadingMore && (
            <div className="col-span-full flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}

          <div ref={observer} className="h-10" />
        </div>
      </div>
    </section>
  );
};

export default PokeList;
