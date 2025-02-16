import http from "./httpService"; // Assuming `http` is an axios instance.
// const BASE_URL = 'https://assignment.rahkartest.ir/api/'

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log('BASE_URL',BASE_URL)
export function getCategoryApi(page = 1) {
  return http
    .get("categories", {
      params: { page }, 
    })
    .then((data) => data?.data)
    .catch((err) => {
      throw err;
    });
}

export async function removeCategoryApi(id) {
  return http
    .delete(`categories/${id}`)
    .then((data) => data?.data)
    .catch((err) => {
      throw err;
    });
}

export async function addCategoryApi(title) {
  const encodedTitle = encodeURIComponent(title);
  return http
    .post(
      `categories?title=${encodedTitle}`
    )
    .then((data) => data?.data)
    .catch((err) => {
      throw err;
    });
}

export async function updateCategoryApi({ title, id }) {
  const encodedTitle = encodeURIComponent(title);
  return http
    .put(
      `categories/${id}?title=${encodedTitle}`
    )
    .then((data) => data?.data)
    .catch((err) => {
      throw err;
    });
}
