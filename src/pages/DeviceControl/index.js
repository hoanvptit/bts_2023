import classNames from 'classnames/bind';
import { useEffect, useReducer, useState } from 'react';
import Sidebar from '~/layouts/components/Sidebar';
import Header from '~/layouts/components/Header';
import DeviceItem from '~/components/DeviceItem';
import images from '~/assets/images';
import Loader from '~/components/Loader/LoaderFull';
import ToastMessage from '~/components/popup/toast/ToastMessage';
import PopupDevices from '~/components/popup/popupStatusDevices';
import { useParams } from 'react-router-dom';
import { deviceReducer, initDevice } from '~/reducer/reducer';
import { getDeviceList, updateStatusDevice } from '~/services/deviceService';
import styles from './DeviceControl.module.scss';
import {
    setListAllDeviceAction,
    setDeviceAction,
    setListDisplayDeviceAction,
    setTypeDisplayDeviceAction,
    editDeviceAction,
} from '~/reducer/action';

const cx = classNames.bind(styles);
export default function DeviceControl() {
    const btsId = useParams().btsId;
    const [state, dispatch] = useReducer(deviceReducer, initDevice('all', [], []));
    const [loading, setLoading] = useState(true);
    const [popUpAttr, setPopUpAttr] = useState({
        show: false,
    });
    const [showToast, setShowToast] = useState({
        show: false,
        title: 'Điều khiển thiết bị',
        content: '',
    });

    //get list device of bts
    useEffect(() => {
        getDeviceList(btsId)
            .then((res) => {
                console.log("res: ",res)
                let result = res.data.body.results;
                ///filter thiet bi dieu khien
                let resultDisplay = result.filter((item) => {
                    return item.type === 1 || item.type === 4 || item.type === 6;
                });
                dispatch(setListAllDeviceAction(resultDisplay));
                dispatch(setListDisplayDeviceAction(resultDisplay));
                setLoading(false);
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

    const handleTypeDeviceDisplay = (e) => {
        let type = e.target.value;
        let displayList;
        if (type !== 'all') {
            displayList = state.listAll.filter((device) => {
                return device.type == type;
            });
            dispatch(setListDisplayDeviceAction(displayList));
        } else {
            dispatch(setListDisplayDeviceAction(state.listAll));
        }

        dispatch(setTypeDisplayDeviceAction(type));
    };

    //update status-> send to server new status
    const updateStatus = (info) => {
        let tmpDate = new Date().toISOString();
        let errObjInData = state.device.curData.filter((item) => {
            return item.name === 'error';
        });
        let newCurData = [...errObjInData, { name: 'value', value: `${info}`, date: `${tmpDate}` }];
        let newDevice = {
            ...state.device,
            curData: newCurData,
        };
        setLoading(true);
        updateStatusDevice(state.device.id, `${info}`)
            .then((res) => {
                if (res.status == 200) {
                    let contentToast = info == 1 ? 'Bật thiết bị thành công' : 'Tắt thiết bị thành công';
                    setShowToast((prev) => {
                        return {
                            ...prev,
                            show: true,
                            content: contentToast,
                        };
                    });
                }

                dispatch(editDeviceAction(newDevice));
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log("err: ", err)
                let errMessage = err.response ? err.response.data.message : err.message;
                let contentToast = info == 1 ? 'Bật thiết bị không thành công' : 'Tắt thiết bị không thành công';
                setShowToast((prev) => {
                    return {
                        ...prev,
                        show: true,
                        content: `${contentToast}:${errMessage}`,
                    };
                });
            });
    };
    // change status of device
    const changeStatus = (info) => {
        let tmpDate = new Date().toISOString();
        let errObjInData = state.device.curData.filter((item) => {
            return item.name === 'error';
        });
        let newCurData = [...errObjInData, { name: 'value', value: `${info}`, date: `${tmpDate}` }];
        let newDevice = {
            ...state.device,
            curData: newCurData,
        };
        dispatch(setDeviceAction(newDevice));
    };

    //** For show Device infomation in a line */

    const DevicesLine = () => {
        return (
            <div className={cx('row bts_line')}>
                {state.listDisplay.map((item, index) => {
                    return (
                        <div key={index} className={cx('col l-2 m-6 c-12')}>
                            <DeviceItem
                                data={item}
                                border
                                handleClick={() => {
                                    dispatch(setDeviceAction(item));
                                    setPopUpAttr({
                                        show: true,
                                    });
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        );
    };
    //** End Bts Line */
    const body = (
        <>
            {loading && <Loader />}
            {popUpAttr.show && (
                <PopupDevices
                    show={popUpAttr.show}
                    deviceInfo={state.device}
                    action={updateStatus}
                    onChangeShow={() =>
                        setPopUpAttr((prev) => ({
                            ...prev,
                            show: false,
                        }))
                    }
                    onChangeStatus={changeStatus}
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
                            value={state.typeDisplay}
                            onChange={handleTypeDeviceDisplay}
                        >
                            <option value="all">Chọn loại thiết bị(tất cả)</option>
                            <option value="1">Quạt</option>
                            <option value="4">Bóng đèn</option>
                            <option value="6">Điều hoà</option>
                        </select>
                    </div>
                </div>
                {state.listDisplay.length > 0 && (
                    <div className={cx('main-content')}>
                        <div className={cx('grid wide container')}>
                            <DevicesLine />
                        </div>
                    </div>
                )}
            </div>
            {state.listDisplay.length === 0 && (
                <div className={cx('no_data')}>
                    <img src={images.no_data} className={cx('img_no_data')} alt="no data" />
                    <span>Không có thiết bị nhóm điều khiển nào trong trạm BTS</span>
                </div>
            )}
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
