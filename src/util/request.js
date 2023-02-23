import axios from 'axios';

const request = axios.create({
    baseURL: process.env.API_BASE,
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
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
