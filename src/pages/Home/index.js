import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useState, useMemo } from 'react';
import Button from '~/components/Button';
import BtsItem from '~/components/BtsItem';
import Pagination from '~/components/pagination';

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

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return result.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);
    const BtsLine = () => {
        // return result.map((item, index) => {
        return (
            <div className={cx('row bts_line')}>
                {currentTableData.map((item, index) => {
                    return (
                        <div className={cx('col l-3 m-6 c-12')}>
                            <BtsItem key={index} data={item} border option />
                        </div>
                    );
                })}
            </div>
        );
        // })
    };
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('search-filter-title')}>Search Filter</h3>
            <div className={cx('search-filter')}>
                <div className={cx('select-area')}>
                    <select
                        className={cx('select-unit')}
                        value={'Chọn đơn vị'}
                        //   onChange={handlePerPage}
                    >
                        <option value="10">Chọn đơn vị</option>
                        <option value="25">Chọn đơn vị</option>
                        <option value="50">Chọn đơn vị</option>
                    </select>
                    <select
                        className={cx('select-group')}
                        value={'statusValue'}
                        //   onChange={handleStatusValue}
                    >
                        <option value="">Chọn nhóm</option>
                        <option value="downloaded">Chọn nhóm</option>
                        <option value="draft">Chọn nhóm</option>
                        <option value="paid">Chọn nhóm</option>
                        <option value="partial payment">Chọn nhóm</option>
                        <option value="past due">Chọn nhóm</option>
                        <option value="sent">Chọn nhóm</option>
                    </select>
                </div>
                <div className={cx('btn-add-bts')}>
                    <Button primary small leftIcon={<FontAwesomeIcon icon={faPlus} />}>
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
    );
}
