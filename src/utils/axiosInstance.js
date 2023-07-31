import axios from "axios";
import { getLocalStorage } from "./localStorage";

const axiosInstance = axios.create({
  // withCredentials: false,
  // process.env.BASE_API_URL ||
  baseURL: "http://localhost:5000/api",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getLocalStorage("accessToken");
    if (accessToken && config && config.headers) {
      config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    return Promise.reject(err.response);
  }
);

export default axiosInstance;
