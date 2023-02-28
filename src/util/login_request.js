import axios from 'axios';

const login_request = axios.create({
    baseURL: 'http://203.162.10.118:3000/v1/',
});

export const get = async (path, options = {}) => {
    const response = await login_request.get(path,options);
    return response;
};

export const post = async (path, options = {}) => {
    const response = await login_request.post(path, options);
    return response;
};

export default login_request;
