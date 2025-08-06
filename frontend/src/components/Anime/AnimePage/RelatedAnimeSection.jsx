import AnimeSuggestionCard from "../../Common/AnimeSuggestionCard";
import SharedTabContainer from "./AnimeTabs/Common/SharedTabContainer";
import HorizontalScrollSection from "../../Common/HorizontalScrollSection";

export default function RelatedAnimeSection({ animeTitle, relations }) {
  return (
    <SharedTabContainer
      heading={
        <>
          Related Anime For{" "}
          <span className="text-primary-hover-text font-medium">
            {animeTitle}
          </span>
        </>
      }
      isHeight={false}
      blendPosition={false}
    >
      <HorizontalScrollSection>
        {relations.map((rel) => (
          <AnimeSuggestionCard key={rel.node.id} anime={rel.node} />
        ))}
      </HorizontalScrollSection>
    </SharedTabContainer>
  );
}
