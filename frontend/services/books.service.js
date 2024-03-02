import getConfig from "next/config";
import { fetchWrapper } from "../helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
// const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const booksService = {
  getBooks,
};

function getBooks(isBootCamp) {
  return fetchWrapper.getWithoutToken(`${baseUrl}/books`).then((result) => {
    return result;
  });
}

function getCategories(isBootCamp) {
  return fetchWrapper
    .getWithoutToken(`${baseUrl}/Category/GetCategory?isBootCamp=${isBootCamp}`)
    .then((result) => {
      return result;
    });
}

function getRandomCategories() {
  return fetchWrapper
    .getWithoutToken(`${baseUrl}/Category/GetRandomCategory?size=4`)
    .then((result) => {
      return result;
    });
}

function getCategoriesBootCamp(slug) {
  return fetchWrapper
    .get(`${baseUrl}/Category/GetBootCampCourses/${slug}`)
    .then((result) => {
      return result;
    });
}

function GetBootCampList(isBootCamp) {
  return fetchWrapper
    .get(`${baseUrl}/Category/GetCategory?isBootCamp=${isBootCamp}`)
    .then((result) => {
      return result;
    });
}

function getCategoriesFreeCourse(
  id,
  page,
  size,
  key,
  keyword,
  IsProgress = false
) {
  return fetchWrapper
    .get(
      `${baseUrl}/Category/GetCoursesByCategory/${id}?page=${page}&size=${size}&key=${key}&keyword=${keyword}&IsProgress=${IsProgress}`
    )
    .then((result) => {
      return result;
    });
}

function getJourneyCategories() {
  return fetchWrapper
    .getWithoutToken(`${baseUrl}/Course/GetJourneyCategories`)
    .then((result) => {
      return result;
    });
}

function getCourses(
  keyword,
  categoryId,
  key,
  page,
  size,
  journeyCourses = false
) {
  return fetchWrapper
    .getWithoutToken(
      `${baseUrl}/Course/GetCourses?keyword=${keyword}&categoryId=${categoryId}&key=${key}&Page=${page}&Size=${size}&journeyCourses=${journeyCourses}`
    )
    .then((result) => {
      return result;
    });
}

function getFavoriteCourses(filter) {
  return fetchWrapper
    .get(
      `${baseUrl}/Course/GetFavCourses?key=${filter.key}&Page=${filter.page}&Size=${filter.size}`
    )
    .then((result) => {
      return result;
    });
}

function GetCoursesByCategoryId(
  keyword,
  categoryId,
  key,
  page,
  size,
  journeyCourses = false
) {
  // return fetchWrapper.getWithoutToken(`${baseUrl}/Course/GetCoursesByCategoryId?keyword=${keyword}&categoryId=${categoryId}&key=${key}&Page=${page}&Size=${size}&journeyCourses=${journeyCourses}`)
  //     .then(result => {
  //         return result;
  //     });
  return fetchWrapper
    .get(
      `${baseUrl}/Category/GetCoursesByCategory/${categoryId}?keyword=${keyword}&key=${key}&Page=${page}&Size=${size}&journeyCourses=${journeyCourses}`
    )
    .then((result) => {
      return result;
    });
}

function getCoursesByCategory(keyword, categoryId, key, page, size) {
  return fetchWrapper
    .get(
      `${baseUrl}/Course/getCoursesByCategory/${categoryId}?keyword=${keyword}&key=${key}&Page=${page}&Size=${size}`
    )
    .then((result) => {
      return result;
    });
}

function GetBySlug(slug, withToken) {
  if (withToken) {
    return fetchWrapper
      .get(`${baseUrl}/Course/GetBySlug/${slug}`)
      .then((result) => {
        return result;
      });
  } else {
    return fetchWrapper
      .getWithoutToken(`${baseUrl}/Course/GetBySlug/${slug}`)
      .then((result) => {
        return result;
      });
  }
}

function saveCourseFeedback(data) {
  return fetchWrapper
    .post(`${baseUrl}/Course/SaveCourseFeedback`, data)
    .then((result) => {
      return result;
    });
}

function getFeedbacks() {
  return fetchWrapper
    .getWithoutToken(`${baseUrl}/Course/GetCourseFeedbacks`)
    .then((result) => {
      return result;
    });
}

function getCompletedCourses() {
  return fetchWrapper
    .get(`${baseUrl}/Course/GetCompletedCourses`)
    .then((result) => {
      return result;
    });
}

function getProgressCourses() {
  return fetchWrapper
    .get(`${baseUrl}/Course/GetProgressCourses`)
    .then((result) => {
      return result;
    });
}

function getRandomCourses(size) {
  // return fetchWrapper.get(`${baseUrl}/Course/GetCoursesByCategoryId?keyword=&categoryId=0&key=&Page=1&Size=${size}&journeyCourses=false`)
  return fetchWrapper
    .get(
      `${baseUrl}/Category/GetCoursesByCategory/0?key=&Page=1&Size=${size}&journeyCourses=false&IsTrending=true`
    )
    .then((result) => {
      return result;
    });
}

function getBannerAds() {
  return fetchWrapper.get(`${baseUrl}/BannerAds/GetAll`).then((result) => {
    return result;
  });
}

function getLastestProgress(size) {
  // return fetchWrapper.get(`${baseUrl}/Course/GetCoursesByCategoryId?keyword=&categoryId=0&key=&Page=1&Size=${size}&journeyCourses=false`)
  return fetchWrapper
    .get(`${baseUrl}/Category/GetLastProgress`)
    .then((result) => {
      return result;
    });
}

function getCategoriesForSitemap() {
  return fetchWrapper
    .getWithoutTokenForSitemap(`${baseUrl}/Category/GetCategoryForSitemap`)
    .then((result) => {
      return result;
    });
}

function getCoursesForSitemap() {
  return fetchWrapper
    .getWithoutTokenForSitemap(`${baseUrl}/Course/GetCoursesForSitemap`)
    .then((result) => {
      return result;
    });
}

function checkFeedbackAlreadySubmitted(courseId) {
  return fetchWrapper
    .post(`${baseUrl}/Course/CheckFeedbackSubmitted/${courseId}`)
    .then((result) => {
      return result;
    });
}

function convertMinutesToHour(totalNumberOfMinutes) {
  if (totalNumberOfMinutes < 60) {
    return `${totalNumberOfMinutes} minutes`;
  } else {
    const hours = Math.ceil(totalNumberOfMinutes / 60);
    return `${hours} hours`;
  }
}

function getLockedHours(endtime) {
  let timeString = "";
  if (endtime) {
    const utcTime = new Date(endtime + "Z");
    const currentTime = new Date();
    const timeDifferenceInMilliseconds = utcTime - currentTime;
    const hours = Math.ceil(timeDifferenceInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.ceil(timeDifferenceInMilliseconds / (1000 * 60));
    if (hours < 1) {
      timeString = minutes <= 1 ? minutes + " minutes" : minutes + " minute";
    } else {
      timeString = hours <= 1 ? hours + " hour" : hours + " hours";
    }
  }
  return timeString;
}

function handleRedirectCourse(id, locked) {
  if (!locked) {
    router.push("/course-preview/" + id);
  }
}

function compareUnlockTime(endtime) {
  if (endtime) {
    const utcTime = new Date(endtime + "Z");
    const currentTime = new Date();
    const timeDifferenceInMilliseconds = utcTime - currentTime;
    const hours = Math.ceil(timeDifferenceInMilliseconds / (1000 * 60 * 60));
    return hours <= 0 ? true : false;
  }
  return false;
}

function getButtonText(courseData) {
  if (courseData.isTimeOutLocked) {
    return "Locked";
  } else if (courseService.compareUnlockTime(courseData?.unLockTime)) {
    if (courseData.isTempCompleted) {
      if (courseData.noOfAttempt >= 3)
        return courseService.convertMinutesToHour(
          courseData.totalNumberOfMinutes
        );
      else return "Retry";
    }
  } else if (courseData.isTempCompleted) {
    return "Retry";
  } else {
    return courseService.convertMinutesToHour(courseData.totalNumberOfMinutes);
  }
  // if (courseData.isTimeOutLocked || courseService.compareUnlockTime(courseData?.unLockTime)) {
  //   if (courseData.noOfAttempt >= 3 && courseData.isTempCompleted)
  //     return courseService.convertMinutesToHour(courseData.totalNumberOfMinutes)
  //   else
  //     return 'Locked';
  // } else {
  //   if ((courseData.isTempCompleted)) {
  //     return 'Retry';
  //   } else {
  //     return courseService.convertMinutesToHour(courseData.totalNumberOfMinutes)
  //   }
  // }
}
