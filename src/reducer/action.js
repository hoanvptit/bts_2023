import { LOGIN, LOGOUT, ADD_BTS, DEL_BTS, EDIT_BTS, ADD_DEVICE, DEL_DEVICE, EDIT_DEVICE } from './constant';
//** Actions for authentication */
export const logIn = (payload) => {
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
export const addBts = (payload) => {
    return {
        type: ADD_BTS,
        payload,
    };
};

export const delBts = (payload) => {
    return {
        type: DEL_BTS,
        payload,
    };
};
export const editBts = (payload) => {
    return {
        type: EDIT_BTS,
        payload,
    };
};
//** Actions for managing device */
export const addDevice = (payload) => {
    return {
        type: ADD_DEVICE,
        payload,
    };
};
export const delDevice = (payload) => {
    return {
        type: DEL_DEVICE,
        payload,
    };
};

export const editDevice = (payload) => {
    return {
        type: EDIT_DEVICE,
        payload,
    };
};
