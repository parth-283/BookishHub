import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'
import moment from 'moment';
import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const dashboardService = {
    getCourseProgressDetail
};


function getCourseProgressDetail() {

    return fetchWrapper.get(`${baseUrl}/Dashboard/CourseProgressDetail`)
        .then(result => {
            return result;
        });
}