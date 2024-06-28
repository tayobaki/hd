"use client";

import { useState, useLayoutEffect } from "react";
import { GetTrendingMovies, GetTrendingSeries } from "@/utils/GetData";
import Card from "./Card";

export default function Trending() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("movies");

  useLayoutEffect(() => {
    async function fetchTrendingData() {
      const movies = await GetTrendingMovies();
      const series = await GetTrendingSeries();
      setTrendingMovies(movies);
      setTrendingSeries(series);
    }
    fetchTrendingData();
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <section className="mt-32 ">
      <div className="flex gap-3 items-center">
        <h1 className="text-3xl font-semibold">Trending</h1>
        <div className="flex items-center gap-3 text-white text-xs">
          <button
            className={`flex items-center justify-center p-2 rounded ${
              selectedFilter === "movies"
                ? "bg-blue-400"
                : "bg-gray-400 text-black"
            }`}
            onClick={() => handleFilterChange("movies")}
          >
            Movies
          </button>
          <button
            className={`flex items-center justify-center p-2 rounded ${
              selectedFilter === "series"
                ? "bg-blue-400"
                : "bg-gray-400 text-black"
            }`}
            onClick={() => handleFilterChange("series")}
          >
            Tv Shows
          </button>
        </div>
      </div>

      <div className="mt-10 -z-50 grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 items-start justify-between gap-4 ">
        {selectedFilter === "movies" &&
          trendingMovies?.map((movie) => <Card key={movie.id} item={movie} />)}
        {selectedFilter === "series" &&
          trendingSeries?.map((series) => (
            <Card key={series.id} item={series} />
          ))}
      </div>
    </section>
  );
}
