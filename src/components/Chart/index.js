import 'chart.js/auto';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import Button from '../Button';
import Loader from '../Loader';
import ToastMessage from '../popup/toast/ToastMessage';
import { useEffect, useState } from 'react';
import { DataBattery, DataSensor, PinIndex } from '~/assets/data';
// ** Third Party Components
import { Line } from 'react-chartjs-2';
import Flatpickr from 'react-flatpickr';
import style from './Chart.module.scss';
import { getAverageValue } from '~/services/deviceService';
import { covertDataChart, extractDateOnly } from '~/util/utils';

const cx = classNames.bind(style);
const AreaChart = (props) => {
    const device = props.device;
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState({
        show: false,
        title: '',
        content: '',
    });
    const [data, setData] = useState(null);
    const [date, setDate] = useState(extractDateOnly(new Date().toISOString()));
    const [selectedIndex, setSelectedIndex] = useState('');

    useEffect(() => {
        getAverageValue(device.id, date, device.type)
            .then((res) => {
                let tmp_data = res.data.body;
                if (tmp_data.length > 0) setData(covertDataChart(tmp_data));
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                let contentToast = err.response ? err.response.data.message : err.message;
                setShowToast((prev) => {
                    return {
                        ...prev,
                        show: true,
                        content: `Có lỗi xảy ra: ${contentToast}`,
                    };
                });
            });
    }, [device.id, date]);
    const handleChangeSelectedIndex = (e) => {
        let attr = e.target.value;
        // console.log("pin index: ", attr)
        setLoading(true);
        getAverageValue(device.id, date, device.type, attr)
            .then((res) => {
                let tmp_data = res.data.body;
                if (tmp_data.length > 0) setData(covertDataChart(tmp_data));
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                let contentToast = err.response ? err.response.data.message : err.message;
                setShowToast((prev) => {
                    return {
                        ...prev,
                        show: true,
                        content: `Có lỗi xảy ra: ${contentToast}`,
                    };
                });
            });
        setSelectedIndex(attr);
    };
    // ** Chart Options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: { top: -20 },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(204, 204, 204, 0.4)',
                    borderColor: 'transparent',
                },
                ticks: { color: '#000' },
            },
            y: {
                min: 0,
                max: 200,
                grid: {
                    color: 'rgba(204, 204, 204, 0.4)',
                    borderColor: 'transparent',
                },
                ticks: {
                    stepSize: 15,
                    color: '#000',
                },
            },
        },
        plugins: {
            legend: {
                align: 'start',
                position: 'top',
                labels: {
                    size: 24,
                    padding: 50,
                    boxWidth: 9,
                    color: '#000',
                    usePointStyle: true,
                },
            },
        },
    };

    return (
        <>
            {loading && <Loader />}
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
            <div className={cx('wrapper')}>
                <div className={cx('chart-header')}>
                    {device.type !== 0 && <span className={cx('title')}>{device.name}</span>}
                    {device.type === 0 && (
                        <div className={cx('select-area')}>
                            <select
                                className={cx('select-unit')}
                                value={selectedIndex}
                                onChange={handleChangeSelectedIndex}
                            >
                                {PinIndex.map((item, index) => (
                                    <option key={index} value={item.name}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className={cx('util')}>
                        <div className={cx('calendar-area')}>
                            <label forHtml="">Chọn ngày</label>
                            <Flatpickr
                                className={cx('date-picker')}
                                value={date}
                                onChange={(e) => {
                                    console.log(e[0].toISOString());
                                    setDate(e[0].toISOString());
                                }}
                            />
                        </div>
                        <div className={cx('btn')}>
                            <Button primary small onClick={() => {}}>
                                Xuất dữ liệu
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('chart-content')}>
                    {data != null ? (
                        <Line id="chart" data={data} options={options} height={450} />
                    ) : (
                        <div className={cx('no_data')}>
                            <img src={images.no_data} className={cx('img_no_data')} alt="no data" />
                            <span>Không có thông tin dữ liệu</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AreaChart;
