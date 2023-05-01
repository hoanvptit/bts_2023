import * as request from '~/util/request_modify';
import { getAccessToken } from '~/util/auth'; 
//** get request - retrieve users from server */
export const getUserList = async () => {
    // const acc_token = getAccessToken();
    // try {
        const res = await request.get(`users`);
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
};

//** post request - add user to server */
export const addUser = async (data) => {
    // try {
        const res = await request.post('users', {
            ...data,
        });
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
};

//** get request - get specific user item from server */

export const getUser = async (userId) => {
    // try {
        const res = await request.get(`users/${userId}`);
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
};

//** delete request - delete specific user item from server */

export const delUser = async (userId) => {
    // try {
        const res = await request.del(`users/${userId}`);
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
};

//** update request - update specific User item from server */

export const updateUser = async (userId, data) => {
    // try {
        const res = await request.update(`users/${userId}`, {
            ...data,
        });
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
};
