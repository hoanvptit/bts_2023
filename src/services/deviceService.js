import * as request from '~/util/request';
//** get request - retrieve devices from server */
export const getDeviceList = async (btsID, type, name, status) => {
    try {
        const res = await request.get(`devices`, {
            params: {
                btsID,
                type,
                name,
                status,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

//** post request - add device to server */
export const addDevice = async (data) => {
    try {
        const res = await request.post('devices', {
            ...data,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

//** get request - get specific device item from server */

export const getDevice = async (deviceId) => {
    try {
        const res = await request.get(`devices/${deviceId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

//** delete request - delete specific device item from server */

export const delDevice = async (deviceId) => {
    try {
        const res = await request.del(`devices/${deviceId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

//** update request - update specific device item from server */

export const updateDevice = async (deviceId, data) => {
    try {
        const res = await request.update(`devices/${deviceId}`, {
            ...data,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
