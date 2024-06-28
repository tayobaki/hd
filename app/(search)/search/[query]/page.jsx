"use client";

import useStore from "@/utils/useStore";
import Container from "@/app/components/Container";
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Card from "@/app/components/Card";

export default function SearchPage({ params: { query } }) {
  const decoder = decodeURIComponent(query);
  const { searchResults, searchResultsTwo } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [searchResults, searchResultsTwo]);

  const results =
    searchResults.length > 0
      ? searchResults
      : searchResultsTwo.length > 0
      ? searchResultsTwo
      : [];

  return (
    <Container className={"px-5"}>
      <h1 className="font-semibold tracking-tighter mt-10 text-3xl">
        {loading ? (
          <div className="animate-pulse bg-gray-300 w-32 h-7 p-1"></div>
        ) : (
          <>Search Results for "{decoder}"</>
        )}
      </h1>

      <div className="mt-32">
        <div className="">
          {/* <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination> */}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 items-start justify-between gap-4 my-10">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gray-200 rounded-2xl p-4"
                >
                  <div className="aspect-[2/3] bg-gray-300 rounded-xl"></div>
                  <div className="my-2 bg-gray-300 h-4 w-24 rounded-full"></div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="bg-gray-300 h-4 w-12 rounded-full"></div>
                    <div className="bg-gray-300 h-4 w-8 rounded-full"></div>
                  </div>
                </div>
              ))
            : results
                .filter(
                  (tv) =>
                    tv.poster_path !== null &&
                    (tv.media_type === "tv" || tv.media_type === "movie")
                )
                .map((tv) => {
                  return <Card item={tv} />;
                })}
        </div>
      </div>
    </Container>
  );
}
