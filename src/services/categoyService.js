import http from "./httpService"; // Assuming `http` is an axios instance.

export function getCategoryApi(page = 1) {
  return http
    .get("https://assignment.rahkartest.ir/api/categories", {
      params: { page }, // Pass the page number as a query parameter
    })
    .then((data) => data?.data)
    .catch((err) => {
      console.error("Error fetching categories:", err);
      throw err;
    });
}

export async function removeCategoryApi(id) {
  return http
    .delete(`https://assignment.rahkartest.ir/api/categories/${id}`)
    .then((data) => data?.data)
    .catch((err) => {
      console.error("Error removing categories:", err?.response?.data?.message);
      throw err;
    });
}

export async function addCategoryApi(title) {
  const encodedTitle = encodeURIComponent(title);
  console.log(title, encodedTitle);
  return http
    .post(
      `https://assignment.rahkartest.ir/api/categories?title=${encodedTitle}`
    )
    .then((data) => data?.data)
    .catch((err) => {
      console.error("Error removing categories:", err);
      throw err;
    });
}
export async function updateCategoryApi({ title, id }) {
  console.log("iddd", id);
  const encodedTitle = encodeURIComponent(title);
  console.log(title, encodedTitle);
  return http
    .put(
      `https://assignment.rahkartest.ir/api/categories/${id}?title=${encodedTitle}`
    )
    .then((data) => data?.data)
    .catch((err) => {
      console.error("Error removing categories:", err);
      throw err;
    });
}
