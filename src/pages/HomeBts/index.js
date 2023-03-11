import classNames from 'classnames/bind';
import { useState, useMemo, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '~/layouts/components/Sidebar';
import Header from '~/layouts/components/Header';
import Button from '~/components/Button';
import DeviceInfoCard from '~/components/DeviceItem/DeviceInfoCardInHomeBts';
import Chart from '~/components/Chart';
import images from '~/assets/images';
import Pagination from '~/components/pagination';
import Loader from '~/components/Loader';
import ToastMessage from '~/components/popup/toast/ToastMessage';
import PopupExportData from '~/components/popup/popupExportData';
import { Devices, Action, DataCellVolt, DataPackInfo, DataTemperature } from '~/assets/data';
import PinInfo from '~/components/PinInfo';
import { DeviceType } from '~/assets/data';
import { getDeviceList } from '~/services/deviceService';
import { initDevice, deviceReducer } from '~/reducer/reducer';
import { setDeviceAction, setListAllDeviceAction, setListDisplayDeviceAction } from '~/reducer/action';
import { convertToDate } from '~/util/utils';
import styles from './HomeBts.module.scss';

const cx = classNames.bind(styles);
function HomeBts() {
    const btsId = useParams().btsId;
    const [state, dispatch] = useReducer(deviceReducer, initDevice('all', [], []));
    // const [selectedDeviceType, setSelectedDeviceType] = useState('ssssssss');
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState({
        show: false,
        title: '',
        content: '',
    });
    const [defaultIcon, setDefaultIcon] = useState('');
    const [dvTypeName, setDvTypeName] = useState('');
    const [status, setStatus] = useState('Đã kết nối');
    const [valueData, setValueData] = useState('Đang tắt');
    const [error, setError] = useState('Không');
    const [updateTime, setUpdateTime] = useState(new Date().getDate());
    const [popUpAttr, setPopUpAttr] = useState({
        show: false,
        title: 'Xuất dữ liệu',
    });
    //**get device of bts from server with btsId */

    useEffect(() => {
        getDeviceList(btsId)
            .then((res) => {
                let result = res.data.body.results;
                if (result.length > 0) {
                    let tmp_dv = result[0];
                    dispatch(setListAllDeviceAction(result));
                    dispatch(setListDisplayDeviceAction(result));
                    dispatch(setDeviceAction(tmp_dv));
                    setDvTypeName(DeviceType[tmp_dv.type].typeName);
                    setDefaultIcon(DeviceType[tmp_dv.type].icon);
                    asignStatus(tmp_dv);
                }
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

    const asignStatus = (deviceInfo) => {
        let value = 0;
        let errorValue = 0;
        let dateValue = deviceInfo.updatedAt;

        if (deviceInfo.curData) {
            deviceInfo.curData.forEach((dt) => {
                let tmp_name = dt.name;
                if (tmp_name == 'value') {
                    value = dt['value'];
                }
                if (tmp_name == 'error') {
                    errorValue = dt['value'];
                }
            });
        }
        setStatus(deviceInfo.status ? 'Đã kết nối' : 'Mất kết nối');
        // setValueData(!deviceInfo.status ? '-' : value == 1 ? 'Đang bật' : 'Đang tắt');
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
        let value = e.target.value;
        let tmp = state.listDisplay.filter((item) => {
            return item.name === value;
        });
        if (tmp.length > 0) {
            dispatch(setDeviceAction(tmp[0]));
            setDvTypeName(DeviceType[tmp[0].type].typeName);
            setDefaultIcon(DeviceType[tmp[0].type].icon);
            asignStatus(tmp[0]);
        }
    };
    const handleChangeSelectedDeviceType = (e) => {
        let value = e.target.value;
        // setSelectedDeviceType(value);
        // console.log('value: ', value);
        let tmp_displaylist = [];
        switch (value) {
            case 'all': {
                // setSelectedDeviceType('Tất cả');
                if (state.listAll.length > 0) {
                    setDefaultIcon(DeviceType[state.listAll[0].type].icon);
                    dispatch(setDeviceAction(state.listAll[0]));
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
                    setDefaultIcon(DeviceType[tmp_displaylist[0].type].icon);
                    dispatch(setDeviceAction(tmp_displaylist[0]));
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
                    dispatch(setDeviceAction(tmp_displaylist[0]));
                }
                dispatch(setListDisplayDeviceAction(tmp_displaylist));
                break;
            }
            default: {
                // setSelectedDeviceType('Chọn loại thiết bị');
                if (state.listAll.length > 0) {
                    setDefaultIcon(DeviceType[state.listAll[0].type].icon);
                    dispatch(setDeviceAction(state.listAll[0]));
                }
                dispatch(setListDisplayDeviceAction(state.listAll));
            }
        }
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
                                    {(state.device.type === 1 ||
                                        state.device.type === 4 ||
                                        state.device.type === 6) && (
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
                            {state.device.type === 1 || state.device.type === 4 || state.device.type === 6 ? (
                                <div className={cx('timeline')}>
                                    {Action.map((item, index) => {
                                        let tmp = `${'bullet-'}${item.status}`;
                                        return (
                                            <div key={index} className={cx('timeline-item')}>
                                                <div className={cx('status-item')}>
                                                    <div className={cx('status-dot')}>
                                                        <span className={cx('bullet', tmp)}></span>
                                                        {/* <span className={cx('strokes')}></span> */}
                                                    </div>
                                                    <div className={cx('text')}>
                                                        <h3 className={cx('status')}>{item.name}</h3>
                                                        <h3 className={cx('title-status')}>{item.des}</h3>
                                                    </div>
                                                </div>
                                                <div className={cx('date-time')}>
                                                    <p className={cx('date')}>{item.date}</p>
                                                    <p className={cx('time')}>{item.time}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <Chart device={state.device} />
                            )}
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
