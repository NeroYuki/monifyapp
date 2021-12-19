import {queryTaiKhoan,insertTaiKhoan, deleteTaiKhoan, deactiavteTaiKhoan}from '../services/TaiKhoanCRUD';
import {BSON} from 'realm'
import { updateTaiKhoan } from '../services/TaiKhoanCRUD';
import sessionStore from './sessionStore';

export const fetchSaving= (savingId) => new Promise((resolve, reject) => {
    queryTaiKhoan({idtaikhoan: new BSON.ObjectID(savingId)}).then((tk)=> {
        if (!tk[0]) {
            return reject("Không tìm thấy id tài khoản tiết kiệm")
        }
        let rs =
        {
            savingId: JSON.parse(JSON.stringify(tk[0].idtaikhoan)),
            name: tk[0].tentaikhoan,
            color: tk[0].color,
            amount: tk[0].tietkiem.sotien,
            expire_on: tk[0].tietkiem.ngayrutdukien, 
            interest: tk[0].tietkiem.laisuattietkiem,
            applied_wallet_id:tk[0].tietkiem.idtkduocthuhuong,
            early_interest:tk[0].tietkiem.laisuattruochan,
            creation_date:tk[0].tietkiem.ngaybatdau,
        }       
        resolve(rs)
    }), reason=> {reject(reason)}
})
export const saveSaving= ({savingId,savingName, color, amount, expire_on,interest,applied_wallet_id, early_interest, creationDate}) => new Promise((resolve, reject) => {
    if(savingId === undefined){
        let newtaikhoansaving={
            idtaikhoan: new BSON.ObjectID(),
            tentaikhoan: savingName,        
            bieutuong: '',
            color: color,
            thoigiantao: creationDate,
            idnguoidung: new BSON.ObjectID(sessionStore.activeUserId),
            tieudung:null,
            tietkiem:{
                idtktietkiem: new BSON.ObjectID(),
                sotien: amount,
                laisuattietkiem: interest,
                laisuattruochan: early_interest,
                idtkduocthuhuong: new BSON.ObjectID(applied_wallet_id),
                ngaybatdau:creationDate,
                ngayrutdukien:expire_on,
            },
            no:null,
        }
        insertTaiKhoan(newtaikhoansaving).then((tk)=>{resolve(true)}, (reason) => {reject(reason)})
    }
    else{
        let tempid = new BSON.ObjectID(savingId)
        queryTaiKhoan({taikhoantietkiem: true,idtaikhoan:tempid}).then((tk)=>{
            if (!tk[0]) {
                return reject("Không tìm thấy id tài khoản tiết kiệm")
            }
            let rs =
            {
                idtaikhoan:tk[0].idtaikhoan,
                tentaikhoan: tk[0].tentaikhoan,  
                deactivate: tk[0].deactivate,      
                bieutuong: tk[0].bieutuong,
                color: tk[0].color,
                thoigiantao: tk[0].thoigiantao,
                idnguoidung: tk[0].idnguoidung,
                tieudung:null,
                tietkiem:{
                    idtktietkiem: tk[0].tietkiem.idtktietkiem,
                    sotien: tk[0].tietkiem.sotien,
                    laisuattietkiem: tk[0].tietkiem.laisuattietkiem,
                    laisuattruochan: tk[0].tietkiem.laisuattruochan,
                    idtkduocthuhuong:tk[0].tietkiem.idtkduocthuhuong,
                    ngaybatdau:tk[0].tietkiem.ngaybatdau,
                    ngayrutdukien:tk[0].tietkiem.ngayrutdukien,
                },
                no:null,
            }
            if(typeof savingName!==  'undefined') rs.tentaikhoan =savingName
            if(typeof amount!==  'undefined')  rs.tietkiem.sotien=amount;
            if(typeof color!==  'undefined')  rs.color= color
            if(typeof interest!==  'undefined') rs.tietkiem.laisuattietkiem =interest
            if(typeof applied_wallet_id!==  'undefined') rs.tietkiem.idtkduocthuhuong = new BSON.ObjectID(applied_wallet_id)
            if(typeof early_interest!== 'undefined') rs.tietkiem.laisuattruochan = early_interest
            if(typeof expire_on!==  'undefined') rs.tietkiem.ngayrutdukien =expire_on
            //console.log(JSON.stringify(rs))
            updateTaiKhoan(rs).then(tk=> resolve(true), (reason)=> reject(reason))
        }, (reason) => {
            reject(reason)
        })
    }
})

export const querySaving=({savingName, minAmount, maxAmount, expire_in_days}) => new Promise((resolve, reject) => {
    let today = new Date()
    let endday = today
    if (expire_in_days) endday.addDays(expire_in_days)
    queryTaiKhoan({taikhoantietkiem: true,tentaikhoan:savingName, tietkiemminAmount:minAmount ,tietkiemmaxAmount:maxAmount}).then((rs)=> {
        let rsarr=[]
        //console.log(rs)
        rs.forEach(element => {
            //if(element.tietkiem.ngaytradukien<=endday)
            rsarr.push(
                {
                    savingId: JSON.parse(JSON.stringify(element.idtaikhoan)),
                    name: element.tentaikhoan,
                    color: element.color,
                    amount: element.tietkiem.sotien,
                    expire_on: element.tietkiem.ngayrutdukien, 
                    interest: element.tietkiem.laisuattietkiem,
                    applied_wallet_id:element.tietkiem.idtkduocthuhuong,
                    early_interest:element.tietkiem.laisuattruochan,
                    creationDate: element.tietkiem.ngaybatdau,
                    deactivate: element.deactivate
                }
            )
        });
        //console.log(rsarr)
        return resolve(rsarr)
    }, reason => {console.error(reason); return reject(reason)})
})
export const deleteSaving= (savingId) => new Promise(async (resolve, reject) => {
    try {
        let id =new BSON.ObjectId(savingId)
        let rs= await deleteTaiKhoan(id).catch((e) => {return reject(e)})
        resolve(rs)
        return true
    } catch (rs) {
        reject(console.error())
        return false
    }
})

export const deactivateSaving= (savingId) => new Promise(async (resolve, reject) => {
    try {
        let id =new BSON.ObjectId(savingId)
        let rs= await deactiavteTaiKhoan(id).catch((e) => {return reject(e)})
        resolve(rs)
        return true
    } catch (rs) {
        reject(console.error())
        return false
    }
})



Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}