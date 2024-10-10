"use client";
import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const PokemonList = () => {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading, isError, error } = useQuery(
    ["pokemonList", page],
    async () => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * limit}`,
      );
      return data;
    },
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pokémon List</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.results.map((pokemon) => (
          <Link
            key={pokemon.name}
            to={`/pokemon/${pokemon.name}`}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition-shadow"
          >
            {pokemon.name}
          </Link>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!data.next}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
