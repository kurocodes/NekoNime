import { useEffect, useState } from "react";
import { useGeneralContext } from "../context/GeneralContext";
import { SECTION_TYPES } from "../utils/sections";

import useAnimeData from "../hooks/useAnimeData";
import AnimeSection from "../components/Anime/AnimeSection";
import AnimeList from "../components/Anime/AnimeList";
import AnimeCarousel from "../components/Common/AnimeCarousel";
import CarouselSkeleton from "../components/Loaders/CarouselSkeleton";
import TrendingData from "../components/Layout/TrendingData";

export default function Home() {
  const { viewAllSection } = useGeneralContext();
  const {
    sesaonTopRated,
    trending,
    upcoming,
    latest,
    trendingPage,
    upcomingPage,
    latestPage,
    loadingSesaonTopRated,
    loadingTrending,
    loadingUpcoming,
    loadingLatest,
    setTrendingPage,
    setUpcomingPage,
    setLatestPage,
  } = useAnimeData();

  const [visibleCards, setVisibleCards] = useState(5);

  useEffect(() => {
    if (viewAllSection === null) {
      setTrendingPage(1);
      setUpcomingPage(1);
      setLatestPage(1);
    }
  }, [viewAllSection]);

  useEffect(() => {
    const updateCardCounter = () => {
      const width = window.innerWidth;
      if (width < 1280) {
        setVisibleCards(6);
      } else if (width < 1536) {
        setVisibleCards(4);
      } else {
        setVisibleCards(5);
      }
    };

    updateCardCounter();
    window.addEventListener("resize", updateCardCounter);
    return () => window.removeEventListener("resize", updateCardCounter);
  }, []);

  return (
    <div>
      {!sesaonTopRated || loadingSesaonTopRated ? (
        <CarouselSkeleton />
      ) : (
        <AnimeCarousel animeList={sesaonTopRated} />
      )}

      <div
        className={`relative flex flex-col lg:flex-row gap-2 ${
          sesaonTopRated && "lg:mt-[-140px] z-40"
        }`}
      >
        <TrendingData style="sticky top-22 hidden lg:flex gap-4 flex-col sm:flex-row lg:flex-col m-1 lg:w-1/3 2xl:w-1/4 h-fit px-1 sm:px-2" />

        <div className="lg:m-auto px-1 sm:px-2 py-2 sm:py-4 lg:mt-[-20px]">
          {viewAllSection === SECTION_TYPES.TRENDING ? (
            <AnimeList
              title={SECTION_TYPES.TRENDING}
              animeList={trending}
              loading={loadingTrending}
              page={trendingPage}
              setPage={setTrendingPage}
            />
          ) : viewAllSection === SECTION_TYPES.UPCOMING ? (
            <AnimeList
              title={SECTION_TYPES.UPCOMING}
              animeList={upcoming}
              loading={loadingUpcoming}
              page={upcomingPage}
              setPage={setUpcomingPage}
            />
          ) : viewAllSection === SECTION_TYPES.LATEST ? (
            <AnimeList
              title={SECTION_TYPES.LATEST}
              animeList={latest}
              loading={loadingLatest}
              page={latestPage}
              setPage={setLatestPage}
            />
          ) : (
            <>
              <AnimeSection
                title={SECTION_TYPES.TRENDING}
                animeList={trending}
                loading={loadingTrending}
                visibleCards={visibleCards}
              />
              <AnimeSection
                title={SECTION_TYPES.UPCOMING}
                animeList={upcoming}
                loading={loadingUpcoming}
                visibleCards={visibleCards}
              />
              <AnimeSection
                title={SECTION_TYPES.LATEST}
                animeList={latest}
                loading={loadingLatest}
                visibleCards={visibleCards}
                bottomBorder={false}
              />
            </>
          )}
        </div>

        <TrendingData style="flex gap-4 flex-col sm:flex-row lg:flex-col m-1 lg:w-1/3 lg:hidden" />
      </div>
    </div>
  );
}
