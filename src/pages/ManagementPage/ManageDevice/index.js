import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useState, useMemo } from 'react';
import Button from '~/components/Button';
import Table from '~/components/Table';
import Search from '~/layouts/components/Search';
import PopupAddDevice from '~/components/popup/popupAddDevice';
import images from '~/assets/images';
import { Devices } from '~/assets/data';
import styles from './ManageDevice.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
let PageSize = 10;
export default function ManageDevice() {
    const devices = Devices;
    const initAddDevice = {
        type: 'bulb',
        typeName: 'Bóng đèn',
        name: '',
        status: 'off',
    };
    const [quantity, setQuantity] = useState(10);
    const [listDevice, setListDevice] = useState(devices);
    const [popUpAttr, setPopUpAttr] = useState({
        type: 'add',
        show: false,
        title: 'Thêm thiết bị',
    });
    // info of device need to add/edit/delete
    const [deviceInfo, setDeviceInfo] = useState(initAddDevice);
    const [deviceType, setDeviceType] = useState('');
    //** End table infos */
    const handleChangeUnit = (e) => {
        let value = e.target.value;
        setDeviceType(value);
        let displayList;
        if (value !== 'all') {
            displayList = devices.filter((device) => {
                return device.type === value;
            });
            setListDevice(displayList);
        } else {
            setListDevice(devices);
        }
    };
    const handleChangeQuantity = (e) => {
        let value = e.target.value;
        setQuantity(value);
    };
    //** For handle add bts */
    const handleAddDevice = () => {
        // add to result list
        let newList = [...listDevice];
        newList.push(deviceInfo);
        setListDevice(newList);
    };
    const handleEditDevice = () => {
        console.log('edit  success');
        console.log('edit Object:', deviceInfo);

        const newList = [...listDevice];
        newList[deviceInfo.id - 1] = deviceInfo;
        setListDevice(newList);
    };
    const handleDelDevice = () => {
        console.log('del  success');
        // let newList = [...listDevice];
        // newList.splice(deviceInfo.id, 1);
        // console.log(newList);
        // setListDevice(newList);
    };
    //change object bts need to add/edit
    const changeObjectDevice = (device) => {
        if (popUpAttr.type === 'add') {
            setDeviceInfo((prev) => ({
                ...prev,
                ...device,
                id: devices.length + 1,
            }));
        } else {
            if (popUpAttr.type === 'edit') {
                setDeviceInfo((prev) => ({
                    ...prev,
                    ...device,
                    // id: devices.length + 1,
                }));
            }
        }
    };

    const onAction = () => {
        if (popUpAttr.type === 'add') return handleAddDevice();
        if (popUpAttr.type === 'edit') return handleEditDevice();
        if (popUpAttr.type === 'del') return handleDelDevice();
    };
    return (
        <>
            {popUpAttr.show && (
                <PopupAddDevice
                    show={popUpAttr.show}
                    title={popUpAttr.title}
                    type={popUpAttr.type}
                    deviceInfo={deviceInfo}
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

            <div className={cx('wrapper')}>
                <div className={cx('search-filter')}>
                    <div className={cx('select-area')}>
                        <h3 className={cx('search-filter-title')}>Bộ lọc tìm kiếm</h3>
                        <select className={cx('select-type')} value={deviceType} onChange={handleChangeUnit}>
                            <option value="all">Chọn loại thiết bị</option>
                            <option value="bulb">Bóng đèn</option>
                            <option value="airConditioner">Điều hoà</option>
                            <option value="fan">Quạt</option>
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
                                <Search className="subSearch" />
                            {/* </div> */}
                            <div className={cx('btn-add-bts')}>
                                <Button
                                    primary
                                    small
                                    leftIcon={<FontAwesomeIcon icon={faPlus} />}
                                    onClick={() => {
                                        setDeviceInfo(initAddDevice);
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
                        {listDevice.length > 0 && (
                            <Table
                                data={listDevice}
                                onClickEdit={(data) => {
                                    console.log('edit  success: ', data);
                                    setDeviceInfo(data);
                                    setPopUpAttr({ show: true, type: 'edit', title: 'Sửa thiết bị' });
                                }}
                                onClickDel={handleDelDevice}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
