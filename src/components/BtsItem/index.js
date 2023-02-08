import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Image from '../images';
import classNames from 'classnames/bind';
import styles from './BtsItem.module.scss';

const cx = classNames.bind(styles);
function BtsItem({ data, border, option, className, isAccount, onEditBts, onDelBts }) {
    const classes = cx('wrapper', {
        [className]: className,
        border,
        isAccount,
    });
    return (
        <Link 
        // to={`/@${data.nickname}`} 
        className={classes}
        >
            <Image className={cx('avatar')} src={data.avatar} alt="avatar" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.name}</span>
                    {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check_info')} />}
                </h4>
                <span className={cx('location')}>{data.location ? data.location : data.nickname}</span>
            </div>
            {option && (
                <div className={cx('option')}>
                    <FontAwesomeIcon icon={faPenToSquare} className={cx('edit')} onClick={onEditBts} />
                    <FontAwesomeIcon icon={faTrashCan} className={cx('delete')} onClick={onDelBts} />
                </div>
            )}
        </Link>
    );
}

BtsItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default BtsItem;
