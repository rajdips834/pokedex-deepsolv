// PokeDetails.jsx - Refactored
"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { fetchPokemonDetails } from "../data";
import PokemonContent from "./PokemonDetails/PokemonContent";
import LoadingState from "./PokemonDetails/LoadingState";
import ErrorState from "./PokemonDetails/ErrorState";
const PokeDetails = ({ pokemonId, isOpen, onClose }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!pokemonId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonDetails(pokemonId);
      setPokemon(data);
    } catch (err) {
      setError("Failed to load Pokemon details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [pokemonId]);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    } else {
      setPokemon(null);
      setError(null);
    }
  }, [isOpen, fetchData]);

  const handleClose = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pokemon-name"
    >
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-white/30 animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-linear-to-r from-red-500/95 via-pink-500/90 to-purple-500/95 backdrop-blur-xl p-6 border-b border-white/30">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 -m-2 rounded-2xl hover:bg-white/30 transition-all duration-200 text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-red-500"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12 max-h-[75vh] overflow-y-auto">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState onRetry={fetchData} />
          ) : pokemon ? (
            <PokemonContent pokemon={pokemon} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PokeDetails;
