import { type } from '@testing-library/user-event/dist/type';
import {
    LOGIN,
    LOGOUT,
    //BTS action
    SET_BTS,
    SET_LIST_BTS,
    ADD_BTS,
    DEL_BTS,
    EDIT_BTS,
    //Device action
    SET_DEVICE,
    UPDATE_STATUS_DEVICE,
    SET_LIST_DISPLAY_DEVICE,
    SET_LIST_ALL_DEVICE,
    SET_TYPE_DISPLAY_DEVICE,
    ADD_DEVICE,
    DEL_DEVICE,
    EDIT_DEVICE,
    //notify action
    SET_LIST_ALL_NOTI,
    SET_LIST_ALL_DISPLAY_TYPE_NOTI,
    SET_LIST_DISPLAY_NOTI,
    SET_CHECKED_LIST,
    SET_CLASSIFY_TYPE,
    SET_LIST_ALL_NOTI_UNREAD,
    SET_LIST_ALL_DISPLAY_TYPE_NOTI_UNREAD,
    SET_LIST_DISPLAY_NOTI_UNREAD,
    //device action
    SET_LIST_ALL_ACTIONS,
    SET_LIST_DISPLAY_ACTIONS,
    // fetch data action
    FETCH_SUCCESS,
    FETCH_ERROR,
    SET_LIST_NOTI_BY_BTS,
} from './constant';
//** Actions for authentication */
export const logIn = (payload) => {
    console.log('in logIn function: ', payload);
    return {
        type: LOGIN,
        payload,
    };
};

export const logOut = (payload) => {
    return {
        type: LOGOUT,
        payload,
    };
};

//** Actions for managing bts */
export const setListBtsAction = (payload) => {
    return {
        type: SET_LIST_BTS,
        payload,
    };
};

export const setBtsAction = (payload) => {
    return {
        type: SET_BTS,
        payload,
    };
};
export const addBtsAction = (payload) => {
    return {
        type: ADD_BTS,
        payload,
    };
};

export const delBtsAction = (payload) => {
    return {
        type: DEL_BTS,
        payload,
    };
};
export const editBtsAction = (payload) => {
    return {
        type: EDIT_BTS,
        payload,
    };
};
//** Actions for managing device */

export const setDeviceAction = (payload) => {
    return {
        type: SET_DEVICE,
        payload,
    };
};
export const addDeviceAction = (payload) => {
    return {
        type: ADD_DEVICE,
        payload,
    };
};
export const delDeviceAction = (payload) => {
    return {
        type: DEL_DEVICE,
        payload,
    };
};

export const editDeviceAction = (payload) => {
    return {
        type: EDIT_DEVICE,
        payload,
    };
};
export const updateStatusDeviceAction = (payload) => {
    return {
        type: UPDATE_STATUS_DEVICE,
        payload,
    };
};
export const setTypeDisplayDeviceAction = (payload) => {
    return {
        type: SET_TYPE_DISPLAY_DEVICE,
        payload,
    };
};
export const setListDisplayDeviceAction = (payload) => {
    return {
        type: SET_LIST_DISPLAY_DEVICE,
        payload,
    };
};
export const setListAllDeviceAction = (payload) => {
    return {
        type: SET_LIST_ALL_DEVICE,
        payload,
    };
};

//** Actions for managing notifications */
export const setListAllNotifyAction = (payload) => {
    return {
        type: SET_LIST_ALL_NOTI,
        payload,
    };
};

export const setListNotifyByBtsIdAction = (payload) => {
    return {
        type: SET_LIST_NOTI_BY_BTS,
        payload,
    };
};

export const setListAllDisplayTypeNotifyAction = (payload) => {
    return {
        type: SET_LIST_ALL_DISPLAY_TYPE_NOTI,
        payload,
    };
};

export const setListDisplayNotifyAction = (payload) => {
    return {
        type: SET_LIST_DISPLAY_NOTI,
        payload,
    };
};

export const setCheckedListAction = (payload) => {
    return {
        type: SET_CHECKED_LIST,
        payload,
    };
};
export const setClassifyTypeAction = (payload) =>{
    return {
        type: SET_CLASSIFY_TYPE,
        payload
    }
}
export const setListAllNotifyUnreadAction = (payload) => {
    return {
        type: SET_LIST_ALL_NOTI_UNREAD,
        payload,
    };
};

export const setListAllDisplayTypeNotifyUnreadAction = (payload) => {
    return {
        type: SET_LIST_ALL_DISPLAY_TYPE_NOTI_UNREAD,
        payload,
    };
};

// export const setListDisplayNotifyUnreadAction = (payload) => {
//     return {
//         type: SET_LIST_DISPLAY_NOTI_UNREAD,
//         payload,
//     };
// };
//**Actions for managing actions on/off of a devices */

//** Actions for managing notifications */
export const setListAllDeivceActions_Action = (payload) => {
    return {
        type: SET_LIST_ALL_ACTIONS,
        payload,
    };
};

export const setListDisplayDeivceActions_Action = (payload) => {
    return {
        type: SET_LIST_DISPLAY_ACTIONS,
        payload,
    };
};
//**Action for fetching data */

export const fetchSuccessAction = (payload) => {
    return {
        type: FETCH_SUCCESS,
        payload,
    };
};

export const fetchErrorAction = (payload) => {
    return {
        type: FETCH_ERROR,
        payload,
    };
};
