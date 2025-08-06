import AnimeSuggestionCard from "../../Common/AnimeSuggestionCard";
import SharedTabContainer from "./AnimeTabs/Common/SharedTabContainer";
import HorizontalScrollSection from "../../Common/HorizontalScrollSection";

export default function RecommendedAnimeSection({
  animeTitle,
  recommendedAnime,
}) {
  const recommendations = recommendedAnime.map(
    (anime) => anime.node.mediaRecommendation
  );

  return (
    <SharedTabContainer
      heading={
        <>
          Recommended Anime For{" "}
          <span className="text-primary-hover-text font-medium">
            {animeTitle}
          </span>{" "}
          Fans
        </>
      }
      isHeight={false}
      blendPosition={false}
    >
      <HorizontalScrollSection>
        {recommendations.map((anime) => (
          <AnimeSuggestionCard key={anime.id} anime={anime} />
        ))}
      </HorizontalScrollSection>
    </SharedTabContainer>
  );
}
