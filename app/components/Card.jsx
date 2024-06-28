export default function Card({ item }) {
  return (
    <div>
      <a
        href={`/${item.name ? "tv" : "movie"}/${item.name || item.title}`}
        key={item.id}
        className=""
      >
        <div className="">
          <div className="relative group rounded-2xl overflow-hidden cursor-pointer">
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              className="aspect-[2/3] rounded-xl object-cover"
              alt={item.name}
            />
            <div className="flex lg:transition transition-none group-hover:bg-black/50 items-center justify-center absolute inset-0 h-full w-full lg:group-hover:scale-y-100 object-left delay-75 scale-y-0 duration-1000 ease-in-out">
              <button className="rounded-full flex items-center justify-center size-[40px] bg-blue-500 text-white font-semibold">
                &#8658;
              </button>
            </div>
          </div>
          <div className="h-[60px]">
            <h1 className="text-sm leading-8 truncate">
              {item.title || item.name}
            </h1>
            <div className="flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-2 relative">
                <p>
                  {new Date(
                    item.first_air_date || item.release_date
                  ).getFullYear()}
                </p>
                <div className="rounded-full size-1 bg-gray-500" />
                <span>{23 * 2} mins</span>
              </div>
              <span className="p-1 border border-gray-300 font-semibold text-gray-500 w-12 flex items-center text-[9px] justify-center rounded uppercase">
                {item.media_type === "tv" ? "TV" : "MOVIE"}
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
