import { GetSingleMovieID } from "@/utils/GetData";
import Container from "@/app/components/Container";

export default async function MoviePage({ params: { title } }) {
  const decodedName = decodeURIComponent(title);
  const TvDetails = await GetSingleMovieID(decodedName);

  if (!TvDetails) {
    console.error(`Movie with title ${decodedName} not found.`);
    return <div>Error: Movie with title "{decodedName}" not found.</div>;
  }

  return (
    <div>
      <div className="relative w-full h-[800px]">
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${TvDetails.backdrop_path})`,
          }}
          className="tvbanner bg-cover bg-center"
        />
      </div>
      <Container className="">
        <div className="w-full p-10 relative z-50 rounded-3xl shadow-lg bg-white -translate-y-1/2 border border-slate-200/10 text-black">
          <div className="flex items-start justify-between gap-7">
            <div className="flex-[0.4]">
              <img
                src={`https://image.tmdb.org/t/p/w500${TvDetails.poster_path}`}
                alt={TvDetails.name || TvDetails.title}
                className="rounded-[11px] w-[180px]"
              />
              <div className="text-white flex items-center justify-between gap-1 text-sm mt-4">
                <button className="rounded-[2px] py-2 bg-blue-500 flex-1">
                  Like
                </button>
                <button className="rounded-[2px] py-2 bg-zinc-600 flex-1">
                  Dislike
                </button>
              </div>
            </div>
            <div className="mt-3 flex-[2]">
              <div className="flex items-center justify-between">
                <button className="cursor-not-allowed">Watch now</button>
                <button className="cursor-not-allowed">Add to favorite</button>
              </div>
              <h1 className="text-4xl mt-2 font-bold leading-[1.5]">
                {TvDetails.name || TvDetails.title}
              </h1>
              <p className="my-4 text-sm">{TvDetails.overview}</p>
              <div className="grid text-sm grid-cols-2 items-start gap-4">
                <div className="font-light">
                  <h1>
                    <span className="pr-1 font-medium">Released:</span>
                    {TvDetails.first_air_date}
                  </h1>
                  <h1>
                    <span className="pr-1 font-medium">Genre:</span>
                    {TvDetails.genres.map((genre) => genre.name).join(", ")}
                  </h1>
                  <h1>
                    <span className="pr-1 font-medium">Casts:</span>
                    {TvDetails.credits.cast
                      .slice(0, 6)
                      .map((cast) => cast.name)
                      .join(", ")}
                  </h1>
                </div>
                <div className="font-light">
                  <h1>
                    <span className="pr-1 font-medium">Duration:</span>
                    {TvDetails.episode_run_time
                      ? TvDetails.episode_run_time[0]
                      : "N/A"}{" "}
                    mins
                  </h1>
                  <h1>
                    <span className="pr-1 font-medium">Country:</span>
                    {TvDetails.origin_country.join(", ")}
                  </h1>
                  <h1>
                    <span className="pr-1 font-medium">Production:</span>
                    {TvDetails.production_companies
                      .map((company) => company.name)
                      .join(", ")}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="h-[500vh]"></div>
    </div>
  );
}
