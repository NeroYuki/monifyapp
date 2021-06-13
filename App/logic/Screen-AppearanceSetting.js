import { insertCaiDat, queryCaiDat } from '../services/CaiDatCRUD'
import { BSON } from 'realm'

export const saveSetting = (setting) =>
    new Promise((resolve, reject) => {
        let sSet = {
            idcaidat: new BSON.ObjectID(),
            idnguoidung: new BSON.ObjectID(setting.idnguoidung),
            thoigiantao: new Date(Date.now()),
            loaitien: setting.loaitien,
            chedo: setting.chedo,
            ngonngu: setting.ngonngu,
            chedonghiemngat: setting.chedonghiemngat,
        }

        console.log("SAVE SETTING TESSTTT: ", new BSON.ObjectID(null))
        insertCaiDat(sSet).then(set => {
            if (!set)
                reject({ result: false, message: 'Lưu cài đặt thất bại' })
            else
                resolve({ result: true, message: 'Lưu cài đặt thành công' })
        }).catch((er) => reject(er))
    })

export const fetchSetting = () =>
    new Promise(async (resolve, reject) => {
        let cd
        await queryCaiDat({}).then(caidat => {
            cd = caidat
        }).catch(err => reject(err))
        // console.log(JSON.parse(JSON.stringify(cd)))
        cd = cd.reduce((s1, s2) => {
            return s1.thoigiantao > s2.thoigiantao ? s1 : s2
        })
        resolve(cd)
    })