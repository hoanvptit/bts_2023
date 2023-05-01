import axios from 'axios';
import { BASE_URL } from '~/config_env';
const login_request = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_URL}`
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
