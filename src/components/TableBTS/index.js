import classNames from 'classnames/bind';

import style from './TableBTS.module.scss';
const cx = classNames.bind(style);

export default function TableBTS(props) {
    const data = props.data;
    const tableTitle = ['Mã trạm', 'Tên trạm', 'Cảnh báo', 'Kết nối', 'Firmware'];
    const BTSLine = (index, device) => {
        return (
            <tr className={cx('tb-col')}>
                <td style={{ width: '20%' }}>
                    {device.id}
                </td>
                <td style={{ width: '20%' }}>
                    {device.name}
                </td>
                <td style={{ width: '50%' }}>
                    <div className={cx('hl')}>
                        <div className={cx('warning')}>{device.quantity}</div>
                        {device.warning}
                    </div>
                </td>
                <td style={{ width: '10%' }}>
                    <div className={cx('hl')}>
                        <div className={cx('connect')}>.</div>
                        {device.status}
                    </div>
                </td>
                <td style={{ width: '10%' }}>
                    {device.firmware}
                </td>
            </tr>
        );
    };
    return (
        <div className={cx('table_device')}>
            <table>
                <thead>
                    <tr>
                        {tableTitle.map((title) => (
                            <th>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((device, index) => {
                        return BTSLine(index + 1, device);
                    })}
                </tbody>
            </table>
        </div>
    );
}
