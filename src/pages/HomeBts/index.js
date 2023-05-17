import classNames from 'classnames/bind';
import { socket, mockSocket } from '~/services/socket';
import { useState, useMemo, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '~/layouts/components/Sidebar';
import Header from '~/layouts/components/Header';
import Button from '~/components/Button';
import DeviceInfoCard from '~/components/DeviceItem/DeviceInfoCardInHomeBts';
import Chart from '~/components/Chart';
import images from '~/assets/images';
import Pagination from '~/components/pagination';
import Loader from '~/components/Loader/LoaderFull';
import ToastMessage from '~/components/popup/toast/ToastMessage';
import PopupExportData from '~/components/popup/popupExportData';
import PinInfo from '~/components/PinInfo';
import { DeviceType } from '~/assets/data';
import { getDeviceList, getDevice } from '~/services/deviceService';
import { getActionList } from '~/services/actionService';
import { getUserList, getUser } from '~/services/userService';
import { initDevice, deviceReducer, initActions, actionsReducer } from '~/reducer/reducer';
import {
    setDeviceAction,
    setListAllDeviceAction,
    setListDisplayDeviceAction,
    setListAllDeivceActions_Action,
    setListDisplayDeivceActions_Action,
} from '~/reducer/action';
import { convertToDate } from '~/util/utils';
import styles from './HomeBts.module.scss';

const cx = classNames.bind(styles);
function HomeBts() {
    const btsId = useParams().btsId;
    const [state, dispatch] = useReducer(deviceReducer, initDevice('all', [], [])); //state for list device respectively with type(control/observe)
    const [stateActions, dispatch_for_action] = useReducer(actionsReducer, initActions([], []));

    const [loading, setLoading] = useState(true);
    const [loadingAction, setLoadingAction] = useState(true);

    const [showToast, setShowToast] = useState({
        show: false,
        title: '',
        content: '',
    });
    const [defaultIcon, setDefaultIcon] = useState('');
    const [dvTypeName, setDvTypeName] = useState('');
    const [status, setStatus] = useState('');
    const [valueData, setValueData] = useState('');
    const [error, setError] = useState('');
    const [updateTime, setUpdateTime] = useState();
    const [popUpAttr, setPopUpAttr] = useState({
        show: false,
        title: 'Xuất dữ liệu',
    });
    const [isFirstTime, setIsFirstTime] = useState(true); //for socket call
    //1704
    const [curPage, setCurPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    //**get device of bts from server with btsId */
    useEffect(() => {
        getDeviceList(btsId)
            .then((res) => {
                let result = res.data.body.results;
                if (result.length > 0) {
                    let tmp_dv = result[0];
                    dispatch(setListAllDeviceAction(result));
                    dispatch(setListDisplayDeviceAction(result));
                    // dispatch(setDeviceAction(tmp_dv));
                    // setDvTypeName(DeviceType[tmp_dv.type].typeName);
                    // setDefaultIcon(DeviceType[tmp_dv.type].icon);
                    // asignStatus(tmp_dv);
                    // fetchActionsDataForDevice(tmp_dv.id,curPage);
                    fetchDevice(tmp_dv.id, curPage);
                }
                setLoading(false);
                setIsFirstTime(false);
            })
            .catch((err) => {
                setLoading(false);
                let contentToast = err.response ? err.response.data.message : err.message;
                setShowToast((prev) => {
                    return {
                        ...prev,
                        show: true,
                        content: `Có lỗi xảy ra: ${contentToast}`,
                    };
                });
            });
    }, []);
    useEffect(() => {
        if (!isFirstTime) {
            doSocketAction(stateActions.listAll);
            doSocketData();
        }

        return () => {
            // socket.off('connect');
            socket.off('actions');
            socket.off('data');
        };
    });
    //get specific device
    const fetchDevice = (deviceID) => {
        setLoading(true);
        getDevice(deviceID)
            .then((res) => {
                let dv = res.data.body;
                console.log("receive device: ", dv)
                //update device
                dispatch(setDeviceAction(dv));
                setDvTypeName(DeviceType[dv.type].typeName);
                setDefaultIcon(DeviceType[dv.type].icon);
                asignStatus(dv);
                //only control device need to get actions
                if ([1, 4, 6].includes(dv.type)) {
                    fetchActionsDataForDevice(dv.id, 1); //curPage = 1
                }
                setLoading(false);
            })
            .catch((err) => {
                setLoadingAction(false);
                let contentToast = err.response ? err.response.data.message : err.message;
                setShowToast((prev) => {
                    return {
                        ...prev,
                        show: true,
                        content: `Có lỗi xảy ra: ${contentToast}`,
                    };
                });
            });
    };
    //get action for control device as ligth, fan and airconditioner
    const fetchActionsDataForDevice = (deviceId, _curPage) => {
        setLoadingAction(true);
        getActionList(deviceId, _curPage)
            .then((res_action) => {
                let listAction = res_action.data.body.results;
                let _totalPage = res_action.data.body.totalPages;
                setTotalPage(_totalPage);
                if (listAction.length > 0) {
                    getUserList()
                        .then((res) => {
                            let tmpUsers = res.data.body.results;

                            let newList = [];
                            newList = listAction.map((item) => {
                                let user = tmpUsers.find((u) => {
                                    return u.id === item.userID;
                                });
                                let status_value = item.message.includes('Bật')
                                    ? 'on'
                                    : item.message.includes('Tắt')
                                    ? 'off'
                                    : 'connected';
                                return {
                                    status: status_value,
                                    name: item.message,
                                    des: `Thực hiện bởi: ${user.name}`,
                                    date: `${convertToDate(item.updatedAt)}`,
                                };
                            });
                            if (newList.length > 0) {
                                if (_curPage <= 1) {
                                    dispatch_for_action(setListAllDeivceActions_Action(newList));
                                    if (newList.length <= 10) {
                                        dispatch_for_action(setListDisplayDeivceActions_Action(newList));
                                    } else {
                                        dispatch_for_action(setListDisplayDeivceActions_Action(newList.slice(0, 10)));
                                    }
                                } else {
                                    dispatch_for_action(
                                        setListAllDeivceActions_Action([...stateActions.listAll, ...newList]),
                                    );
                                    if (newList.length <= 10) {
                                        dispatch_for_action(
                                            setListDisplayDeivceActions_Action([
                                                ...stateActions.listDisplay,
                                                ...newList,
                                            ]),
                                        );
                                    } else {
                                        dispatch_for_action(
                                            setListDisplayDeivceActions_Action([
                                                ...stateActions.listDisplay,
                                                ...newList.slice(0, 10),
                                            ]),
                                        );
                                    }
                                }
                            }
                            // setLoadingAction(false);
                        })
                        .catch((err) => {
                            // setLoadingAction(false);
                            let contentToast = err.response ? err.response.data.message : err.message;
                            setShowToast((prev) => {
                                return {
                                    ...prev,
                                    show: true,
                                    content: `Có lỗi xảy ra: ${contentToast}`,
                                };
                            });
                        });
                } else {
                    dispatch_for_action(setListAllDeivceActions_Action([]));
                    dispatch_for_action(setListDisplayDeivceActions_Action([]));
                }
                setLoadingAction(false);
            })
            .catch((err) => {
                setLoadingAction(false);
                let contentToast = err.response ? err.response.data.message : err.message;
                setShowToast((prev) => {
                    return {
                        ...prev,
                        show: true,
                        content: `Có lỗi xảy ra: ${contentToast}`,
                    };
                });
            });
    };

    const doSocketAction = (ls) => {
        // socket.on('connect', () => {
        //     console.log('Success');
        //     socket.on('actions', (data) => {
        //         console.log('in get data');
        //         console.log(data);
        //     });
        // });
        // console.log('socket: ',socket)
        socket.on('actions', (data) => {
            let action_data = JSON.parse(data);
            console.log('actions data: ', action_data);
            // console.log('list data: ', ls);
            if (action_data.deviceID === state.device.id) {
                //get user to create action information - to display
                getUser(action_data.userID).then((res) => {
                    let user = res.data.body;
                    let status_value = action_data.action ? 'on' : 'off';
                    let newAction = {
                        status: status_value,
                        name: `${action_data.action ? 'Bật thiết bị' : 'Tắt thiết bị'}`,
                        des: `Thực hiện bởi: ${user.name}`,
                        date: `${convertToDate(action_data.date)}`,
                    };
                    let newList = [newAction, ...ls];
                    if (newList.length > 0) {
                        dispatch_for_action(setListAllDeivceActions_Action(newList));
                        if (newList.length <= 10) {
                            dispatch_for_action(setListDisplayDeivceActions_Action(newList));
                        } else {
                            let addedList = newList.slice(0, (curPage) * 10);
                            dispatch_for_action(setListDisplayDeivceActions_Action(addedList));
                        }
                    }
                });
                //update data for device
                let tmp_dv = {
                    ...state.device,
                    curData: [
                        state.device.curData[0], //name = error
                        {
                            name: `value`,
                            value: `${action_data.action ? 1 : 0}`,
                            date: `${action_data.date}`,
                        },
                    ],
                    updatedAt: `${action_data.date}`,
                };
                console.log('update device: ', tmp_dv);
                asignStatus(tmp_dv);
                dispatch(setDeviceAction(tmp_dv));
            }
        });
    };
    const doSocketData = () => {
            socket.on('data', (data) => {
                let dataSensor = JSON.parse(data);
                console.log("dataSensor: ", dataSensor);
                // console.log('curr device: ', state.device);
                if (dataSensor.deviceID === state.device.id) {
                    let tmp_dv = {
                        ...state.device,
                        curData: [
                            {
                                name: `${dataSensor.name}`,
                                value: `${dataSensor.value}`,
                                date: `${dataSensor.date}`,
                            },
                        ],
                        updatedAt: `${dataSensor.date}`,
                    };
                    console.log('tmp_dv: ', tmp_dv);
                    dispatch(setDeviceAction(tmp_dv));
                    asignStatus(tmp_dv);
                }
            });
        // }
        
    };
    const asignStatus = (deviceInfo) => {
        let value = 0;
        let errorValue = 0;
        let dateValue = deviceInfo.updatedAt;

        if (deviceInfo.curData) {
            deviceInfo.curData.forEach((dt) => {
                let tmp_name = dt.name;
                if (tmp_name == 'value') {
                    value = dt['value'];
                    if(dt['date'] > dateValue){
                        dateValue = dt['date']
                    }
                }
                if (tmp_name == 'error') {
                    if(dt['date'] > dateValue){
                        dateValue = dt['date']
                    }
                    errorValue = dt['value'];
                }
            });
        }
        setStatus(deviceInfo.status ? 'Đã kết nối' : 'Mất kết nối');
        if (!deviceInfo.status) {
            setValueData('-');
        } else {
            if (deviceInfo.type === 1 || deviceInfo.type === 4 || deviceInfo.type === 6) {
                setValueData(value == 1 ? 'Đang bật' : 'Đang tắt');
            } else {
                setValueData(value);
            }
        }
        setError(errorValue == 0 ? 'Không' : 'Có');
        setUpdateTime(convertToDate(dateValue));
    };
    const handleChangeSelectedDevice = (e) => {
        setCurPage(1);
        let value = e.target.value;
        let tmp = state.listDisplay.filter((item) => {
            return item.name === value;
        });
        if (tmp.length > 0) {
            let switchedDevice = tmp[0];
            //fetch to get new device data
            fetchDevice(switchedDevice.id);
        }
    };
    const handleChangeSelectedDeviceType = (e) => {
        setCurPage(1);
        let value = e.target.value;
        let tmp_displaylist = [];
        switch (value) {
            case 'all': {
                // setSelectedDeviceType('Tất cả');
                if (state.listAll.length > 0) {
                    setDefaultIcon(DeviceType[state.listAll[0].type].icon);
                    fetchDevice(state.listAll[0].id);
                }
                dispatch(setListDisplayDeviceAction(state.listAll));
                break;
            }
            case 'control': {
                // setSelectedDeviceType('Nhóm điều khiển');
                tmp_displaylist = state.listAll.filter((item) => {
                    return item.type === 1 || item.type === 4 || item.type === 6;
                });
                if (tmp_displaylist.length > 0) {
                    let switchedDevice = tmp_displaylist[0];
                    setDefaultIcon(DeviceType[switchedDevice.type].icon);
                    fetchDevice(switchedDevice.id);
                }
                dispatch(setListDisplayDeviceAction(tmp_displaylist));

                break;
            }
            case 'observe': {
                // setSelectedDeviceType('Nhóm quan sát');
                tmp_displaylist = state.listAll.filter((item) => {
                    return item.type !== 1 && item.type !== 4 && item.type !== 6;
                });
                if (tmp_displaylist.length > 0) {
                    setDefaultIcon(DeviceType[tmp_displaylist[0].type].icon);
                    fetchDevice(tmp_displaylist[0].id);
                }
                dispatch(setListDisplayDeviceAction(tmp_displaylist));
                break;
            }
            default: {
                // setSelectedDeviceType('Chọn loại thiết bị');
                if (state.listAll.length > 0) {
                    setDefaultIcon(DeviceType[state.listAll[0].type].icon);
                    fetchDevice(state.listAll[0].id);
                }
                dispatch(setListDisplayDeviceAction(state.listAll));
            }
        }
    };
    const handleClickSeeMore = () => {
        let tmp_curPage = curPage + 1;
        setCurPage(tmp_curPage);
        // mỗi lần click xem thêm -> gửi request mới
        fetchActionsDataForDevice(state.device.id, tmp_curPage);
    };
    const handleClickHideAway = () => {
        setCurPage(1);
        dispatch_for_action(setListDisplayDeivceActions_Action(stateActions.listAll.slice(0, 10)));
    };
    const body = (
        <>
            {loading && <Loader />}
            {popUpAttr.show && (
                <PopupExportData
                    show={popUpAttr.show}
                    title={popUpAttr.title}
                    onChangeShow={() =>
                        setPopUpAttr((prev) => ({
                            ...prev,
                            show: false,
                        }))
                    }
                />
            )}
            {showToast && (
                <ToastMessage
                    show={showToast.show}
                    title={showToast.title}
                    content={showToast.content}
                    onChange={() =>
                        setShowToast((prev) => {
                            return { ...prev, show: false };
                        })
                    }
                />
            )}
            <div className={cx('body-wrapper')}>
                <div className={cx('search-filter')}>
                    <div className={cx('select-area')}>
                        <select
                            className={cx('select-unit')}
                            // value={selectedDeviceType}
                            onChange={handleChangeSelectedDeviceType}
                        >
                            {/* <option value="xxx">Chọn loại thiết bị</option> */}
                            <option value="all">Tất cả</option>
                            <option value="control">Nhóm điều khiển</option>
                            <option value="observe">Nhóm quan sát</option>
                        </select>
                        <select
                            className={cx('select-group')}
                            value={state.device.name}
                            onChange={handleChangeSelectedDevice}
                        >
                            {/* <option value="">Chọn thiết bị</option> */}
                            {state.listDisplay.map((item, index) => {
                                return (
                                    <option key={index} value={item.name}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={cx('btn-export')}>
                        <Button
                            primary
                            small
                            onClick={() =>
                                setPopUpAttr((prev) => {
                                    return {
                                        ...prev,
                                        show: true,
                                    };
                                })
                            }
                        >
                            Tải xuống dữ liệu của BTS
                        </Button>
                    </div>
                </div>
                {state.listDisplay.length > 0 ? (
                    <div className={cx('main-content')}>
                        <div className={cx('grid wide container')}>
                            <div className={cx('device-info')}>
                                <DeviceInfoCard data={state.device} optionType={false} defaultIcon={defaultIcon} />
                                <div className={cx('properties')}>
                                    <div>
                                        <h3 className={cx('title-status')}>Loại thiết bị</h3>
                                        <h3 className={cx('status')}>{dvTypeName}</h3>
                                    </div>
                                    <div>
                                        <h3 className={cx('title-status')}>Trạng thái</h3>
                                        <h3 className={cx('status')}>{status}</h3>
                                    </div>
                                    <div>
                                        <h3 className={cx('title-status')}>Dữ liệu cảm biến</h3>
                                        <h3 className={cx('status')}>{valueData}</h3>
                                    </div>
                                    {([1,4,6].includes(state.device.type)) && (
                                        <div>
                                            <h3 className={cx('title-status')}>Lỗi thiết bị</h3>
                                            <h3 className={cx('status')}>{error}</h3>
                                        </div>
                                    )}
                                    <div>
                                        <h3 className={cx('title-status')}>Cập nhật lần cuối</h3>
                                        <h3 className={cx('status')}>{updateTime}</h3>
                                    </div>
                                </div>
                                {state.device.type === 0 && (
                                    <div className={cx('battery-info')}>
                                        <PinInfo device={state.device} />
                                    </div>
                                )}
                            </div>
                            {([1,4,6].includes(state.device.type)) && (
                                <>
                                    {loadingAction && <Loader />}
                                    {stateActions.listDisplay.length > 0 ? (
                                        <div className={cx('timeline')}>
                                            {stateActions.listDisplay.map((item, index) => {
                                                let tmp = `${'bullet-'}${item.status}`;
                                                return (
                                                    <div key={index} className={cx('timeline-item')}>
                                                        <div className={cx('status-item')}>
                                                            <div className={cx('status-dot')}>
                                                                <span className={cx('bullet', tmp)}></span>
                                                            </div>
                                                            <div className={cx('text')}>
                                                                <h3 className={cx('status')}>{item.name}</h3>
                                                                <h3 className={cx('title-status')}>{item.des}</h3>
                                                            </div>
                                                        </div>
                                                        <div className={cx('date-time')}>
                                                            <p className={cx('date')}>{item.date}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className={cx('no_data')}>
                                            {loadingAction ? (
                                                <Loader />
                                            ) : (
                                                <>
                                                    <img
                                                        src={images.no_data}
                                                        className={cx('img_no_data')}
                                                        alt="no data"
                                                    />
                                                    <span>Không có dữ liệu</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                    {totalPage > 1 && (
                                        <div>
                                            {curPage < totalPage && (
                                                <p className={cx('see-more')} onClick={handleClickSeeMore}>
                                                    Xem thêm
                                                </p>
                                            )}
                                            {curPage === totalPage && (
                                                <p className={cx('see-more')} onClick={handleClickHideAway}>
                                                    Ẩn bớt
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                            {[0,2, 3, 5, 7, 8].includes(state.device.type) && <Chart device={state.device} />}
                        </div>
                    </div>
                ) : (
                    <div className={cx('no_data')}>
                        {!loading && (
                            <>
                                <img src={images.no_data} className={cx('img_no_data')} alt="no data" />
                                <span>Không có thiết bị nào trong trạm BTS</span>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <Sidebar btsId={btsId} />
            </div>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <Header className={cx('no_position')} btsId={btsId} />
                </div>
                <div className={cx('content')}>{body}</div>
            </div>
        </div>
    );
}

export default HomeBts;
