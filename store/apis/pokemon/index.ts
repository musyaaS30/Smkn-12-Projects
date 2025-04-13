// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResultGetPokemonDetail, ResultGetPokemons } from "./types";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  endpoints: (build) => ({
    getPokemons: build.query<ResultGetPokemons, string | null>({
      query: (nextUrl) => (nextUrl ? nextUrl : `pokemon?offset=0&limit=300`),
    }),

    getPokemonDetail: build.query<ResultGetPokemonDetail, string>({
      query: (url) => url,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useLazyGetPokemonsQuery,
  useLazyGetPokemonDetailQuery,
  useGetPokemonDetailQuery,
} = pokemonApi;
