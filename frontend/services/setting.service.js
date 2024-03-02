import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'
import moment from 'moment';
import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const settingService = {
    get
};


function get() {

    return fetchWrapper.getWithoutToken(`${baseUrl}/Setting`)
        .then(result => {
            return result;
        });
}