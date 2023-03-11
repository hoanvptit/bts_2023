import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Image from '../images';
import { DeviceType } from '~/assets/data';
import { Link } from 'react-router-dom';
import styles from './DeviceItem.module.scss';

const cx = classNames.bind(styles);
function DeviceItem({ data, border, className, handleClick }) {
    let status = data.status;
    let status_classname = 'connected';
    if (!status) status_classname = 'disconnected';
    let valueOnOff = 0;
    data.curData.forEach((dt) => {
        let tmp_name = dt.name;
        if (tmp_name === 'value') {
            valueOnOff = dt['value'];
        }
    });
    // console.log('value on off: ', valueOnOff);
    const defaultIcon = DeviceType[data.type].icon;
    const classes = cx('wrapper', `${status_classname}`, {
        [className]: className,
        border,
    });
    return (
        <Link className={classes} onClick={handleClick}>
            <Image className={cx('avatar')} src={data.icon || defaultIcon} alt="avatar" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.name}</span>
                </h4>
                {(status && valueOnOff == 0) && <span className={cx('status_off')}>Đang tắt</span>}

                {(status && valueOnOff == 1) && <span className={cx('status_on')}>Đang bật</span>}

                {!status && <span className={cx('status_off')}>Mất kết nối</span>}
            </div>
        </Link>
    );
}

DeviceItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default DeviceItem;
