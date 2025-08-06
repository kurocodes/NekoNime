import { useGeneralContext } from "../../../context/GeneralContext";
import { animeGenres, genreColors, genreIcons } from "../../../utils/genres";
import { useNavigate } from "react-router-dom";
import {
  formats,
  formatStylesMap,
  seasons,
  seasonStylesMap,
} from "../../../utils/formatColors";

import FilterButton from "./FilterButton";

export default function FiltersSection() {
  const { dropDownOpen, setDropDownOpen } = useGeneralContext();
  const navigate = useNavigate();

  if (!dropDownOpen) return null;

  // Handler for genre click
  const handleGenreClick = (genre) => {
    navigate(`/browse?genre=${genre}`);
    setDropDownOpen(false);
  };

  // Handler for general click (formats and seasons)
  const handleGeneralClick = () => {
    setDropDownOpen(false);
    navigate("/browse");
  };

  return (
    <div className="fixed flex max-lg:flex-col flex-row gap-6 bg-primary w-full px-5 md:px-25 py-5 z-50">
      {/* Genres */}
      <div className="lg:flex-1/2 text-white ">
        <h2 className="font-semibold text-xl">Genres</h2>
        <div className="flex flex-wrap gap-4 pt-3">
          {animeGenres.map((genre) => {
            const colors = genreColors[genre] || {
              bg: "#ccc",
              text: "#000",
              shadow: "#000",
            };

            const style = {
              bgColor: colors.bg,
              textColor: colors.text,
              icon: genreIcons[genre] || null,
            };

            return (
              <FilterButton
                key={genre}
                label={genre}
                icon={style.icon}
                bgColor={style.bgColor}
                textColor={style.textColor}
                onClick={() => handleGenreClick(genre)}
              />
            );
          })}
        </div>
      </div>

      {/* Formats */}
      <div className="lg:flex-1/2 text-white flex flex-col gap-4">
        <div>
          <h2 className="font-semibold text-xl">Formats</h2>
          <div className="flex flex-wrap gap-4 pt-3">
            {formats.map((format) => {
              const style = formatStylesMap[format] || {
                bgColor: "#ccc",
                textColor: "#000",
                icon: null,
              };

              return (
                <FilterButton
                  key={format}
                  label={format}
                  bgColor={style.bgColor}
                  textColor={style.textColor}
                  icon={style.icon}
                  onClick={() => handleGeneralClick()}
                />
              );
            })}
          </div>
        </div>

        {/* Seasons */}
        {/* <div>
          <h2 className="font-semibold text-xl">Seasons</h2>
          <div className="flex flex-wrap gap-4 pt-3">
            {seasons.map((season) => {
              const style = seasonStylesMap[season] || {
                bgColor: "#ccc",
                textColor: "#000",
                icon: null,
              };

              return (
                <FilterButton
                  key={season}
                  label={season}
                  bgColor={style.bgColor}
                  textColor={style.textColor}
                  icon={style.icon}
                  onClick={() => handleGeneralClick()}
                />
              );
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
}
