import axios from "axios";

const axiosInstance = axios.create({
  // withCredentials: false,
  // process.env.BASE_API_URL ||
  baseURL: "https://localhost:7235/api",
  headers: {
    'Accept': "text/plain",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    return Promise.reject(err.response);
  }
);

export default axiosInstance;
