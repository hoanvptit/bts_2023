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
    UPDATE_STATUS_DEVICE,
    SET_TYPE_DISPLAY_DEVICE,
    SET_LIST_DISPLAY_DEVICE,
    SET_LIST_ALL_DEVICE,
    SET_LIST_ALL_NOTI,
    SET_LIST_DISPLAY_NOTI,
    SET_CHECKED_LIST,
    FETCH_SUCCESS,
    FETCH_ERROR,
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
        bts: { id: '', index: null, name: '', mac: '', place: '', avatar: '' },
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
            let newList = action.payload.map((item, index) => {
                return {
                    ...item,
                    index: index,
                };
            });
            return {
                ...state,
                listBts: newList,
            };
        case ADD_BTS:
            let newBts = { ...action.payload, index: state.listBts.length };
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

export const initDevice = (typeDisplay, listDisplay, listAll) => {
    return {
        device: {},
        typeDisplay,
        listDisplay,
        listAll,
    };
};

export const deviceReducer = (state, action) => {
    switch (action.type) {
        case SET_DEVICE:
            return {
                ...state,
                device: action.payload,
            };
        case ADD_DEVICE:
            //them vao list all
            let dvToAll = { ...action.payload, index: state.listAll.length };

            // neu cung type hien thi thif them vao list hien thij
            let isSameTypeDisplay = action.payload.type == state.typeDisplay;
            let dvToDisplay = { ...action.payload, index: state.listDisplay.length };
            if (isSameTypeDisplay || state.typeDisplay === 'all') {
                return {
                    ...state,
                    device: {},
                    listAll: [...state.listAll, dvToAll],
                    listDisplay: [...state.listDisplay, dvToDisplay],
                };
            } else {
                return {
                    ...state,
                    device: {},
                    listAll: [...state.listAll, dvToAll],
                };
            }

        case EDIT_DEVICE:
            // console.log('payload: ', action.payload)
            //thay doi trong list hien thi
            let lsDisplay = [...state.listDisplay];
            lsDisplay[action.payload.index] = action.payload;

            //thay doi trong list all
            let lsAll = [...state.listAll];
            // tim object trong list all de thay doi
            let tmp = lsAll.filter((item) => {
                return item.id === action.payload.id;
            });
            // console.log("tmp: ", tmp)
            let dvEdit = { ...action.payload, index: tmp[0].index };
            // console.log("dvedit: ", dvEdit)
            lsAll[dvEdit.index] = dvEdit;

            return {
                ...state,
                device: {},
                listDisplay: lsDisplay,
                listAll: lsAll,
            };
        case DEL_DEVICE:
            // console.log('payload: ', action.payload);
            //xoa trong list hien thi
            let lsDisplay1 = [...state.listDisplay];
            lsDisplay1.splice(action.payload.index, 1);

            //xoa trong list all
            let lsAll1 = [...state.listAll];
            // tim object trong list all de thay doi
            let tmp1 = lsAll1.filter((item) => {
                return item.id === action.payload.id;
            });
            // let dvDel = {...action.payload, index: tmp1.index}
            lsAll1.splice(tmp1[0].index, 1);
            return {
                ...state,
                device: {},
                listDisplay: lsDisplay1,
                listAll: lsAll1,
            };
        case SET_TYPE_DISPLAY_DEVICE:
            return {
                ...state,
                typeDisplay: action.payload,
            };
        // case UPDATE_STATUS_DEVICE:

        case SET_LIST_ALL_DEVICE:
            let newListAll = action.payload.map((item, index) => {
                return {
                    ...item,
                    index: index,
                };
            });
            return {
                ...state,
                listAll: newListAll,
            };
        case SET_LIST_DISPLAY_DEVICE:
            let newListDisplay = action.payload.map((item, index) => {
                return {
                    ...item,
                    index: index,
                };
            });
            return {
                ...state,
                listDisplay: newListDisplay,
            };
        default:
            throw new Error('Invalid Action');
    }
};

//**---------------------Reducer for Notification-------------------------------- */

export const initNotify = (checkedList, listAll, listDisplay) => {
    return {
        checkedList,
        listAll,
        listDisplay,
    };
};

export const notifyReducer = (state, action) => {
    switch (action.type) {
        case SET_CHECKED_LIST:
            let newCheckedlist = action.payload;
            let newDisplayList = [];
            if (newCheckedlist.length === 4) newDisplayList = state.listAll;
            else {
                state.listAll.forEach((noti) => {
                    newCheckedlist.forEach((item) => {
                        if (noti.level === item) newDisplayList.push(noti);
                    });
                });
            }
            return {
                ...state,
                checkedList: newCheckedlist,
                listDisplay: newDisplayList,
            };
        case SET_LIST_ALL_NOTI:
            return {
                ...state,
                listAll: action.payload,
            };
        case SET_LIST_DISPLAY_NOTI:
            return {
                ...state,
                listDisplay: action.payload,
            };
        default: {
            throw new Error('Invalid Action');
        }
    }
};

//**------------------Reducer for Fetching data---------------------- */

export const initialStateFetch = {
    loading: true,
    error: '',
};

export const fetchReducer = (state, action) => {
    switch (action.type) {
        case FETCH_SUCCESS:
            return {
                loading: false,
                error: '',
            };
        case FETCH_ERROR:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            throw new Error('Invalid Action');
    }
};
