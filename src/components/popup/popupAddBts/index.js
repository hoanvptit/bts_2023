import { Modal, Button, InputGroup, FormControl, FormLabel } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './PopupAddBts.module.scss';
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);
function PopupAddObject(props) {
    const [bts, setBts] = useState(props.bts_object);

    const handleSubmit = () => {
        props.action();
        props.onChangeShow();
        if (props.type === 'add') {
            setBts({
                // id:0,
                name: '',
                mac: '',
                location: '',
            });
        }
    };

    const handleClose = () => {
        props.onChangeShow();
    };
    const changeName = (e) => {
        let btsName = e.target.value;
        let tmp = {...bts, name:btsName}
        // setBts((prev) => ({
        //     ...prev,
        //     name: btsName,
        // }));
        setBts(tmp)
        props.onChangeObject(tmp);
    };
    const changeMac = (e) => {
        let mac = e.target.value;
        let tmp = {...bts, mac:mac}
        // setBts((prev) => ({
        //     ...prev,
        //     mac: mac,
        // }));
        setBts(tmp)
        props.onChangeObject(tmp);
    };
    const changeLocation = (e) => {
        let location = e.target.value;
        let tmp = {...bts, location: location }
        // setBts((prev) => ({
        //     ...prev,
        //     location: location,
        // }));
        setBts(tmp)
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
                        <h3 style={{ textAlign: 'center', fontWeight: 700 }}> {props.popup_title}</h3>
                        {props.type === 'del' && (
                            <p style={{ fontSize: 11, color: 'red', marginTop: '2%' }}>
                                Bạn muốn xóa trạm BTS? Vui lòng kiểm tra lại thông tin trước khi xóa.
                            </p>
                        )}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: 15, margin: '0 5%' }}>
                    <div className={cx('modal-body')}>
                        <div className={cx('first-line')}>
                            <div className={cx('name')}>
                                <FormLabel>Tên trạm BTS</FormLabel>
                                <InputGroup>
                                    <FormControl
                                        style={{ fontSize: 16 }}
                                        placeholder="Nhập tên trạm"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        value={bts.name}
                                        onChange={(e) => changeName(e)}
                                        disabled={props.type === 'del'}
                                    />
                                </InputGroup>
                            </div>

                            <div className={cx('mac')}>
                                <FormLabel>Địa chỉ Mac</FormLabel>
                                <InputGroup>
                                    <FormControl
                                        style={{ fontSize: 16 }}
                                        placeholder="Nhập địa chỉ MAC"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        value={bts.mac}
                                        onChange={(e) => changeMac(e)}
                                        disabled={props.type === 'del'}
                                    />
                                </InputGroup>
                            </div>
                        </div>
                        <div className={cx('second-line')}>
                            <FormLabel>Địa chỉ</FormLabel>
                            <InputGroup className="mb-3">
                                <FormControl
                                    style={{ fontSize: 16 }}
                                    placeholder="Nhập địa chỉ"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={bts.location}
                                    onChange={(e) => changeLocation(e)}
                                    disabled={props.type === 'del'}
                                />
                            </InputGroup>
                        </div>
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
export default PopupAddObject;
