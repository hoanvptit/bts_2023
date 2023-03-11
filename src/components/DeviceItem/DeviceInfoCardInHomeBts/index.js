//this component is used in control device page/manage device -> add device
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '~/components/images';
import { DeviceType } from '~/assets/data';
import classNames from 'classnames/bind';
import styles from './DeviceInfoCard.module.scss';

const cx = classNames.bind(styles);
function DeviceInfoCard({ data, border, className, optionType, defaultIcon }) {
    const classes = cx('wrapper', {
        [className]: className,
        border,
    });
    return (
        <Link
            // to={`/@${data.nickname}`}
            className={classes}
        >
            <Image className={cx('avatar')} src={defaultIcon || data.icon} alt="avatar" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    {data.name && <span>{data.name}</span>}
                    {optionType && data.typeName && <span>{data.typeName}</span>}
                </h4>
            </div>
        </Link>
    );
}

DeviceInfoCard.propTypes = {
    data: PropTypes.object.isRequired,
};

export default DeviceInfoCard;
