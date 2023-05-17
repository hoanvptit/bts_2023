import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { socket } from '~/services/socket';
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
import { countNoUnRead } from '~/services/notificationService';

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
    const [countUnRead, setCountUnRead] = useState(-1);
    const classes = cx({ [className]: className }, 'wrapper');

    useEffect(() => {
            countNoUnRead().then(res=>{
                let amount = res.data.body
                if(amount > 0){
                    setCountUnRead(amount)
                }
            }).catch(err=>{
                console.log('err: ', err)
            })
        },[]);
    useEffect(()=>{
        // doSocket()
        return(()=>{
            socket.off('notifications');
        })   
    })

    const doSocket = ()=>{
        socket.on('notifications',(data)=>{
            countNoUnRead().then(res=>{
                let amount = res.data.body
                if(amount > 0){
                    setCountUnRead(amount)
                }
            }).catch(err=>{
                console.log('err: ', err)
            })
        })
    }
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
                                    {countUnRead && countUnRead > 0 && (
                                        <span className={cx('informData')}>{countUnRead}</span>
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
