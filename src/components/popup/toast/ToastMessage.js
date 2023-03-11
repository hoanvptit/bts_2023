import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
function ToastMessage(props) {
    const show= props.show;
    // console.log(props.show);
    const title = props.title;
    const content = props.content;
    const handleClose = () => {
       props.onChange();
    }
    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton style={{ background: "#FFCCAF" }}>
                <Modal.Title style={{textAlign: 'center'}}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{fontSize: 20, margin:24}}>{content}</Modal.Body>
        </Modal>
    )
}
export default ToastMessage