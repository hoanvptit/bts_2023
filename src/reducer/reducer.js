import { LOGIN, LOGOUT,SET_BTS, ADD_BTS, DEL_BTS, EDIT_BTS, SET_DEVICE, ADD_DEVICE, DEL_DEVICE, EDIT_DEVICE } from './constant';

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
        bts: { id: '', name: '', mac: '', place: '', avatar: '' },
        listBts,
    };
};

export const btsReducer = (state, action) => {
    console.log("payload: ", action.payload)
    switch (action.type) {
        case SET_BTS:
            return {
                ...state,
                bts: action.payload
            }
        case ADD_BTS:
            return {
                ...state,
                bts:{ id: '', name: '', mac: '', place: '', avatar: '' },
                listBts: [...state.listBts,action.payload],
            };
        case EDIT_BTS:
            let newListBts1 = [...state.listBts];
            newListBts1[action.payload.id] = action.payload
            return{
                ...state,
                bts:{ id: '', name: '', mac: '', place: '', avatar: '' },
                listBts: newListBts1,
            }
        case DEL_BTS:
            let newListBts2 = [...state.listBts]
            newListBts2.splice(action.payload.id, 1);
            return {
                ...state,
                bts:{ id: '', name: '', mac: '', place: '', avatar: '' },
                listBts: newListBts2,
            };

        default:
            throw new Error('Invalid action');
    }
};

//**------------------------------Reducer for Devices------------------------------- */

export const initDevice = (listDevice) =>{
    return {
        device:{},
        listDevice
    }
}

export const deviceReducer = (state, action) =>{
    switch(action.type){
        case ADD_DEVICE:
            return{
                ...state,
                device:{},
                listDevice:[...state.listDevice, action.payload]
            }
        case EDIT_DEVICE:
            let newListDevice1 = [...state.listDevice];
            newListDevice1[action.payload.id] = action.payload
            return{
                ...state,
                device:{},
                listDevice: newListDevice1,
            }
        case DEL_DEVICE:
                let newListDevice2 = [...state.listDevice]
                newListDevice2.splice(action.payload.id, 1);
                return {
                    ...state,
                    device:{},
                    listDevice: newListDevice2,
                };
        default:
            throw new Error('Invalid Action')
    }
}