import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

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
          pokeDetails.data.sprites.versions["generation-v"]["black-white"]
            .animated.front_default,
      });
    }

    return data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};
