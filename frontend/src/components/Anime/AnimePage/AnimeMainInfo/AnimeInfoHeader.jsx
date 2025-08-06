import { GoDotFill } from "react-icons/go";
import { formatAnimeDate } from "../../../../utils/dateUtils";

export default function AnimeInfoHeader({
  animeDetails,
  isBig = false,
  textCenter = false
}) {
  return (
    <>
      <div className={`${textCenter && "max-xs:text-center"} ${!isBig && "max-xs:flex max-xs:flex-col max-xs:justify-start max-xs:gap-1"}`}>
        {/* Anime Title */}
        <h1 className={`text-primary ${!isBig ? "max-xs:text-2xl text-xl xl:text-2xl font-bold xs:leading-5" : "text-xl md:text-4xl font-semibold text-shadow-2xs"}`}>
          {animeDetails.title.english || animeDetails.title.romaji}
        </h1>
        {/* Anime alt title */}
        <span className="max-xs:text-[8px] text-[10px] sm:text-xs text-primary-hover-bg">
          {animeDetails.title.english === animeDetails.title.romaji
            ? ""
            : animeDetails.title.romaji}
        </span>

        <div className={`max-xs:w-fit flex items-center max-xs:text-[8px] text-[10px] xs:mt-2 ${textCenter && "max-xs:mx-auto"}`}>
          {/* Format and Episodes */}
          <div className="flex gap-1 items-center font-medium text-white">
            {animeDetails.format && (
              <span
                className={`bg-secondary px-2 py-1 pt-[5px] ${
                  animeDetails.episodes ? "rounded-s-md" : "rounded-md"
                }`}
              >
                {animeDetails.format}
              </span>
            )}
            {animeDetails.episodes && (
              <span
                className={`bg-primary px-2 py-1 pt-[5px] ${
                  animeDetails.format ? "rounded-e-md" : "rounded-md"
                }`}
              >
                {animeDetails.episodes}
              </span>
            )}
          </div>

          {animeDetails.duration && (
            <GoDotFill className="text-secondary text-md max-xs:mx-1 mx-2" />
          )}

          {/* Episodes Duration */}
          {animeDetails.duration && (
            <div className="text-secondary max-xs:text-[10px] text-[12px]">
              {animeDetails.duration}m
            </div>
          )}

          {animeDetails.startDate && (
            <GoDotFill className="text-secondary text-md max-xs:mx-1 mx-2" />
          )}

          {/* Release Date */}
          {animeDetails.startDate && (
            <div className="text-secondary max-xs:text-[10px] text-[12px]">
              {formatAnimeDate(animeDetails.startDate)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
