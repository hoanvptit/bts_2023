import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import {NotifyTypeInfos } from '~/assets/data';
import { convertToDate } from '~/util/utils';
import images from '~/assets/images';
import Image from '~/components/images';
import Loader from '~/components/Loader';
import ToastMessage from '~/components/popup/toast/ToastMessage';
import { useEffect, useReducer, useState } from 'react';
import { getNotificationList } from '~/services/notificationService';
import { getUserList } from '~/services/userService';
import { initNotify, notifyReducer } from '~/reducer/reducer';
import { setListAllNotifyAction, setCheckedListAction, setListDisplayNotifyAction } from '~/reducer/action';
import style from './ManageNotification.module.scss';
const cx = classNames.bind(style);
export default function ManageNotification() {
    const btsId = useParams().btsId;
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState({
        show: false,
        title: '',
        content: '',
    });
    const [state, dispatch] = useReducer(notifyReducer, initNotify([1, 2, 3, 4], [], []));
    const [checkedNotis, setCheckedNotis] = useState([1, 2, 3, 4]);

    useEffect(() => {
        getNotificationList()
            .then((res) => {
                let tmp = res.data.body.results;
                console.log("res: ",tmp)
                if (tmp.length > 0) {
                    //find user act notify
                    getUserList()
                        .then((res) => {
                            let tmpUsers = res.data.body.results;

                            let newList = [];
                            newList = tmp.map((item) => {
                                let icon = null;
                                let user = tmpUsers.find((u) => {
                                    return u.id === item.userID;
                                });
                                switch (item.level) {
                                    case 2:
                                        icon = images.noti_warning;
                                        break;
                                    case 3:
                                        icon = images.noti_no_signal;
                                        break;
                                    case 4:
                                        icon = images.noti_dangerous;
                                        break;
                                    default:
                                        icon = images.noti_normal;
                                }
                                return {
                                    ...item,
                                    user,
                                    icon,
                                };
                            });
                            if (newList.length > 0) {
                                dispatch(setListDisplayNotifyAction(newList));
                                dispatch(setListAllNotifyAction(newList));
                            }
                        })
                        .catch((err) => {
                            setLoading(false);
                            let contentToast = err.response ? err.response.data.message : err.message;
                            setShowToast((prev) => {
                                return {
                                    ...prev,
                                    show: true,
                                    content: `Có lỗi xảy ra: ${contentToast}`,
                                };
                            });
                        });
                }
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                let contentToast = err.response ? err.response.data.message : err.message;
                setShowToast((prev) => {
                    return {
                        ...prev,
                        show: true,
                        content: `Có lỗi xảy ra: ${contentToast}`,
                    };
                });
            });
    }, []);
    const handleSelectNotiType = (notiLevel) => {
        setCheckedNotis((prev) => {
            const isChecked = checkedNotis.includes(notiLevel);
            let listChecked = [];
            if (isChecked) {
                listChecked = checkedNotis.filter((item) => item !== notiLevel);
                dispatch(setCheckedListAction(listChecked));
                return listChecked;
            } else {
                listChecked = [...prev, notiLevel];
                dispatch(setCheckedListAction(listChecked));
                return listChecked;
            }
        });
    };
    const body = (
        <>
            {loading && <Loader />}
            {showToast && (
                <ToastMessage
                    show={showToast.show}
                    title={showToast.title}
                    content={showToast.content}
                    onChange={() =>
                        setShowToast((prev) => {
                            return { ...prev, show: false };
                        })
                    }
                />
            )}
            <div className={cx('body-wrapper')}>
                <div className={cx('main-content')}>
                    <div className={cx('grid wide container')}>
                        <div className={cx('notify_info')}>
                            {NotifyTypeInfos.map((item, index) => (
                                <div key={index} className={cx('properties')}>
                                    {/* <NotifyInfoCard data={item} checked={checkedNotis} onChangeSelect={handleSelectNotiType} /> */}
                                    <div className={cx('noti-wrapper')}>
                                        <Image className={cx('avatar')} src={item.icon} alt="avatar" />
                                        <div className={cx('info')}>
                                            {item.value && <span>{item.value}</span>}
                                            <h4 className={cx('name')}>{item.name && <span>{item.label}</span>}</h4>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={checkedNotis.includes(item.level)}
                                            onChange={() => handleSelectNotiType(item.level)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {state.listDisplay.length > 0 ? (
                            <div className={cx('timeline')}>
                                {state.listDisplay.map((item, index) => {
                                    //**need get status-type of noti from server */
                                    let status = 'on';

                                    let tmp = `${'bullet-'}${status}`;
                                    return (
                                        <div key={index} className={cx('timeline-item')}>
                                            <div className={cx('status-item')}>
                                                <div className={cx('status-dot')}>
                                                    <span className={cx('bullet', tmp)}></span>
                                                    {/* <span className={cx('strokes')}></span> */}
                                                </div>
                                                <div className={cx('text')}>
                                                    <h3 className={cx('status')}>{item.message}</h3>
                                                    <h3
                                                        className={cx('title-status')}
                                                    >{`Thực hiện bởi: ${item.user.name}`}</h3>
                                                </div>
                                            </div>
                                            <div className={cx('date-time')}>
                                                <p className={cx('date')}>{convertToDate(item.updatedAt)}</p>
                                                {item.icon && (
                                                    <img className={cx('icon-noti')} src={images.noti_normal} />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className={cx('no_data')}>
                                <img src={images.no_data} className={cx('img_no_data')} alt="no data" />
                                <span>Không có thông báo nào</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
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
