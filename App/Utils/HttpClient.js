const BASE_URL = 'https://app.screenzy.in/screenzyapp/api/';

const get = (endpoint, params = null) => {
    return request(endpoint, params);
};

const post = (endpoint, params) => {
    return request(endpoint, params, 'POST');
};

const put = (endpoint, params) => {
    return request(endpoint, params, 'PUT');
};

const Delete = (endpoint, params) => {
    return request(endpoint, params, 'DELETE');
};


export default {
    get,
    post,
    put,
    Delete
};
