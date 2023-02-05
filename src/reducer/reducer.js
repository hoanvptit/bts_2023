import { LOGIN, LOGOUT, ADD_BTS, DEL_BTS, EDIT_BTS, ADD_DEVICE, DEL_DEVICE, EDIT_DEVICE } from './constant';

export const initUser = () => {
    const item = localStorage.getItem('userData')
    return item?JSON.parse(item) : {}
};

export const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                job: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                job: '',
                jobs: [...state.jobs, action.payload]
            };
            /*
        case DEL_JOB:
            let newJobs = [...state.jobs];
            newJobs.splice(action.payload, 1);
            return {
                ...state,
                jobs: newJobs
            };
            */
        default:
            throw new Error('Invalid action')
    }
}