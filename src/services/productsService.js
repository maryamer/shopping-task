// categoryService.js
import http from "./httpService"; // Assuming `http` is an axios instance.

export async function getProductsApi(data) {
  return http
    .get("https://assignment.rahkartest.ir/api/products", {
      params: data, // Pass the page number as a query parameter
    })
    .then((data) => data?.data)
    .catch((err) => {
      console.error("Error fetching categories:", err);
      throw err;
    });
}
export async function removeProductsApi(id) {
  return http
    .delete(`https://assignment.rahkartest.ir/api/products/${id}`)
    .then((data) => data?.data)
    .catch((err) => {
      console.error("Error removing product:", err);
      throw err;
    });
}

export async function addProductApi(data) {
  console.log("formdata", data);
  try {
    const response = await http.post(
      "https://assignment.rahkartest.ir/api/products",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      }
    );
    return response?.data;
  } catch (err) {
    console.error("Error adding product:", err);
    throw err;
  }
}
export async function UpdateProductApi(data) {
  console.log("formdata", data);
  try {
    const response = await http.post(
      "https://assignment.rahkartest.ir/api/products/" + data?.id,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      }
    );
    return response?.data;
  } catch (err) {
    console.error("Error editing product:", err);
    throw err;
  }
}

export async function toggleProductApi(id) {
  return http
    .patch(`https://assignment.rahkartest.ir/products/toggle?product_id=${id}`)
    .then((data) => data?.data)
    .catch((err) => {
      console.error("Error toggle product:", err);
      throw err;
    });
}
