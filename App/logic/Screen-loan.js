import {queryTaiKhoan,insertTaiKhoan, deleteTaiKhoan}from '../services/TaiKhoanCRUD';
import {BSON} from 'realm'
import { updateTaiKhoan } from '../services/TaiKhoanCRUD';


export const fetchLoan= ({loanId}) => new Promise((resolve, reject) => {
    queryTaiKhoan({idtaikhoan:loanId}).then((tk)=> {
        let rs =
        {
            loanId: tk[0].idtaikhoan,
            name: tk[0].tentaikhoan,
            color: tk[0].color,
            amount: tk[0].no.sotien,
            expire_on: tk[0].no.ngaytradukien, 
            interest: tk[0].no.laisuatno,
            creationDate: tk[0].no.ngaybatdauno
        }       
        resolve(rs)
    }), reason=> {reject(reason)}
})
export const saveLoan= ({loanId,loanName, color, amount, expire_on, interest, creationDate, cycle}) => new Promise((resolve, reject) => {
    if(loanId ===undefined){
        newtaikhoanno={
            idtaikhoan: new BSON.ObjectID(),
            tentaikhoan: loanName,        
            bieutuong: '',
            color: color,
            thoigiantao: creationDate,
            //idnguoidung: 'objectId',
            tieudung:null,
            tietkiem:null,
            no:{
                idtkno: new BSON.ObjectID(),
                sotien: amount,
               // color: color,
                laisuatno: interest,
                kyhanno: cycle,
                ngaybatdauno:creationDate ,
                ngaytradukien: expire_on,
                sotientradukien: amount,  
            },
        }
        insertTaiKhoan(newtaikhoanno).then((tk)=>{resolve(true)}, (reason) => {reject(reason)})
    }
    else{
        queryTaiKhoan({taikhoanno: true,idtaikhoan:loanId}).then((tk)=>{
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
                tietkiem:null,
                no:{
                    idtkno: tk[0].no.idtkno,
                    sotien: tk[0].no.sotien,
                    laisuatno: tk[0].no.laisuatno,
                    kyhanno: tk[0].no.kyhanno,
                    ngaybatdauno:tk[0].no.ngaybatdauno ,
                    ngaytradukien: tk[0].no.ngaytradukien,
                    sotientradukien: tk[0].no.sotientradukien,  
                },
            }
            if(typeof loanName!==  'undefined') rs.tentaikhoan =loanName
            console.log(typeof(amount))
            console.log(typeof(rs.no.sotien))
            if(typeof amount!==  'undefined') {
                rs.no.sotien=amount;
              }
            if(typeof color!==  'undefined')  rs.color= color
            if(typeof interest!==  'undefined') rs.no.laisuatno =interest
            if(typeof cycle!==  'undefined') rs.no.kyhanno =cycle
            if(typeof expire_on!==  'undefined') rs.no.ngaytradukien =expire_on
            console.log(JSON.stringify(rs))
            updateTaiKhoan(rs).then(tk=> resolve(true)), (reason)=> reject(reason)
        }, (reason) => {
            reject(reason)
        }
        )
    }
})

export const queryLoan=({loanName, minAmount, maxAmount, expire_in_days}) => new Promise((resolve, reject) => {
    let today = new Date()
    let endday = today.addDays(expire_in_days)
    queryTaiKhoan({deactivate:false,taikhoanno: true,tentaikhoan:loanName, nominAmount:minAmount ,nomaxAmount:maxAmount}).then((rs)=> {
        //console.log(JSON.stringify(rs))
        let rsarr=[]
        rs.forEach(element => {
            if(element.no.expire_on<=expire_in_days)
            rsarr.push(
                {
                    loanId: element.idtaikhoan,
                    name: element.tentaikhoan,
                    color: element.color,
                    amount: element.no.sotien,
                    expire_on: element.no.ngaytradukien, 
                    interest: element.no.laisuatno,
                    creationDate: element.no.ngaybatdauno
                }
            )
        });
        //console.log(rsarr)
        resolve(rsarr)
    }),reason => reject(reason)
})
export const deleteLoan= ({loanId}) => new Promise((resolve, reject) => {
    try {
        let id =new MongoId(loanId)
        let rs=deleteTaiKhoan(id)
        resolve(resolve)
    } catch (error) {
        reject(console.error())
    }
})

export const deactivateLoan= ({loanId}) => new Promise((resolve, reject) => {
    try {
        let id =new MongoId(loanId)
        let rs=deactiavteTaiKhoan(id)
        resolve(resolve)
    } catch (error) {
        reject(console.error())
    }
})



Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}