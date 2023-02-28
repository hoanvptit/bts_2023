import axios from 'axios';
import { getAccessToken } from '~/util/auth';

const acc_token = getAccessToken();
const request = axios.create({
    baseURL: 'http://203.162.10.118:3000/v1/',
});

request.defaults.headers.common['Authorization'] = `Bearer ${acc_token.token}`;
console.log(`Bearer ${acc_token.token}`)
export const get = async (path, options = {}) => {
    const response = await request.get(path,options);
    return response;
};

export const post = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response;
};

export const del = async (path, options = {}) => {
    const response = await request.delete(path, options);
    return response;
};
export const update = async (path, options = {}) => {
    const response = await request.patch(path, options);
    return response;
};
export default request;
