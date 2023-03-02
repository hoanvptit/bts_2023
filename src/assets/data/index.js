import images from '~/assets/images';

export const Devices = [
    {
        id: 1,
        typeName: 'Bóng đèn',
        type: 'bulb',
        avatar: images.bulb,
        name: 'Bóng đèn 1',
        status: 'on',
    },
    {
        id: 2,
        typeName: 'Cảm biến nhiệt độ',
        type: 'sensor',
        avatar: images.sensorTemp,
        name: 'Cảm biến nhiệt độ 1',
        status: 'on',
    },
    {
        id: 3,
        typeName: 'Cảm biến cháy',
        type: 'sensor',
        avatar: images.sensorFire,
        name: 'Cảm biến cháy 1',
        status: 'off',
    },
    {
        id: 4,
        typeName: 'Bóng đèn',
        type: 'bulb',
        avatar: images.bulb,
        name: ' Bóng đèn 4',
        status: 'off',
    },
    {
        id: 5,
        typeName: 'Quạt',
        type: 'fan',
        avatar: images.fans,
        name: ' Quạt 1',
        status: 'on',
    },
    {
        id: 6,
        typeName: 'Quạt',
        type: 'fan',
        avatar: images.fans,
        name: ' Quạt 2',
        status: 'on',
    },
    {
        id: 7,
        typeName: 'Điều hoà',
        type: 'airConditioner',
        avatar: images.airConditioner,
        name: ' Điều hoà 1',
        status: 'on',
    },
    {
        id: 8,
        typeName: 'Điều hoà',
        type: 'airConditioner',
        avatar: images.airConditioner,
        name: ' Điều hoà 2',
        status: 'on',
    },
    {
        id: 9,
        typeName: 'Điều hoà',
        type: 'airConditioner',
        avatar: images.airConditioner,
        name: 'Điều hoà 3',
        status: 'on',
    },
    {
        id: 10,
        typeName: 'Pin',
        type: 'battery',
        avatar: images.battery,
        name: 'Pin Test 1',
        status: 'on',
    },
];
export const DeviceType = [
    {
        type: 0,
        avatar: images.battery,
        typeName: 'Pin',
        status: 'on',
        description:''
    },
    {
        type: 4,
        avatar: images.bulb,
        typeName: 'Bóng đèn',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 2,
        avatar: images.sensorFire,
        typeName: 'Cảm biến cháy',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 5,
        avatar: images.sensorEntry,
        typeName: 'Cảm biến đột nhập',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 3,
        avatar: images.sensorWater,
        typeName: 'Cảm biến nhập nước',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 7,
        avatar: images.sensorTemp,
        typeName: 'Cảm biến nhiệt độ',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 1,
        avatar: images.fans,
        typeName: ' Quạt',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 6,
        avatar: images.airConditioner,
        typeName: ' Điều hoà',
        description: 'Điều khiển bật/tắt',
    },
];

export const Action = [
    {
        status:'off',
        name: 'Tắt quạt',
        des: 'Thực hiện bởi: Hoàng Mậu Trung',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        status:'on',
        name: 'Bật quạt',
        des: 'Thực hiện bởi: Đậu Mạnh Tuấn',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        status:'connected',
        name: 'Đã kết nối',
        des: 'Thiết bị đã được kết nối với hệ thống. Thiết bị đang tắt',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        status:'disconnected',
        name: 'Mất kết nối',
        des: 'Thiết bị đã được kết nối với hệ thống. Thiết bị đang tắt',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        status:'on',
        name: 'Bật quạt',
        des: 'Thực hiện bởi: Đậu Mạnh Tuấn',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        status:'off',
        name: 'Tắt quạt',
        des: 'Thực hiện bởi: Hoàng Mậu Trung',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        status:'on',
        name: 'Bật quạt',
        des: 'Thực hiện bởi: Đậu Mạnh Tuấn',
        date: '15/02/2023',
        time: '21:00:00',
    },
    // {
    //     status:'connected',
    //     name: 'Đã kết nối',
    //     des: 'Thiết bị đã được kết nối với hệ thống. Thiết bị đang tắt',
    //     date: '15/02/2023',
    //     time: '21:00:00',
    // },
    // {
    //     status:'disconnected',
    //     name: 'Mất kết nối',
    //     des: 'Thiết bị đã được kết nối với hệ thống. Thiết bị đang tắt',
    //     date: '15/02/2023',
    //     time: '21:00:00',
    // },
    // {
    //     status:'on',
    //     name: 'Bật quạt',
    //     des: 'Thực hiện bởi: Đậu Mạnh Tuấn',
    //     date: '15/02/2023',
    //     time: '21:00:00',
    // },
    // {
    //     status:'off',
    //     name: 'Tắt quạt',
    //     des: 'Thực hiện bởi: Hoàng Mậu Trung',
    //     date: '15/02/2023',
    //     time: '21:00:00',
    // },
    // {
    //     status:'on',
    //     name: 'Bật quạt',
    //     des: 'Thực hiện bởi: Đậu Mạnh Tuấn',
    //     date: '15/02/2023',
    //     time: '21:00:00',
    // },
    // {
    //     status:'connected',
    //     name: 'Đã kết nối',
    //     des: 'Thiết bị đã được kết nối với hệ thống. Thiết bị đang tắt',
    //     date: '15/02/2023',
    //     time: '21:00:00',
    // },
    // {
    //     status:'disconnected',
    //     name: 'Mất kết nối',
    //     des: 'Thiết bị đã được kết nối với hệ thống. Thiết bị đang tắt',
    //     date: '15/02/2023',
    //     time: '21:00:00',
    // },
    // {
    //     status:'on',
    //     name: 'Bật quạt',
    //     des: 'Thực hiện bởi: Đậu Mạnh Tuấn',
    //     date: '15/02/2023',
    //     time: '21:00:00',
    // },
];

// export const Data_sensor = [
//     {
//         time:0,
//         temp:10
//     },
//     {
//         time:3,
//         temp:20
//     },
//     {
//         time:6,
//         temp:30
//     },
//     {
//         time:9,
//         temp:25
//     },
//     {
//         time:12,
//         temp:21
//     },
//     {
//         time:15,
//         temp:33
//     },
//     {
//         time:18,
//         temp:44
//     },
//     {
//         time:21,
//         temp:24
//     },
//     {
//         time:24,
//         temp:20
//     }
// ]

  // Data for pin
  export const DataCellVolt = [
    {
        id: 1,
        label: 'MaxVolt',
        value: 1234,
    },
    {
        id: 2,
        label: 'Vcell 1',
        value: 1234,
    },
    {
        id: 3,
        label: 'Vcell 2',
        value: 1234,
    },
    {
        id: 4,
        label: 'Vcell 3',
        value: 1234,
    },
    {
        id: 5,
        label: 'Vcell 4',
        value: 1234,
    },
    {
        id: 6,
        label: 'Vcell 5',
        value: 1234,
    },
    {
        id: 7,
        label: 'Vcell 6',
        value: 1234,
    },
    {
        id: 8,
        label: 'Vcell 8',
        value: 1234,
    },
];
export const DataPackInfo = [
    {
        id: 1,
        label: 'Pack Voltage',
        unit:'V',
        value: 1234,
    },
    {
        id: 2,
        label: 'Pack Current',
        unit:'A',
        value: 1234,
    },
    {
        id: 3,
        label: 'SOC',
        unit:'%',
        value: 1234,
    },
    {
        id: 4,
        label: 'SOH',
        unit:'%',
        value: 1234,
    },
    {
        id: 5,
        label: 'Remain Capacity',
        unit:'mAH',
        value: 1234,
    },
    {
        id: 6,
        label: 'Full Capacity',
        unit:'mAH',
        value: 1234,
    },
    {
        id: 7,
        label: 'Battert cycle',
        unit:null,
        value: 1234,
    }
    
];

export const DataTemperature = [
    {
        id: 1,
        label: 'Tcell 1',
        unit:'℃',
        value: 1234,
    },
    {
        id: 2,
        label: 'Tcell 1',
        unit:'℃',
        value: 1234,
    },
    {
        id: 3,
        label: 'Tcell 1',
        unit:'℃',
        value: 1234,
    },
    {
        id: 4,
        label: 'Tcell 1',
        unit:'℃',
        value: 1234,
    },
    {
        id: 5,
        label: 'ENV_T',
        unit:'℃',
        value: 1234,
    },
    {
        id: 6,
        label: 'MOS_T',
        unit:'℃',
        value: 1234,
    },
    
    
];
export const DataBattery = {
    labels: ['00', '03', '06', '09', '12', '15', '18', '21', '24'],
    datasets: [
        {
            fill: true,
            tension: 0.3,
            label: 'Dung Lượng(%)',
            pointRadius: 0.5,
            pointHoverRadius: 5,
            pointStyle: 'circle',
            backgroundColor: () => {
                const ctx = document.getElementById('chart').getContext('2d');
                const gradient = ctx.createLinearGradient(0, 0, 0, 550);
                gradient.addColorStop(0, 'rgba( 115, 103, 240, 1)');
                gradient.addColorStop(1, 'rgba( 115, 103, 240, 0)');
                return gradient;
            },
            pointHoverBorderWidth: 5,
            borderColor: '#7367f0',
            pointHoverBorderColor: '#2596be',
            pointBorderColor: 'transparent',
            pointHoverBackgroundColor: '#fff',
            data: [10, 15, 25, 35, 25, 45, 30, 20, 30],
        },
    ],
};

//Data for sensor
export const DataSensor = {
    labels: ['00', '03', '06', '09', '12', '15', '18', '21', '24'],
    datasets: [
        {
            fill: true,
            tension: 0.3,
            label: 'Nhiệt độ (℃)',
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