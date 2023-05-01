import axios from 'axios';
import { getAccessToken, getRefreshToken } from '~/util/auth';
import { BASE_URL } from '~/config_env';

const request = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_URL}`
});

console.log(`Bearer ${getAccessToken().token}`);
// ** For Refreshing Token
let isAlreadyFetchingAccessToken = false;
let subscribers = [];
//**============================================================== */
// xu ly truoc khi xuong server
request.interceptors.request.use(
    (config) => {
        // console.log("config: ", config)
        const accessToken = getAccessToken().token;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        // console.log("1: error = ",error)
        Promise.reject(error)
    }
);

//xu ly sau khi response tu server
request.interceptors.response.use(
    (response) => {
        // console.log("response interceptor: ", response)
        return response
    },
    (error) => {
        // console.log('error interceptor: ', error);
        const { config, response } = error;
        const originalRequest = config;
        if (response && response.status === 401) {
            if (!isAlreadyFetchingAccessToken) {
                isAlreadyFetchingAccessToken = true;
                refreshToken().then((response) => {
                    const { access, refresh } = response.data;
                    isAlreadyFetchingAccessToken = false;
                    //update accessToken in localStorage
                    // console.log('new refresh token: ', refresh);
                    localStorage.setItem('accessToken', JSON.stringify(access));
                    localStorage.setItem('refreshToken', JSON.stringify(refresh));
                    onAccessTokenFetched(access);
                })
                .catch((err)=>{
                    // console.log("err: ", err)
                    if(err.response.status === 404){
                        // console.log("expired")
                        window.location.href = '/login';
                    }
                    return Promise.reject(err); 
                })
            }

            const retryOriginalRequest = new Promise((resolve) => {
                addSubscriber((accessToken) => {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    resolve(request(originalRequest));
                });
            });
            // console.log('hoanv-refreshtoken when expire: ', retryOriginalRequest);
            return retryOriginalRequest;
        }
        return Promise.reject(error);
    },
);
function onAccessTokenFetched(accessToken) {
    subscribers = subscribers.filter((callback) => callback(accessToken));
}

function addSubscriber(callback) {
    subscribers.push(callback);
}
function refreshToken() {
    return axios.post('http://45.118.146.179:3000/v1/auth/refresh-tokens', {
        refreshToken: getRefreshToken().token,
    });
}
// async function refreshToken() {
//     const response = await request.post('auth/refresh-tokens', {
//         refreshToken: getRefreshToken().token,
//     });
//     // console.log(response.data);
//     return response.data;
// }
//**============================================================== */

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
export const put = async (path, options = {}) =>{
    const response = await request.put(path, options);
    return response; 
}
export default request;
