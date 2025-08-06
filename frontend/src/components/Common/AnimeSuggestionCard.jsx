export default function AnimeSuggestionCard({ anime }) {
  return (
    <div className="snap-center snap-always min-w-[160px]">
      {/* Cover  Image */}
      <a href={`/anime/${anime.id}`}>
        <img
          src={anime.coverImage.large}
          alt={anime.title.english || anime.title.romaji}
          className="w-[160px] h-[230px] object-cover rounded-md shadow-lg cursor-pointer"
        />
      </a>
      <div className="mt-1">
        {/* Title */}
        <h3
          title={anime.title.english || anime.title.romaji}
          className="w-[160px] text-sm font-semibold text-primary overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer"
        >
          <a href={`/anime/${anime.id}`}>
            {anime.title.english || anime.title.romaji}
          </a>
        </h3>

        {/* Format and Episodes */}
        <div className="flex gap-1 items-center font-medium text-white text-[8px] mt-[2px]">
          {anime.format && (
            <span
              className={`bg-secondary px-2 py-1 pt-[4px] ${
                anime.episodes ? "rounded-s-md" : "rounded-md"
              }`}
            >
              {anime.format}
            </span>
          )}
          {anime.episodes && (
            <span
              className={`bg-primary px-2 py-1 pt-[4px] ${
                anime.format ? "rounded-e-md" : "rounded-md"
              }`}
            >
              {anime.episodes}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
