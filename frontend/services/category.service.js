import getConfig from "next/config";
import { fetchWrapper } from "../helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const categoryService = {
  getCategory,
  getCategoryBySlug,
  categoryList,
  getCategoryByPagination,
};

function getCategory() {
  return fetchWrapper
    .getWithoutToken(`${baseUrl}/categories`)
    .then((result) => {
      return result;
    });
}

function getCategoryByPagination(page, limit) {
  return fetchWrapper
    .getWithoutToken(`${baseUrl}/categories/pagination?page=${page}&limit=${limit}`)
    .then((result) => {
      return result;
    });
}

function getCategoryBySlug(slug, page, limit) {
  return fetchWrapper
    .getWithoutToken(`${baseUrl}/categories/getBySlug/${slug}?page=${page}&limit=${limit}`)
    .then((result) => {
      return result;
    });
}

function categoryList() {
  return fetchWrapper
    .getWithoutToken(`${baseUrl}/categories/categoryList`)
    .then((result) => {
      return result;
    });
}
