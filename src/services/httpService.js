import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

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
  (error) => {
    if (error.response && error.response.status === 401) {
      // If 401 Unauthorized error occurs, redirect to sign-in page
      window.location.href = "#/signin"; // Redirect to signin page
      toast.error("please login again");
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
