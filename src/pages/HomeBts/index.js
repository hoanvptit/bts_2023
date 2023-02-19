import classNames from 'classnames/bind';
import { useState, useMemo } from 'react';
import Button from '~/components/Button';
import DeviceInfoCard from '~/components/DeviceItem/DeviceInfoCard';
import Chart from '~/components/Chart';
import Pagination from '~/components/pagination';
import PopupExportData from '~/components/popup/popupExportData';
import { Devices, Action } from '~/assets/data';
import styles from './HomeBts.module.scss';

const cx = classNames.bind(styles);
function HomeBts() {
    const devicesData = Devices;
    const [selectedDevice, setSelectedDevice] = useState(devicesData[0]);
    const [selectedDeviceType, setSelectedDeviceType] = useState('');
    const [popUpAttr, setPopUpAttr] = useState({
        show: false,
        title: 'Xuất dữ liệu',
    });
    const handleChangeSelectedDevice = (e) => {
        let value = e.target.value;
        let tmp = devicesData.filter((item) => {
            return item.name === value;
        });
        setSelectedDevice(tmp[0]);
    };

    const handleChangeSelectedDeviceType = (e) => {
        let value = e.target.value;
        setSelectedDeviceType(value);
    };
    return (
        <>
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
            <div className={cx('wrapper')}>
                <div className={cx('search-filter')}>
                    <div className={cx('select-area')}>
                        <select
                            className={cx('select-unit')}
                            value={selectedDeviceType}
                            onChange={handleChangeSelectedDeviceType}
                        >
                            <option value="10">Chọn loại thiết bị</option>
                            <option value="Tất cả">Tất cả</option>
                            <option value="Nhóm điều khiển">Nhóm điều khiển</option>
                            <option value="Nhóm Quan sát">Nhóm Quan sát</option>
                        </select>
                        <select
                            className={cx('select-group')}
                            value={selectedDevice.name}
                            onChange={handleChangeSelectedDevice}
                        >
                            <option value="">Chọn thiết bị</option>
                            {devicesData.map((item, index) => {
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
                <div className={cx('main-content')}>
                    <div className={cx('grid wide container')}>
                        <div className={cx('device-info')}>
                            <DeviceInfoCard data={selectedDevice} optionType={false} />
                            <div className={cx('properties')}>
                                <div>
                                    <h3 className={cx('title-status')}>Loại thiết bị</h3>
                                    <h3 className={cx('status')}>{selectedDevice.typeName}</h3>
                                </div>
                                <div>
                                    <h3 className={cx('title-status')}>Trạng thái</h3>
                                    <h3 className={cx('status')}>{selectedDevice.status}</h3>
                                </div>
                                <div>
                                    <h3 className={cx('title-status')}>Dữ liệu cảm biến</h3>
                                    <h3 className={cx('status')}>{selectedDevice.status}</h3>
                                </div>
                                <div>
                                    <h3 className={cx('title-status')}>Lỗi thiết bị</h3>
                                    <h3 className={cx('status')}>Không</h3>
                                </div>
                                <div>
                                    <h3 className={cx('title-status')}>Cập nhật lần cuối</h3>
                                    <h3 className={cx('status')}>15/02/2023 21:22</h3>
                                </div>
                            </div>
                        </div>
                        {selectedDevice.type !== 'sensor' ? (
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
                            <Chart device={selectedDevice} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeBts;
