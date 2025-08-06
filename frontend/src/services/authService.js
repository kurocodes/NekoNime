import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;

export const signup = (userData) => {
  return axios.post(`${BASE_URL}/signup`, userData, {
    withCredentials: true,
  });
};

export const login = (credentials) => {
  return axios.post(`${BASE_URL}/login`, credentials, {
    withCredentials: true,
  });
};

export const logout = () => {
  return axios.post(
    `${BASE_URL}/logout`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const verifyToken = () => {
  return axios.get(`${BASE_URL}/verify`, {
    withCredentials: true,
  });
};
