import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = "https://assignment.rahkartest.ir/";
const token = Cookies.get("Authorization"); // Replace 'Authorization' with the actual name of your cookie

// Create Axios instance
const app = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
  },
});

// Set up Axios response interceptor
app.interceptors.response.use(
  (response) => response, // If successful, just return the response
  (error) => {
    if (error.response && error.response.status === 401) {
      // If 401 Unauthorized error occurs, redirect to sign-in page
      window.location.href = "/signin"; // Redirect to signin page
      toast.error("please login again");
    }
    return Promise.reject(error); // Propagate error
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
