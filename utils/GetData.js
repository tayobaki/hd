const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
  next: { revalidate: 3600 },
};

async function fetchFromAPI(endpoint) {
  const res = await fetch(`https://api.themoviedb.org/3${endpoint}`, options);
  return res.json();
}

export async function GetSearchQuery(query, page) {
  try {
    const data = await fetchFromAPI(
      `/search/multi?query=${encodeURIComponent(
        query.replace(/-/g, " ")
      )}&include_adult=false&language=en-US&page=1`
    );
    return data.results;
  } catch (error) {
    console.error(`Error searching for items`, error);
    return [];
  }
}

async function getSingleItemID(TvName, type) {
  try {
    const results = await GetSearchQuery(TvName);
    const item = results.find(
      (result) => result.name === TvName || result.title === TvName
    );

    if (item) {
      return fetchFromAPI(`/${type}/${item.id}?append_to_response=credits`);
    } else {
      throw new Error(`Item with title ${TvName} not found.`);
    }
  } catch (error) {
    console.error(`Error finding ${type}:`, error.message);
    return null;
  }
}

export const GetSingleTvID = (TvName) => getSingleItemID(TvName, "tv");
export const GetSingleMovieID = (TvName) => getSingleItemID(TvName, "movie");

export async function GetTrendingMovies() {
  try {
    const data = await fetchFromAPI(`/trending/movie/day?language=en-US`);
    return data.results;
  } catch (error) {
    console.error("Error fetching Trending Movies", error);
    return [];
  }
}

export async function GetTrendingSeries() {
  try {
    const data = await fetchFromAPI(`/trending/tv/day?language=en-US`);
    return data.results;
  } catch (error) {
    console.error("Error fetching Trending Movies", error);
    return [];
  }
}
