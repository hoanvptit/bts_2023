import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Image from '../images';
import config from '~/config';
import classNames from 'classnames/bind';
import styles from './BtsItem.module.scss';

const cx = classNames.bind(styles);
function BtsItem({ data, border, option, className, isAccount, onEditBts, onDelBts }) {
    // console.log("data bts item: ", data)
    const btsItemRef = useRef(null)
    const actionRef = useRef(null)
    const navigate = useNavigate()
    useEffect(()=>{
        function handleClickInside(event) {
            if(btsItemRef.current && btsItemRef.current.contains(event.target) && actionRef.current && !actionRef.current.contains(event.target) ){
                navigate(`/bts_home/${data.id}`);
            }
        }
        

        document.addEventListener("mousedown", handleClickInside)

        return ()=>{
            document.removeEventListener("mousedown", handleClickInside)
        }
    },[actionRef,btsItemRef])
    const classes = cx('wrapper', {
        [className]: className,
        border,
        isAccount,
    });
    return (
        <Link 
        ref={btsItemRef}
        // to={config.routes.homeBts} 
        className={classes}
        >
            <Image className={cx('avatar')} src={data.avatar} alt="avatar" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.name}</span>
                    {/* {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check_info')} />} */}
                </h4>
                <span className={cx('location')}>{data.place ? data.place : data.nickname}</span>
            </div>
            {option && (
                <div ref={actionRef} className={cx('option')}>
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
