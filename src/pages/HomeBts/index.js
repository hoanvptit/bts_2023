import classNames from 'classnames/bind';
import { useState, useMemo } from 'react';
import Button from '~/components/Button';
import DeviceInfoCard from '~/components/DeviceItem/DeviceInfoCard';
import Chart from '~/components/Chart';
import Pagination from '~/components/pagination';
<<<<<<< HEAD
import { Devices, Action } from '~/assets/data';
=======
import PopupExportData from '~/components/popup/popupExportData';
import { Devices, Action,DataCellVolt, DataPackInfo, DataTemperature } from '~/assets/data';
>>>>>>> 6a8a41e (add some ui and fix some bug)
import styles from './HomeBts.module.scss';
import PinInfo from '~/components/PinInfo';

const cx = classNames.bind(styles);
function HomeBts() {
    const devicesData = Devices;
    const [selectedDevice, setSelectedDevice] = useState(devicesData[0]);
    const [selectedDeviceType, setSelectedDeviceType] = useState('');

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
                    <div className={cx('btn-add-bts')}>
                        <Button primary small onClick={() => {}}>
                            Xuất dữ liệu tất cả các thiết bị
                        </Button>
                    </div>
                </div>
                <div className={cx('main-content')}>
                    <div className={cx('grid wide container')}>
                        <div className={cx('device-info')}>
                            <DeviceInfoCard data={selectedDevice} optionType={false} />
                            <div className={cx('properties')}>
                                <div className={cx('group')}>
                                    <h3 className={cx('title-status')}>Loại thiết bị</h3>
                                    <h3 className={cx('status')}>{selectedDevice.typeName}</h3>
                                </div>
                                <div className={cx('group')}>
                                    <h3 className={cx('title-status')}>Trạng thái</h3>
                                    <h3 className={cx('status')}>{selectedDevice.status}</h3>
                                </div>
                                <div className={cx('group')}>
                                    <h3 className={cx('title-status')}>Dữ liệu cảm biến</h3>
                                    <h3 className={cx('status')}>{selectedDevice.status}</h3>
                                </div>
<<<<<<< HEAD
                                <div className={cx('group')}>
                                    <h3 className={cx('title-status')}>Lỗi thiết bị</h3>
                                    <h3 className={cx('status')}>Không</h3>
                                </div>
                                <div className={cx('group')}>
=======
                                {selectedDevice.type !== 'battery' && (
                                    <div>
                                        <h3 className={cx('title-status')}>Lỗi thiết bị</h3>
                                        <h3 className={cx('status')}>Không</h3>
                                    </div>
                                )}
                                <div>
>>>>>>> 6a8a41e (add some ui and fix some bug)
                                    <h3 className={cx('title-status')}>Cập nhật lần cuối</h3>
                                    <h3 className={cx('status')}>15/02/2023 21:22</h3>
                                </div>
                            </div>
                            {selectedDevice.type ==='battery' && 
                            <div className={cx('battery-info')}>
                                <div className={cx('cell-vol')}>
                                    <h3>Cell Voltage (mV)</h3>
                                    <div className={cx('cell-vol-info')}>
                                        <PinInfo data={DataCellVolt} />
                                        <PinInfo data={DataCellVolt} />
                                    </div>
                                </div>
                                <div className={cx('pack')}>
                                    <h3>Pack Infomation</h3>
                                    <div className={cx('pack-info')}>
                                        <PinInfo data={DataPackInfo}/>
                                    </div>
                                </div>
                                <div className={cx('battery-temp')}>
                                    <h3>Temperature</h3>
                                    <div className={cx('temp-info')}>
                                        <PinInfo data={DataTemperature}/>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                        {selectedDevice.type !== 'sensor' && selectedDevice.type !== 'battery' ? (
                            <div className={cx('timeline')}>
                                {Action.map((item, index) => {
                                    return (
                                        <div key={index} className={cx('timeline-item')}>
                                            <div className={cx('group')}>
                                                <h3 className={cx('status')}>{item.name}</h3>
                                                <h3 className={cx('title-status')}>{item.des}</h3>
                                            </div>
                                            <div className={cx('group')}>
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
