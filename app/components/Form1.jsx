"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/utils/useStore";
import { GetSearchQuery } from "@/utils/GetData";

export default function Form1() {
  const [query, setQuery] = useState("");
  const { setSearchResults, setQueryOne, clearSearchResultsTwo } = useStore();
  const router = useRouter();

  const fetchSearchResults = useCallback(
    async (searchQuery) => {
      if (!searchQuery) return;
      try {
        const results = await GetSearchQuery(searchQuery);
        setSearchResults(results);
        clearSearchResultsTwo();
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
    [setSearchResults, clearSearchResultsTwo]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query) {
      await fetchSearchResults(query);
      setQueryOne(query);
      router.push(`/search/${query}`);
    }
  };

  return (
    <div className="w-[700px] mx-auto">
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
    </div>
  );
}
