import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export const fetchAnime = (selectedGenre, page = 1) =>
  axios.get(
    selectedGenre
      ? `${BASE_URL}/anime?genre=${selectedGenre}&page=${page}`
      : `${BASE_URL}/anime`
  );

export const fetchSesaonTopRated = () =>
  axios.get(`${BASE_URL}/anime/seasonTopRated`);

export const fetchTrendingAnime = (page = 1) =>
  axios.get(`${BASE_URL}/anime/trending?page=${page}`);

export const fetchUpcomingAnime = (page = 1) =>
  axios.get(`${BASE_URL}/anime/upcoming?page=${page}`);

export const fetchLatestAnime = (page = 1) =>
  axios.get(`${BASE_URL}/anime/latest?page=${page}`);

export const fetchSearchResults = (searchQuery, page = 1) =>
  axios.get(`${BASE_URL}/anime/search?q=${searchQuery}&page=${page}`);

export const fetchAnimeDetails = (animeId) =>
  axios.get(`${BASE_URL}/anime/${animeId}`);

export const fetchAnimeCharacters = (animeId, page = 1) =>
  axios.get(`${BASE_URL}/anime/${animeId}/characters?page=${page}`);

export const fetchAnimeStaff = (animeId, page = 1) =>
  axios.get(`${BASE_URL}/anime/${animeId}/staff?page=${page}`);

export const fetchAnimeMoreInfo = (animeId) =>
  axios.get(`${BASE_URL}/anime/${animeId}/moreinfo`);

export const fetchAnimeMusic = (theme) =>
  axios.get(`${BASE_URL}/youtube-search?query=${encodeURIComponent(theme)}`);
