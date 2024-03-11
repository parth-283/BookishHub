import getConfig from "next/config";
import { fetchWrapper } from "../helpers";
import { signOut } from "next-auth/react";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
//const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const accountService = {
  //user: userSubject.asObservable(),
  //get userValue() { return userSubject.value },
  register,
  login,
  logout,
  changePassword,
  forgetPassword,
  refreshtoken,
  resetPassword,
  verifyEmail,
  sendVerifyEmail,
  setToken,
  verifyResetPasswordToken,
  reSendVerificationEmail,
};

function register(data) {
  return fetchWrapper
    .postWithoutToken(`${baseUrl}/users`, data)
    .then((user) => {
      //userSubject.next(user.data);
      localStorage.setItem("user", JSON.stringify(user.data));
      return user;
    });
}

function login(data) {
  return fetchWrapper
    .postWithoutToken(`${baseUrl}/Account/Login`, data)
    .then((user) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      userSubject.next(user.data);
      localStorage.setItem("user", JSON.stringify(user.data));
      return user;
    });
}

function refreshtoken(token) {
  return fetchWrapper
    .postWithoutToken(`${baseUrl}/Account/RefreshToken`, {
      RefreshToken: token,
    })
    .then((user) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      userSubject.next(user.data);
      localStorage.setItem("user", JSON.stringify(user.data));
      return user;
    });
}

function setToken() {
  return fetchWrapper
    .getWithoutToken(`/api/auth/session?update`)
    .then((result) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      //userSubject.next(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      return result;
    });
}

function logout() {
  let pathname = window.location.pathname;
  let callbackUrl =
    pathname === "/" || pathname === "/dashboard" || pathname === "/home"
      ? `/signin`
      : `/signin?callbackUrl=${encodeURIComponent(
          window.location.href
        )}&error=SessionRequired`;
  localStorage.removeItem("user");
  signOut({ callbackUrl: callbackUrl });
  // userSubject.next(null);
  return;
}

function changePassword(data) {
  return fetchWrapper
    .post(`${baseUrl}/auth/chnage-password`, data)
    .then((user) => {
      return user;
    });
}

function forgetPassword(email) {
  return fetchWrapper
    .postWithoutToken(`${baseUrl}/auth/forget-password/${email}`)
    .then((user) => {
      return user;
    });
}

function resetPassword(data) {
  return fetchWrapper
    .postWithoutToken(`${baseUrl}/auth/reset-password`, data)
    .then((user) => {
      return user;
    });
}

function verifyResetPasswordToken(data) {
  return fetchWrapper
    .postWithoutToken(`${baseUrl}/Account/verifyResetPasswordToken`, data)
    .then((user) => {
      return user;
    });
}

function sendVerifyEmail() {
  return fetchWrapper
    .post(`${baseUrl}/Account/SendVerifyEmail`)
    .then((user) => {
      return user;
    });
}

function reSendVerificationEmail(email) {
  return fetchWrapper
    .postWithoutToken(`${baseUrl}/Account/ReSendVerificationEmail/${email}`)
    .then((user) => {
      return user;
    });
}

function verifyEmail(token) {
  return fetchWrapper
    .postWithoutToken(`${baseUrl}/verify-email?token=${token}`)
    .then((user) => {
      return user;
    });
}
