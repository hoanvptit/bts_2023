import {
    LOGIN,
    LOGOUT,
    SET_BTS,
    SET_LIST_BTS,
    ADD_BTS,
    DEL_BTS,
    EDIT_BTS,
    SET_DEVICE,
    ADD_DEVICE,
    DEL_DEVICE,
    EDIT_DEVICE,
    SET_LIST_DEVICE,
} from './constant';

export const initUser = () => {
    const item = localStorage.getItem('userData');
    return item ? JSON.parse(item) : {};
};

export const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            console.log('action.payload: ', action.payload);
            return {
                ...state,
                job: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                job: '',
                jobs: [...state.jobs, action.payload],
            };

        default:
            throw new Error('Invalid action');
    }
};
//** ---------------------------- Reducer for BTS -----------------------------------*/
export const initBts = (listBts) => {
    return {
        bts: { id: '',index:null, name: '', mac: '', place: '', avatar: '' },
        listBts,
    };
};

export const btsReducer = (state, action) => {
    switch (action.type) {
        case SET_BTS:
            return {
                ...state,
                bts: action.payload,
            };
        case SET_LIST_BTS:
            let newList = action.payload.map((item, index)=>{
                return {
                    ...item,
                    index:index
                }
            })
            return {
                ...state,
                listBts: newList,
            };
        case ADD_BTS:
            let newBts = {...action.payload, index: state.listBts.length}
            return {
                ...state,
                bts: { id: '', name: '', mac: '', place: '', avatar: '' },
                listBts: [...state.listBts, newBts],
            };
        case EDIT_BTS:
            let newListBts1 = [...state.listBts];
            newListBts1[action.payload.index] = action.payload;
            return {
                ...state,
                bts: { id: '', name: '', mac: '', place: '', avatar: '' },
                listBts: newListBts1,
            };
        case DEL_BTS:
            let newListBts2 = [...state.listBts];
            newListBts2.splice(action.payload.index, 1);
            return {
                ...state,
                bts: { id: '', name: '', mac: '', place: '', avatar: '' },
                listBts: newListBts2,
            };

        default:
            throw new Error('Invalid action');
    }
};

//**------------------------------Reducer for Devices------------------------------- */

export const initDevice = (listDevice) => {
    return {
        device: {},
        listDevice,
    };
};

export const deviceReducer = (state, action) => {
    switch (action.type) {
        case SET_DEVICE:
            return {
                ...state,
                device: action.payload,
            };
        case SET_LIST_DEVICE:
            console.log(action.payload)
            return {
                ...state,
                listDevice: action.payload,
            };
        case ADD_DEVICE:
            return {
                ...state,
                device: {},
                listDevice: [...state.listDevice, action.payload],
            };
        case EDIT_DEVICE:
            let newListDevice1 = [...state.listDevice];
            newListDevice1[action.payload.id] = action.payload;
            return {
                ...state,
                device: {},
                listDevice: newListDevice1,
            };
        case DEL_DEVICE:
            let newListDevice2 = [...state.listDevice];
            newListDevice2.splice(action.payload.id, 1);
            return {
                ...state,
                device: {},
                listDevice: newListDevice2,
            };
        default:
            throw new Error('Invalid Action');
    }
};
