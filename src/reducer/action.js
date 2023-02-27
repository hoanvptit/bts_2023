import { type } from '@testing-library/user-event/dist/type';
import { LOGIN, LOGOUT, SET_BTS, ADD_BTS, DEL_BTS, EDIT_BTS,SET_DEVICE, ADD_DEVICE, DEL_DEVICE, EDIT_DEVICE } from './constant';
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
export const setBtsAction = (payload) => {
    return{
        type: SET_BTS,
        payload
    }
}
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
export const setDeviceAction = (payload) =>{
    return {
        type: SET_DEVICE,
        payload,
    }
}
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
