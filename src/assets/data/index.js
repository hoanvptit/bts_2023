import images from '~/assets/images';


export const Notification = [
    {
        name: 'Tắt quạt',
        des: 'Thực hiện bởi: Hoàng Mậu Trung',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        name: 'Bật quạt',
        des: 'Thực hiện bởi: Đậu Mạnh Tuấn',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        name: 'Đã kết nối',
        des: 'Thiết bị đã được kết nối với hệ thống. Thiết bị đang tắt',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        name: 'Mất kết nối',
        des: 'Thiết bị đã được kết nối với hệ thống. Thiết bị đang tắt',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        name: 'Bật quạt',
        des: 'Thực hiện bởi: Đậu Mạnh Tuấn',
        date: '15/02/2023',
        time: '21:00:00',
    },
];

export const BTSLine = [
    {
        id: 107,
        name: 'Đức Thọ',
        quantity: 5,
        warning: 'Nhiệt độ cao, điều hòa điều khiển lỗi, phát hiện chuyển động',
        status: '3G - 1d',
        firmware: '4.5.0.16'
    },
    {
        id: 108,
        name: 'Thạch Bàn',
        quantity: 5,
        warning: 'Nhiệt độ cao, điều hòa điều khiển lỗi, phát hiện chuyển động',
        status: '3G - 1d',
        firmware: '4.5.0.16'
    },
    {
        id: 107,
        name: 'Đức Thọ',
        quantity: 5,
        warning: 'Nhiệt độ cao, điều hòa điều khiển lỗi, phát hiện chuyển động',
        status: '3G - 1d',
        firmware: '4.5.0.16'
    },
    {
        id: 108,
        name: 'Thạch Bàn',
        quantity: 5,
        warning: 'Nhiệt độ cao, điều hòa điều khiển lỗi, phát hiện chuyển động',
        status: '3G - 1d',
        firmware: '4.5.0.16'
    },
    {
        id: 107,
        name: 'Đức Thọ',
        quantity: 5,
        warning: 'Nhiệt độ cao, điều hòa điều khiển lỗi, phát hiện chuyển động',
        status: '3G - 1d',
        firmware: '4.5.0.16'
    },
    {
        id: 108,
        name: 'Thạch Bàn',
        quantity: 5,
        warning: 'Nhiệt độ cao, điều hòa điều khiển lỗi, phát hiện chuyển động',
        status: '3G - 1d',
        firmware: '4.5.0.16'
    },
    {
        id: 107,
        name: 'Đức Thọ',
        quantity: 5,
        warning: 'Nhiệt độ cao, điều hòa điều khiển lỗi, phát hiện chuyển động',
        status: '3G - 1d',
        firmware: '4.5.0.16'
    },
    {
        id: 108,
        name: 'Thạch Bàn',
        quantity: 5,
        warning: 'Nhiệt độ cao, điều hòa điều khiển lỗi, phát hiện chuyển động',
        status: '3G - 1d',
        firmware: '4.5.0.16'
    },
];

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
        icon: images.battery,
        typeName: 'Pin',
        status: 'on',
        description: '',
    },
    {
        type: 1,
        icon: images.fans,
        typeName: ' Quạt',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 2,
        icon: images.sensorFire,
        typeName: 'Cảm biến cháy',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 3,
        icon: images.sensorWater,
        typeName: 'Cảm biến nhập nước',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 4,
        icon: images.bulb,
        typeName: 'Bóng đèn',
        description: 'Điều khiển bật/tắt',
    },

    {
        type: 5,
        icon: images.sensorEntry,
        typeName: 'Cảm biến đột nhập',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 6,
        icon: images.airConditioner,
        typeName: ' Điều hoà',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 7,
        icon: images.sensorTemp,
        typeName: 'Cảm biến nhiệt độ IN',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 8,
        icon: images.sensorTemp,
        typeName: 'Cảm biến nhiệt độ OUT',
        description: 'Điều khiển bật/tắt',
    },
];

export const Action = [
    {
        status: 'off',
        name: 'Tắt quạt',
        des: 'Thực hiện bởi: Hoàng Mậu Trung',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        status: 'on',
        name: 'Bật quạt',
        des: 'Thực hiện bởi: Đậu Mạnh Tuấn',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        status: 'connected',
        name: 'Đã kết nối',
        des: 'Thiết bị đã được kết nối với hệ thống. Thiết bị đang tắt',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        status: 'disconnected',
        name: 'Mất kết nối',
        des: 'Thiết bị đã được kết nối với hệ thống. Thiết bị đang tắt',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        status: 'on',
        name: 'Bật quạt',
        des: 'Thực hiện bởi: Đậu Mạnh Tuấn',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        status: 'off',
        name: 'Tắt quạt',
        des: 'Thực hiện bởi: Hoàng Mậu Trung',
        date: '15/02/2023',
        time: '21:00:00',
    },
    {
        status: 'on',
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

export const DataCellVolt = [
    {
        id: 1,
        name:'vcel_1',
        label: 'Vcel 1',
        value: 1234,
    },
    {
        id: 2,
        name:'vcel_2',
        label: 'Vcel 2',
        value: 1234,
    },
    {
        id: 3,
        name:'vcel_3',
        label: 'Vcel 3',
        value: 1234,
    },
    {
        id: 4,
        name:'vcel_4',
        label: 'Vcel 4',
        value: 1234,
    },
    {
        id: 5,
        name:'vcel_5',
        label: 'Vcel 5',
        value: 1234,
    },
    {
        id: 6,
        name:'vcel_6',
        label: 'Vcel 6',
        value: 1234,
    },
    {
        id: 7,
        name:'vcel_7',
        label: 'Vcel 7',
        value: 1234,
    },
    {
        id: 8,
        name:'vcel_8',
        label: 'Vcel 8',
        value: 1234,
    },
    {
        id: 9,
        name:'vcel_9',
        label: 'Vcel 9',
        value: 1234,
    },
    {
        id: 10,
        name:'vcel_10',
        label: 'Vcel 10',
        value: 1234,
    },
    {
        id: 11,
        name:'vcel_11',
        label: 'Vcel 11',
        value: 1234,
    },
    {
        id: 12,
        name:'vcel_12',
        label: 'Vcel 12',
        value: 1234,
    },
    {
        id: 13,
        name:'vcel_13',
        label: 'Vcel 13',
        value: 1234,
    },
    {
        id: 14,
        name:'vcel_14',
        label: 'Vcel 14',
        value: 1234,
    },
    {
        id: 15,
        name:'vcel_15',
        label: 'Vcel 15',
        value: 1234,
    },
    {
        id: 16,
        name:'vcel_16',
        label: 'Vcel 16',
        value: 1234,
    },
];
export const DataPackInfo = [
    {
        id: 9,
        name:"voltage",
        label: 'Pack Voltage',
        unit: 'V',
        value: 1234,
    },
    {
        id: 10,
        name: "current",
        label: 'Pack Current',
        unit: 'A',
        value: 1234,
    },
    {
        id: 11,
        name:"soc",
        label: 'SOC',
        unit: '%',
        value: 1234,
    },
    {
        id: 12,
        name:"soh",
        label: 'SOH',
        unit: '%',
        value: 1234,
    },
    {
        id: 12,
        name:"remain_cap",
        label: 'Remain Capacity',
        unit: 'mAH',
        value: 1234,
    },
    {
        id: 14,
        name:"full_cap",
        label: 'Full Capacity',
        unit: 'mAH',
        value: 1234,
    },
    {
        id: 15,
        name:"bat_cycle",
        label: 'Battert cycle',
        value: 1234,
        // unit: null,
    },
];

export const DataTemperature = [
    {
        id: 16,
        name:"tcel_1",
        label: 'Tcel 1',
        unit: '℃',
        value: 1234,
    },
    {
        id: 17,
        name:"tcel_2",
        label: 'Tcel 2',
        unit: '℃',
        value: 1234,
    },
    {
        id: 18,
        name: "tcel_3",
        label: 'Tcel 3',
        unit: '℃',
        value: 1234,
    },
    {
        id: 19,
        name:"tcel_4",
        label: 'Tcel 4',
        unit: '℃',
        value: 1234,
    },
    {
        id: 20,
        name:"env_t",
        label: 'ENV_T',
        unit: '℃',
        value: 1234,
    },
    {
        id: 21,
        name:"mos_t",
        label: 'MOS_T',
        unit: '℃',
        value: 1234,
    },
    {
        id:1,
        name: "charging",
        label:"charging",
        value: 0,
    },
    {
        id:2,
        name: "discharging",
        label:"discharging",
        value: 0,
    },
    // {
    //     id:3,
    //     name: "limit_off",
    //     label:"limit_off",
    //     value: 0,
    // },
    // {
    //     id:4,
    //     name: "heater_off",
    //     label:"heater_off",
    //     value: 0,
    // },
    {
        id:5,
        name: "chg_mos_off",
        label:"chg_mos_off",
        value: "0",
    },
    {
        id:6,
        name: "dsg_mos_off",
        label:"dsg_mos_off",
        value: "0",
    }
];

export const DataBattery = {
    labels: ['00', '03', '06', '09', '12', '15', '18', '21', '24'],
    datasets: [
        {
            fill: true,
            tension: 0.3,
            label: 'Giá trị',
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

export const PinIndex = [
     {
    id: 1,
    name:'vcel_1',
    label: 'Vcell 1',
},
{
    id: 2,
    name:'vcel_2',
    label: 'Vcell 2',
},
{
    id: 3,
    name:"voltage",
    label: 'Pack Voltage',
    unit: 'V',
},
{
    id: 4,
    name: "current",
    label: 'Pack Current',
    unit: 'A',
},
{
    id: 5,
    name:"soc",
    label: 'SOC',
    unit: '%',
},
{
    id: 6,
    name:"soh",
    label: 'SOH',
    unit: '%',
},
{
    id: 7,
    name:"remain_cap",
    label: 'Remain Capacity',
    unit: 'mAH',
},
{
    id: 8,
    name:"full_cap",
    label: 'Full Capacity',
    unit: 'mAH',
},
{
    id: 9,
    name:"bat_cycle",
    label: 'Battert cycle',
    // unit: ,
},
]
//Data for sensor in chart
export const DataSensor = {
    labels: ['00', '03', '06', '09', '12', '15', '18', '21', '24'],
    datasets: [
        {
            fill: true,
            tension: 0.3,
            label: 'Giá trị',
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


// Notify info
export const NotifyType = [
    {
        id:0,
        name:'normal',
        label: 'Bình thường',
        icon:images.noti_normal,
    },
    {
        id:0,
        name:'disconnect',
        label: 'Mất kết nối',
        icon:images.noti_no_signal,
    },
    {
        id:0,
        name:'warning',
        label: 'Cảnh báo',
        icon:images.noti_warning,
    },
    {
        id:0,
        name:'dangerous',
        label: 'Nguy hiểm',
        icon:images.noti_dangerous,
    },
]

export const NotifyTypeInfos = [
    {
        level:1,
        name:'normal',
        label: 'Bình thường',
        value:'2 thông báo',
        icon:images.noti_normal,
    },
    {
        level:2,
        name:'warning',
        label: 'Cảnh báo',
        value:'2 thông báo',
        icon:images.noti_warning,
    },
    {
        level:3,
        name:'disconnect',
        label: 'Mất kết nối',
        value:'2 thông báo',
        icon:images.noti_no_signal,
    },
    {
        level:4,
        name:'dangerous',
        label: 'Nguy hiểm',
        value:'2 thông báo',
        icon:images.noti_dangerous,
    },
]