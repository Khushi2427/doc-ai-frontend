import axios from "axios";

const API = axios.create({
  baseURL: "https://doc-ai-backend-0v3j.onrender.com/api",
  withCredentials: true, // needed for refresh token cookie
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
