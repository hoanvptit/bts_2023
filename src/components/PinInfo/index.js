import classNames from 'classnames/bind';
import style from './PinInfo.module.scss';
const cx = classNames.bind(style);
function PinInfo({ data }) {
    const Data = data;
    return (
        <div className={cx('pin-info')}>
            <div className={cx('label-list')}>
                {Data.map((item, index) => {
                    return <p className={cx('label')} key={index}>{item.label}</p>;
                })}
            </div>
            <div className={cx('value-list')}>
                {Data.map((item, index) => {
                    return  <input key={index} className={cx('pin-value')} type="text" value={item.value} disabled />
                })}
            </div>
            <div className={cx('unit-list')}>
                {Data.map((item, index) => {
                    if (item.unit) {
                        return <p key={index} className={cx('unit')} >{item.unit}</p>;
                    }
                    return <></>;
                })}
            </div>
        </div>
    );
}

export default PinInfo;
