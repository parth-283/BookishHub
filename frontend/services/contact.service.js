import getConfig from "next/config";
import { fetchWrapper } from "../helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
// const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const contactService = {
  saveContact,
};

function saveContact(data) {
  return fetchWrapper
    .postWithoutToken(`${baseUrl}/contacts`, data)
    .then((result) => {
      return result;
    });
}

function GetUserProfile() {
  return fetchWrapper.get(`${baseUrl}/User/GetUserProfile`).then((user) => {
    return user;
  });
}

function saveUserLanguage(data) {
  var requestBody = { userLangList: data };
  return fetchWrapper
    .post(`${baseUrl}/User/SaveUserLanguage`, requestBody)
    .then((result) => {
      return result;
    });
}

function saveEnquiry(data) {
  return fetchWrapper
    .postWithoutToken(`${baseUrl}/User/SaveContactUs`, data)
    .then((result) => {
      return result;
    });
}
