import { useParams } from 'react-router-dom';
import { useReducer, useEffect, useState } from 'react';
import TableBTS from '~/components/TableBTS';
import classNames from 'classnames/bind';
import Sidebar from '~/layouts/components/Sidebar';
import Header from '~/layouts/components/Header';
import { notifyByBTSReducer, initNotifyByBTS } from '~/reducer/reducer';
import { getNotificationListByBTSId } from '~/services/notificationService';
import { getBtsList } from '~/services/btsService';
import { setListNotifyByBtsIdAction } from '~/reducer/action';
import styles from './ManageBTS.module.scss';

const cx = classNames.bind(styles);
const ManageBTS = ({ invoiceData }) => {
    const [state, dispatch] = useReducer(notifyByBTSReducer, initNotifyByBTS([1, 2, 3, 4], []));
    const [listNotis, setListNotis] = useState([]);
    useEffect(() => {
        getBtsList().then((res) => {
            let btss = res.data.body.results;
            Promise.all(
                btss.map((bts) => {
                    return new Promise((resolve, reject) => {
                        getNotificationListByBTSId(bts.id).then((res) => resolve(res.data.body.results));
                    });
                }),
            ).then(function (result) {
                 console.log("result: ", result)
                let btsLine = [];
                result.map((item, index) => {
                    if (item.length > 0) {
                        let warning = '';
                        item.forEach((noti) => {
                            warning += noti.message + ', ';
                        });
                        btsLine.push({
                            id: btss[index].id,
                            name:
                                btss[index].name.length > 20
                                    ? btss[index].name.substring(0, 19) + '...'
                                    : btss[index].name,
                            quantity: result.length,
                            warning: warning.length > 70 ? warning.substring(0, 69) + '...' : warning,
                            status: '3G - 1d',
                            firmware: '4.5.0.16',
                        });
                    }
                });
                console.log('btsline: ', btsLine);
                dispatch(setListNotifyByBtsIdAction(btsLine));
            });
        });
    }, []);
    const btsId = useParams().btsId;
    const listDevice = state.listAll;

    const body = (
        <>
            <div className={cx('body-wrapper')}>
                {/* <div className={cx('search-filter')}>
                    <div className={cx('search-area')}>
                        <div className={cx('select-area')}>
                            <select className={cx('select-type')} value={deviceType} >
                                <option value="all">Chọn cảnh báo</option>
                            </select>
                        </div>
                    </div>
                </div> */}
                <div className={cx('main-content')}>
                    <div className={cx('grid wide container')}>
                        {/** Device table */}
                        {state.listAll.length > 0 && <TableBTS data={state.listAll} />}
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
};

export default ManageBTS;
