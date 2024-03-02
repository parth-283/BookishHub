import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'
import moment from 'moment';
import { fetchWrapper } from '../helpers';
import { isDebuggerStatement } from 'typescript';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
// const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const subscriptionService = {
    saveSubscriptionHistory,
    saveUserIndividualSubscribedPlan,
    getSubscriptionPlans,
    getTempSubscriptionDetail,
    saveTempSubscriptionHistory,
    getCurrentSubscriptionDetail,
    saveHistoryAndAssignFreePlan,
    getById,
    getByCorporateSubscriptionId,
    saveCorporateSubscriptionPlan,
    verifyCode,
    resendVerificationCode,
    checkDomainAlreadyExist,
    getCorporateSubscriptionUsers,
    removeUserFromCorporate,
    addUserToCorporate,
    getUserSubscriptionHistory,
    getCorporateSubscriptionDetails,
    createPaymentIntent,
    verifyPayment,
    cancelSubscription,
    getPaymentMethods,
    createSetupIntent,
    detachPaymentMethod,
    defaultPaymentMethod,
    CorporateLogin
};

function CorporateLogin(data) {
    return fetchWrapper.post(`${baseUrl}/Subscription/ConvertToCorporateAdmin`, data)
        .then(user => {
            return user;
        });
}

function getSubscriptionPlans(userIsLogin = false) {
    if (userIsLogin) {
        return fetchWrapper.get(`${baseUrl}/Subscription/GetSubscriptionPlans`)
            .then(result => {
                return result;
            });
    }
    else {
        return fetchWrapper.getWithoutToken(`${baseUrl}/Subscription/GetSubscriptionPlans`)
            .then(result => {
                return result;
            });
    }
}

function getCurrentSubscriptionDetail() {

    return fetchWrapper.get(`${baseUrl}/Subscription/GetCurrentSubscriptionDetail`)
        .then(result => {
            return result;
        });
}

function saveSubscriptionHistory(data) {

    return fetchWrapper.post(`${baseUrl}/Subscription/SaveSubscriptionHistory`, data)
        .then(result => {
            return result;
        });
}

function saveUserIndividualSubscribedPlan(data) {

    return fetchWrapper.post(`${baseUrl}/Subscription/saveUserIndividualSubscribedPlan`, data)
        .then(result => {
            return result;
        });
}

function getTempSubscriptionDetail(tempSubscriptionHistoryId) {

    return fetchWrapper.get(`${baseUrl}/Subscription/GetTempSubscriptionDetail/${tempSubscriptionHistoryId}`)
        .then(result => {
            return result;
        });
}

function saveTempSubscriptionHistory(data) {

    return fetchWrapper.post(`${baseUrl}/Subscription/SaveTempSubscriptionHistory`, data)
        .then(result => {
            return result;
        });
}

function saveHistoryAndAssignFreePlan(data) {

    return fetchWrapper.post(`${baseUrl}/Subscription/SaveHistoryAndAssignFreePlan`, data)
        .then(result => {
            return result;
        });
}

function getById(planId) {

    return fetchWrapper.get(`${baseUrl}/Subscription/GetById/${planId}`)
        .then(result => {
            return result;
        });
}

function getByCorporateSubscriptionId(corporateSubscriptionId) {

    return fetchWrapper.get(`${baseUrl}/Subscription/GetByCorporateSubscriptionId/${corporateSubscriptionId}`)
        .then(result => {
            return result;
        });
}

function saveCorporateSubscriptionPlan(data) {

    return fetchWrapper.post(`${baseUrl}/Subscription/SaveCorporateSubscriptionPlan`, data)
        .then(result => {
            return result;
        });
}

function verifyCode(data) {

    return fetchWrapper.post(`${baseUrl}/Subscription/VerifyCode`, data)
        .then(result => {
            return result;
        });
}

function resendVerificationCode(corporateSubscriptionId) {

    return fetchWrapper.post(`${baseUrl}/Subscription/ResendVerificationCode/${corporateSubscriptionId}`)
        .then(result => {
            return result;
        });
}

function checkDomainAlreadyExist(domainName) {

    return fetchWrapper.get(`${baseUrl}/Subscription/CheckDomainAlreadyExist?domainName=${domainName}`)
        .then(result => {
            return result;
        });
}

function getCorporateSubscriptionUsers(userSubscriptionId) {

    return fetchWrapper.get(`${baseUrl}/Subscription/GetCorporateSubscriptionUsers/${userSubscriptionId}`)
        .then(result => {
            return result;
        });
}

function removeUserFromCorporate(removeUserId) {

    return fetchWrapper.post(`${baseUrl}/Subscription/RemoveUserFromCorporate/${removeUserId}`)
        .then(result => {
            return result;
        });
}

function addUserToCorporate(email) {

    return fetchWrapper.post(`${baseUrl}/Subscription/AddUserToCorporate/${email}`)
        .then(result => {
            return result;
        });
}

function getUserSubscriptionHistory() {

    return fetchWrapper.get(`${baseUrl}/Subscription/GetUserSubscriptionHistory`)
        .then(result => {
            return result;
        });
}

function getCorporateSubscriptionDetails(corporateSubscriptionId) {

    return fetchWrapper.get(`${baseUrl}/Subscription/GetCorporateSubscriptionDetails/${corporateSubscriptionId}`)
        .then(result => {
            return result;
        });
}

function createPaymentIntent(data) {

    return fetchWrapper.post(`${baseUrl}/Subscription/CreatePaymentIntent`, data)
        .then(result => {
            return result;
        });
}

function verifyPayment(data) {

    return fetchWrapper.post(`${baseUrl}/Subscription/VerifyPayment`, data)
        .then(result => {
            return result;
        });
}

function cancelSubscription() {

    return fetchWrapper.post(`${baseUrl}/Subscription/CancelSubscription`)
        .then(result => {
            return result;
        });
}

function getPaymentMethods() {

    return fetchWrapper.get(`${baseUrl}/Subscription/GetPaymentMethods`)
        .then(result => {
            return result;
        });
}

function createSetupIntent() {

    return fetchWrapper.post(`${baseUrl}/Subscription/CreateSetupStripeIntent`)
        .then(result => {
            return result;
        });
}

function detachPaymentMethod(paymentMethodId) {

    return fetchWrapper.post(`${baseUrl}/Subscription/DetachPaymentMethod/${paymentMethodId}`)
        .then(result => {
            return result;
        });
}

function defaultPaymentMethod(paymentMethodId) {

    return fetchWrapper.post(`${baseUrl}/Subscription/DefaultPaymentMethod/${paymentMethodId}`)
        .then(result => {
            return result;
        });
}