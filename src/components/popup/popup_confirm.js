import React, { Component } from "react"
// import { Modal, Button } from "react-bootstrap";
import './popup_submit.css';
// import storage from "../../utility/storage";
// import axios from "axios";

export function PopupConfirm(props) {
    

    return (
        <div className="popup-background">
                <div className="popup-wrapper">
                    <div className="popup-title">{props.title}</div>
                    <div className="popup-content">{props.message}</div>
                    <div className="popup-footer">
                        {props.handleCanel && <button className="pupup-btn-cancel" onClick={props.handleCanel}>Hủy</button>}
                        <button className="pupup-btn-confirm" onClick={
                            ()=>{ props.handleConfirm() }
                        }>{props.textBtn?props.textBtn:"Xác nhận"}</button>
                    </div>
                </div>
        </div>
    )
}

