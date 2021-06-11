import{insertCaiDat,queryCaiDat} from '../services/CaiDatCRUD'
import {BSON} from 'realm'

export const saveSetting=async (setting)=>{
    new Promise((resolve,reject)=>{
        let sSet={
            idcaidat: new BSON.ObjectID(),
            idnguoidung: new BSON.ObjectID(setting.idnguoidung),
            thoigiantao: Date.now(),
            loaitien: setting.loaitien,
            chedo: setting.chedo,
            ngonngu: setting.ngonngu,
            chedonghiemngat: setting.chedonghiemngat,
        }
        await insertCaiDat(sSet).then(set=>{
            if(!set)
                resolve('Warn: Setting dont have field')
        }).catch((er)=>reject(er))
    })
}

// export const fetchSetting=()=>{

// }