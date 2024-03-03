import getConfig from "next/config";
import { fetchWrapper } from "../helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
// const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const booksService = {
  getBooks,
  getBookBySlug,
};

function getBooks() {
  return fetchWrapper.getWithoutToken(`${baseUrl}/books`).then((result) => {
    return result;
  });
}

function getBookBySlug(slug) {
  return fetchWrapper
    .getWithoutToken(`${baseUrl}/books/getBySlug/${slug}`)
    .then((result) => {
      return result;
    });
}

function getCategories(isBootCamp) {
  return fetchWrapper
    .getWithoutToken(`${baseUrl}/Category/GetCategory?isBootCamp=${isBootCamp}`)
    .then((result) => {
      return result;
    });
}

function getCategoriesBootCamp(slug) {
  return fetchWrapper
    .get(`${baseUrl}/Category/GetBootCampCourses/${slug}`)
    .then((result) => {
      return result;
    });
}

function getCategoriesFreeCourse(
  id,
  page,
  size,
  key,
  keyword,
  IsProgress = false
) {
  return fetchWrapper
    .get(
      `${baseUrl}/Category/GetCoursesByCategory/${id}?page=${page}&size=${size}&key=${key}&keyword=${keyword}&IsProgress=${IsProgress}`
    )
    .then((result) => {
      return result;
    });
}

function saveCourseFeedback(data) {
  return fetchWrapper
    .post(`${baseUrl}/Course/SaveCourseFeedback`, data)
    .then((result) => {
      return result;
    });
}
