import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import BtsItem from '~/components/BtsItem';
import Header from './Header';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);
const defaultFn = () => {};
function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn, user={} }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    // const user = {
    //     avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
    //     name: 'Nguyen Van Hoa',
    //     nickname: 'hoanvptit',
    // };
    const AccountOnMenu = () => {
        return <BtsItem key={user.id} data={user} isAccount />;
    };
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => {
            return prev.slice(0, history.length - 1);
        });
    };
    const renderResult = (attrs) => (
        <div className={cx('item-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title="Language" onBack={handleBack} />}
                <div className={cx('menu-body')}>
                    <AccountOnMenu />
                    {renderItems()}
                </div>
            </PopperWrapper>
        </div>
    );
    //Reset to first page
    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };
    return (
        <Tippy
            interactive
            delay={[0, 700]}
            offset={[12, 8]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={renderResult}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
