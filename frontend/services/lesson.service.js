import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'
import moment from 'moment';
import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const lessonService = {
    GetLessons,
    GetById,
    SaveLessonProgress,
    GetTotalLessonList,
    RestartCourse
};


function GetLessons(slug, nextLessonId) {

    return fetchWrapper.get(`${baseUrl}/Lesson/GetByCourse/${slug}?nextLessonId=${nextLessonId}`)
        .then(result => {
            return result;
        });
}

function GetById(lessonId) {

    return fetchWrapper.get(`${baseUrl}/Lesson/GetByLesson?lessonId=${lessonId}`)
        .then(result => {
            return result;
        });
}

function GetTotalLessonList(slug) {

    return fetchWrapper.get(`${baseUrl}/Lesson/GetLessons/${slug}`)
        .then(result => {
            return result;
        });
}

function SaveLessonProgress(data) {

    return fetchWrapper.post(`${baseUrl}/Lesson/SaveLessonProgress`, data)
        .then(result => {
            return result;
        });
}


function RestartCourse(courseId) {

    return fetchWrapper.put(`${baseUrl}/Lesson/RestartCourse/${courseId}`)
        .then(result => {
            return result;
        });
}