import getConfig from "next/config";
import { fetchWrapper } from "../helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const categoryService = {
  getCategory,
  getCategoryBySlug,
  categoryList,
};

function getCategory() {
  return fetchWrapper
    .getWithoutToken(`${baseUrl}/categories`)
    .then((result) => {
      return result;
    });
}

function getCategoryBySlug(slug) {
  return fetchWrapper
    .getWithoutToken(`${baseUrl}/categories/getBySlug/${slug}`)
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
