import { Modal, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { updateDevice } from '~/services/deviceService';
import DeviceInfoCard from '~/components/DeviceItem/DeviceInfoCard';
import styles from './PopupDevices.module.scss';

const cx = classNames.bind(styles);
function PopupDevices(props) {
    const device = props.deviceInfo;
    const deviceStatus = device.status;
    const btnRef = useRef();
    const [status, setStatus] = useState(deviceStatus === 'on' ? true : false);

    const handleChangeStatus = (e) => {
        let newStatus = e.target.value;
        // setDeviceStatus((prev) => ({
        //     ...prev,
        //     status: newStatus,
        // }));
        setStatus((prev) => !prev);
        props.onChangeStatus(newStatus);
        props.action(newStatus);
        props.onChangeShow();

        // change status of device => send request update device
        // updateDevice(device.id, {
        //     ...device,
        //     status: newStatus
        // })
    };

    const handleClose = () => {
        props.onChangeShow();
    };

    return (
        <>
            <Modal
                show={props.show}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ borderRadius: 120 }}
                onHide={handleClose}
            >
                <Modal.Header closeButton className={cx('modal-header')} />
                <Modal.Body>
                    <div className={cx('modal-body')}>
                        <div className={cx('first-line')}>
                            <DeviceInfoCard data={props.deviceInfo} border />
                        </div>
                        <div className={cx('second-line')}>
                            <button
                                className={cx('btn_cancel', `${status ? 'off' : 'on'}`)}
                                disabled={status}
                                onClick={handleChangeStatus}
                                value="on"
                                ref={btnRef}
                            >
                                Bật
                            </button>
                            <button
                                className={cx('btn_add', `${status ? 'on' : 'off'}`)}
                                disabled={!status}
                                onClick={handleChangeStatus}
                                value="off"
                                ref={btnRef}
                            >
                                Tắt
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default PopupDevices;
