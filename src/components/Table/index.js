import classNames from 'classnames/bind';
import Image from '~/components/images';
import { DeviceType } from '~/assets/data';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './Table.module.scss';
const cx = classNames.bind(style);

export default function Table(props) {
    const data = props.data;

    // console.log("data: ", data)
    const tableTitle = ['Tên thiết bị', 'Loại thiết bị', 'Trạng thái', 'Sửa/Xoá'];

    const handleClickEdit = (data) => {
        props.onClickEdit(data);
    };
    const handleClickDel = (data) => {
        props.onClickDel(data);
    };
    const DevicesLine = (index, device) => {
        // console.log('device: ', device)
        let dvType = device.type;
        let defaultIcon = DeviceType[dvType].icon;
        let dvTypeName = DeviceType[dvType].typeName;
        let tmp = index % 2;
        return (
            <tr key={index} className={cx('tb-col')}>
                <td className={cx('text-left')} style={{ width: '3%' }}>
                    <div className={cx('device_card')}>
                        <Image className={cx('avatar')} src={device.icon || defaultIcon} alt="avatar" />
                        <div className={cx('info')}>
                            <span>{device.name}</span>
                        </div>
                    </div>
                </td>
                <td className={cx('text-left')} style={{ width: '3%' }}>
                    {dvTypeName}
                </td>
                <td className={cx('text-left')} style={{ width: '3%' }}>
                    {device.status ? 'ON':'OFF'}
                </td>
                <td className={cx('text-left')} style={{ width: '1%' }}>
                    <div className={cx('option')}>
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className={cx('edit')}
                            onClick={() => handleClickEdit(device)}
                        />
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            className={cx('delete')}
                            onClick={() => handleClickDel(device)}
                        />
                    </div>
                </td>
            </tr>
        );
    };
    return (
        <div className={cx('table_device')}>
            <table>
                <thead>
                    <tr>
                        {tableTitle.map((title, index) => (
                            <th key={index}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((device, index) => {
                        return DevicesLine(index + 1, device);
                    })}
                </tbody>
            </table>
        </div>
    );
}
