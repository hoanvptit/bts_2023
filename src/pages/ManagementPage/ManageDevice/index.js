import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useReducer, useEffect } from 'react';
import Sidebar from '~/layouts/components/Sidebar';
import Header from '~/layouts/components/Header';
import Button from '~/components/Button';
import Table from '~/components/Table';
import PopupAddDevice from '~/components/popup/popupAddDevice';
import images from '~/assets/images';
import { addDevice, getDevice, getDeviceList, delDevice, updateDevice } from '~/services/deviceService';
import { Devices } from '~/assets/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { deviceReducer, initDevice } from '~/reducer/reducer';
import logger from '~/reducer/logger';
import { addDeviceAction, delDeviceAction, editDeviceAction, setDeviceAction, setListAllDeviceAction,setTypeDisplayDeviceAction,setListDisplayDeviceAction } from '~/reducer/action';
import styles from './ManageDevice.module.scss';

const cx = classNames.bind(styles);
let PageSize = 10;
export default function ManageDevice() {
    const btsId = useParams().btsId;
    const [state, dispatch] = useReducer(logger(deviceReducer), initDevice('all',[],[]));

    const [quantity, setQuantity] = useState(10);
    const [popUpAttr, setPopUpAttr] = useState({
        type: 'add',
        show: false,
        title: 'Thêm thiết bị',
    });

    //get list device of bts
    useEffect(() => {
        getDeviceList(btsId).then((res) => {
            console.log(res);
            let result = res.data.body.results;
            dispatch(setListDisplayDeviceAction(result) )
            dispatch(setListAllDeviceAction(result));
        });
    }, []);
    //** change type of device -> change data show on the table */
    const handleTypeDeviceDisplay = (e) => {
        let type = e.target.value;
        let displayList;
        if (type !== 'all') {
            displayList = state.listAll.filter((device) => {
                return device.type == type;
            });

            // console.log('ls ds: ', displayList)
            dispatch(setListDisplayDeviceAction(displayList))

        } else {
            dispatch(setListDisplayDeviceAction(state.listAll))
        }

        dispatch(setTypeDisplayDeviceAction(type));
    };
    const handleChangeQuantity = (e) => {
        let value = e.target.value;
        setQuantity(value);
    };
    //** For handle add bts */
    const handleAddDevice = () => {
        //add device and send to server
        addDevice({
            name: state.device.name,
            type: state.device.type,
            position: 100,
            btsID: btsId,
            description: 'state.device.des',
        });
        dispatch(addDeviceAction(state.device));
    };
    const handleEditDevice = () => {
        // const newList = [...listDisplayDevice];
        // newList[state.device.index] = state.device;
        // setAllDevice(newList);

        updateDevice(state.device.id, {
            name: state.device.name,
            description: state.device.des,
        });
        dispatch(editDeviceAction(state.device));
    };
    const handleDelDevice = () => {
        //send request delete device
        delDevice(state.device.id)
        dispatch(delDeviceAction(state.device))
    };
    //change object bts need to add/edit
    const changeObjectDevice = (device) => {
        dispatch(setDeviceAction(device));
        
    };

    const onAction = () => {
        if (popUpAttr.type === 'add') return handleAddDevice();
        if (popUpAttr.type === 'edit') return handleEditDevice();
        if (popUpAttr.type === 'del') return handleDelDevice();
    };
    const body = (
        <>
            {popUpAttr.show && (
                <PopupAddDevice
                    show={popUpAttr.show}
                    title={popUpAttr.title}
                    type={popUpAttr.type}
                    deviceInfo={state.device}
                    action={onAction}
                    onChangeShow={() =>
                        setPopUpAttr((prev) => ({
                            ...prev,
                            show: false,
                        }))
                    }
                    onChangeObject={changeObjectDevice}
                />
            )}

            <div className={cx('body-wrapper')}>
                <div className={cx('search-filter')}>
                    <div className={cx('select-area')}>
                        <h3 className={cx('search-filter-title')}>Bộ lọc tìm kiếm</h3>
                        <select className={cx('select-type')} value={state.typeDisplay} onChange={handleTypeDeviceDisplay}>
                            <option value="all">Chọn loại thiết bị</option>
                            <option value="0">Pin</option>
                            <option value="1">Quạt</option>
                            <option value="2">Cảm biến cháy</option>
                            <option value="3">Cảm biến ngập nước</option>
                            <option value="4">Bóng đèn</option>
                            <option value="5">Cảm biến đột nhập</option>
                            <option value="6">Điều hoà</option>
                            <option value="7">Cảm biến nhiệt độ IN</option>
                            <option value="8">Cảm biến nhiệt độ OUT</option>

                        </select>
                    </div>
                    <div className={cx('search-area')}>
                        <select className={cx('select-quantity')} value={quantity} onChange={handleChangeQuantity}>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                        </select>
                        <div className={cx('sub-search')}>
                            {/* <div className={cx('sub-search-wrapper')}> */}
                            {/* <Search className="subSearch" /> */}
                            {/* </div> */}
                            <div className={cx('btn-add-bts')}>
                                <Button
                                    primary
                                    small
                                    leftIcon={<FontAwesomeIcon icon={faPlus} />}
                                    onClick={() => {
                                        // setDeviceInfo(initAddDevice);
                                        setPopUpAttr({ show: true, type: 'add', title: 'Thêm thiết bị' });
                                    }}
                                >
                                    Thêm thiết bị
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('main-content')}>
                    <div className={cx('grid wide container')}>
                        {/** Device table */}
                        {state.listDisplay.length > 0 && (
                            <Table
                                data={state.listDisplay}
                                onClickEdit={(data) => {
                                    // console.log('edit  success: ', data);
                                    // setDeviceInfo(data);
                                    dispatch(setDeviceAction(data))
                                    setPopUpAttr({ show: true, type: 'edit', title: 'Sửa thiết bị' });
                                }}
                                onClickDel={(data) => {
                                    // console.log('edit  success: ', data);
                                    // setDeviceInfo(data);
                                    dispatch(setDeviceAction(data))
                                    setPopUpAttr({ show: true, type: 'del', title: 'Xoá thiết bị' });
                                }}
                            />
                        )}
                    </div>
                </div>
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
