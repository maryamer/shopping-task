import axios from "axios";
import Cookies from "js-cookie";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = "https://assignment.rahkartest.ir/api/";
const token = Cookies.get("Authorization");

const app = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

app.interceptors.response.use(
  (response) => response, 
  async (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
const isLogin =originalRequest.url.endsWith("categories")
      // If request URL ends with 'categories' and it's the first retry
      if (!isLogin && !originalRequest._retry) {
        originalRequest._retry = true; // Mark request as retried

        try {
          console.log("Retrying request:", originalRequest.url);
          return await app(originalRequest); // Retry the request once
        } catch (retryError) {
          console.error("Retry failed:", retryError);
        }
      }

      // If login request fails, do not redirect
      if (!isLogin) {
        window.location.href = "#/signin"; // Redirect to sign-in
      }
    }

    return Promise.reject(error);
  }
);

// Custom HTTP methods object using the Axios instance
const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

export default http;
