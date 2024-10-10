"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const TeamManagement = () => {
  const [team, setTeam] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedTeam = localStorage.getItem("pokemonTeam");
    if (savedTeam) {
      setTeam(JSON.parse(savedTeam));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pokemonTeam", JSON.stringify(team));
  }, [team]);

  const {
    data: searchResults,
    isLoading,
    isError,
    error,
  } = useQuery(
    ["pokemonSearch", search],
    async () => {
      if (!search) return [];
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`,
      );
      return [data];
    },
    { enabled: !!search },
  );

  const addToTeam = (pokemon) => {
    if (team.length < 6 && !team.find((p) => p.id === pokemon.id)) {
      setTeam([...team, pokemon]);
    }
  };

  const removeFromTeam = (pokemonId) => {
    setTeam(team.filter((p) => p.id !== pokemonId));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Team Management</h2>
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Pokémon to add"
          className="w-full p-2 border rounded"
        />
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {searchResults &&
        searchResults.map((pokemon) => (
          <div
            key={pokemon.id}
            className="mb-2 p-2 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-center"
          >
            <span>{pokemon.name}</span>
            <button
              onClick={() => addToTeam(pokemon)}
              className="bg-green-500 text-white p-1 rounded"
              disabled={
                team.length >= 6 || team.find((p) => p.id === pokemon.id)
              }
            >
              Add to Team
            </button>
          </div>
        ))}
      <h3 className="text-xl font-bold mt-4 mb-2">Your Team:</h3>
      {team.map((pokemon) => (
        <div
          key={pokemon.id}
          className="mb-2 p-2 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-center"
        >
          <span>{pokemon.name}</span>
          <button
            onClick={() => removeFromTeam(pokemon.id)}
            className="bg-red-500 text-white p-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default TeamManagement;
