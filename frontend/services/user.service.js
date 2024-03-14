import getConfig from "next/config";
import { fetchWrapper } from "../helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
// const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
  GetUserProfile,
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

function UpdateUserProfile(id, data) {
  const body = new FormData();
  body.append("file", data.file);
  body.append("profilePictureUrl", data.fileUrl);
  body.append("email", data.email);
  body.append("firstName", data.firstName);
  body.append("lastName", data.lastName);
  body.append("aboutMe", data.aboutMe);
  // body.append("country", data.country);
  body.append("city", data.city);
  body.append("address", data.address);
  body.append("certificateLanguage", data.certificateLanguage);
  body.append("socialMedia.website", data.website);
  body.append("socialMedia.youtube", data.youtube);
  body.append("socialMedia.facebook", data.facebook);
  body.append("socialMedia.twitter", data.twitter);
  body.append("socialMedia.linkedIn", data.linkedIn);
  body.append("socialMedia.instagram", data.instagram);

  return fetchWrapper
    .postWithFormData(`${baseUrl}/User/UpdateUserProfile`, body)
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
