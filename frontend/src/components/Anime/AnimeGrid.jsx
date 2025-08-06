import AnimeCard from "./AnimeCard";
import AnimeCardSkeleton from "../Loaders/AnimeCardSkeleton";

export default function AnimeGrid({ animeList, visibleCards, loading }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {animeList?.list?.length === 0 || loading ? (
        <>
          {Array(visibleCards)
            .fill(0)
            .map((_, i) => (
              <AnimeCardSkeleton key={i} />
            ))}
        </>
      ) : (
        <>
          {animeList?.list
            ?.slice(0, visibleCards ?? animeList.length)
            .map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
        </>
      )}
    </div>
  );
}
