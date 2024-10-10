"use client";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Navbar";
import PokemonSearch from "../components/PokemonSearch";
import PokemonList from "../components/PokemonList";
import PokemonDetails from "../components/PokemonDetails";
import TeamManagement from "../components/TeamManagement";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <main className="container mx-auto p-4">
              <Routes>
                <Route exact path="/" element={<PokemonSearch />} />
                <Route path="/list" element={<PokemonList />} />
                <Route path="/pokemon/:id" element={<PokemonDetails />} />
                <Route path="/team" element={<TeamManagement />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
