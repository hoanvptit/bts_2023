import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import Header from "~/layouts/components/Header";
import Sidebar from "~/layouts/components/Sidebar";

import style from './ManageAccount.module.scss';
const cx = classNames.bind(style);
export default function ManageAccount(){
    const btsId = useParams().btsId
    const body = <>
        <h1> ManageAccount page</h1>
    </>
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <Sidebar btsId={btsId} />
            </div>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <Header className={cx('no_position')} btsId={btsId} />
                </div>
                <div className={cx('content')}>{body}</div>
            </div>
        </div>
    );
}