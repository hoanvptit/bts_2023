import { LOGIN, LOGOUT, ADD_BTS, DEL_BTS, EDIT_BTS, ADD_DEVICE, DEL_DEVICE, EDIT_DEVICE } from './constant';
//** Actions for authentication */
export const logIn = (payload) => {
    console.log("in logIn function: ", payload)
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
