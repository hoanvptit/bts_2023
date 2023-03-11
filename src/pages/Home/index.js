import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useReducer, useEffect } from 'react';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Button from '~/components/Button';
import BtsItem from '~/components/BtsItem';
import Loader from '~/components/Loader';
import ToastMessage from '~/components/popup/toast/ToastMessage';
import Pagination from '~/components/pagination';
import PopupAddObject from '~/components/popup/popupAddBts';
import images from '~/assets/images';
import { addBts, delBts, getBtsList, getBts, updateBts } from '~/services/btsService';
//USE REDUCER
import { initBts, btsReducer, initialStateFetch, fetchReducer } from '~/reducer/reducer';
import { addBtsAction, delBtsAction, setBtsAction, setListBtsAction, editBtsAction, fetchSuccessAction } from '~/reducer/action';
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
    const initialBts =  { id: '', index: null, name: '', mac: '', place: '', avatar: '' }
    const [state, dispatch] = useReducer(btsReducer, initBts([]));
    const [popUpAttr, setPopUpAttr] = useState({
        show: false,
        type: 'add',
        title: 'Thêm trạm BTS',
        sendObject: state.bts,
    });
    const [showToast, setShowToast] = useState({
        show: false,
        title: '',
        content: '',
    });
    const [loading, setLoading] = useState(true)
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
            dispatch(setListBtsAction(result));
            setLoading(false)
        }).catch(err=>{
            setLoading(false)
                let contentToast = err.response?err.response.data.message : err.message;
                setShowToast((prev) => {
                    return {
                        ...prev,
                        show: true,
                        content:`Có lỗi xảy ra: ${contentToast}`,
                    };
                });
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
        setLoading(true)
        //** */
        addBts({
            name: state.bts.name,
            mac: state.bts.mac,
            place: state.bts.place,
        }).then((res) => {
            console.log('add bts: ',res)
            let tm_bts_add = res.data.body;
            if (res.status == 201) {
                let contentToast = 'Thêm trạm BTS thành công';
                setShowToast((prev) => {
                    return {
                        ...prev,
                        show: true,
                        content:contentToast,
                    };
                });
            }
            dispatch(addBtsAction(tm_bts_add));
            dispatch(setBtsAction(initialBts));
            setLoading(false)
        }).catch(err=>{
            setLoading(false)
            console.log("err: ", err)
            let contentToast = err.response?err.response.data.message : err.message;

            // let contentToast = `Thêm trạm BTS không thành công`;
            setShowToast((prev) => {
                return {
                    ...prev,
                    show: true,
                    content:`Thêm trạm BTS không thành công:${contentToast}`,
                };
            });
            dispatch(setBtsAction(initialBts));
        });
    };
    const handleEditBts = () => {
        setLoading(true)
        updateBts(state.bts.id, {
            name: state.bts.name,
            mac: state.bts.mac,
            place: state.bts.place,
        }).then((res) => {
            if (res.status == 200) {
                let contentToast = 'Sửa thông tin trạm BTS thành công';
                setShowToast((prev) => {
                    return {
                        ...prev,
                        show: true,
                        content:contentToast,
                    };
                });
            }
            dispatch(editBtsAction(state.bts));
            dispatch(setBtsAction(initialBts));
            setLoading(false)
        }).catch(err=>{
            setLoading(false)
            let contentToast = err.response?err.response.data.message : err.message;
            // let contentToast = 'Sửa thông tin trạm BTS không thành công';
            setShowToast((prev) => {
                return {
                    ...prev,
                    show: true,
                    content:`Sửa thông tin trạm BTS không thành công: ${contentToast}`,
                };
            });
            dispatch(setBtsAction(initialBts));
        });
    };
    const handleDelBts = () => {
        setLoading(true)
        delBts(state.bts.id).then((res) => {
            let contentToast = 'Xoá trạm BTS thành công';
                setShowToast((prev) => {
                    return {
                        ...prev,
                        show: true,
                        content:contentToast,
                    };
                });
            dispatch(delBtsAction(state.bts));
            dispatch(setBtsAction(initialBts));
            setLoading(false)
        }).catch(err=>{
            setLoading(false)
            // let contentToast = 'Xoá trạm BTS không thành công';
            let contentToast = err.response?err.response.data.message : err.message;
            setShowToast((prev) => {
                return {
                    ...prev,
                    show: true,
                    content:`Xoá trạm BTS không thành công: ${contentToast}`,
                };
            });
            dispatch(setBtsAction(initialBts));
        });
    };
    const onAction = () => {
        if (popUpAttr.type === 'add') return handleAddBts();
        if (popUpAttr.type === 'edit') return handleEditBts();
        if (popUpAttr.type === 'del') return handleDelBts();
    };
    //change object bts need to add/edit
    const changeObjectAddBts = (bts) => {
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
                                    dispatch(setBtsAction(item));
                                    setPopUpAttr({
                                        show: true,
                                        type: 'edit',
                                        title: 'Sửa thông tin trạm BTS',
                                        sendObject: item,
                                    });
                                }}
                                onDelBts={() => {
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
           {loading && <Loader />}

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
            
            {showToast && (
                <ToastMessage
                    show={showToast.show}
                    title={showToast.title}
                    content={showToast.content}
                    onChange={() =>
                        setShowToast((prev) => {
                            return { ...prev, show: false };
                        })
                    }
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
                                setPopUpAttr({ show: true, type: 'add', title: 'Thêm trạm BTS' });
                            }}
                        >
                            Thêm BTS
                        </Button>
                    </div>
                </div>
                {state.listBts.length > 0 ? (
                    <>
                        <div className={cx('main-content')}>
                            <div className={cx('grid wide container')}>
                                <BtsLine />
                            </div>
                        </div>
                        <div className={cx('page')}>
                            <p>Hiển thị từ 1 đến 20 trong 300 trạm BTS</p>
                            <div className={cx('paging')}>
                                <Pagination
                                    currentPage={currentPage}
                                    totalCount={state.listBts.length}
                                    pageSize={PageSize}
                                    onPageChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={cx('no_data')}>
                        <img src={images.no_data} className={cx('img_no_data')} alt="no data" />
                        <span>Không có trạm BTS nào</span>
                    </div>
                )}
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
