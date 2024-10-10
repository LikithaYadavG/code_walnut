"use client";
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 dark:text-gray-100 text-lg">
                  Pokémon App
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className="py-4 px-2 text-gray-500 dark:text-gray-100 hover:text-blue-500 transition duration-300"
              >
                Search
              </Link>
              <Link
                to="/list"
                className="py-4 px-2 text-gray-500 dark:text-gray-100 hover:text-blue-500 transition duration-300"
              >
                Pokémon List
              </Link>
              <Link
                to="/team"
                className="py-4 px-2 text-gray-500 dark:text-gray-100 hover:text-blue-500 transition duration-300"
              >
                Team Management
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="py-2 px-2 font-medium text-gray-500 dark:text-gray-100 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
            >
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
