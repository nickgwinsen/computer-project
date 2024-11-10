import axios from "axios";
import { API_URL } from "@/config/constants";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

export default axiosInstance;
