import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { fetchAnimeMusic } from "../../../../services/animeService";

import Loader from "../../../Common/Loader";
import SharedTabContainer from "./Common/SharedTabContainer";

export default function MusicTab({
  idMal,
  openings,
  setOpenings,
  endings,
  setEndings,
}) {
  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return; // Don't refetch
    hasFetched.current = true; // Mark as fetched

    const fetchThemesAndVideos = async () => {
      try {
        // Get themes (openings and endings) from Jikan
        const jikanRes = await axios.get(
          `https://api.jikan.moe/v4/anime/${idMal}/themes`
        );
        const data = jikanRes.data?.data;

        const openingTitles = data?.openings || [];
        const endingTitles = data?.endings || [];

        // Function to fetch YouTube videos for title
        const fetchYouTubeVideo = async (title) => {
          try {
            const res = await fetchAnimeMusic(title);
            return res.data;
          } catch (err) {
            console.error("YouTube video fetch error:", err);
            return null;
          }
        };

        // Fetch YouTube videos for each title
        const openingResults = await Promise.all(
          openingTitles.map((title) => fetchYouTubeVideo(title))
        );

        const endingResults = await Promise.all(
          endingTitles.map((title) => fetchYouTubeVideo(title))
        );

        // Set the openings and endings state with titles and video IDs
        setOpenings(
          openingTitles.map((title, idx) => ({
            title,
            video: openingResults[idx],
          }))
        );

        setEndings(
          endingTitles.map((title, idx) => ({
            title,
            video: endingResults[idx],
          }))
        );
      } catch (err) {
        console.error("Failed to fetch anime music themes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchThemesAndVideos();
  }, [idMal]);

  return (
    <SharedTabContainer heading="Music (Openings & Endings)">
      <div className="grid grid-cols-1">
        {/* Openings */}
        <div>
          <h3 className="text-secondary text-lg font-semibold border-b-2 border-secondary">
            Openings
          </h3>
          {loading ? (
            <Loader />
          ) : openings.length === 0 ? (
            <p className="text-secondary">No opening themes found.</p>
          ) : openings.every((op) => !op.video) ? (
            <p className="text-secondary">Failed to get openings.</p>
          ) : (
            openings.map((op, idx) => (
              <div key={idx} className="my-4">
                {op.video && (
                  <iframe
                    className="w-full aspect-video rounded-md"
                    src={`https://www.youtube.com/embed/${op.video}`}
                    title={op.title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            ))
          )}
        </div>

        {/* Endings */}
        <div className="">
          <h3 className="text-secondary text-lg font-semibold border-b-2 border-secondary">
            Endings
          </h3>
          {loading ? (
            <Loader />
          ) : endings.length === 0 ? (
            <p className="text-secondary">No ending themes found.</p>
          ) : endings.every((ed) => !ed.video) ? (
            <p className="text-secondary">Failed to get endings.</p>
          ) : (
            endings.map((ed, idx) => (
              <div key={idx} className="my-4">
                {ed.video && (
                  <iframe
                    className="w-full aspect-video rounded-md"
                    src={`https://www.youtube.com/embed/${ed.video}`}
                    title={ed.title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </SharedTabContainer>
  );
}
