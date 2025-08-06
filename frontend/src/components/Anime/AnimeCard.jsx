import { useState } from "react";
import { Link } from "react-router-dom";
import { formatAnimeDate } from "../../utils/dateUtils";
import { useListContext } from "../../context/listContext";
import { genreColorsMap, genreTextColorsMap } from "../../utils/formatColors";

import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { FaShare, FaPlay, FaStar } from "react-icons/fa";

import GenreTag from "../Common/GenreTag";
import CircleButton from "../Common/CircleButton";

export default function AnimeCard({ anime }) {
  const { showListContainer, setShowListContainer, setAnimeDetails } =
    useListContext();
  const [isHoverd, setIsHovered] = useState(false);

  return (
    <div
      className={`max-xs:max-w-[140px] md:min-w-[206px] w-fit ${
        isHoverd ? "scale-102" : ""
      } transition`}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex w-full p-1 pr-0 cursor-pointer">
        {/* Cover Image */}
        <div className="relative">
          <Link to={`/anime/${anime.id}`}>
            <img
              src={anime.coverImage.large}
              alt={anime.title.english || anime.title.romaji}
              loading="lazy"
              className="w-[140px] md:w-[150px] h-[200px] md:h-[220px] rounded-md shadow-[0_0_15px_rgba(0,0,0,0.3)]"
            />
          </Link>

          {/* Rating */}
          {anime.averageScore && (
            <div className="absolute bottom-0 bg-primary rounded-full m-1 px-2 py-1 flex gap-1 items-center">
              <FaStar color="yellow" className="text-md" />
              <span className="text-white text-xs">
                {`${(anime.averageScore / 10).toFixed(1)}/10`}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="max-xs:hidden flex flex-col items-center flex-1/6 gap-4 py-2 px-2">
          <CircleButton
            icon={BsFillBookmarkPlusFill}
            title="Add to List"
            onClick={() => {
              setShowListContainer(!showListContainer);
              setAnimeDetails(anime);
            }}
          />
          <CircleButton
            icon={FaStar}
            title="Rate"
            onClick={() => console.log("Rated")}
          />
          <CircleButton
            icon={FaPlay}
            title="Watch"
            onClick={() => console.log("Watched")}
          />
          <CircleButton
            icon={FaShare}
            title="Share"
            onClick={() => console.log("Shared")}
          />
        </div>
      </div>

      <div className="flex flex-col px-1">
        {/* Title */}
        <Link to={`/anime/${anime.id}`}>
          <h3
            title={anime.title.english || anime.title.romaji}
            className="max-xs:max-w-[140px] w-[175px] md:w-[200px] text-primary text-md font-bold cursor-pointer truncate overflow-hidden whitespace-nowrap hover:text-secondary"
          >
            {anime.title.english || anime.title.romaji}
          </h3>
        </Link>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mt-1 text-[9px]">
          {anime.genres.slice(0, 3).map((genre) => (
            <GenreTag
              key={genre}
              genre={genre}
              color={genreColorsMap[genre] || "#999"}
              textColor={genreTextColorsMap[genre] || "#fff"}
              padding={[2, 1]}
            />
          ))}
        </div>

        <div className="flex justify-between items-center text-[10px] mt-2">
          {/* Format and Episodes */}
          <div className="flex gap-1 items-center font-medium text-white">
            {anime.format && (
              <span
                className={`bg-secondary px-2 py-1 pt-[5px] ${
                  anime.episodes ? "rounded-s-md" : "rounded-md"
                }`}
              >
                {anime.format}
              </span>
            )}
            {anime.episodes && (
              <span
                className={`bg-primary px-2 py-1 pt-[5px] ${
                  anime.format ? "rounded-e-md" : "rounded-md"
                }`}
              >
                {anime.episodes}
              </span>
            )}
          </div>

          {/* Release Date */}
          {anime.startDate && (
            <div className="text-secondary pt-1">
              {formatAnimeDate(anime.startDate)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
