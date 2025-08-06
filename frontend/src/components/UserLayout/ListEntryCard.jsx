import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { removeFromDefaultList } from "../../services/listService";

import GenreTag from "../Common/GenreTag";

export default function ListEntryCard({ anime, onRemove, setRemoving }) {
  const [isHoverd, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/anime/${anime.animeId}`);
  };

  const handleRemoveClick = async (animeListEntryId) => {
    setRemoving();

    try {
      const res = await removeFromDefaultList(animeListEntryId);
      console.log(res.data);
      if (onRemove) onRemove(animeListEntryId, true); // 👈 Notify parent
    } catch (err) {
      console.error("Failed to remove from list:", err);
      if (onRemove) onRemove(animeListEntryId, false);
    }
  };

  return (
    <div
      className={`flex items-center justify-between mx-2 pe-2 border-r-4 transition ${
        isHoverd ? "border-primary" : "border-transparent"
      }`}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2">
        {/* Cover Image */}
        <img
          src={anime.coverImage}
          alt={anime.title}
          className="w-18 rounded-md cursor-pointer"
          onClick={handleCardClick}
        />
        <div className="w-full">
          {/* Title */}
          <div
            title={anime.title}
            className="text-lg font-semibold text-primary cursor-pointer w-[240px] xs:w-[300px] sm:w-[400px] whitespace-nowrap overflow-hidden overflow-ellipsis"
            onClick={handleCardClick}
          >
            {anime.title}
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 max-sm:hidden">
            {anime.genres.map((genre) => (
              <GenreTag
                key={genre}
                genre={genre}
                padding={[2, 1]}
                textSize="text-[6px] xs:text-[10px]"
              />
            ))}
          </div>

          <div className="flex items-center max-xs:text-[8px] text-[10px] xs:mt-2">
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

            {anime.duration && (
              <GoDotFill className="text-secondary text-md max-xs:mx-1 mx-2" />
            )}

            {/* Episodes Duration */}
            {anime.duration && (
              <div className="text-secondary max-xs:text-[10px] text-[12px]">
                {anime.duration}m
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        className={`h-fit transition ${isHoverd ? "opacity-100" : "opacity-0"}`}
        onClick={() => handleRemoveClick(anime._id)}
        disabled={!isHoverd}
      >
        <MdCancel className="text-secondary text-2xl cursor-pointer hover:text-red-400 hover:scale-120 transition-all duration-200 ease-in-out" />
      </button>
    </div>
  );
}
