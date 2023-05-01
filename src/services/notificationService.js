import * as request from '~/util/request_modify';

//** get request - retrieve notifications from server */
export const getNotificationList = async (limit) => {
        const res = await request.get(`notifications?sortBy=date:desc&limit=${limit}`);
        return res;
    
};

export const getNotificationListByBTSId = async (btsId) => {
    try {
        const res = await request.get(`notifications?btsID=${btsId}`);
        return res;
    } catch (error) {
        console.log(error);
        // alert("Có lỗi xảy ra: ", )
    }
};


//** get request - get specific notification item from server */

export const getNotification = async (notificationId) => {
    // try {
        const res = await request.get(`notifications/${notificationId}`);
        return res;
    // } catch (error) {
    //     console.log(error);
    // }
};
export const getNotificationUnreadList = async(limit) =>{
    const res = await request.get(`notifications?sortBy=date:desc&limit=${limit}&unread=true`);
    return res;
}
//** put notification as read to server */
export const putMarkRead = async (notificationId) =>{
    const res = await request.put(`notifications/${notificationId}/markRead`)
    return res
}