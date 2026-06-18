import axios from "axios";

const rawBaseURL = import.meta.env.VITE_API_URL;
const baseURL = rawBaseURL.replace(/\/$/, "").endsWith("/api")
  ? `${rawBaseURL.replace(/\/$/, "")}/v1`
  : rawBaseURL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
