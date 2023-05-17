import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { socket } from '~/services/socket';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import images from '~/assets/images';
import Image from '~/components/images';
import Loader from '~/components/Loader';
import ToastMessage from '~/components/popup/toast/ToastMessage';
import { NotifyTypeInfos } from '~/assets/data';
import { convertToDate } from '~/util/utils';
import { useEffect, useReducer, useState } from 'react';
import { getNotificationList, putMarkRead, getNotificationUnreadList } from '~/services/notificationService';
import { getUserList } from '~/services/userService';
import { initNotify, notifyReducer } from '~/reducer/reducer';
import {
    setListAllNotifyAction,
    setCheckedListAction,
    setListAllDisplayTypeNotifyAction,
    setListDisplayNotifyAction,
    setClassifyTypeAction,
    setListAllNotifyUnreadAction,
    setListAllDisplayTypeNotifyUnreadAction,
    setListDisplayNotifyUnreadAction,
    setNotifyAsReadAction
} from '~/reducer/action';
import style from './ManageNotification.module.scss';
const cx = classNames.bind(style);
export default function ManageNotification() {
    const btsId = useParams().btsId;
    const [isFirstTime, setIsFirstTime] = useState(true); //for socket call
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState({
        show: false,
        title: '',
        content: '',
    });
    // {classifyType,checkedList,listAll,listAllDisplayType,listDisplay,listAllUnread,listAllDisplayTypeUnread}
    const [state, dispatch] = useReducer(notifyReducer, initNotify('all', [1, 2, 3, 4], [], [], [], [], []));
    const [checkedNotis, setCheckedNotis] = useState([1, 2, 3, 4]);
    // const [classifyType, setClassifyType] = useState('all')
    const [numberNotiByLevel, setNumberNotiByLevel] = useState([0, 0, 0, 0]);
    const limit = 50;
    const [countPage, setCountPage] = useState(1);
    useEffect(() => {
        fetchDataNotisAll();
    }, []);
    useEffect(() => {
        // if (!isFirstTime) {
            doSocket();
        // }
        return () => socket.off('notifications');
    });
    const fetchDataNotisAll = () => {
        setLoading(true)
        getNotificationList(limit)
            .then((res) => {
                let tmp = res.data.body.results;
                // console.log('bts notification: ', tmp);
                setCountPage(1);
                if (tmp.length > 0) {
                    //find user act notify
                    const tmp_numberNotiByLv = [0, 0, 0, 0];

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
                                    case 1:
                                        icon = images.noti_normal;
                                        tmp_numberNotiByLv[0] += 1;
                                        break;
                                    case 2:
                                        icon = images.noti_warning;
                                        tmp_numberNotiByLv[1] += 1;
                                        break;
                                    case 3:
                                        icon = images.noti_no_signal;
                                        tmp_numberNotiByLv[2] += 1;
                                        break;
                                    case 4:
                                        icon = images.noti_dangerous;
                                        tmp_numberNotiByLv[3] += 1;

                                        break;
                                    default:
                                        icon = images.noti_normal;
                                        tmp_numberNotiByLv[0] += 1;
                                }
                                return {
                                    ...item,
                                    user,
                                    icon,
                                };
                            });
                            if (newList.length > 0) {
                                dispatch(setListAllNotifyAction(newList)); //all noti of bts
                                dispatch(setListAllDisplayTypeNotifyAction(newList)); //all noti of bts according to type
                                if (newList.length <= 10) {
                                    dispatch(setListDisplayNotifyAction(newList)); // list noti to display first - max = 10
                                } else {
                                    dispatch(setListDisplayNotifyAction(newList.slice(0, 10)));
                                }
                                setNumberNotiByLevel(tmp_numberNotiByLv);
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
                setIsFirstTime(false);
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
    };
    const fetchDataNotisUnread = () => {
        setLoading(true)
        getNotificationUnreadList(limit)
            .then((res) => {
                let tmp = res.data.body.results;
                // console.log('bts notification: ', tmp);
                setCountPage(1);
                if (tmp.length > 0) {
                    //find user act notify
                    const tmp_numberNotiByLv = [0, 0, 0, 0];

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
                                    case 1:
                                        icon = images.noti_normal;
                                        tmp_numberNotiByLv[0] += 1;
                                        break;
                                    case 2:
                                        icon = images.noti_warning;
                                        tmp_numberNotiByLv[1] += 1;
                                        break;
                                    case 3:
                                        icon = images.noti_no_signal;
                                        tmp_numberNotiByLv[2] += 1;
                                        break;
                                    case 4:
                                        icon = images.noti_dangerous;
                                        tmp_numberNotiByLv[3] += 1;

                                        break;
                                    default:
                                        icon = images.noti_normal;
                                        tmp_numberNotiByLv[0] += 1;
                                }
                                return {
                                    ...item,
                                    user,
                                    icon,
                                };
                            });
                            if (newList.length > 0) {
                                dispatch(setListAllNotifyUnreadAction(newList)); //all unread noti of bts
                                dispatch(setListAllDisplayTypeNotifyAction(newList)); //all unread noti of bts according to type
                                if (newList.length <= 10) {
                                    dispatch(setListDisplayNotifyAction(newList)); // list noti to display first - max = 10
                                } else {
                                    dispatch(setListDisplayNotifyAction(newList.slice(0, 10)));
                                }
                                setNumberNotiByLevel(tmp_numberNotiByLv);
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
                }else{
                    dispatch(setListAllNotifyUnreadAction([]));
                    dispatch(setListAllDisplayTypeNotifyAction([]));
                    dispatch(setListDisplayNotifyAction([]));
                }
                setLoading(false);
                setIsFirstTime(false);
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
    };
    const doSocket = () => {
        socket.on('notifications', (data) => {
            let noti_data = JSON.parse(data);
            console.log('notify data: ', noti_data);
            // console.log(state.listAll);
            let icon = null;
            let tmp_numberNotiByLv = [...numberNotiByLevel];
            switch (noti_data.level) {
                case 1:
                    icon = images.noti_normal;
                    tmp_numberNotiByLv[0] += 1;
                    break;
                case 2:
                    icon = images.noti_warning;
                    tmp_numberNotiByLv[1] += 1;
                    break;
                case 3:
                    icon = images.noti_no_signal;
                    tmp_numberNotiByLv[2] += 1;
                    break;
                case 4:
                    icon = images.noti_dangerous;
                    tmp_numberNotiByLv[3] += 1;

                    break;
                default:
                    icon = images.noti_normal;
                    tmp_numberNotiByLv[0] += 1;
            }
            let newNotify = {
                ...noti_data,
                updatedAt: noti_data.date,
                icon,
            };
            // console.log("new notify: ", newNotify)
            let newListAll = [newNotify, ...state.listAll];
            let newListDisplayType = [];
            if (checkedNotis.includes(noti_data.level)) {
                // console.log('level: ', noti_data.level);
                newListDisplayType = [newNotify, ...state.listAllDisplayType];
            }
            if (newListAll.length > 0) {
                // console.log('list all notify: ', newListAll);
                dispatch(setListAllNotifyAction(newListAll)); //all noti of bts
            }
            if (newListDisplayType.length > 0) {
                // console.log('list display notify: ', newListDisplayType);
                dispatch(setListAllDisplayTypeNotifyAction(newListDisplayType)); //all noti of bts according to type
                if (newListDisplayType.length <= 10) {
                    dispatch(setListDisplayNotifyAction(newListDisplayType)); // list noti to display first - max = 10
                } else {
                    dispatch(setListDisplayNotifyAction(newListDisplayType.slice(0, 10)));
                }
                setNumberNotiByLevel(tmp_numberNotiByLv);
            }
        });
    };
    const handleSelectNotiType = (notiLevel) => {
        setCountPage(1);
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

    const handleClickSeeMore = () => {
        let tmp_countPage = countPage + 1;
        let addedList = state.listAllDisplayType.slice(countPage * 10, tmp_countPage * 10);
        // console.log("addedList: ",addedList)
        let newList = [...state.listDisplay, ...addedList];
        console.log('new list: ', newList.length);
        setCountPage(tmp_countPage);
        // dispatch(setListDisplayNotifyAction(state.listAllDisplayType));
        dispatch(setListDisplayNotifyAction(newList));
    };
    const handleClickHideAway = () => {
        setCountPage(1);
        dispatch(setListDisplayNotifyAction(state.listAllDisplayType.slice(0, 10)));
    };
    const handleClickNoti = (e) => {
        console.log(e.id);
        putMarkRead(e.id)
            .then((res) => {
                console.log('res mark read: ', res);
                //update list
                // dispatch(setNotifyAsReadAction(e.id))
                if(state.classifyType === 'all'){
                    fetchDataNotisAll();
                }else{

                    fetchDataNotisUnread();
                } 
            })
            .catch((err) => {
                console.log('err: ', err);
            });
    };
    const handleClickClassify = (type) => {
        console.log('classify type: ', type);
        // setClassifyType(type)
        dispatch(setClassifyTypeAction(type));
        if (type === 'unread') {
            fetchDataNotisUnread();
        } else {
            fetchDataNotisAll();
        }
    };
   
    const handleMarkReadAll = () => {
        console.log('Marked as read all');
        state.listAll.forEach((item, index, array) =>{
            if(!item.isRead){
                putMarkRead(item.id)
                .then((res) => {
                    console.log('res mark read: ', res);
                    //update list
                    // dispatch(setNotifyAsReadAction(item.id))
                    if(state.classifyType === 'all'){
                        fetchDataNotisAll();
                    }else{
    
                        fetchDataNotisUnread();
                    }
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
            }
        })
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
                                    <div className={cx('noti-wrapper')}>
                                        <Image className={cx('avatar')} src={item.icon} alt="avatar" />
                                        <div className={cx('info')}>
                                            <span>{numberNotiByLevel[index]} thông báo</span>
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
                        <div className={cx('notify_classify')}>
                            <div className={cx('classify')}>
                                <span
                                    className={cx('item', `${state.classifyType === 'all' ? 'active' : 'unactive'}`)}
                                    onClick={() => {
                                        handleClickClassify('all');
                                    }}
                                >
                                    Tất cả
                                </span>

                                <span
                                    className={cx('item', `${state.classifyType !== 'all' ? 'active' : 'unactive'}`)}
                                    onClick={() => {
                                        handleClickClassify('unread');
                                    }}
                                >
                                    Chưa đọc
                                </span>
                            </div>
                            <div className={cx('markallread')}>
                                <span className={cx('name')} onClick={handleMarkReadAll}>
                                    Đánh dấu tất cả là đã đọc
                                </span>
                            </div>
                        </div>
                        {state.listDisplay.length > 0 ? (
                            <>
                                <div className={cx('timeline')}>
                                    {state.listDisplay.map((item, index) => {
                                        //**need get status-type of noti from server */
                                        let status = 'on';

                                        let tmp = `${'bullet-'}${item.level}`;
                                        let isRead = item.isRead ? 'read' : 'unread';
                                        return (
                                            <div
                                                key={index}
                                                className={cx('timeline-item', isRead)}
                                                onClick={() => handleClickNoti(item)}
                                            >
                                                <div className={cx('status-item')}>
                                                    <div className={cx('status-dot')}>
                                                        <span className={cx('bullet', tmp)}></span>
                                                        {/* <span className={cx('strokes')}></span> */}
                                                    </div>
                                                    <div className={cx('text')}>
                                                        <h3 className={cx('status')}>{item.message}</h3>
                                                        {/* <h3
                                                        className={cx('title-status')}
                                                    >{`Thực hiện bởi: ${item.user.name}`}</h3> */}
                                                    </div>
                                                </div>
                                                <div className={cx('date-time')}>
                                                    <p className={cx('date')}>{convertToDate(item.updatedAt)}</p>
                                                    {item.icon && <img className={cx('icon-noti')} src={item.icon} />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {state.listAllDisplayType.length > 10 && (
                                    <div>
                                        {state.listAllDisplayType.length !== state.listDisplay.length && (
                                            <p className={cx('see-more')} onClick={handleClickSeeMore}>
                                                Xem thêm
                                            </p>
                                        )}
                                        {state.listAllDisplayType.length === state.listDisplay.length && (
                                            <p className={cx('see-more')} onClick={handleClickHideAway}>
                                                Ẩn bớt
                                            </p>
                                        )}
                                    </div>
                                )}
                            </>
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
