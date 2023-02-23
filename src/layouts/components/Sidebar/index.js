import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import config from '~/config';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import { faBell, faSliders, faUserGroup, faCircleInfo, faBook, faHouse } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Sidebar() {
    const btsName = 'BTS Hà Đông';
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <h2>Trạm BTS</h2>
                </Link>
                <span className={cx('btsname')}>{btsName}</span>
            </div>
            <div className={cx('menu-group')}>
            <Menu>
                <MenuItem
                    title="Trang chủ"
                    to={config.routes.homeBts}
                    icon={<FontAwesomeIcon icon={faHouse} />}
                    // activeIcon={<HomeActiveIcon />}
                />
            </Menu>
            <div>
            <span className={cx('topic')}>ĐIỀU KHIỂN</span>
            <Menu>
                <MenuItem
                    title="Thiết bị"
                    to={config.routes.controlDevices}
                    icon={<FontAwesomeIcon icon={faSliders} />}
                    // activeIcon={<HomeActiveIcon />}
                />
            </Menu>
            </div>
            <div>
            <span className={cx('topic')}>QUẢN LÝ</span>
            <Menu>
                <MenuItem
                    title="Thiết bị"
                    to={config.routes.manageDevices}
                    icon={<FontAwesomeIcon icon={faSliders} />}
                    // activeIcon={<HomeActiveIcon />}
                />

                <MenuItem
                    title="Tài khoản"
                    to={config.routes.manageAccounts}
                    icon={<FontAwesomeIcon icon={faUserGroup} />}
                    // activeIcon={<HomeActiveIcon />}
                />
                <MenuItem
                    title="Thông báo"
                    to={config.routes.manageNotifications}
                    icon={<FontAwesomeIcon icon={faBell} />}
                    // activeIcon={<HomeActiveIcon />}
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

                    // activeIcon={<HomeActiveIcon />}
                />

                <MenuItem
                    title="Tài liệu"
                    to={config.routes.documents}
                    icon={<FontAwesomeIcon icon={faBook} />}

                    // activeIcon={<HomeActiveIcon />}
                />
            </Menu>
            </div>
            </div>
        </aside>
    );
}

export default Sidebar;
