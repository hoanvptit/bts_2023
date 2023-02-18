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
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

import config from '~/config';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { NotifyIcon } from '~/components/icons';
import Image from '~/components/images';
import Search from '../Search';
import { faBell } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];
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
        to: '/logout',
        separate: true,
    },
];
//handle logic
const handleMenuChange = (item) => {
    console.log(item);
};
function Header({ className }) {
    const currentUser = true;
    const classes = cx({ [className]: className }, 'wrapper');
    return (
        <header className={classes}>
            <div className={cx('inner')}>
                {/* Search */}
                <Search />
                <div className={cx('action')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faBell} />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text_type>Upload</Button>
                            <Button primary>Log in</Button>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
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
