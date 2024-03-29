import getConfig from "next/config";
import { fetchWrapper } from "../helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
// const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
  GetUserProfile,
  UpdateUserProfile,
  UpdateProfile,
};

function GetUserProfile(slug) {
  return fetchWrapper.get(`${baseUrl}/users/${slug}`).then((user) => {
    return user;
  });
}

function GetUserHeaderInfo() {
  return fetchWrapper.get(`${baseUrl}/User/GetUserHeaderInfo`).then((user) => {
    return user;
  });
}

function UpdateUserProfile(id, file, coverImage) {
  const body = new FormData();
  body.append("file", file);

  return fetchWrapper
    .postWithFormData(`${baseUrl}/users/image/${coverImage}/${id}`, body)
    .then((user) => {
      return user;
    });
}

function UpdateProfile(id, data) {
  return fetchWrapper
    .put(`${baseUrl}/users/${id}`, data)
    .then((user) => {
      return user;
    });
}

function likePost(id, type) {
  return fetchWrapper
    .post(`${baseUrl}/WebLikeAndView/LikePost/${id}/${type}`, {})
    .then((data) => {
      return data;
    });
}

function viewPost(id, type) {
  return fetchWrapper
    .post(`${baseUrl}/WebLikeAndView/ViewPost/${id}/${type}`, {})
    .then((data) => {
      return data;
    });
}

function favPost(id, bool) {
  return fetchWrapper
    .post(`${baseUrl}/WebLikeAndView/FavPost/${id}/${bool}`, {})
    .then((data) => {
      return data;
    });
}
