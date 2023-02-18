import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '../images';
import classNames from 'classnames/bind';
import styles from './DeviceItem.module.scss';

const cx = classNames.bind(styles);
function DeviceItem({ data, border, className, handleClick }) {
    const classes = cx('wrapper', {
        [className]: className,
        border,
    });
    return (
        <Link className={classes} onClick={handleClick}>
            <Image className={cx('avatar')} src={data.avatar} alt="avatar" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.name}</span>
                </h4>
                {data.status === 'on' ? (
                    <span className={cx('status_on')}>Đang bật</span>
                ) : (
                    <span className={cx('status_off')}>Đang tắt</span>
                )}
            </div>
        </Link>
    );
}

DeviceItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default DeviceItem;
