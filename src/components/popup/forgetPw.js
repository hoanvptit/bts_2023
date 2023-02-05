import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
export function PopupForgetPw(props) {
    const handleForget = () => {
        props.onSend();
        // props.onChange();
    }

    const handleClose = () => {
        props.onChange();
    }
    const changeValue = (e) => {
        let username = e.target.value;
        props.onChangeObject(username);
    }
    return (
        <>
            <Modal show={props.show} onHide={handleClose}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton style={{ background: "#FFF", color:"#000" }}>
                    <Modal.Title>{props.popup_title}</Modal.Title>
                </Modal.Header>
                {!props.isSend &&
                    <Modal.Body style={{ fontSize: 16 }}>
                        <InputGroup className="mb-3" >
                            <FormControl
                                placeholder="Email"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                // value={props.addObject.username}
                                onChange={(e) => changeValue(e)}
                                style={{ fontSize: 16 }}
                            />
                        </InputGroup>
                    </Modal.Body>
                }
                <Modal.Footer style={{ fontSize: 16 }}>
                    {!props.isSend &&
                        <Button variant="primary" onClick={handleForget} 
                        style={{
                            height: 35,
                            width: 100,
                            fontSize: 16,
                            color: "#FFF",
                            backgroundColor: "#EB5500",
                            borderRadius: 5,
                            border: "1px solid #EB5500",
                            padding: "5px 15px",
                            marginRight:15
                        }}>
                            Gửi
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
};
