import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { formatAnimeDate } from "../../../utils/dateUtils";
import { useGeneralContext } from "../../../context/GeneralContext";

import Loader from "../../Common/Loader";

export default function SearchSuggestions({
  search,
  searchResults,
  loading,
  setIsSearchOpen,
}) {
  const { setSearchAnimeList } = useGeneralContext();

  const navigate = useNavigate();

  return (
    <div className="absolute w-full bg-primary top-12 rounded-md flex flex-col z-50 shadow">
      {loading ? (
        <Loader />
      ) : (
        <>
          {searchResults.list.slice(0, 6).map((anime, index) => (
            // Search Result Item
            <div
              key={index}
              className={`flex gap-2 p-2 border-b-2 border-primary-hover-bg hover:bg-secondary transition cursor-pointer w-full ${
                index === 0 ? "rounded-t-md" : ""
              }`}
              onClick={() => {
                navigate(`/anime/${anime.id}`);
                setIsSearchOpen(false);
              }}
            >
              <img
                src={anime.coverImage.large}
                alt={anime.title.english || anime.title.romaji}
                loading="lazy"
                className="w-10 h-14 rounded-md"
              />
              <div className="text-white flex flex-col w-[90%] pr-2">
                <p className="font-medium truncate overflow-hidden whitespace-nowrap">
                  {anime.title.english || anime.title.romaji}
                </p>
                <span className="text-[#ffffff4a] text-[12px]">
                  {formatAnimeDate(anime.startDate)}
                </span>
              </div>
            </div>
          ))}

          {/* View All Results */}
          <div
            className="flex items-center text-white justify-center bg-primary-hover-bg rounded-b-md py-4 cursor-pointer hover:bg-secondary transition"
            onClick={() => {
              navigate(`/search?q=${search}`);
              setSearchAnimeList(searchResults);
              setIsSearchOpen(false);
            }}
          >
            View All Results <MdKeyboardArrowRight className="text-xl mt-0.5" />
          </div>
        </>
      )}
    </div>
  );
}
