//this component is used in control device page/manage device -> add device
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '~/components/images';
import { NotifyType } from '~/assets/data';
import classNames from 'classnames/bind';
import styles from './NotifyInfoCard.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);
function NotifyInfoCard({className, border, data, checked, onChangeSelect }) {
    // console.log("checked: ", checked)

    const [checkedList, setCheckedList] = useState(checked)
    console.log("checkedList: ",checkedList)
    const level = data.level;
    // console.log('level: ', level)
    const classes = cx('wrapper', {
        [className]: className,
        border,
    });
    const handleChecked = (level) =>{
        setCheckedList((prev)=>{
            let isChecked = checkedList.includes(level)
            if(isChecked){
                return checkedList.filter(item=> item!== level)
            }else{
                return [...prev, level]
            }
        })
        onChangeSelect(level)
    }
    return (
        <Link
            // to={`/@${data.nickname}`}
            className={classes}
        >
            <Image className={cx('avatar')} src={data.icon || NotifyType[level].icon} alt="avatar" />
            <div className={cx('info')}>
                {data.value && <span>{data.value}</span>}
                <h4 className={cx('name')}>{data.name && <span>{data.label}</span>}</h4>
            </div>
            <input type="checkbox" checked={checkedList.includes(level)} onChange={()=>handleChecked(level)}/>
        </Link>
    );
}

NotifyInfoCard.propTypes = {
    data: PropTypes.object.isRequired,
};

export default NotifyInfoCard;
