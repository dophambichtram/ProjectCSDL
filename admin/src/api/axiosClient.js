import axios from "axios";
import queryString from "query-string";

const URL = import.meta.env.VITE_SERVER_URL;

const axiosClient = axios.create({
  baseURL: `${URL}`,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// interceptors request
axiosClient.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptors response
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
