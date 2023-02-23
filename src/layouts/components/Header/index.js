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
import images from '~/assets/images';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '~/config';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/images';
import Search from '../Search';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { handleLogout } from '~/services/loginService';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'BTS của tôi',
        to: '/myBts',
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
    const currentUser = true;
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

                    <Menu items={userMenu} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                src="https://files.fullstack.edu.vn/f8-tiktok/users/4761/63be78365ed1d.jpg"
                                className={cx('user-avatar')}
                                alt="Nguyen Van Hoa"
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
