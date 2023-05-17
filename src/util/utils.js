
export function convertToDate(updatedTime){
    let tmp_date = new Date(updatedTime)
    let actualDate = new Date();
    // actualDate.setTime(tmp_date.getTime() - 7*60*60*1000);
    actualDate.setTime(tmp_date.getTime());

    let year = actualDate.getFullYear();
    let month = actualDate.getMonth()+1;
    let date = actualDate.getDate();

    let hour =  actualDate.getHours();
    let minute = actualDate.getMinutes();

    return `${date > 9? date: `0${date}`}/${month > 9? month: `0${month}`}/${year} ${hour > 9? hour: `0${hour}`}:${minute > 9? minute: `0${minute}`}`
}

// export function isTimeBigger(expireTime){
//     let tmp_time = new Date(expireTime).getTime();
//     let time_now = new Date().getTime();

//     return tmp_time > time_now

// }
export function extractDateOnly(time){
        let tmp_date = new Date(time)
        let actualDate = new Date();
        actualDate.setTime(tmp_date.getTime() - 7*60*60*1000);
        let year = actualDate.getFullYear();
        let month = actualDate.getMonth()+1;
        let date = actualDate.getDate();
    
        let res =  `${year}-${month > 9? month: `0${month}`}-${date > 9? date: `0${date}`}`
        return res
    
}
export function extractHourFromTime(updatedTime){
    let tmp_date = new Date(updatedTime)
    let actualDate = new Date();
    // actualDate.setTime(tmp_date.getTime() - 7*60*60*1000);
    actualDate.setTime(tmp_date.getTime());

    let hour =  actualDate.getHours();

    return `${hour > 9? hour: `0${hour}`}`

}
export function covertDataChart(rawData){
    let actualData=[];
    let actual_label = [];

    rawData.forEach((item)=>{
        actualData.push(item.data);
        let hour = extractHourFromTime(item.time);
        actual_label.push(hour)
        
    })
    
    const init_data = {
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

    const tmp_dataset = init_data.datasets[0];
    const finalDataSet = [{...tmp_dataset, data:actualData}];
    // console.log("finalDataSet: ",finalDataSet)
    const result = {...init_data,labels:actual_label, datasets:finalDataSet}
    // console.log('result: ', result)
    // console.log("init data: ", init_data)
    return result;
}