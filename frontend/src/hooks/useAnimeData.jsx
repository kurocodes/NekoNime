import { useState, useEffect } from "react";
import {
  fetchTrendingAnime,
  fetchUpcomingAnime,
  fetchLatestAnime,
  fetchSesaonTopRated,
} from "../services/animeService";
import { infiniteRetry } from "../utils/retry";

export default function useAnimeData() {
  const [sesaonTopRated, setSeasonTopRated] = useState();
  const [loadingSesaonTopRated, setLoadingSeasonTopRated] = useState(false);

  const [trendingPage, setTrendingPage] = useState(1);
  const [trending, setTrending] = useState({ list: [], pageInfo: {} });
  const [loadingTrending, setLoadingTrending] = useState(false);

  const [upcomingPage, setUpcomingPage] = useState(1);
  const [upcoming, setUpcoming] = useState({ list: [], pageInfo: {} });
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);

  const [latestPage, setLatestPage] = useState(1);
  const [latest, setLatest] = useState({ list: [], pageInfo: {} });
  const [loadingLatest, setLoadingLatest] = useState(false);

  // Load season top rated anime data on component mount
  useEffect(() => {
    const loadSeasonTopRated = async () => {
      setLoadingSeasonTopRated(true);
      try {
        const res = await infiniteRetry(() => fetchSesaonTopRated());
        setSeasonTopRated(res.data);
      } catch (err) {
        console.error("Failed to fetch season top rated Anime Data:", err);
      } finally {
        setLoadingSeasonTopRated(false);
      }
    };

    loadSeasonTopRated();
  }, []);

  // Load trending anime data based on the current page
  useEffect(() => {
    const loadTrending = async () => {
      setLoadingTrending(true);
      try {
        const res = await infiniteRetry(() => fetchTrendingAnime(trendingPage));
        setTrending({
          list: res.data.animeList,
          pageInfo: res.data.pageInfo,
        });
      } catch (err) {
        console.error("Failed to fetch trending Anime Data:", err);
      } finally {
        setLoadingTrending(false);
      }
    };

    loadTrending();
  }, [trendingPage]);

  // Load upcoming anime data based on the current page
  useEffect(() => {
    const loadUpcoming = async () => {
      setLoadingUpcoming(true);
      try {
        const res = await infiniteRetry(() => fetchUpcomingAnime(upcomingPage));
        setUpcoming({
          list: res.data.animeList,
          pageInfo: res.data.pageInfo,
        });
      } catch (err) {
        console.error("Failed to fetch upcoming Anime Data:", err);
      } finally {
        setLoadingUpcoming(false);
      }
    };

    loadUpcoming();
  }, [upcomingPage]);

  // Load latest anime data based on the current page
  useEffect(() => {
    const loadLatest = async () => {
      setLoadingLatest(true);
      try {
        const res = await infiniteRetry(() => fetchLatestAnime(latestPage));
        setLatest({
          list: res.data.animeList,
          pageInfo: res.data.pageInfo,
        });
      } catch (err) {
        console.error("Failed to fetch latest Anime Data:", err);
      } finally {
        setLoadingLatest(false);
      }
    };

    loadLatest();
  }, [latestPage]);

  return {
    sesaonTopRated,
    trending,
    upcoming,
    latest,
    loadingSesaonTopRated,
    loadingTrending,
    loadingUpcoming,
    loadingLatest,
    trendingPage,
    upcomingPage,
    latestPage,
    setTrendingPage,
    setUpcomingPage,
    setLatestPage,
  };
}
