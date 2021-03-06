import { queryTaiKhoan, insertTaiKhoan, deleteTaiKhoan, deactiavteTaiKhoan } from '../services/TaiKhoanCRUD';
import { BSON } from 'realm'
import { updateTaiKhoan } from '../services/TaiKhoanCRUD';
import { saveTransaction } from './Component-TransactionEditor';
import { createLoanPayment } from './Screen-payment';
import sessionStore from './sessionStore';
import { queryHangMucGiaoDich } from '../services/HangMucGiaoDichCRUD';


export const fetchLoan = (loanId) => new Promise((resolve, reject) => {
    queryTaiKhoan({ idtaikhoan: new BSON.ObjectID(loanId) }).then((tk) => {
        let rs =
        {
            loanId: JSON.parse(JSON.stringify(tk[0].idtaikhoan)),
            name: tk[0].tentaikhoan,
            color: tk[0].color,
            amount: tk[0].no.sotien,
            expire_on: tk[0].no.ngaytradukien,
            interest: tk[0].no.laisuatno,
            creationDate: tk[0].no.ngaybatdauno
        }
        return resolve(rs)
    }), reason => { return reject(reason) }
})
export const saveLoan = ({ loanId, loanName, color, amount, expire_on, interest, creationDate, cycle, applied_wallet_id = "" }) => new Promise((resolve, reject) => {
    if (loanId === undefined) {
        let newtaikhoanno = {
            idtaikhoan: new BSON.ObjectID(),
            tentaikhoan: loanName,
            bieutuong: '',
            color: color,
            thoigiantao: creationDate,
            idnguoidung: new BSON.ObjectID(sessionStore.activeUserId),
            tieudung: null,
            tietkiem: null,
            no: {
                idtkno: new BSON.ObjectID(),
                sotien: amount,
                // color: color,
                laisuatno: interest,
                kyhanno: 0,
                ngaybatdauno: creationDate,
                ngaytradukien: expire_on,
                sotientradukien: amount,
            },
        }
        insertTaiKhoan(newtaikhoanno).then(async (tk) => {
            let userid = new BSON.ObjectID(sessionStore.activeWalletId)
            let catid = JSON.parse(JSON.stringify(new BSON.ObjectID()))
            let temp = await (queryHangMucGiaoDich({ tenhangmuc: 'Default', loaihangmuc: 'ThuNhap' }).then((tk) => {
                if (tk == []) {
                    return reject({ result: false, message: 'khong tim thay hang muc giao dich' })
                }
                else {
                    catid = JSON.parse(JSON.stringify(tk[0].idhangmucgiaodich))
                }
            }, (er) => {
                reject(er)
            }))

            //TODO: make insert transaction
            let res = await saveTransaction({
                userId: userid,
                note: 'Receiving money from loan',
                amount: amount,
                walletId: applied_wallet_id,
                occur_date: new Date(),
                categoryId: catid
            })
            if (res.result === false) {
                console.log(res)
                return resolve({
                    result: false,
                    message: 'khong tao duoc giao dich'
                })
            }
            // if(applied_wallet_id != "")createLoanPayment({from_wallet_id:applied_wallet_id,for_loan_id:tk.idtaikhoan,amount:amount})
            return resolve({
                result: true,
                loan: tk,
                message: "tao tai khoan no thanh cong"
            })

        }, (reason) => { return reject(reason) })
    }
    else {
        id = new BSON.ObjectId(loanId)
        queryTaiKhoan({ idtaikhoan: id }).then((tk) => {
            let rs =
            {
                idtaikhoan: tk[0].idtaikhoan,
                tentaikhoan: tk[0].tentaikhoan,
                deactivate: tk[0].deactivate,
                bieutuong: tk[0].bieutuong,
                color: tk[0].color,
                thoigiantao: tk[0].thoigiantao,
                idnguoidung: tk[0].idnguoidung,
                tieudung: null,
                tietkiem: null,
                no: {
                    idtkno: tk[0].no.idtkno,
                    sotien: tk[0].no.sotien,
                    laisuatno: tk[0].no.laisuatno,
                    kyhanno: tk[0].no.kyhanno,
                    ngaybatdauno: tk[0].no.ngaybatdauno,
                    ngaytradukien: tk[0].no.ngaytradukien,
                    sotientradukien: tk[0].no.sotientradukien,
                },
            }
            if (typeof loanName != 'undefined') rs.tentaikhoan = loanName
            if (typeof amount != 'undefined') rs.no.sotien = amount
            if (typeof color != 'undefined') rs.color = color
            if (typeof interest != 'undefined') rs.no.laisuatno = interest
            if (typeof expire_on != 'undefined') rs.no.ngaytradukien = expire_on
            //console.log(JSON.parse(JSON.stringify(rs)))
            resolve(updateTaiKhoan(rs))
            return
        })
    }
}
)

export const queryLoan = ({ loanName, minAmount, maxAmount, expire_in_days }) => new Promise((resolve, reject) => {
    let today = new Date()
    let endday = today.addDays(expire_in_days)
    queryTaiKhoan({ taikhoanno: true, tentaikhoan: loanName, nominAmount: minAmount, nomaxAmount: maxAmount }).then((rs) => {
        let rsarr = []
        rs.forEach(element => {
            //if(element.no.expire_on<=expire_in_days)
            rsarr.push(
                {
                    loanId: JSON.parse(JSON.stringify(element.idtaikhoan)),
                    name: element.tentaikhoan,
                    color: element.color,
                    amount: element.no.sotien,
                    expire_on: element.no.ngaytradukien,
                    interest: element.no.laisuatno,
                    creationDate: element.no.ngaybatdauno,
                    deactivate: element.deactivate,
                }
            )
        });
        //console.log(JSON.stringify(rs))
        // console.log(JSON.stringify(rsarr))

        resolve(rsarr)
    }), reason => reject(reason)
})
export const deleteLoan = (loanId) => new Promise((resolve, reject) => {
    try {
        let id = new BSON.ObjectId(loanId)
        // console.log(loanId)
        deleteTaiKhoan(id).then((tk) => {
            resolve(tk)
            return true
        })

    } catch (error) {
        reject(console.error(error))
        return false
    }
})

export const deactivateLoan = (loanId) => new Promise((resolve, reject) => {
    try {
        let rs = deactiavteTaiKhoan(loanId)
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