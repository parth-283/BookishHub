import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'
import moment from 'moment';
import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
// const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const validateService = {
    checkDuplicateEmail,
    checkEmailExist
};


function checkDuplicateEmail(email) {

    return fetchWrapper.getWithoutToken(`${baseUrl}/Validate/CheckDuplicateEmail?email=${email}`)
        .then(result => {
            return result;
        });
}

function checkEmailExist(email) {

    return fetchWrapper.get(`${baseUrl}/Validate/CheckEmailExist?email=${email}`)
        .then(result => {
            return result;
        });
}