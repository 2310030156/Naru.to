import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

// Attach JWT token to every request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (username, password) =>
  API.post("/auth/login", { username, password });

export const signup = (username, password) =>
  API.post("/auth/signup", { username, password });

export const getAnimeList = () => API.get("/anime");
export const getAnimeById = (id) => API.get(`/anime/${id}`);

export const getWatchlist = (userId) => API.get(`/user/watchlist/${userId}`);
export const updateWatchlist = (userId, animeIds) =>
  API.post(`/user/watchlist/${userId}`, animeIds);

export default API;
