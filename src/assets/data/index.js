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
        typeName: 'Điều hoà',
        type: 'airConditioner',
        avatar: images.airConditioner,
        name: ' Điều hoà 4',
        status: 'on',
    },
];
export const DeviceType = [
    {
        type: 'bulb',
        avatar: images.bulb,
        typeName: 'Bóng đèn',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 'sensor',
        avatar: images.sensorFire,
        typeName: 'Cảm biến cháy',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 'sensor',
        avatar: images.sensorEntry,
        typeName: 'Cảm biến đột nhập',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 'sensor',
        avatar: images.sensorWater,
        typeName: 'Cảm biến nhập nước',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 'sensor',
        avatar: images.sensorTemp,
        typeName: 'Cảm biến nhiệt độ',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 'fan',
        avatar: images.fans,
        typeName: ' Quạt',
        description: 'Điều khiển bật/tắt',
    },
    {
        type: 'airConditioner',
        avatar: images.airConditioner,
        typeName: ' Điều hoà',
        description: 'Điều khiển bật/tắt',
    },
];

export const Action = [
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

export const Data_sensor = [
    {
        time:0,
        temp:10
    },
    {
        time:3,
        temp:20
    },
    {
        time:6,
        temp:30
    },
    {
        time:9,
        temp:25
    },
    {
        time:12,
        temp:21
    },
    {
        time:15,
        temp:33
    },
    {
        time:18,
        temp:44
    },
    {
        time:21,
        temp:24
    },
    {
        time:24,
        temp:20
    }
]

export const areaChartOptions = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    grid: {
      show: false
    },
    colors: ['#7367F0'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2.5
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 80, 100]
      }
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    tooltip: {
      x: { show: false }
    }
  }
