import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useState, useMemo } from 'react';
import Button from '~/components/Button';
import BtsItem from '~/components/BtsItem';
import Pagination from '~/components/pagination';
import PopupAddObject from '~/components/popup/popupAddObject/popup_add_object';

import styles from './Home.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
let PageSize = 10;
export default function Home() {
    const result = [
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            location: 'Ha Dong - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            location: 'Ha Tay - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            location: 'Ha Nam - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            location: 'Ha Bac - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            location: 'Ha Dong - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            location: 'Ha Tay - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            location: 'Ha Nam - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            location: 'Ha Bac - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            location: 'Ha Dong - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            location: 'Ha Tay - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            location: 'Ha Nam - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            location: 'Ha Bac - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            location: 'Ha Dong - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            location: 'Ha Tay - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            location: 'Ha Nam - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            location: 'Ha Bac - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            location: 'Ha Dong - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            location: 'Ha Tay - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            location: 'Ha Nam - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            location: 'Ha Bac - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            location: 'Ha Dong - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            location: 'Ha Tay - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            location: 'Ha Nam - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            location: 'Ha Bac - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            location: 'Ha Dong - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            location: 'Ha Tay - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            location: 'Ha Nam - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            location: 'Ha Bac - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            location: 'Ha Dong - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            location: 'Ha Tay - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            location: 'Ha Nam - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            location: 'Ha Bac - Ha Noi',
        },
    ];
    const [popUpAttr, setPopUpAttr] = useState({ show: false, type: 'add', title: 'Thêm trạm BTS' });
    const [btsObject, setBtsObject] = useState({ name: '111', mac: '222', address: '333' });
    const [btsUnit, setBtsUnit] = useState('');
    const [btsGroup, setBtsGroup] = useState('');

    //** For Pagination */
    const [currentPage, setCurrentPage] = useState(1);
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return result.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);
    //** End Pagination */

    const handleChangeUnit = (e) => {
        let value = e.target.value;
        setBtsUnit(value);
    };
    const handleChangeBtsGroup = (e) => {
        let value = e.target.value;
        setBtsGroup(value);
    };
    //** For handle add bts */
    const handleAddBts = () => {
        console.log('add success');
        console.log('addObject:', btsObject);
    };
    const handleEditBts = () => {};
    const handleDelBts = () => {};
    const onAction = () => {
        if (popUpAttr.type === 'add') return handleAddBts;
        if (popUpAttr.type === 'edit') return handleEditBts;
        if (popUpAttr.type === 'del') return handleDelBts;
    };
    //change object bts need to add
    const changeObjectAddBts = (bts) => {
        setBtsObject((prev) => ({
            ...prev,
            ...bts,
        }));
    };

    //** For show Bts infomation in a line */

    const BtsLine = () => {
        return (
            <div className={cx('row bts_line')}>
                {currentTableData.map((item, index) => {
                    return (
                        <div  key={index} className={cx('col l-3 m-6 c-12')}>
                            <BtsItem
                               
                                data={item}
                                border
                                option
                                onEditBts={() =>
                                    setPopUpAttr({ show: true, type: 'edit', title: 'Sửa thông tin trạm BTS' })
                                }
                                onDelBts={() => setPopUpAttr({ show: true, type: 'del', title: 'Xoá trạm BTS' })}
                            />
                        </div>
                    );
                })}
            </div>
        );
    };
    //** End Bts Line */
    return (
        <>
            <PopupAddObject
                type={popUpAttr.type}
                popup_title={popUpAttr.title}
                show={popUpAttr.show}
                bts_object={btsObject}
                action={onAction}
                onChangeShow={() =>
                    setPopUpAttr((prev) => ({
                        ...prev,
                        show: false,
                    }))
                }
                onChangeObject={changeObjectAddBts}
            />

            <div className={cx('wrapper')}>
                <h3 className={cx('search-filter-title')}>Search Filter</h3>
                <div className={cx('search-filter')}>
                    <div className={cx('select-area')}>
                        <select className={cx('select-unit')} value={btsUnit} onChange={handleChangeUnit}>
                            <option value="10">Chọn đơn vị</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <select className={cx('select-group')} value={btsGroup} onChange={handleChangeBtsGroup}>
                            <option value="">Chọn nhóm</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                    <div className={cx('btn-add-bts')}>
                        <Button
                            primary
                            small
                            leftIcon={<FontAwesomeIcon icon={faPlus} />}
                            onClick={() => setPopUpAttr({ show: true, type: 'add', title: 'Thêm trạm BTS' })}
                        >
                            Thêm BTS
                        </Button>
                    </div>
                </div>
                <div className={cx('main-content')}>
                    <div className={cx('grid wide container')}>
                        <BtsLine />
                    </div>
                </div>
                <div className={cx('page')}>
                    <p>Hiển thị từ 1 đến 20 trong 300 trạm BTS</p>
                    <div className={cx('paging')}>
                        <Pagination
                            // className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={result.length}
                            pageSize={PageSize}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
