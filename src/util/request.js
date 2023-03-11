import axios from 'axios';
import { getAccessToken, getRefreshToken, isAccessTokenExpire } from '~/util/auth';

const request = axios.create({
    baseURL: 'http://45.124.84.133:3000/v1/',
});

request.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken().token}`;

const refreshToken = async (url) => {
    await axios
        .post(url, {
            refreshToken: getRefreshToken().token,
        })
        .then((res) => {
            const tokens = res.data;
            console.log("response refresh token: ", tokens)
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.setItem('accessToken', JSON.stringify(tokens.access));
            localStorage.setItem('refreshToken', JSON.stringify(tokens.refresh));
        });
};


console.log(`Bearer ${getAccessToken().token}`);
export const get = async (path, options = {}) => {
    // console.log('expire: ', isAccessTokenExpire());
    if (isAccessTokenExpire()) {
        refreshToken('http://45.124.84.133:3000/v1/auth/refresh-tokens');
    }
    const response = await request.get(path, options);
    return response;
};

export const post = async (path, options = {}) => {
    console.log('expire: ', isAccessTokenExpire());
    if (isAccessTokenExpire()) {
        refreshToken('http://45.124.84.133:3000/v1/auth/refresh-tokens');
    }
    const response = await request.post(path, options);
    return response;
};

export const del = async (path, options = {}) => {
    console.log('expire: ', isAccessTokenExpire());
    if (isAccessTokenExpire()) {
        refreshToken('http://45.124.84.133:3000/v1/auth/refresh-tokens');
    }
    const response = await request.delete(path, options);
    return response;
};
export const update = async (path, options = {}) => {
    console.log('expire: ', isAccessTokenExpire());
    if (isAccessTokenExpire()) {
        refreshToken('http://45.124.84.133:3000/v1/auth/refresh-tokens');
    }
    const response = await request.patch(path, options);
    return response;
};
export default request;
