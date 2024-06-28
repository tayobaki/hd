import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      searchResults: [],
      searchResultsTwo: [],
      queryOne: "",
      queryTwo: "",
      setSearchResults: (results) => set({ searchResults: results }),
      setSearchResultsTwo: (results) => set({ searchResultsTwo: results }),
      setQueryOne: (query) => set({ queryOne: query }),
      setQueryTwo: (query) => set({ queryTwo: query }),
      // Additional functionality
      clearSearchResults: () => set({ searchResults: [] }),
      clearSearchResultsTwo: () => set({ searchResultsTwo: [] }),
    }),
    {
      name: "combined-store", // Name of the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
