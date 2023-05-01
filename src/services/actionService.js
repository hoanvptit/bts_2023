import * as request from '~/util/request_modify';

//** get request - retrieve notifications from server */
export const getActionList = async (deviceID,page) => {
    // try {
        const res = await request.get(`actions?sortBy=date:desc&page=${page}&deviceID=${deviceID}`);
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
};

