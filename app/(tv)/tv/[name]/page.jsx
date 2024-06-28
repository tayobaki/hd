import { GetSingleTvID } from "@/utils/GetData";
import Container from "@/app/components/Container";

export default async function TVPage({ params: { name } }) {
  const decodedName = decodeURIComponent(name).replace(/-/g, " ");
  const TvDetails = await GetSingleTvID(decodedName);

  if (!TvDetails) {
    console.error(`TV show with title ${decodedName} not found.`);
    return <div>Error: TV show with title "{decodedName}" not found.</div>;
  }

  return (
    <div className="">
      <div className="relative w-full h-[800px]">
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${TvDetails.poster_path})`,
          }}
          className="tvbanner"
        />
      </div>
      <Container className="">
        <div className="w-full p-10 relative z-20 md:rounded-3xl shadow-lg bg-white border border-slate-200/10 md:-translate-y-1/2 text-black">
          <div className="flex md:flex-row flex-col items-start justify-between gap-7">
            <div className="flex-[0.4]">
              <img
                src={`https://image.tmdb.org/t/p/w500${TvDetails.poster_path}`}
                alt={TvDetails.name}
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
            <div className="right_desc mt-3 flex-[2]">
              <div className="flex items-center justify-between">
                <button className="cursor-not-allowed">Watch now</button>
                <button className="cursor-not-allowed">Add to favorite</button>
              </div>
              <h1 className="text-4xl mt-2 font-bold leading-[1.5]">
                {TvDetails.name}
              </h1>
              <p className="my-4 text-sm">{TvDetails.overview}</p>
              <div className="grid text-sm grid-cols-2 items-start">
                <div className="font-light">
                  <h1>
                    <span className="pr-1 font-medium">Released:</span>
                    {TvDetails.first_air_date}
                  </h1>
                  <h1>
                    <span className="pr-1 font-medium">Genre:</span>
                    {TvDetails?.genres?.map((genre) => genre.name).join(", ")}
                  </h1>
                  <h1>
                    <span className="pr-1 font-medium">Casts:</span>
                    {TvDetails?.cast?.map((cast) => cast.name).join(", ")}
                  </h1>
                </div>
                <div className="font-light">
                  <h1>
                    <span className="pr-1 font-medium">Duration:</span>
                    {TvDetails?.episode_run_time?.join(" - ")} mins
                  </h1>
                  <h1>
                    <span className="pr-1 font-medium">Country:</span>
                    {TvDetails?.production_countries
                      ?.map((country) => country.name)
                      .join(", ")}
                  </h1>
                  <h1>
                    <span className="pr-1 font-medium">Production:</span>
                    {TvDetails?.production_companies
                      ?.map((company) => company.name)
                      .join(", ")}
                  </h1>
                </div>
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="h-[500vh]"></div>
    </div>
  );
}
