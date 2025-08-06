import axios from "axios";
import "../../../styles/scrollbar.css";
import { useEffect, useState } from "react";

import { GoDotFill } from "react-icons/go";

import Loader from "../../Common/Loader";
import SharedTabContainer from "./AnimeTabs/Common/SharedTabContainer";

const GET_EPISODES_API = (idMal, page) =>
  `https://api.jikan.moe/v4/anime/${idMal}/episodes?page=${page}`;

// Helper component for the legend items
const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-1">
    <GoDotFill className={`${color} text-xl`} />
    <span className="text-xs font-semibold text-secondary">{label}</span>
  </div>
);

// Displays the legend for Filler, Recap, and Filler + Recap episodes
const EpisodeLegend = () => (
  <div className="flex items-center gap-2 mr-2">
    <LegendItem color="text-yellow-500" label="Filler" />
    <LegendItem color="text-blue-500" label="Recap" />
    <LegendItem color="text-pink-600" label="Filler + Recap" />
  </div>
);

const getEpisodeStyle = ({ filler, recap }) => {
  if (filler && recap) return "bg-pink-600 text-white hover:bg-pink-600";
  if (filler) return "bg-yellow-500 text-black hover:bg-yellow-600";
  if (recap) return "bg-blue-500 text-white hover:bg-blue-600";
  return "bg-primary text-white hover:bg-secondary";
};

const EpisodeCard = ({ episode, isCompact }) => {
  return isCompact ? (
    // Compact view shows only the episode number
    <div
      title={episode.title}
      className={`${getEpisodeStyle(
        episode
      )} text-sm font-semibold p-2 rounded-md text-center cursor-pointer transition duration-200`}
    >
      <span>{episode.mal_id}</span>
    </div>
  ) : (
    // Full view shows episode number, title, and romanji title
    <div
      title={episode.title}
      className="flex gap-4 text-sm font-semibold text-center bg-secondary border-e-4 border-primary text-white cursor-pointer transition duration-200"
    >
      <span className="text-lg min-w-12 py-3 bg-primary">{episode.mal_id}</span>
      <div className="grow flex flex-col justify-center text-start min-w-0">
        <h4 className="text-md font-light text-primary-hover-text overflow-hidden whitespace-nowrap text-ellipsis">
          {episode.title}
        </h4>
        <span className="text-[10px] font-extralight overflow-hidden whitespace-nowrap text-ellipsis">
          {episode.title_romanji}
        </span>
      </div>
    </div>
  );
};

export default function AnimeEpisodes({ idMal, animeTitle }) {
  const [selectedRange, setSelectedRange] = useState("1-100");
  const [episodes, setEpisodes] = useState([]);
  const [pages, setPages] = useState(1);
  const [episodeRanges, setEpisodeRanges] = useState([]);
  const [loading, setLoading] = useState(false);

  // convert the range in page number (101-200 -> 2)
  const getPageFromRange = (range) => {
    const [start] = range.split("-").map(Number);
    return Math.ceil(start / 100);
  };

  // Fetch episode pages or first page
  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(GET_EPISODES_API(idMal, 1));
        const lastPage = res.data.pagination.last_visible_page;

        const ranges = Array.from({ length: lastPage }, (_, i) => {
          const start = i * 100 + 1;
          const end = (i + 1) * 100;
          return `${start}-${end}`;
        });

        setEpisodeRanges(ranges);
        setSelectedRange(ranges[0]);
        setPages(lastPage);
      } catch (err) {
        console.error("Error loading episode ranges:", err);
      } finally {
        setLoading(false);
      }
    };

    if (idMal) fetchPages();
  }, [idMal]);

  // Fetch episodes based on selected range
  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!selectedRange) return;
      try {
        setLoading(true);
        const page = getPageFromRange(selectedRange);
        const res = await axios.get(GET_EPISODES_API(idMal, page));
        setEpisodes(res.data.data);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [selectedRange]);

  const isCompact = pages > 1;

  return (
    episodes?.length > 0 && (
      <SharedTabContainer
        heading={
          <>
            Episodes of{" "}
            <span className="text-primary-hover-text font-medium">
              {animeTitle}
            </span>
          </>
        }
        isHeight={episodes?.length > 10}
        showBtn={isCompact}
        dropDownOptions={episodeRanges}
        selectedOption={selectedRange}
        setSelectedOption={setSelectedRange}
        marginBottom={true}
      >
        <div className="py-2 rounded-b-md">
          {/* Episode Legend */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <span className="text-sm text-secondary ml-2">
              {isCompact ? (
                <>
                  Episodes in range: <strong>{selectedRange}</strong>
                </>
              ) : (
                <>
                  Episodes: <strong>{`1-${episodes?.length}`}</strong>
                </>
              )}
            </span>
            {isCompact && <EpisodeLegend />}
          </div>

          {/* Episode List */}
          {loading ? (
            <Loader />
          ) : (
            <div
              className={`grid ${
                isCompact
                  ? "grid-cols-5 xs:grid-cols-8 sm:grid-cols-10"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2"
              } gap-2 mt-2`}
            >
              {episodes.map((episode) => (
                <EpisodeCard
                  key={episode.mal_id}
                  episode={episode}
                  isCompact={isCompact}
                />
              ))}
            </div>
          )}
        </div>
      </SharedTabContainer>
    )
  );
}
