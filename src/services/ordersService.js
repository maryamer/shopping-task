 
import http from "./httpService"; 

export default function getOrdersDataApi(data) {
  return http
    .get("orders", {
      params: data, 
    })
    .then((data) => data?.data)
    .catch((err) => {
      console.error("Error fetching categories:", err);
      throw err;
    });
}
