import * as request from '~/util/request';

//** get request - retrieve notifications from server */
export const getNotificationList = async () => {
    // try {
        const res = await request.get(`notifications`);
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
};


//** get request - get specific notification item from server */

export const getNotification = async (notificationId) => {
    // try {
        const res = await request.get(`notification/${notificationId}`);
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
};
