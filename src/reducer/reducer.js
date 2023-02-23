import { LOGIN, LOGOUT, ADD_BTS, DEL_BTS, EDIT_BTS, ADD_DEVICE, DEL_DEVICE, EDIT_DEVICE } from './constant';

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

export const initBts = (listBts) => {
    return {
        initBtsObject: { id: '', name: '', mac: '', place: '', avatar: '' },
        listBts,
    };
};

export const btsReducer = (state, action) => {
    switch (action.type) {
        case ADD_BTS:
            console.log('action.payload: ', action.payload);
            return {
                ...state,
                initBtsObject:{ id: '', name: '', mac: '', place: '', avatar: '' },
                listBts: [...state.listBts,action.payload],
            };
        case DEL_BTS:
            return {
                ...state,
                job: '',
                jobs: [...state.jobs, action.payload],
            };

        default:
            throw new Error('Invalid action');
    }
};
