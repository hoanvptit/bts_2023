import classNames from 'classnames/bind';
import style from './LoaderFull.module.scss';

const cx = classNames.bind(style);
export default function LoaderFull() {
    return (
        <div className={cx('lcl-background')}>
            <div className={cx('lcl-loading')}></div>
        </div>
    );
}
