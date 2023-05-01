import * as request from '~/util/request_modify';
//** get request - retrieve devices from server */
export const getDeviceList = async (btsID,limit=30, type, name, status) => {
    // try {
        const res = await request.get(`devices`, {
            params: {
                btsID,
                limit,
                type,
                name,
                status,
            },
        });
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
};

//** post request - add device to server */
export const addDevice = async (data) => {
    // try {
        const res = await request.post('devices', {
            ...data,
        });
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
};

//** get request - get specific device item from server */

export const getDevice = async (deviceId) => {
    // try {
        const res = await request.get(`devices/${deviceId}`);
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
};

//** delete request - delete specific device item from server */

export const delDevice = async (deviceId) => {
    // try {
        const res = await request.del(`devices/${deviceId}`);
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
};

//** update request - update specific device item from server */

export const updateDevice = async (deviceId, data) => {
    // try {
        const res = await request.update(`devices/${deviceId}`, {
            ...data,
        });
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
};

export const updateStatusDevice = async (deviceId, value) =>{
    // try {
        const res = await request.post('signals/device', {
            'value':value,
            'deviceID': deviceId
        });
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
}

export const getAverageValue = async (deviceId, date, deviceType, attr="value") =>{
    // console.log("deviceType: ", deviceType)
    let attribute = attr;
    if(deviceType===0 && attr==="value"){
        attribute='vcel_1'
    }
    // console.log("attribute: ", attribute)
    // try {
        const res = await request.get(`devices/${deviceId}/avg`,{
        params: {
            date,
            attribute
          }});
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
}

//** get request - get specific device item from server */

export const getDevicePin =  () => {
    // try {
        const res =  request.get(`devices?type=0`);
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
};