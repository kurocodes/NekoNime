import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/comment`;

export const fetchComments = (animeId, page = 1) => {
  return axios.get(`${BASE_URL}/anime?animeId=${animeId}&page=${page}`);
};

export const addComment = (animeId, comment) => {
  return axios.post(
    `${BASE_URL}/add`,
    { animeId, comment },
    { withCredentials: true }
  );
};

export const deleteComment = (commentId) => {
  return axios.post(
    `${BASE_URL}/delete`,
    { commentId },
    { withCredentials: true }
  );
};

export const getReplies = (commentId, page = 1) => {
  return axios.get(`${BASE_URL}/${commentId}?page=${page}`);
};

export const addReply = (commentId, reply) => {
  return axios.post(
    `${BASE_URL}/reply`,
    { commentId, reply },
    { withCredentials: true }
  );
};

export const deleteReply = (replyId) => {
  return axios.post(
    `${BASE_URL}/reply/delete`,
    { replyId },
    { withCredentials: true }
  );
};

export const toggleLikeComment = (commentId) => {
  return axios.post(
    `${BASE_URL}/${commentId}/like`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const toggleLikeReply = (replyId) => {
  return axios.post(
    `${BASE_URL}/reply/${replyId}/like`,
    {},
    {
      withCredentials: true,
    }
  );
};
