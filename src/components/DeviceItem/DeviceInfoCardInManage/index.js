//this component is used in control device page/manage device -> add device
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '~/components/images';
import { DeviceType } from '~/assets/data';
import classNames from 'classnames/bind';
import styles from './DeviceInfoCard.module.scss';

const cx = classNames.bind(styles);
function DeviceInfoCard({ data, border, className, optionType, inPopupStatus }) {
    const dvType = data.type;
    let status = data.status;
    let valueOnOff = 0;
    if (data.curData) {
        data.curData.forEach((dt) => {
            let tmp_name = dt.name;
            if (tmp_name === 'value') {
                valueOnOff = dt['value'];
            }
        });
    }
    const classes = cx('wrapper', {
        [className]: className,
        border,
    });
    return (
        <Link
            // to={`/@${data.nickname}`}
            className={classes}
        >
            <Image className={cx('avatar')} src={data.icon || DeviceType[dvType].icon} alt="avatar" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    {data.name && <span>{data.name}</span>}
                    {optionType && data.typeName && <span>{data.typeName}</span>}
                </h4>

                {/* {!inPopupStatus ? (
                    data.description && <span>{data.description}</span>
                ) : status ? (
                    valueOnOff === 0 ? (
                        <span className={cx('status_off')}>Đang tắt</span>
                    ) : (
                        <span className={cx('status_on')}>Đang bật</span>
                    )
                ) : (
                    <span className={cx('status_off')}>Mất kết nối</span>
                )} */}

                {!inPopupStatus && data.description && <span>{data.description}</span>}
                {inPopupStatus && status && valueOnOff == 0 && <span className={cx('status_off')}>Đang tắt</span>}

                {inPopupStatus && status && valueOnOff == 1 && <span className={cx('status_on')}>Đang bật</span>}

                {inPopupStatus && !status && <span className={cx('status_off')}>Mất kết nối</span>}
            </div>
        </Link>
    );
}

DeviceInfoCard.propTypes = {
    data: PropTypes.object.isRequired,
};

export default DeviceInfoCard;
