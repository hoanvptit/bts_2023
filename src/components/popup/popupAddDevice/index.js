import { useState } from 'react';
import classNames from 'classnames/bind';
import { DeviceType } from '~/assets/data';
import DeviceInfoCard from '~/components/DeviceItem/DeviceInfoCardInManage';
import { Modal, Button, InputGroup, FormControl, FormLabel } from 'react-bootstrap';
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import styles from './PopupAddDevice.module.scss';
import { getDevicePin } from '~/services/deviceService';
import { type } from '@testing-library/user-event/dist/type';

const cx = classNames.bind(styles);
function PopupAddDevice(props) {
    const data = DeviceType;
    const [device, setDevice] = useState(props.deviceInfo);

    const [checked, setChecked] = useState();
    const [inputEmpty, setInputEmpty] = useState(false);
    const [amountPinDevice, setAmountPinDevice] = useState(0);
    // console.log("checked: ", checked)
    const handleSubmit = () => {
        // console.log('add device: ', device);
        if (device.name === '' || device.type === undefined) {
            setInputEmpty(true);
        } else {
            props.action();
            props.onChangeShow();
        }
    };
    const getPinDevice = (tmp,value) => {
        getDevicePin()
            .then((res) => {
                console.log(res);
                let tmp_number_pin = res.data.body.totalResults
                tmp = {
                    ...device,
                    avatar: DeviceType[value].icon,
                    type: DeviceType[value].type,
                    typeName: DeviceType[value].typeName,
                    name: `Ac quy ${tmp_number_pin + 1}`,
                };
                setDevice((prev) => ({
                    ...prev,
                    avatar: DeviceType[value].icon,
                    type: DeviceType[value].type,
                    typeName: value,
                    name: tmp.name,
                }));
                props.onChangeObject(tmp);
            })
            .catch((err) => console.log(err));
    };
    const handleClose = () => {
        props.onChangeShow();
    };
    const changeName = (e) => {
        let deviceName = e.target.value;
        let tmp = { ...device, name: deviceName };
        setDevice((prev) => ({
            ...prev,
            name: deviceName,
        }));
        props.onChangeObject(tmp);
    };
    const handleSelectDevice = (value) => {
        setChecked(value);
        console.log('add device type: ', value);

        let tmp = {
            ...device,
            avatar: DeviceType[value].icon,
            type: DeviceType[value].type,
            typeName: DeviceType[value].typeName,
        };
        setDevice((prev) => ({
            ...prev,
            avatar: DeviceType[value].icon,
            type: DeviceType[value].type,
            typeName: value,
            name: tmp.name,
        }));
        if (value === 0) {
            getPinDevice(tmp, value);
        }else{
            props.onChangeObject(tmp);
        }
        
    };
    return (
        <>
            <Modal
                show={props.show}
                size="lg"
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
                        {props.type === 'del' && (
                            <p style={{ fontSize: 11, color: 'red', marginTop: '2%' }}>
                                Bạn muốn xóa trạm BTS? Vui lòng kiểm tra lại thông tin trước khi xóa.
                            </p>
                        )}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: 15, margin: '0 5%' }}>
                    <div className={cx('modal-body')}>
                        <div className={cx('name')}>
                            {/* {device.type !== 0 && ( */}
                                <InputGroup>
                                    <FormControl
                                        style={{ fontSize: 16 }}
                                        placeholder="Nhập tên thiết bị"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        value={device.name}
                                        onChange={(e) => changeName(e)}
                                        disabled={props.type === 'del' || device.type === 0}
                                    />
                                </InputGroup>
                            {/* )} */}
                            {device.type !== 0 && inputEmpty && (
                                <p style={{ color: 'red' }}>Vui lòng điền đầy đủ thông tin</p>
                            )}
                        </div>
                        {props.type === 'add' && (
                            <div className={cx('list-device')}>
                                {data.map((item, index) => {
                                    return (
                                        <div key={index} className={cx('add-device')}>
                                            <DeviceInfoCard className={cx('device-card')} data={item} optionType />
                                            <input
                                                className={cx('input-radio')}
                                                type="radio"
                                                checked={item.type === checked}
                                                id={item.type}
                                                value={item.type}
                                                onChange={() => {
                                                    setChecked(item.type);
                                                    handleSelectDevice(item.type);
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
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
                        {props.type === 'add' && 'Thêm'}
                        {props.type === 'edit' && 'Sửa'}
                        {props.type === 'del' && 'Xoá'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default PopupAddDevice;
