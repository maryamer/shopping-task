// categoryService.js
import http from "./httpService"; // Assuming `http` is an axios instance.

export default function getOrdersDataApi(data) {
  return http
    .get("https://assignment.rahkartest.ir/api/orders", {
      params: data, // Pass the page number as a query parameter
    })
    .then((data) => data?.data)
    .catch((err) => {
      console.error("Error fetching categories:", err);
      throw err;
    });
}
