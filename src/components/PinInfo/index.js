import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Devices, Action, DataCellVolt, DataPackInfo, DataTemperature } from '~/assets/data';
import style from './PinInfo.module.scss';
const cx = classNames.bind(style);
function PinElement({ device }) {
    console.log(device);
    const deviceData = device.curData;
    const [dataCellVolt1, setDataCellVolt1] = useState([]);
    const [dataCellVolt2, setDataCellVolt2] = useState([]);
    const [dataPackInfo, setDataPackInfo] = useState([]);
    const [dataTemperature, setDataTemperature] = useState([]);

    useEffect(() => {
        let listCellVoltData1 = [];
        let listCellVoltData2 = [];
        let listTempData = [];
        let listPackInfoData = [];
        deviceData.forEach((item) => {
            if (item.name.includes('vcel')) {
                let object = DataCellVolt.find((obj)=>{
                    return obj.name === item.name;
                })
                let actual_item = {...item,id:object.id, label:`${object.label}`, unit:`${object.unit}`}
                if(actual_item.id <=8){
                    listCellVoltData1.push(actual_item);
                }else{
                    listCellVoltData2.push(actual_item);
                }
                
            } else {
                if (item.name.includes('tcel') || item.name.includes('mos') || item.name === 'env_t' 
                // || item.name.includes('charging') || item.name.includes('off')
                ) {
                    console.log("item: ", item)
                    let object = DataTemperature.find((obj)=>{
                        console.log("obj: ", obj)
                        return obj.name === item.name;
                    })
                    let actual_item = {...item, label:`${object.label}`, unit:`${object.unit}`}
                    listTempData.push(actual_item);
                }
                else if(!item.name.includes('charging') && !item.name.includes('off')){
                    let object = DataPackInfo.find((obj)=>{
                        return obj.name === item.name;
                    })
                    let actual_item = {...item, label:`${object.label}`,unit:`${object.unit}`}
                    listPackInfoData.push(actual_item);
                }
            }
        });
        setDataCellVolt1(listCellVoltData1)
        setDataCellVolt2(listCellVoltData2)
        setDataTemperature(listTempData)
        setDataPackInfo(listPackInfoData)
    }, []);
    const PinInfo = ({ data }) => {
        return (
            <div className={cx('pin-info')}>
                <div className={cx('label-list')}>
                    {data.map((item, index) => {
                        return (
                            <p className={cx('label')} key={index}>
                                {item.label}
                            </p>
                        );
                    })}
                </div>
                <div className={cx('value-list')}>
                    {data.map((item, index) => {
                        return (
                            <input key={index} className={cx('pin-value')} type="text" value={item.value} disabled />
                        );
                    })}
                </div>
                <div className={cx('unit-list')}>
                    {data.map((item, index) => {
                        if (item.unit!==null && item.unit!=='undefined') {
                            return (
                                <p key={index} className={cx('unit')}>
                                    {item.unit}
                                </p>
                            );
                        }
                        return <></>;
                    })}
                </div>
            </div>
        );
    };
    return (
        // <div className={cx('battery-info')}>
        <>
            <div className={cx('cell-vol')}>
                <h3>Cell Voltage (mV)</h3>
                <div className={cx('cell-vol-info')}>
                    <PinInfo data={dataCellVolt1} />
                    <PinInfo data={dataCellVolt2} />
                </div>
            </div>
            <div className={cx('pack')}>
                <h3>Pack Infomation</h3>
                <div className={cx('pack-info')}>
                    <PinInfo data={dataPackInfo} />
                </div>
            </div>
            <div className={cx('battery-temp')}>
                <h3>Temperature</h3>
                <div className={cx('temp-info')}>
                    <PinInfo data={dataTemperature} />
                </div>
            </div>
        </>
        // </div>
    );
}

export default PinElement;
