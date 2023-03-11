import { useState } from 'react';
import classNames from 'classnames/bind';
import { DeviceType } from '~/assets/data';
import DeviceInfoCard from '~/components/DeviceItem/DeviceInfoCardInManage';
import { Modal, Button, InputGroup, FormControl, FormLabel } from 'react-bootstrap';
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import styles from './PopupAddDevice.module.scss';

const cx = classNames.bind(styles);
function PopupAddDevice(props) {
    const data = DeviceType;
    console.log('device add: ', props.deviceInfo);
    const [device, setDevice] = useState(props.deviceInfo);
    const [checked, setChecked] = useState()
    // console.log("checked: ", checked)
    const handleSubmit = () => {
        props.action();
        props.onChangeShow();
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
        
        setChecked(value)
        let tmp = { ...device, avatar: DeviceType[value].icon, type: DeviceType[value].type, typeName: DeviceType[value].typeName};
        console.log("tmp: ", tmp)
        setDevice((prev) => ({
            ...prev,
            avatar: DeviceType[value].icon,
            type: DeviceType[value].type,
            typeName: value,
        }));
        props.onChangeObject(tmp);
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
                            <InputGroup>
                                <FormControl
                                    style={{ fontSize: 16 }}
                                    placeholder="Nhập tên thiết bị"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={device.name}
                                    onChange={(e) => changeName(e)}
                                    disabled={props.type === 'del'}
                                />
                            </InputGroup>
                        </div>
                        {props.type === 'add' && (
                            <div className={cx('list-device')}>
                                {data.map((item, index) => {
                                    return (
                                        <div key={index} className={cx('add-device')}>
                                            <DeviceInfoCard className={cx('device-card')} data={item}  optionType />
                                            <input
                                                className={cx('input-radio')}
                                                type="radio"
                                                checked={item.type === checked}
                                                id={item.type}
                                                value={item.type}
                                                onChange={()=>{
                                                    setChecked(item.type)
                                                    handleSelectDevice(item.type)
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
