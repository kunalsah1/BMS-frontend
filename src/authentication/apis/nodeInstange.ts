import axios from "axios";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const nodeInstance = axios.create({
  // baseURL: "https://15.206.216.87",
  baseURL: "http://127.0.0.1:5000",
});

nodeInstance.interceptors.request.use(
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

nodeInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized! Redirecting to login...");

        localStorage.removeItem("accessToken");

        window.location.href = "/login";
        toast.error("Session expired. Please log in again.", {
          duration: 3000,
          position: "top-right",
        });
      }
    }
    return Promise.reject(error);
  }
);

export default nodeInstance;
