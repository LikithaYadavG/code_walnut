"use client";
import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const PokemonSearch = () => {
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useQuery(
    ["pokemon", searchTerm],
    async () => {
      if (!searchTerm) return null;
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`,
      );
      return data;
    },
    { enabled: !!searchTerm },
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(search);
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Pokémon by name or ID"
          className="w-full p-2 border rounded text-black"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {data && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
          <img
            src={data.sprites.front_default}
            alt={data.name}
            className="mx-auto"
          />
          <p>Types: {data.types.map((type) => type.type.name).join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
