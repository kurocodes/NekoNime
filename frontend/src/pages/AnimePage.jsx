import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAnimeDetails } from "../services/animeService";

import Loader from "../components/Common/Loader";
import BannerImage from "../components/Anime/AnimePage/BannerImage";
import AnimeTabs from "../components/Anime/AnimePage/AnimeTabs";
import AnimeEpisodes from "../components/Anime/AnimePage/AnimeEpisodes";
import AnimeMainInfo from "../components/Anime/AnimePage/AnimeMainInfo";
import RelatedAnimeSection from "../components/Anime/AnimePage/RelatedAnimeSection";
import RecommendedAnimeSection from "../components/Anime/AnimePage/RecommendedAnimeSection";
import NekoNimeSloganBox from "../components/Common/NekoNimeSloganBox";
import ReviewSection from "../components/Anime/AnimePage/RatingSection/ReviewSection";
import CommentSection from "../components/Anime/AnimePage/CommentSection/CommentSection";

export default function AnimePage() {
  const [animeDetails, setAnimeDetails] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedTab, setSelectedTab] = useState("More Info");
  const [loading, setLoading] = useState(false);
  const animeId = useParams().id;

  useEffect(() => {
    const loadAnimeDetails = async () => {
      try {
        setLoading(true);
        const res = await fetchAnimeDetails(animeId);
        setAnimeDetails(res.data);
      } catch (error) {
        console.log("Error fetching anime details: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnimeDetails();
  }, [animeId]);

  useEffect(() => {
    const updateDescriptionPosition = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setShowDescription(true);
      } else {
        setShowDescription(false);
      }
    };

    updateDescriptionPosition();
    window.addEventListener("resize", updateDescriptionPosition);
    return () =>
      window.removeEventListener("resize", updateDescriptionPosition);
  }, []);

  if (!animeDetails) {
    return <Loader />;
  }

  const commentSectionMarginTop =
    (animeDetails.episodes || animeDetails.status === "RELEASING") &&
    animeDetails.format !== "MOVIE";

  return (
    <div>
      {/* Banner Image */}
      <BannerImage
        src={animeDetails.bannerImage || animeDetails.bannerImageTMDB}
      />
      <div
        className={`${
          animeDetails.bannerImage ? "relative z-10 max-xs:-mt-5 -mt-10 " : "pt-4"
        } grid grid-cols-1 lg:grid-cols-2 gap-4 px-4`}
      >
        {/* Main Info */}
        <AnimeMainInfo
          animeDetails={animeDetails}
          showDescription={showDescription}
          showMore={showMore}
          setShowMore={setShowMore}
        />

        {/* Anime Tabs */}
        <AnimeTabs
          selectedTab={selectedTab}
          handleTabChange={setSelectedTab}
          idMal={animeDetails.idMal}
        />

        {/* NekoNime Summary Box with Neko Girl Image For Mobile */}
        <NekoNimeSloganBox SmallDevice={true} />
      </div>

      {/* Anime Episodes */}
      <div className="columns-1 lg:columns-2 gap-4 p-4 mt-5">
        {(animeDetails.status === "RELEASING" || animeDetails.episodes) &&
          animeDetails.format !== "MOVIE" && (
            <AnimeEpisodes
              idMal={animeDetails.idMal}
              animeTitle={
                animeDetails.title.english || animeDetails.title.romaji
              }
            />
          )}

        {/* Comment Section */}
        <CommentSection
          animeId={animeDetails.id}
          commentSectionMarginTop={commentSectionMarginTop}
        />

        <div className="break-inside-avoid max-lg:mt-5">
          {/* Related Anime like mpvies and next or previous seasons */}
          {animeDetails.relations?.edges?.length > 0 && (
            <RelatedAnimeSection
              animeTitle={
                animeDetails.title.english || animeDetails.title.romaji
              }
              relations={animeDetails.relations.edges}
            />
          )}

          {/* Recommended Anime or Similar Anime */}
          {animeDetails.recommendations?.edges?.length > 0 && (
            <RecommendedAnimeSection
              animeTitle={
                animeDetails.title.english || animeDetails.title.romaji
              }
              recommendedAnime={animeDetails.recommendations.edges}
            />
          )}

          {/* Review Section */}
          <ReviewSection animeId={animeDetails.id} />
        </div>
      </div>
    </div>
  );
}
