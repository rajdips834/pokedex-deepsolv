import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});
function convertPokemonList(data) {
  return data.map((item) => {
    return {
      name: item.pokemon.name,
      url: item.pokemon.url,
    };
  });
}

export const fetchData = async (limit = 10, offset = 0) => {
  try {
    const res = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);

    const data = [];

    for (const pokemon of res.data.results) {
      const pokeDetails = await api.get(pokemon.url);

      data.push({
        name: pokeDetails.data.name,
        id: pokeDetails.data.id,
        types: pokeDetails.data.types,
        number: pokeDetails.data.id.toString().padStart(3, "0"),
        image:
          pokeDetails.data.sprites.other?.["official-artwork"]?.front_default ||
          pokeDetails.data.sprites.other?.home?.front_default ||
          pokeDetails.data.sprites.front_default ||
          pokeDetails.data.sprites.versions?.["generation-v"]?.["black-white"]
            ?.animated?.front_default,
      });
    }

    return data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};

export const fetchPokemonDetails = async (id) => {
  try {
    const res = await api.get(`/pokemon/${id}`);
    const rawData = res.data;

    // Map essential data from PokeAPI response
    const pokemon = {
      id: rawData.id,
      name: rawData.name,
      number: rawData.id.toString().padStart(3, "0"),

      // Multiple image options (use official-artwork as primary)
      image:
        rawData.sprites.other?.["official-artwork"]?.front_default ||
        rawData.sprites.other?.home?.front_default ||
        rawData.sprites.front_default ||
        rawData.sprites.versions?.["generation-v"]?.["black-white"]?.animated
          ?.front_default,

      // Types (with slot order)
      types: rawData.types.map((type) => ({
        slot: type.slot,
        type: type.type.name,
      })),

      // Stats
      stats: rawData.stats.map((stat) => ({
        name: stat.stat.name,
        base_stat: stat.base_stat,
        effort: stat.effort,
      })),

      // Abilities (first 2, with hidden flag)
      abilities: rawData.abilities.slice(0, 2).map((ability) => ({
        name: ability.ability.name,
        url: ability.ability.url,
        is_hidden: ability.is_hidden,
        slot: ability.slot,
      })),

      // Physical characteristics
      height: rawData.height / 10, // Convert decimeters to meters
      weight: rawData.weight / 10, // Convert hectograms to kg

      // Base experience
      base_experience: rawData.base_experience,

      // Sprite variants (for modal showcase)
      sprites: {
        front_default: rawData.sprites.front_default,
        front_shiny: rawData.sprites.front_shiny,
        back_default: rawData.sprites.back_default,
        official_art:
          rawData.sprites.other?.["official-artwork"]?.front_default,
      },
    };

    console.log("Mapped Pokemon Data:", pokemon);
    return pokemon;
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    throw error;
  }
};

export const searchPokemon = async (name) => {
  try {
    const res = await api.get(`/pokemon/${id}`);
    const rawData = res.data;

    const pokemon = {
      id: rawData.id,
      name: rawData.name,
      number: rawData.id.toString().padStart(3, "0"),

      // Multiple image options (use official-artwork as primary)
      image:
        rawData.sprites.other?.["official-artwork"]?.front_default ||
        rawData.sprites.other?.home?.front_default ||
        rawData.sprites.front_default ||
        rawData.sprites.versions?.["generation-v"]?.["black-white"]?.animated
          ?.front_default,

      // Types (with slot order)
      types: rawData.types.map((type) => ({
        slot: type.slot,
        type: type.type.name,
      })),

      // Stats
      stats: rawData.stats.map((stat) => ({
        name: stat.stat.name,
        base_stat: stat.base_stat,
        effort: stat.effort,
      })),

      // Abilities (first 2, with hidden flag)
      abilities: rawData.abilities.slice(0, 2).map((ability) => ({
        name: ability.ability.name,
        url: ability.ability.url,
        is_hidden: ability.is_hidden,
        slot: ability.slot,
      })),

      // Physical characteristics
      height: rawData.height / 10, // Convert decimeters to meters
      weight: rawData.weight / 10, // Convert hectograms to kg

      // Base experience
      base_experience: rawData.base_experience,

      // Sprite variants (for modal showcase)
      sprites: {
        front_default: rawData.sprites.front_default,
        front_shiny: rawData.sprites.front_shiny,
        back_default: rawData.sprites.back_default,
        official_art:
          rawData.sprites.other?.["official-artwork"]?.front_default,
      },
    };

    console.log("Mapped Pokemon Data:", pokemon);
    return pokemon;
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    throw error;
  }
};

export const fetchTypes = async () => {
  try {
    const res = await api.get(`/type/`);
    return res.data.results;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};
export const fetchPokemonWithTypes = async (limit, offset, type) => {
  // Return empty array if all params are empty/undefined
  if (!limit && !offset && !type) {
    return [];
  }

  try {
    // Build query params only when values exist
    const params = new URLSearchParams();
    if (limit !== undefined) params.append("limit", limit);
    if (offset !== undefined) params.append("offset", offset);

    const url = type
      ? `/type/${type}${params.toString() ? `?${params.toString()}` : ""}`
      : `/pokemon?${params.toString()}`;

    const res = await api.get(url);

    const formatted = convertPokemonList(res.data.pokemon);
    const data = [];

    for (const pokemon of formatted) {
      const pokeDetails = await api.get(pokemon.url);

      data.push({
        name: pokeDetails.data.name,
        id: pokeDetails.data.id,
        types: pokeDetails.data.types,
        number: pokeDetails.data.id.toString().padStart(3, "0"),
        image:
          pokeDetails.data.sprites.other?.["official-artwork"]?.front_default ||
          pokeDetails.data.sprites.other?.home?.front_default ||
          pokeDetails.data.sprites.front_default ||
          pokeDetails.data.sprites.versions?.["generation-v"]?.["black-white"]
            ?.animated?.front_default,
      });
    }
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};
