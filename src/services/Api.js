import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails && userDetails.token) {
      config.headers.Authorization = `Bearer ${userDetails.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
