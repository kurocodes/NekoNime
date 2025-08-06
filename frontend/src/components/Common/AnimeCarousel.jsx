import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useListContext } from "../../context/listContext";
import { useAuthContext } from "../../context/AuthContext";
import { useGeneralContext } from "../../context/GeneralContext";

import { FaRegBookmark } from "react-icons/fa6";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { FaArrowLeft, FaArrowRight, FaBookmark } from "react-icons/fa";

import AnimeInfoHeader from "../Anime/AnimePage/AnimeMainInfo/AnimeInfoHeader";
import AnimeDescription from "../Anime/AnimePage/AnimeMainInfo/AnimeDescription";

export default function AnimeCarousel({ animeList }) {
  const { user, authChecked } = useAuthContext();
  const { showAlert } = useGeneralContext();
  const { showListContainer, setShowListContainer, setAnimeDetails } =
    useListContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Memoize the filtered anime list to avoid unnecessary recalculations
  const carouselAnime = useMemo(() => {
    return animeList?.filter((anime) => anime.bannerImage).slice(0, 10);
  }, [animeList]);

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === carouselAnime?.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? carouselAnime?.length - 1 : prev - 1
    );
  };

  // Automatically change the anime every 8 seconds
  useEffect(() => {
    const intervalTime = 8000;
    let startTime = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      const percent = (elapsedTime / intervalTime) * 100;

      if (percent >= 100) {
        goToNext();
        startTime = Date.now();
        setProgress(0);
      } else {
        setProgress(percent);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, carouselAnime?.length]);

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      {/* Fade Carousel Container */}
      <div className="relative w-full max-xs:h-[400px] h-[453px] sm:h-[549px] md:h-[599px] lg:h-[650px] xl:h-[694px]">
        {carouselAnime.map((anime, idx) => (
          <div
            key={anime.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              idx === currentIndex
                ? "opacity-100 z-20"
                : "opacity-0 z-10 pointer-events-none"
            }`}
          >
            <div className="w-full h-full flex">
              <div className="w-[20%] h-full"></div>

              {/* Anime Image */}
              <div className="w-[80%] relative">
                <img
                  src={anime.bannerImage || anime.coverImage.large}
                  alt={anime.title.english || anime.title.romaji}
                  className="object-cover w-full h-full"
                />
                {/* Gradients */}
                <div className="absolute top-0 left-[-1px] w-[20%] h-full bg-gradient-to-r from-white via-white/70 to-transparent z-10"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white via-white/10 to-transparent z-10"></div>
                <div className="absolute bottom-0 w-full h-15 bg-gradient-to-t from-white to-transparent z-20"></div>
              </div>

              {/* Info Box */}
              <div className="absolute bottom-5 lg:bottom-40 z-20 max-sm:ms-5 m-10 flex flex-col gap-4 max-w-[250px] md:max-w-[500px]">
                <span className="text-sm md:text-xl font-semibold text-secondary">
                  #{idx + 1} Spotlight
                </span>
                <AnimeInfoHeader animeDetails={anime} isBig={true} />
                <div className="hidden md:block">
                  <AnimeDescription
                    description={anime.description}
                    isExapandable={false}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {/* Save Button */}
                  <div
                    className={`p-2 border-3 ${
                      showListContainer
                        ? "bg-primary border-primary text-white hover:bg-secondary hover:border-secondary hover:text-white"
                        : "border-secondary text-secondary hover:bg-primary hover:border-primary hover:text-white"
                    } rounded-sm cursor-pointer transition hover:scale-110 duration-200`}
                    onClick={() => {
                      if (!authChecked || !user) {
                        showAlert(
                          "Please login to add anime to your list!",
                          "warning"
                        );
                        return;
                      } else {
                        setShowListContainer(!showListContainer);
                        setAnimeDetails(anime);
                      }
                    }}
                  >
                    {showListContainer ? (
                      <FaBookmark className="max-xs:text-lg text-[22px]" />
                    ) : (
                      <FaRegBookmark className="max-xs:text-lg text-[22px]" />
                    )}
                  </div>

                  {/* Details Button */}
                  <Link to={`/anime/${anime.id}`} className="w-fit">
                    <div className="group flex items-center bg-secondary w-fit max-xs:px-3 max-xs:py-[6px] px-4 py-2 text-primary-hover-text text-xl rounded-s-md rounded-e-full cursor-pointer hover:bg-primary hover:text-lg hover:text-white hover:rounded-full transition-all duration-200">
                      <span>Details</span>
                      <IoIosArrowDroprightCircle className="max-xs:text-lg text-2xl font-extrabold ml-2 mt-[2px] group-hover:scale-110 transition duration-200" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute max-xs:bottom-[25%] bottom-[52%] translate-y-[100%] right-0 mx-5 mb-10 flex flex-col gap-2 text-primary-hover-text z-30">
        <button
          onClick={goToPrev}
          className="bg-secondary hover:bg-primary hover:text-white hover:scale-110 rounded-md p-3 shadow-md cursor-pointer transition duration-200"
        >
          <FaArrowLeft className="max-xs:text-xl text-2xl font-extrabold" />
        </button>
        <button
          onClick={goToNext}
          className="bg-secondary hover:bg-primary hover:text-white hover:scale-110 rounded-md p-3 shadow-md cursor-pointer transition duration-200"
        >
          <FaArrowRight className="max-xs:text-xl text-2xl font-extrabold" />
        </button>
      </div>

      {/* Indicator Progress Bar */}
      <div className="absolute bottom-5 lg:bottom-42 max-sm:left-5 left-10 z-30 flex gap-2">
        {carouselAnime.map((_, idx) => (
          <div
            key={idx}
            className={`group h-2 flex rounded-full bg-secondary hover:bg-primary cursor-pointer transition-all duration-200 ${
              idx === currentIndex ? "max-sm:w-12 w-16" : "max-sm:w-5 w-6"
            }`}
            onClick={() => setCurrentIndex(idx)}
          >
            <div
              className={`h-full rounded-full group-hover:bg-primary transition-all duration-200 ${
                idx === currentIndex ? "bg-primary" : "bg-transparent"
              }`}
              style={{ width: idx === currentIndex ? `${progress}%` : "0%" }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
