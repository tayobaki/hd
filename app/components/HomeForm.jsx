"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/utils/useStore";
import { GetSearchQuery } from "@/utils/GetData";
import Link from "next/link";

export default function HomeForm() {
  const [query, setQuery] = useState("");
  const {
    setSearchResultsTwo,
    setQueryTwo,
    clearSearchResults,
    searchResultsTwo,
  } = useStore();
  const router = useRouter();

  const fetchSearchResultsTwo = useCallback(
    async (searchQuery) => {
      if (!searchQuery) return;
      try {
        const results = await GetSearchQuery(searchQuery);
        setSearchResultsTwo(results);
        clearSearchResults();
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
    [setSearchResultsTwo, clearSearchResults]
  );

  useEffect(() => {
    fetchSearchResultsTwo(query);
  }, [query, fetchSearchResultsTwo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query) {
      await fetchSearchResultsTwo(query);
      setQueryTwo(query);
      router.push(`/search/${query}`);
    }
  };

  const filteredResults = searchResultsTwo.filter((result) =>
    result.name?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-[700px] mx-auto">
      <div className="reltive">
        <form
          onSubmit={handleSubmit}
          className="flex items-center rounded-2xl overflow-hidden text-gray-300"
        >
          <input
            type="text"
            placeholder="Enter keywords"
            className="pl-4 border-none w-full outline-none p-4"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="w-[70px] h-full flex items-center justify-center p-4 overflow-hidden bg-blue-500 relative"
          >
            0
          </button>
        </form>
        {query && filteredResults.length > 0 && (
          <ul className="bg-white absolute w-full z-50 left-0 top-full shadow-lg overflow-hidden py-0 rounded-xl mt-3 flex flex-col">
            {filteredResults
              // .slice(0, 4)
              .filter((item) => item.poster_path !== null)
              .map((item) => (
                <Link
                  href={`/tv/${item.name}`}
                  key={item.id}
                  className="p-2 border-b border-zinc-400"
                >
                  <div className="flex items-start gap-2">
                    <img
                      src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                      alt={item.name}
                      className="w-[40px] h-[65px] object-cover rounded"
                    />
                    <div className="text-xs mt-1 font-semibold">
                      <h1>{item.name}</h1>
                    </div>
                  </div>
                </Link>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
