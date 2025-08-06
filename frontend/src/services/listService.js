import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/lists`;

export const addToDefaultList = async ({ animeDetails, listTitle }) => {
  const payload = {
    animeId: animeDetails.id,
    coverImage:
      animeDetails.coverImage?.extraLarge || animeDetails.coverImage?.large,
    title: animeDetails.title?.english || animeDetails.title?.romaji,
    format: animeDetails.format,
    episodes: animeDetails.episodes,
    duration: animeDetails.duration,
    genres: animeDetails.genres,
    listTitle,
  };

  return axios.post(`${BASE_URL}/add-to-default`, payload, {
    withCredentials: true,
  });
};

export const getAnimeListStatus = async (animeId) => {
  return axios.get(`${BASE_URL}/status/${animeId}`, {
    withCredentials: true,
  });
};

export const removeFromDefaultList = async (animeListEntryId) => {
  return axios.post(
    `${BASE_URL}/remove-from-default`,
    { animeId: animeListEntryId },
    {
      withCredentials: true,
    }
  );
};

export const getDefaultListEntries = async (listTitle) => {
  return axios.get(`${BASE_URL}/default/${listTitle}`, {
    withCredentials: true,
  });
};
