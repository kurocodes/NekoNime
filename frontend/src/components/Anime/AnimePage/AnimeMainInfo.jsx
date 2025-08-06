import GenreTag from "../../Common/GenreTag";
import StatDisplay from "./AnimeMainInfo/StatDisplay";
import ActionButtons from "./AnimeMainInfo/ActionButtons";
import AnimeCoverImage from "./AnimeMainInfo/AnimeCoverImage";
import AnimeInfoHeader from "./AnimeMainInfo/AnimeInfoHeader";
import NekoNimeSloganBox from "../../Common/NekoNimeSloganBox";
import AnimeDescription from "./AnimeMainInfo/AnimeDescription";

import {
  genreColorsMap,
  genreTextColorsMap,
} from "../../../utils/formatColors";

export default function AnimeMainInfo({
  animeDetails,
  showDescription,
  showMore,
  setShowMore,
}) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex max-xs:flex-col gap-4">
          {/* Cover Image */}
          <AnimeCoverImage
            src={animeDetails.coverImage.extraLarge}
            alt={animeDetails.title.english || animeDetails.title.romaji}
          />

          {/* Title and Description and Info */}
          <div className="flex flex-col justify-around">
            <AnimeInfoHeader animeDetails={animeDetails} textCenter={true} />

            {/* Description for large devices */}
            {!showDescription && (
              <AnimeDescription
                description={animeDetails.description}
                showMore={showMore}
                setShowMore={setShowMore}
              />
            )}

            {/* Genres */}
            <div className="flex flex-wrap max-xs:justify-center gap-2 mt-3 text-xs">
              {animeDetails.genres.map((genre) => (
                <GenreTag
                  key={genre}
                  genre={genre}
                  color={genreColorsMap[genre] || "#999"}
                  textColor={genreTextColorsMap[genre] || "#fff"}
                  padding={[4, 2]}
                  textSize="text-[8px] md:text-xs"
                />
              ))}
            </div>

            {/* Rating and Popularity */}
            <StatDisplay
              averageScore={animeDetails.averageScore}
              popularity={animeDetails.popularity}
            />
          </div>
        </div>

        {/* Buttons */}
        <ActionButtons animeDetails={animeDetails} />

        {/* NekoNime Summary Box with Neko Girl Image For Desktop */}
        <NekoNimeSloganBox SmallDevice={false} />
      </div>

      {/* Description for small devices */}
      {showDescription && (
        <AnimeDescription
          description={animeDetails.description}
          showMore={showMore}
          setShowMore={setShowMore}
        />
      )}
    </>
  );
}
