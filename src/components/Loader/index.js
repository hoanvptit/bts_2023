import classNames from 'classnames/bind';
import style from './Loader.module.scss';

const cx = classNames.bind(style);
export default function Loader() {
    return (
        <div className={cx('lcl-background')}>
            <div className={cx('lcl-loading')}></div>
        </div>
    );
}
