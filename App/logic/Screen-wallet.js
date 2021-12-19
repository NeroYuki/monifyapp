import { queryTaiKhoan, insertTaiKhoan, deleteTaiKhoan, deactiavteTaiKhoan } from '../services/TaiKhoanCRUD';
import { BSON, Results } from 'realm'
import { updateTaiKhoan } from '../services/TaiKhoanCRUD';
import sessionStore from './sessionStore';

export const fetchWallet = (walletId) => new Promise((resolve, reject) => {
    console.log(walletId)
    queryTaiKhoan({ idtaikhoan: new BSON.ObjectID(walletId) }).then((tk) => {
        //console.log(tk)
        if(tk[0]){
            let rs =
            {
                walletId: JSON.parse(JSON.stringify(tk[0].idtaikhoan)),
                name: tk[0].tentaikhoan,
                color: tk[0].color,
                amount: tk[0].tieudung.sotien,
                creationDate: tk[0].thoigiantao
            }
            resolve(rs)
        }
        else {
            reject({result: false, message:'khong tim thay wallet trong fetch wallet'})
        }
    }), reason => reject(reason)
})
export const saveWallet = ({ walletId, walletName, color, amount }) => new Promise((resolve, reject) => {
    if (walletId === undefined) {

        console.log("SAVE 1")
        let newtaikhoantietkiem = {
            idtaikhoan: new BSON.ObjectID(),
            tentaikhoan: walletName,
            bieutuong: '',
            color: color,
            thoigiantao: new Date(),
            idnguoidung: BSON.ObjectID(sessionStore.activeUserId || null),
            tieudung: {
                idtktieudung: new BSON.ObjectID(),
                sotien: amount,
            },
            tietkiem: null,
            no: null
        }

        console.log("SAVE 2 ", newtaikhoantietkiem)
        insertTaiKhoan(newtaikhoantietkiem).then((tk) => {
            resolve(true)
        }, (reason) => {
            reject(reason)
        })
    }
    else {

        console.log("SAVE 2")
        let tempid = new BSON.ObjectId(walletId)
        queryTaiKhoan({ taikhoanieudung: true, idtaikhoan: tempid }).then((tk) => {
            let rs =
            {
                idtaikhoan: tk[0].idtaikhoan,
                tentaikhoan: tk[0].tentaikhoan,
                deactivate: tk[0].deactivate,
                bieutuong: tk[0].bieutuong,
                color: tk[0].color,
                thoigiantao: tk[0].thoigiantao,
                idnguoidung: tk[0].idnguoidung,
                tieudung: {
                    idtktieudung: tk[0].tieudung.idtktieudung,
                    sotien: tk[0].sotien,
                },
                tietkiem: null,
                no: null,
            }
            if (typeof walletName !== 'undefined') rs.tentaikhoan = walletName
            if (typeof amount !== 'undefined' || amount !== null) {
                rs.tieudung.sotien = amount;
            }
            if (typeof color !== 'undefined') rs.color = color
            // console.log(JSON.stringify(rs))
            updateTaiKhoan(rs).then(tk => resolve(true), (reason) => reject(reason))
        }, (reason) => {
            reject(reason)
        }
        )
    }
})

export const querywallet = ({ walletName, minAmount, maxAmount }) => new Promise((resolve, reject) => {
    queryTaiKhoan({ deactivate: false, taikhoantieudung: true, tentaikhoan: walletName, walletminAmount: minAmount, walletmaxAmount: maxAmount }).then((rs) => {
        //console.log(JSON.stringify(rs))
        let rsarr = []
        rs.forEach(element => {
            //console.log(element)
            rsarr.push(
                {
                    walletId: JSON.parse(JSON.stringify(element.idtaikhoan)),
                    name: element.tentaikhoan,
                    color: element.color,
                    amount: element.tieudung.sotien,
                    creationDate: element.thoigiantao
                }
            )
        });
        //console.log(rsarr)
        resolve(rsarr)
    }, reason => reject(reason))
})
export const deleteWallet = (walletId) => new Promise(async (resolve, reject) => {
    try {
        let id = new BSON.ObjectId(walletId)
        let rs = await deleteTaiKhoan(id)
        resolve(rs)
        return
    } catch (error) {
        reject(error)
        return
    }
})

export const deactivateWallet = (walletId) => new Promise((resolve, reject) => {
    try {
        let id = new BSON.ObjectId(walletId)
        let rs = deactiavteTaiKhoan(id)
        resolve(rs)
        return true
    } catch (error) {
        reject(console.error())
        return false
    }
})



Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}