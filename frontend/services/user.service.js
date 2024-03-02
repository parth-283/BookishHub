import getConfig from "next/config";
import moment from "moment";
import { fetchWrapper } from "../helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
// const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    // user: userSubject.asObservable(),
    // get userValue() { return userSubject.value },
    GetUserProfile,
    UpdateUserProfile,
    getUserExperience,
    getInstitutions,
    saveUserLanguage,
    saveUserSkills,
    saveWorkExperience,
    saveEducation,
    getUserJobPreference,
    saveUserJobPreference,
    GetUserHeaderInfo,
    saveEnquiry,
    saveDemoEnquiry,
    createPaymentIntent,
    rewardDetails,
    getRewardChartDetail,
    createStripeSubscription,
    cancelSubscription,
    getUpdatedXpPointModal,
    latestPremiumCourse,
    likePost,
    viewPost,
    getLockedList,
    getAvailableList,
    favPost,
    redeemVoucher,
    getRedeemedVoucher,
    GetAllOccupation,
    GetAllXPModel,
    getVoucherCode,
    UpdateProfileForCV,
    // ?NEW APIS
    GetCVProfile,
    GetWorkExperience,
    saveUserWorkExperience,
    deleteUserWorkExperience,
    getUserEducation,
    saveUserEducation,
    deleteUserEducation,
    getUserLanguage,
    saveCVUserLanguage,
    deleteUserLanguage,
    getUserSkillsList
};

function GetUserProfile() {
    return fetchWrapper.get(`${baseUrl}/User/GetUserProfile`).then((user) => {
        return user;
    });
}

function GetUserHeaderInfo() {
    return fetchWrapper.get(`${baseUrl}/User/GetUserHeaderInfo`).then((user) => {
        return user;
    });
}

function UpdateUserProfile(data) {
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

    if (data.country) {
        body.append("country.Id", data.country.id);
        body.append("country.Label", data.country.label);
        body.append("country.Name", data.country.name);
        body.append("country.Phonecode", data.country.phonecode);
        body.append("country.Sortname", data.country.sortname);
        body.append("country.Value", data.country.value);
    }

    if (data.state) {
        body.append("state.Country_id", data.state.country_id);
        body.append("state.Id", data.state.id);
        body.append("state.Label", data.state.label);
        body.append("state.Name", data.state.name);
        body.append("state.Value", data.state.value);
    }

    if (data.city) {
        body.append("city.Country_id", data.city.state_id);
        body.append("city.Id", data.city.id);
        body.append("city.Label", data.city.label);
        body.append("city.Name", data.city.name);
        body.append("city.Value", data.city.value);
    }

    return fetchWrapper
        .postWithFormData(`${baseUrl}/User/UpdateUserProfile`, body)
        .then((user) => {
            return user;
        });
}

function getUserExperience() {
    return fetchWrapper
        .get(`${baseUrl}/User/GetUserExperience`)
        .then((result) => {
            return result;
        });
}

function getInstitutions() {
    return fetchWrapper.get(`${baseUrl}/User/GetInstitutions`).then((result) => {
        return result;
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

function saveUserSkills(data) {
    var requestBody = { userSkillList: data };

    return fetchWrapper
        .post(`${baseUrl}/User/SaveUserSkills`, requestBody)
        .then((user) => {
            return user;
        });
}

function saveWorkExperience(data) {
    data.map((e, index) => {
        e.startDate = moment(e.startDate).format("yyyy-MM-DD");
        if (e.endDate) {
            e.endDate = moment(e.endDate).format("yyyy-MM-DD");
        }
    });

    var requestBody = { userWorkExperienceList: data };

    return fetchWrapper
        .post(`${baseUrl}/User/SaveUserWorkExperience`, requestBody)
        .then((user) => {
            return user;
        });
}

function saveEducation(data) {
    const body = new FormData();

    for (var i = 0; i < data.length; i++) {
        body.append(`UserEducationList[${i}].educationId`, data[i].educationId);
        body.append(`UserEducationList[${i}].institutionId`, data[i].institutionId);
        body.append(
            `UserEducationList[${i}].otherInstitution`,
            data[i].otherInstitution
        );
        body.append(
            `UserEducationList[${i}].startDate`,
            moment(data[i].startDate).format("yyyy-MM-DD")
        );

        if (data[i].endDate) {
            body.append(
                `UserEducationList[${i}].endDate`,
                moment(data[i].endDate).format("yyyy-MM-DD")
            );
        }

        body.append(`UserEducationList[${i}].isPresent`, data[i].isPresent);
        body.append(`UserEducationList[${i}].Qualification`, data[i].qualification);
        // body.append(`UserEducationList[${i}].file`, data[i].file);

        for (var j = 0; j < data[i].fileList.length; j++) {
            body.append(
                `UserEducationList[${i}].FileList[${j}].File`,
                data[i].fileList[j].file
            );
            body.append(
                `UserEducationList[${i}].FileList[${j}].FileName`,
                data[i].fileList[j].fileName
            );
            body.append(
                `UserEducationList[${i}].FileList[${j}].BlobName`,
                data[i].fileList[j].blobName
            );
        }
    }

    // var requestBody = { "userEducationList": data };

    return fetchWrapper
        .postWithFormData(`${baseUrl}/User/SaveUserEducation`, body)
        .then((user) => {
            return user;
        });
}

function getUserJobPreference() {
    return fetchWrapper
        .get(`${baseUrl}/User/GetUserJobPreference`)
        .then((result) => {
            return result;
        });
}

function GetAllOccupation() {
    return fetchWrapper
        .get(`${baseUrl}/JobTool/GetAllOccupation?onlyList=true`)
        .then((result) => {
            return result;
        });
}

function saveUserJobPreference(data) {
    return fetchWrapper
        .post(`${baseUrl}/User/SaveUserJobPreference`, data)
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

function createPaymentIntent(data) {
    return fetchWrapper
        .post(`${baseUrl}/User/CreatePaymentIntent`, data)
        .then((result) => {
            return result;
        });
}

function createStripeSubscription(data) {
    return fetchWrapper
        .post(`${baseUrl}/User/CreateStripeSubscription`, data)
        .then((result) => {
            return result;
        });
}

function cancelSubscription() {
    return fetchWrapper
        .post(`${baseUrl}/User/CancelSubscription`)
        .then((result) => {
            return result;
        });
}

function saveDemoEnquiry(data) {
    return fetchWrapper
        .postWithoutToken(`${baseUrl}/User/SaveDemoEnquiry`, data)
        .then((result) => {
            return result;
        });
}

function rewardDetails() {
    return fetchWrapper.get(`${baseUrl}/User/RewardDetails`).then((result) => {
        return result;
    });
}

function getRewardChartDetail(data) {
    return fetchWrapper
        .post(`${baseUrl}/User/GetRewardChartDetail`, data)
        .then((result) => {
            return result;
        });
}

function getUpdatedXpPointModal() {
    return fetchWrapper
        .get(`${baseUrl}/User/GetUpdatedXpPointModal`)
        .then((result) => {
            return result;
        });
}

function latestPremiumCourse() {
    return fetchWrapper
        .get(`${baseUrl}/Course/GetLatestPremiumCourse`)
        .then((result) => {
            return result;
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

function getLockedList(page, size) {
    return fetchWrapper.get(
        `${baseUrl}/Voucher/getLockedList?page=${page}&size=${size}`
    );
}

function getAvailableList(page, size) {
    return fetchWrapper.get(
        `${baseUrl}/Voucher/getAvailableList?page=${page}&size=${size}`
    );
}

function redeemVoucher(voucherId) {
    return fetchWrapper.post(`${baseUrl}/Voucher/RedeemVoucher`, { voucherId });
}

function getRedeemedVoucher(page, size) {
    return fetchWrapper.get(
        `${baseUrl}/Voucher/MyVoucherList?page=${page}&size=${size}`
    );
}

function GetAllXPModel() {
    return fetchWrapper.get(`${baseUrl}/User/GetUpdatedXpPointModal`);
}

function getVoucherCode(voucherId) {
    return fetchWrapper.put(`${baseUrl}/Voucher/GetVoucherCode/${voucherId}`);
}

function UpdateProfileForCV(data) {
    return fetchWrapper
        .post(`${baseUrl}/User/UpdateProfileForCV`, data)
        .then((result) => {
            return result;
        });
}

/*
 *
 * API FOR CV
 * 
 */

function GetCVProfile() {
    return fetchWrapper.get(`${baseUrl}/User/GetCVProfile`);
}

/*
 * WORK EXPERIENCE 
 */

function GetWorkExperience() {
    return fetchWrapper.get(`${baseUrl}/User/GetWorkExperience`);
}

function saveUserWorkExperience(data) {
    return fetchWrapper
        .post(`${baseUrl}/User/SaveUserWorkExperience1`, data)
        .then((user) => {
            return user;
        });
}


function deleteUserWorkExperience(id) {
    return fetchWrapper.delete(`${baseUrl}/User/DeleteUserWorkExperience/${id}`).then((result) => {
        return result;
    });
}

/*
 * EDUCATION
 */

function getUserEducation() {
    return fetchWrapper.get(`${baseUrl}/User/GetUserEducation`);
}

function saveUserEducation(data) {
    const body = new FormData();
    body.append("educationId", data.educationId);
    body.append("institutionId", data.institutionId);
    body.append("otherInstitution", data.otherInstitution);
    data.startDate && body.append("startDate", data.startDate);
    data.endDate && body.append("endDate", data.endDate);
    body.append("isPresent", data.isPresent);
    body.append("Qualification", data.qualification);

    data.fileList?.length > 0 && data.fileList.map((item) => {
        body.append("File", item.file);
        body.append("FileName", item.fileName);
        body.append("BlobName", item.blobName);
    });
    return fetchWrapper
        .postWithFormData(`${baseUrl}/User/SaveUserEducation1`, body)
        .then((user) => {
            return user;
        });
}

function deleteUserEducation(id) {
    return fetchWrapper.delete(`${baseUrl}/User/DeleteUserEducation/${id}`).then((result) => {
        return result;
    });
}

/*
 * LANGUAGE
 */

function getUserLanguage() {
    return fetchWrapper.get(`${baseUrl}/User/GetUserLanguage`);
}

function saveCVUserLanguage(data) {
    return fetchWrapper
        .post(`${baseUrl}/User/SaveUserLanguage1`, data)
        .then((user) => {
            return user;
        });
}

function deleteUserLanguage(id) {
    return fetchWrapper.delete(`${baseUrl}/User/DeleteUserLanguage/${id}`).then((result) => {
        return result;
    });
}
/* Skills */

function getUserSkillsList() {
    return fetchWrapper.get(`${baseUrl}/User/GetUserSkills`).then((result) => {
        return result;
    });
}