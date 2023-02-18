//this component is used in control device page/manage device -> add device
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '~/components/images';
import classNames from 'classnames/bind';
import styles from './DeviceInfoCard.module.scss';

const cx = classNames.bind(styles);
function DeviceInfoCard({ data, border, className, optionType }) {
    const classes = cx('wrapper', {
        [className]: className,
        border,
    });
    return (
        <Link
            // to={`/@${data.nickname}`}
            className={classes}
        >
            <Image className={cx('avatar')} src={data.avatar} alt="avatar" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                   {data.name && <span>{data.name}</span>} 
                   {optionType && data.typeName && <span>{data.typeName}</span>} 

                </h4>
                {data.description && <span>{data.description}</span>}
                {data.description && data.status === 'on' && <span className={cx('status_on')}>Đang bật</span>}
                {data.description && data.status === 'off' && <span className={cx('status_off')}>Đang tắt</span>}
            </div>
        </Link>
    );
}

DeviceInfoCard.propTypes = {
    data: PropTypes.object.isRequired,
};

export default DeviceInfoCard;
