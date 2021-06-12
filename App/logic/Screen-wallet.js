import {queryTaiKhoan,insertTaiKhoan, deleteTaiKhoan}from '../services/TaiKhoanCRUD';
import {BSON} from 'realm'
import { updateTaiKhoan } from '../services/TaiKhoanCRUD';


export const fetchWallet= ({walletId}) => new Promise((resolve, reject) => {
    queryTaiKhoan({idtaikhoan:walletId}).then((tk)=> {
        let rs =
        {
            walletId: tk[0].idtaikhoan,
            name: tk[0].tentaikhoan,
            color: tk[0].color,
            amount: tk[0].tieudung.sotien,
            creationDate: tk[0].thoigiantao
        }       
        resolve(rs)
    }), reason=> {reject(reason)}
})
export const saveWallet= ({walletId,walletName, color, amount}) => new Promise((resolve, reject) => {
    if(loanId ===undefined){
        newtaikhoantietkiem={
            idtaikhoan: new BSON.ObjectID(),
            tentaikhoan: walletName,        
            bieutuong: '',
            color: color,
            thoigiantao: creationDate,
            //idnguoidung: 'objectId',
            tieudung:{
                idtktieudung: new BSON.ObjectID(),
                sotien: amount,
            },
            tietkiem:null,
            no:null
        }
        insertTaiKhoan(newtaikhoantietkiem).then((tk)=>{resolve(true)}, (reason) => {reject(reason)})
    }
    else{
        queryTaiKhoan({taikhoanieudung: true,idtaikhoan:walletId}).then((tk)=>{
            let rs =
            {
                idtaikhoan:tk[0].idtaikhoan,
                tentaikhoan: tk[0].tentaikhoan,  
                deactivate: tk[0].deactivate,      
                bieutuong: tk[0].bieutuong,
                color: tk[0].color,
                thoigiantao: tk[0].thoigiantao,
                idnguoidung: tk[0].idnguoidung,
                tieudung:{
                    idtktieudung:tk[0].tieudung.idtktieudung,
                    sotien: tk[0].sotien,
                },
                tietkiem:null,
                no:null,
            }
            if(typeof walletName!==  'undefined') rs.tentaikhoan =walletName
            if(typeof amount!==  'undefined') {
                rs.tieudung.sotien=amount;
              }
            if(typeof color!==  'undefined')  rs.color= color
            console.log(JSON.stringify(rs))
            updateTaiKhoan(rs).then(tk=> resolve(true)), (reason)=> reject(reason)
        }, (reason) => {
            reject(reason)
        }
        )
    }
})

export const queryLoan=({walletName, minAmount, maxAmount}) => new Promise((resolve, reject) => {
    queryTaiKhoan({deactivate:false,taikhoanieudung: true,tentaikhoan:walletName, walletminAmount:minAmount ,walletmaxAmount:maxAmount}).then((rs)=> {
        //console.log(JSON.stringify(rs))
        let rsarr=[]
        rs.forEach(element => {
            rsarr.push(
                {
                    walletId: element.idtaikhoan,
                    name: element.tentaikhoan,
                    color: element.color,
                    amount: element.tieudung.sotien,
                    creationDate: element.thoigiantao
                }
            )
        });
        //console.log(rsarr)
        resolve(rsarr)
    }),reason => reject(reason)
})
export const deleteLoan= ({walletId}) => new Promise((resolve, reject) => {
    try {
        let id =new MongoId(walletId)
        let rs=deleteTaiKhoan(id)
        resolve(resolve)
    } catch (error) {
        reject(console.error())
    }
})

export const deactivateLoan= ({walletId}) => new Promise((resolve, reject) => {
    try {
        let id =new MongoId(walletId)
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