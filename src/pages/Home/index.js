import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useReducer, useEffect } from 'react';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Button from '~/components/Button';
import BtsItem from '~/components/BtsItem';
import Pagination from '~/components/pagination';
import PopupAddObject from '~/components/popup/popupAddBts';
import { listBts as BtsData } from '~/assets/data';
import { addBts, delBts, getBtsList, getBts, updateBts } from '~/services/btsService';
//USE REDUCER
import { initBts, btsReducer } from '~/reducer/reducer';
import { addBtsAction, delBtsAction, setBtsAction, setListBtsAction, editBtsAction } from '~/reducer/action';
import logger from '~/reducer/logger';
import styles from './Home.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { set } from 'react-hook-form';

const cx = classNames.bind(styles);
let PageSize = 10;
export default function Home() {
    // const result = BtsData;
    // const [result, setResult] = useState([])
    const [state, dispatch] = useReducer(btsReducer, initBts([]));
    const [popUpAttr, setPopUpAttr] = useState({
        show: false,
        type: 'add',
        title: 'Thêm trạm BTS',
        sendObject: state.bts,
    });
    const [btsUnit, setBtsUnit] = useState('');
    const [btsGroup, setBtsGroup] = useState('');
    //** For Pagination */
    const [currentPage, setCurrentPage] = useState(1);
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return state.listBts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);
    //** End Pagination */
    useEffect(() => {
        getBtsList().then((res) => {
            let result = res.data.body.results;
            console.log('res get bts: ', res.data.body);
            dispatch(setListBtsAction(result));
        });
    }, []);

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
        // console.log(state.bts)
        //** */
        addBts({
            name: state.bts.name,
            mac: state.bts.mac,
            place: state.bts.place,
            description: 'this is bts',
        });

        dispatch(addBtsAction(state.bts));
    };
    const handleEditBts = () => {
        updateBts(state.bts.id,{
            name: state.bts.name,
            mac: state.bts.mac,
            place: state.bts.place,
            description: 'this is bts',
        });
        dispatch(editBtsAction(state.bts))
    };
    const handleDelBts = () => {
        

        delBts(state.bts.id)

        dispatch(delBtsAction(state.bts));
    };
    const onAction = () => {
        if (popUpAttr.type === 'add') return handleAddBts();
        if (popUpAttr.type === 'edit') return handleEditBts();
        if (popUpAttr.type === 'del') return handleDelBts();
    };
    //change object bts need to add/edit
    const changeObjectAddBts = (bts) => {
        // console.log("bts: ", bts)
        // setBtsObject((prev) => ({
        //     ...prev,
        //     ...bts,
        // }));
        dispatch(setBtsAction(bts));
    };

    //** For show Bts infomation in a line */

    const BtsLine = () => {
        return (
            <div className={cx('row bts_line')}>
                {state.listBts.map((item, index) => {
                    return (
                        <div key={index} className={cx('col l-3 m-6 c-12')}>
                            <BtsItem
                                data={item}
                                border
                                option
                                onEditBts={() => {
                                    // setBtsObject(item);
                                    dispatch(setBtsAction(item));
                                    setPopUpAttr({
                                        show: true,
                                        type: 'edit',
                                        title: 'Sửa thông tin trạm BTS',
                                        sendObject: item,
                                    });
                                }}
                                onDelBts={() => {
                                    // setBtsObject(item);
                                    dispatch(setBtsAction(item));
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
    const body = (
        <>
            {popUpAttr.show && (
                <PopupAddObject
                    type={popUpAttr.type}
                    popup_title={popUpAttr.title}
                    show={popUpAttr.show}
                    bts_object={state.bts}
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

            <div className={cx('body-wrapper')}>
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
                                // setBtsObject(initBtsObject);
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
                            totalCount={state.listBts.length}
                            pageSize={PageSize}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{body}</div>
            </div>
        </div>
    );
}
