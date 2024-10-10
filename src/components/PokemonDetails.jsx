"use client";
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery(
    ["pokemonDetails", id],
    async () => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
      );
      return data;
    },
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{data.name}</h2>
      <img
        src={data.sprites.front_default}
        alt={data.name}
        className="mx-auto"
      />
      <p>Types: {data.types.map((type) => type.type.name).join(", ")}</p>
      <h3 className="text-xl font-bold mt-4 mb-2">Abilities:</h3>
      <ul>
        {data.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
      <h3 className="text-xl font-bold mt-4 mb-2">Stats:</h3>
      {data.stats.map((stat, index) => (
        <div key={index} className="mb-2">
          <p>
            {stat.stat.name}: {stat.base_stat}
          </p>
          <div className="w-full bg-gray-200 rounded">
            <div
              className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded"
              style={{ width: `${(stat.base_stat / 255) * 100}%` }}
            >
              {stat.base_stat}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonDetails;
