import classNames from 'classnames/bind';
import Button from '../Button';
// ** Third Party Components
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import style from './Chart.module.scss';

const cx = classNames.bind(style);
const ChartjsAreaChart = (props) => {
    const device = props.device;
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
    const data = {
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('chart-header')}>
                <span className={cx('title')}>{device.name}</span>
                <div className={cx('util')}>
                    <div className={cx('calendar-area')}>
                        <label for="birthday">Chọn ngày</label>
                        <input className={cx('calendar')} type="date" id="birthday" name="birthday" />
                    </div>
                    <div className={cx('btn')}>
                        <Button primary small onClick={() => {}}>
                            Xuất dữ liệu
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{ height: '550px' }}>
                <Line id="chart" data={data} options={options} height={450} />
            </div>
        </div>
    );
};

export default ChartjsAreaChart;
