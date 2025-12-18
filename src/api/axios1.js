import axios from "axios";

const API = axios.create({
  baseURL: "https://doc-ai-backend-0v3j.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
