import getConfig from 'next/config';
import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const jobService = {
    findJobs,
    GetAllOccupation,
    addFavorite,
    courseByJobSkills,
    getJobByJobToolSlug,
    getJobFilter,
    getAllSkill,
    SaveJobApplication,
    AllCourseByJobSkills,
    checkCVStatus
};


function GetAllOccupation() {
    return fetchWrapper.get(`${baseUrl}/JobTool/GetAllOccupation`)
        .then(result => {
            return result;
        });
}

function findJobs(data) {
    let body = {
        latitude: data?.location?.lat,
        longitude: data?.location?.lng,
        occupationeCode: data?.code,
        locationList: data?.locationList,
        occupationeLevel: -1,
        key: data?.key,
        page: data?.pagelength,
        size: data?.size,
        CurrentJobId: parseInt(data?.CurrentJobId)
    }
    return fetchWrapper.post(`${baseUrl}/JobTool/FindJobs`, body)
        .then(result => {
            return result;
        });
}

function getJobByJobToolSlug(slug) {
    return fetchWrapper.get(`${baseUrl}/JobTool/GetJob/${slug}`)
        .then(result => {
            return result;
        });
}

function addFavorite(id, add) {
    let body = {
        jobToolId: id,
        isAddToFavourite: add
    }
    return fetchWrapper.post(`${baseUrl}/JobTool/AddToJobFavourite`, body)
        .then(result => {
            return result;
        });
}

function courseByJobSkills(body) {
    return fetchWrapper.post(`${baseUrl}/JobTool/GetCourseByJobSkills`, body)
        .then(result => {
            return result;
        });
}

function AllCourseByJobSkills(body) {
    return fetchWrapper.post(`${baseUrl}/JobTool/GetCourseAllCourseByJobSkills`, body)
        .then(result => {
            return result;
        });
}

function getJobFilter(filter) {

    return fetchWrapper.post(`${baseUrl}/JobTool/FindJobs`, filter)
        .then(result => {
            return result;
        });
}

function SaveJobApplication(jobGuid) {

    return fetchWrapper.post(`${baseUrl}/JobTool/SaveJobApplication`, { jobGuid })
        .then(result => {
            return result;
        });
}

function getAllSkill() {
    return fetchWrapper.get(`${baseUrl}/JobTool/GetAllSkill`)
        .then(result => {
            return result;
        });
}

function checkCVStatus() {
    return fetchWrapper.get(`${baseUrl}/JobTool/CheckCVStatus`);
}