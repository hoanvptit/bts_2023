import classNames from 'classnames/bind';
import { useEffect, useReducer, useState } from 'react';
import Sidebar from '~/layouts/components/Sidebar';
import Header from '~/layouts/components/Header';
import DeviceItem from '~/components/DeviceItem';
import images from '~/assets/images';
import styles from './DeviceControl.module.scss';

import PopupDevices from '~/components/popup/popupStatusDevices';
import { useParams } from 'react-router-dom';
import { deviceReducer, initDevice } from '~/reducer/reducer';
import { getDeviceList } from '~/services/deviceService';
import { setListDeviceAction } from '~/reducer/action';

const cx = classNames.bind(styles);
export default function DeviceControl() {
    const btsId = useParams().btsId
    console.log("device control btsid = ",btsId)
    const devices = [
        {
            id: 1,
            type: 'bulb',
            avatar: images.bulb,
            name: 'Bóng đèn 1',
            status: 'on',
        },
        {
            id: 2,
            type: 'bulb',
            avatar: images.bulb,
            name: ' Bóng đèn 2',
            status: 'on',
        },
        {
            id: 3,
            type: 'bulb',
            avatar: images.bulb,
            name: ' Bóng đèn 3',
            status: 'off',
        },
        {
            id: 4,
            type: 'bulb',
            avatar: images.bulb,
            name: ' Bóng đèn 4',
            status: 'off',
        },
        {
            id: 5,
            type: 'fan',
            avatar: images.fans,
            name: ' Quạt 1',
            status: 'on',
        },
        {
            id: 6,
            type: 'fan',
            avatar: images.fans,
            name: ' Quạt 2',
            status: 'on',
        },
        {
            id: 7,
            type: 'airConditioner',
            avatar: images.airConditioner,
            name: ' Điều hoà 1',
            status: 'on',
        },
        {
            id: 8,
            type: 'airConditioner',
            avatar: images.airConditioner,
            name: ' Điều hoà 2',
            status: 'on',
        },
        {
            id: 9,
            type: 'airConditioner',
            avatar: images.airConditioner,
            name: 'Điều hoà 3',
            status: 'on',
        },
        {
            id: 10,
            type: 'airConditioner',
            avatar: images.airConditioner,
            name: ' Điều hoà 4',
            status: 'on',
        },
    ];

    const [listDevice, setListDevice] = useState(devices);
    const [state, dispatch] = useReducer(deviceReducer, initDevice([]))

    const [popUpAttr, setPopUpAttr] = useState({
        show: false,
    });
    // info of device need to update status
    const [deviceInfo, setDeviceInfo] = useState(null);
    const [deviceType, setDeviceType] = useState('');

    //get list device of bts 
    useEffect(()=>{
        getDeviceList(btsId).then((res)=>{
            console.log(res)
            let result = res.data.body.results
            dispatch(setListDeviceAction(result))
        })
    },[])

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

    //update status-> send to server new status
    const updateStatus = (info) => {
        const newList = [...listDevice]
        newList[deviceInfo.id-1].status = info
        setListDevice(newList)
    };
    // change status of device
    const changeStatus = (info) => {
        setDeviceInfo((prev) => ({
            ...prev,
            status: info,
        }));
    };

    //** For show Device infomation in a line */

    const DevicesLine = () => {
        return (
            <div className={cx('row bts_line')}>
                {state.listDevice.map((item, index) => {
                    return (
                        <div key={index} className={cx('col l-2 m-6 c-12')}>
                            <DeviceItem
                                data={item}
                                border
                                handleClick={() => {
                                    setDeviceInfo(item);
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
    const body =  (
        <>
            {popUpAttr.show && (
                <PopupDevices
                    show={popUpAttr.show}
                    deviceInfo={deviceInfo}
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

            <div className={cx('body-wrapper')}>
                <div className={cx('search-filter')}>
                    <div className={cx('select-area')}>
                        <select className={cx('select-unit')} value={deviceType} onChange={handleChangeUnit}>
                            <option value="all">Chọn loại thiết bị</option>
                            <option value="bulb">Bóng đèn</option>
                            <option value="airConditioner">Điều hoà</option>
                            <option value="fan">Quạt</option>
                        </select>
                    </div>
                </div>
                <div className={cx('main-content')}>
                    <div className={cx('grid wide container')}>
                        <DevicesLine />
                    </div>
                </div>
            </div>
        </>
    );
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <Sidebar btsId={btsId}/>
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
