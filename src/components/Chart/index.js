import classNames from 'classnames/bind';
import Button from '../Button';
<<<<<<< HEAD
=======
import { useState } from 'react';
import { DataBattery, DataSensor } from '~/assets/data';
>>>>>>> 6a8a41e (add some ui and fix some bug)
// ** Third Party Components
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import style from './Chart.module.scss';

const cx = classNames.bind(style);
const ChartjsAreaChart = (props) => {
    const device = props.device;
<<<<<<< HEAD
=======
    const [date, setDate] = useState(new Date());
    const [selectedIndex, setSelectedIndex] = useState('');
    const handleChangeSelectedIndex = (e) => {
        let value = e.target.value;
        setSelectedIndex(value);
    };
>>>>>>> 6a8a41e (add some ui and fix some bug)
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
                max: 60,
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

    // ** Chart data
    const data1 = {
        labels: ['00', '03', '06', '09', '12', '15', '18', '21', '24'],
        datasets: [
            {
                fill: true,
                tension: 0.3,
                label: 'Nhiệt độ',
                pointRadius: 0.5,
                pointHoverRadius: 5,
                pointStyle: 'circle',
                backgroundColor: () => {
                    const ctx = document.getElementById('chart').getContext('2d');
                    const gradient = ctx.createLinearGradient(0, 0, 0, 550);
                    gradient.addColorStop(0, 'rgba( 255, 213, 0, 1)');
                    gradient.addColorStop(1, 'rgba( 255, 213, 0, 0)');
                    return gradient;
                },
                pointHoverBorderWidth: 5,
                borderColor: '#FFD500',
                pointHoverBorderColor: '#2596be',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: '#fff',
                data: [10, 15, 25, 35, 25, 45, 30, 20, 30],
            },
        ],
    };

    const data = device.type == 'battery' ? DataBattery : DataSensor;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('chart-header')}>
                {device.type !== 'battery' && <span className={cx('title')}>{device.name}</span>}
                {device.type === 'battery' && (
                    <div className={cx('select-area')}>
                        <select
                            className={cx('select-unit')}
                            value={selectedIndex}
                            onChange={handleChangeSelectedIndex}
                        >
                            <option value="10">Chọn chỉ số</option>
                            <option value="Tất cả">Dung lượng</option>
                            <option value="Nhóm điều khiển">Vcell 1</option>
                            <option value="Nhóm Quan sát">Vcell 2</option>
                        </select>
                    </div>
                )}
                <div className={cx('util')}>
                    <div className={cx('calendar-area')}>
<<<<<<< HEAD
                        <label for="birthday">Chọn ngày</label>
                        <input className={cx('calendar')} type="date" id="birthday" name="birthday" />
=======
                        <label forHtml="">Chọn ngày</label>
                        {/* <input className={cx('calendar')} type="date" id="birthday" name="birthday" /> */}
                        <Flatpickr
                            className={cx('date-picker')}
                            value={date}
                            onChange={(e) => {
                                console.log(e[0].toDateString());
                            }}
                        />
>>>>>>> 6a8a41e (add some ui and fix some bug)
                    </div>
                    <div className={cx('btn')}>
                        <Button primary small onClick={() => {}}>
                            Xuất dữ liệu
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('chart-content')}>
                <Line id="chart" data={data} options={options} height={450} />
            </div>
        </div>
    );
};

export default ChartjsAreaChart;
