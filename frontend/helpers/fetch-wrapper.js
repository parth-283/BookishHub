import { accountService } from '../services/account.service';

export const fetchWrapper = {
    get,
    post,
    postWithFormData,
    put,
    postWithoutToken,
    getWithoutToken,
    getWithoutTokenForSitemap,
    delete: _delete
};

function fatchhandler(url, requestOptions) {
    return fetch(url, requestOptions)
        .then(function handleResponse(response) {
            return response.text().then(text => {
                if (!response.ok) {
                    if (response.status == 401) {
                        var user1 = JSON.parse(localStorage.getItem('user'));
                        if (user1 && user1.refreshToken) {
                            return accountService.refreshtoken(user1.refreshToken).then(data => {
                                const requestOptions1 = {
                                    method: requestOptions.method,
                                    headers: authHeader(url),
                                    data: requestOptions.data
                                };
                                return fatchhandler(url, requestOptions1);
                            });
                        }
                        else {
                            //Router.push("/login");
                            accountService.logout();
                        }

                    }
                    else if ([403, 302].includes(response.status)) {
                        // 
                        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                        accountService.logout();
                        // Router.push("/login");
                    }
                    const data = text && JSON.parse(text);
                    const error = (data && data.errorMessage) || response.statusText || data.title;
                    return Promise.reject(error);
                }
                const data = text && JSON.parse(text);
                return data;
            });
        });
}

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    return fatchhandler(url, requestOptions)
}

function getWithoutToken(url) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    };
    return fatchhandler(url, requestOptions)
}

function getWithoutTokenForSitemap(url) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Referer': process.env.REFERER }
    };
    return fatchhandler(url, requestOptions)
}

function postWithoutToken(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        // credentials: 'include', 
        body: JSON.stringify(body)
    };
    return fatchhandler(url, requestOptions)
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        // credentials: 'include', 
        body: JSON.stringify(body)
    };
    return fatchhandler(url, requestOptions)
}

function postWithFormData(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(url) }, // 'Content-Type': 'multipart/form-data',
        // credentials: 'include', 
        body: body
    };
    return fatchhandler(url, requestOptions)
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fatchhandler(url, requestOptions)
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return fatchhandler(url, requestOptions)
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    // const user = accountService.userValue;
    // const isLoggedIn = user && user.accessToken;
    // const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    // if (isLoggedIn && isApiUrl) {
    //     return { Authorization: `Bearer ${localStorage.getItem('user')}` };
    // } else {
    //     return {};
    // }
    var user = JSON.parse(localStorage.getItem('user'));

    return { Authorization: `Bearer ${user?.accessToken || user?.access_token}` };
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if ([401, 403].includes(response.status) && accountService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                //accountService.logout();
            }

            const error = (data && data.errorMessage) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function getImageArray(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    return fatchhandler(url, requestOptions)
}


