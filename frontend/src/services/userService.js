import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/user`;

export const fetchUserProfileData = () => {
  return axios.get(`${BASE_URL}/profile`, {
    withCredentials: true,
  });
};
