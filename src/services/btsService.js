import * as request from '~/util/request';

//** get request - retrieve bts from server */
export const getBtsList = async () => {
    try {
        const res = await request.get(`btss`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

//** post request - add bts to server */
export const addBts = async (data) => {
    try {
        const res = await request.post('btss', {
            ...data,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

//** get request - get specific bts item from server */

export const getBts = async (btsId) => {
    try {
        const res = await request.get(`btss/${btsId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

//** delete request - delete specific bts item from server */

export const delBts = async (btsId) => {
    try {
        const res = await request.del(`btss/${btsId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

//** update request - update specific bts item from server */

export const updateBts = async (btsId, data) => {
    try {
        const res = await request.update(`btss/${btsId}`, {
            ...data,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
