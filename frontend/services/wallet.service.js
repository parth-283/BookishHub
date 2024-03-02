import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'
import moment from 'moment';
import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const walletService = {
    getWalletHistory,
    payoutRequest
};


function getWalletHistory() {

    return fetchWrapper.get(`${baseUrl}/Wallet/GetWalletHistory`)
        .then(result => {
            return result;
        });
}

function payoutRequest(data) {

    return fetchWrapper.post(`${baseUrl}/Wallet/PayoutRequest`, data)
        .then(result => {
            return result;
        });
}