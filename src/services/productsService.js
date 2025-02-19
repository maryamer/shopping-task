import http from "./httpService";

export async function getProductsApi(params) {
  return http
    .get("products", {
      params: { "price_range[0]": 0, ...params },
    })
    .then((data) => data?.data)
    .catch((err) => {
      throw err;
    });
}
export default async function getCategoryApi(data) {
  return http
    .get("products", {
      params: data,
    })
    .then(({ data }) => data.data);
}

export async function removeProductsApi(id) {
  return http
    .delete(`products/${id}`)
    .then((data) => data?.data)
    .catch((err) => {
      throw err;
    });
}

export async function addProductApi(data) {
  try {
    const response = await http.post("products", data, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    });
    return response?.data;
  } catch (err) {
    console.error("Error adding product:", err);
    throw err;
  }
}
export async function UpdateProductApi(data) {
  try {
    const response = await http.post("products/" + data?.id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (err) {
    console.error("Error editing product:", err);
    throw err;
  }
}

export async function toggleProductApi(id) {
  return http
    .patch(`products/toggle?product_id=${id}`)
    .then((data) => data?.data)
    .catch((err) => {
      console.error("Error toggle product:", err);
      throw err;
    });
}
