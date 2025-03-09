import axios from "axios";

const api = axios.create({
  baseURL: "https://uni-traffic-backend.vercel.app/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  async (config) => {
    config.withCredentials = true;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
