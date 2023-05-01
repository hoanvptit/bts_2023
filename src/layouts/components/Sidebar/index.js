import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import config from '~/config';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import { faBell, faSliders, faUserGroup, faCircleInfo, faBook, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getBts } from '~/services/btsService';
import { getNotificationList } from '~/services/notificationService';
const cx = classNames.bind(styles);
function Sidebar(props) {
    const btsId = props.btsId;
    const [bts, setBts] = useState({});
    const [countUnRead, setCountUnRead] = useState(-1)
    //*get bts from server with btsId*/
    useEffect(() => {
        getBts(btsId).then((res) => {
            console.log("receive bts: ", res.data.body)
            setBts(res.data.body);
            getNotificationList(50).then(res=>{
                console.log("notify: ", res)
                let tmpListNotis = res.data.body.results
                let listUnRead = tmpListNotis.filter((item)=>{
                    return !item.isRead
                })
                if(listUnRead.length > 0){
                    setCountUnRead(listUnRead.length)
                }
            })
        });
    }, [btsId]);

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <h2>Trạm BTS</h2>
                </Link>
                <span className={cx('btsname')}>{bts.name}</span>
            </div>
            <div className={cx('menu-group')}>
                <Menu>
                    <MenuItem title="Trang chủ" to={`/bts_home/${btsId}`} icon={<FontAwesomeIcon icon={faHouse} />} />
                </Menu>
                <div>
                    <span className={cx('topic')}>ĐIỀU KHIỂN</span>
                    <Menu>
                        <MenuItem
                            title="Thiết bị"
                            to={config.routes.controlDevices(btsId)}
                            icon={<FontAwesomeIcon icon={faSliders} />}
                        />
                    </Menu>
                </div>
                <div>
                    <span className={cx('topic')}>QUẢN LÝ</span>
                    <Menu>
                        <MenuItem
                            title="Trạm BTS"
                            to={config.routes.manageBTS(btsId)}
                            icon={<FontAwesomeIcon icon={faSliders} />}
                        />
                        <MenuItem
                            title="Thiết bị"
                            to={config.routes.manageDevices(btsId)}
                            icon={<FontAwesomeIcon icon={faSliders} />}
                        />

                        <MenuItem
                            title="Tài khoản"
                            to={config.routes.manageAccounts(btsId)}
                            icon={<FontAwesomeIcon icon={faUserGroup} />}
                        />
                        <MenuItem
                            title="Thông báo"
                            to={config.routes.manageNotifications(btsId)}
                            icon={<FontAwesomeIcon icon={faBell} />}
                            informData={countUnRead}
                        />
                    </Menu>
                </div>
                <div>
                    <span className={cx('topic')}>MISC</span>
                    <Menu>
                        <MenuItem
                            title="Hỗ trợ"
                            to={config.routes.support}
                            icon={<FontAwesomeIcon icon={faCircleInfo} />}
                        />

                        <MenuItem
                            title="Tài liệu"
                            to={config.routes.documents}
                            icon={<FontAwesomeIcon icon={faBook} />}
                        />
                    </Menu>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
