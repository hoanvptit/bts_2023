import { Modal, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { updateDevice } from '~/services/deviceService';
import DeviceInfoCard from '~/components/DeviceItem/DeviceInfoCardInManage';
import styles from './PopupDevices.module.scss';

const cx = classNames.bind(styles);
function PopupDevices(props) {
    const device = props.deviceInfo;
    let valueOnOff = 0;
    device.curData.forEach((dt) => {
        let tmp_name = dt.name;
        if (tmp_name === 'value') {
            valueOnOff = dt['value'];
        }
    });
    const btnRef = useRef();

    const handleChangeStatus = (e) => {
        let newStatus = e.target.value;
        
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
                            <DeviceInfoCard data={props.deviceInfo} border inPopupStatus/>
                        </div>
                        <div className={cx('second-line')}>
                            <button
                                className={cx('btn_cancel', `${valueOnOff>=1 ? 'off' : 'on'}`)}
                                disabled={valueOnOff>=1}
                                onClick={handleChangeStatus}
                                value="1"
                                ref={btnRef}
                            >
                                Bật
                            </button>
                            <button
                                className={cx('btn_add', `${valueOnOff>=1 ? 'on' : 'off'}`)}
                                disabled={valueOnOff==0}
                                onClick={handleChangeStatus}
                                value="0"
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
