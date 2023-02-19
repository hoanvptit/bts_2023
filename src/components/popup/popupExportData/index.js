import { useState } from 'react';
import classNames from 'classnames/bind';
import { DeviceType } from '~/assets/data';
import { Modal, Button } from 'react-bootstrap';
import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/material_blue.css';
import styles from './popupExportData.module.scss';

const cx = classNames.bind(styles);
function PopupExportData(props) {
    const data = DeviceType;
    // const [device, setDevice] = useState(props.deviceInfo);

    const handleSubmit = () => {
        props.action();
        props.onChangeShow();
       
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
                <Modal.Header className={cx('modal-header')} style={{ borderBottom: 'none', marginTop: '5%' }}>
                    <Modal.Title
                        className={cx('modal-title')}
                        style={{ fontSize: 18, margin: '0 auto', fontWeight: 700 }}
                    >
                        <h3 style={{ textAlign: 'center', fontWeight: 700 }}> {props.title}</h3>
                        <p style={{ fontSize: 11, marginTop: '2%' }}>
                            Bạn muốn tải xuống dữ liệu trạm BTS? Vui lòng chọn khoảng thời gian.
                        </p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: 15, margin: '0 5%' }}>
                    <div className={cx('modal-body')}>
                        <Flatpickr
                            className={cx('date-picker')}
                            options={{
                                mode: 'range',
                                
                                // eslint-disable-next-line no-mixed-operators
                                defaultDate: [new Date(), new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)],
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ fontSize: 16, margin: '0 auto', marginBottom: '5%', borderTop: 'none' }}>
                    <Button
                        className={cx('btn-cancel')}
                        onClick={handleClose}
                        style={{
                            height: 35,
                            width: 100,
                            fontSize: 16,
                            color: '#7367F0',
                            backgroundColor: '#FFF',
                            borderRadius: 5,
                            border: '1px solid #7367F0',
                            padding: '5px 15px',
                            marginRight: 15,
                        }}
                    >
                        Huỷ
                    </Button>
                    <Button
                        className={cx('btn-add')}
                        onClick={handleSubmit}
                        style={{
                            height: 35,
                            width: 100,
                            fontSize: 16,
                            backgroundColor: '#7367F0',
                            borderRadius: 5,
                            border: 'none',
                            padding: '5px 15px',
                            marginLeft: 15,
                        }}
                    >
                        Xuất
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default PopupExportData;
