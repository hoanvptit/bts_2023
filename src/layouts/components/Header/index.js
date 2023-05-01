import classNames from 'classnames/bind';
import { getUserData } from '~/util/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faEarthAsia,
    faEllipsisVertical,
    faKeyboard,
    faUser,
    faCoins,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/images';
import Search from '../Search';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { handleLogout } from '~/services/loginService';
import styles from './Header.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'BTS của tôi',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Phiên bản phần mềm',
        to: '/versionCode',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Cài đặt',
        to: '/settings',
    },
    //   ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Hồ sơ của tôi',
        to: '/@hoaa',
    },
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Đăng xuất',
        to: '/login',
        separate: true,
        onClick: function(){
            handleLogout()
        }
    },
];
//handle logic
const handleMenuChange = (item) => {
    // console.log(item);
    item.onClick && item.onClick()
};
function Header({ className }) {
    const currentUser = getUserData();
    const informData = 5;
    const classes = cx({ [className]: className }, 'wrapper');
    return (
        <header className={classes}>
            <div className={cx('inner')}>
                {/* Search */}
                <Search />
                <div className={cx('action')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 200]} content="Thông báo" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faBell} />
                                    {informData && informData > 0 && (
                                        <span className={cx('informData')}>{informData}</span>
                                    )}
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text_type>Upload</Button>
                            <Button primary>Log in</Button>
                        </>
                    )}

                    <Menu items={userMenu} onChange={handleMenuChange} user={currentUser}>
                        {currentUser ? (
                            <Image
                                src={currentUser.avatar ||images.default_avatar}
                                className={cx('user-avatar')}
                                alt={currentUser.name}
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
