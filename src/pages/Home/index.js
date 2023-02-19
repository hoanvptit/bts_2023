import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useState, useMemo } from 'react';
import Button from '~/components/Button';
import BtsItem from '~/components/BtsItem';
import Pagination from '~/components/pagination';
import PopupAddObject from '~/components/popup/popupAddBts';

import styles from './Home.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
let PageSize = 10;
export default function Home() {
    const result = [
        {
            id: 1,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            mac: 123,
            location: 'Ha Dong - Ha Noi',
        },
        {
            id: 2,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            mac: 123,
            location: 'Ha Tay - Ha Noi',
        },
        {
            id: 3,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            mac: 123,
            location: 'Ha Nam - Ha Noi',
        },
        {
            id: 4,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            mac: 123,
            location: 'Ha Bac - Ha Noi',
        },
        {
            id: 5,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            mac: 123,
            location: 'Ha Dong - Ha Noi',
        },
        {
            id: 6,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            mac: 123,
            location: 'Ha Tay - Ha Noi',
        },
        {
            id: 7,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            mac: 123,
            location: 'Ha Nam - Ha Noi',
        },
        {
            id: 8,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            mac: 123,
            location: 'Ha Bac - Ha Noi',
        },
        {
            id: 9,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            mac: 123,
            location: 'Ha Dong - Ha Noi',
        },
        {
            id: 10,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            mac: 123,
            location: 'Ha Tay - Ha Noi',
        },
        {
            id: 11,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            mac: 123,
            location: 'Ha Nam - Ha Noi',
        },
        {
            id: 12,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            mac: 123,
            location: 'Ha Bac - Ha Noi',
        },
        {
            id: 13,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            mac: 123,
            location: 'Ha Dong - Ha Noi',
        },
        {
            id: 14,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            mac: 123,
            location: 'Ha Tay - Ha Noi',
        },
        {
            id: 15,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            mac: 123,
            location: 'Ha Nam - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            mac: 123,
            location: 'Ha Bac - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            mac: 123,
            location: 'Ha Dong - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            mac: 123,
            location: 'Ha Tay - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            mac: 123,
            location: 'Ha Nam - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            mac: 123,
            location: 'Ha Bac - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            mac: 123,
            location: 'Ha Dong - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            mac: 123,
            location: 'Ha Tay - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            mac: 123,
            location: 'Ha Nam - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            mac: 123,
            location: 'Ha Bac - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            mac: 123,
            location: 'Ha Dong - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            mac: 123,
            location: 'Ha Tay - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            mac: 123,
            location: 'Ha Nam - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            mac: 123,
            location: 'Ha Bac - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            mac: 123,
            location: 'Ha Dong - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            mac: 123,
            location: 'Ha Tay - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            mac: 123,
            location: 'Ha Nam - Ha Noi',
        },
        {
            id: 16,
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            mac: 123,
            location: 'Ha Bac - Ha Noi',
        },
    ];
    const [listBts, setListBts] = useState(result);
    const initBtsObject = { name: '', mac: '', location: '', avatar: '' };
    const [popUpAttr, setPopUpAttr] = useState({
        show: false,
        type: 'add',
        title: 'Thêm trạm BTS',
        sendObject: initBtsObject,
    });
    const [btsObject, setBtsObject] = useState(initBtsObject);
    const [btsUnit, setBtsUnit] = useState('');
    const [btsGroup, setBtsGroup] = useState('');

    //** For Pagination */
    const [currentPage, setCurrentPage] = useState(1);
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return listBts.slice(firstPageIndex, lastPageIndex);
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
        // add to result list
        let newList = [...listBts];
        newList.push(btsObject);
        console.log('new list: ', newList);
        setListBts(newList);
    };
    const handleEditBts = () => {
        console.log('edit  success');
        console.log('edit Object:', btsObject);
    };
    const handleDelBts = () => {
        console.log('del  success');
        console.log('del Object:', btsObject);
        //del from list
        let newList = [...listBts];
        newList.splice(btsObject.id, 1);
        console.log(newList);
        setListBts(newList)
    };
    const onAction = () => {
        if (popUpAttr.type === 'add') return handleAddBts();
        if (popUpAttr.type === 'edit') return handleEditBts();
        if (popUpAttr.type === 'del') return handleDelBts();
    };
    //change object bts need to add/edit
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
                        <div key={index} className={cx('col l-3 m-6 c-12')}>
                            <BtsItem
                                data={item}
                                border
                                option
                                onEditBts={() => {
                                    setBtsObject(item);
                                    setPopUpAttr({
                                        show: true,
                                        type: 'edit',
                                        title: 'Sửa thông tin trạm BTS',
                                        sendObject: item,
                                    });
                                }}
                                onDelBts={() => {
                                    setBtsObject(item);
                                    setPopUpAttr({ show: true, type: 'del', title: 'Xoá trạm BTS', sendObject: item });
                                }}
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
            {popUpAttr.show && (
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
            )}

            <div className={cx('wrapper')}>
                <h3 className={cx('search-filter-title')}>Bộ lọc tìm kiếm</h3>
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
                            onClick={() => {
                                setBtsObject(initBtsObject);
                                setPopUpAttr({ show: true, type: 'add', title: 'Thêm trạm BTS' });
                            }}
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
