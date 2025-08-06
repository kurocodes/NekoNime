import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/review`;

export const addOrUpdateRating = async (animeId, tierLabel) => {
  return axios.post(
    `${BASE_URL}/add-update`,
    { animeId, tier: tierLabel },
    { withCredentials: true }
  );
};

export const fetchAnimeReviewData = async (animeId) => {
  return axios.post(`${BASE_URL}/data`, { animeId }, { withCredentials: true });
};
