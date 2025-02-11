import axios from "axios";
import { getItemInLocalStorage } from "../../utils/localStorage";

const axiosInstance = axios.create({
  baseURL: "https://15.206.216.87:8000",
  // baseURL: "http://127.0.0.1:8000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getItemInLocalStorage("accessToken");
    if (
      token &&
      !config.url?.includes("/login") &&
      !config.url?.includes("/register")
    ) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    console.log(config);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Redirecting to login..");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
