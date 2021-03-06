import { queryMucTieuCaNhan, insertMucTieuCaNhan, updateMucTieuCaNhan, deleteMucTieuCaNhan } from '../services/MucTieuCaNhanCRUD'
import { BSON } from 'realm'
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns'

export const fetchBugetList = () =>
    new Promise((resolve, reject) => {
        queryMucTieuCaNhan({}).then(muctieu => {
            resolve(muctieu)
        }).catch(err => reject(err))
    })

export const fetchBudget = ({ budgetId }) =>
    new Promise((resolve, reject) => {
        let budid = (budgetId) ? new BSON.ObjectID(budgetId) : null
        queryMucTieuCaNhan({ idmuctieu: budid }).then(muctieu => {
            resolve(muctieu)
        }).catch(err => reject(err))
    })

export const saveBudget = ({ budgetId, userId, name, loaimuctieu, amount, period, start_day, end_day }) =>
    new Promise((resolve, reject) => {
        if (!budgetId) {
            let budget = {
                idmuctieu: new BSON.ObjectID(),
                idnguoidung: (userId) ? new BSON.ObjectID(userId) : null,
                thoigiantao: new Date(Date.now()),
                loaimuctieu: loaimuctieu,
                sotienmuctieu: amount,
                ngaybatdau: null,
                ngayketthuc: null,
                tenmuctieu: name,
            }
            if (period && !(start_day || end_day)) {
                if (period == 'week') {
                    budget.ngaybatdau = startOfWeek(new Date(Date.now()), { weekStartsOn: 1 })
                    budget.ngayketthuc = endOfWeek(new Date(Date.now()), { weekStartsOn: 1 })
                }
                else if (period == 'month') {
                    budget.ngaybatdau = startOfMonth(new Date(Date.now()))
                    budget.ngayketthuc = endOfMonth(new Date(Date.now()))
                }
                else if (period == 'year') {
                    budget.ngaybatdau = startOfYear(new Date(Date.now()))
                    budget.ngayketthuc = endOfYear(new Date(Date.now()))
                }
                else {
                    reject('kh??ng t???n t???i lo???i period t????ng x???ng')
                    return
                }
            }
            else if (!period && start_day && end_day) {
                budget.ngaybatdau = start_day
                budget.ngayketthuc = end_day
            }
            else {
                reject('Kh??ng x??? l?? ???????c ng??y b???t ?????u v?? ng??y k???t th??c c???a m???c ti??u ')
                return
            }
            insertMucTieuCaNhan(budget, loaimuctieu).then(muctieu => {
                if (muctieu)
                    resolve(muctieu)
                else
                    reject('Kh??ng t???o m???c ti??u th??nh c??ng')
            }).catch(er => {
                reject(er)
                return
            })
        }
        else {
            let budget = {
                idmuctieu: (budgetId) ? new BSON.ObjectID(budgetId) : null,
                idnguoidung: (userId) ? new BSON.ObjectID(userId) : null,
                loaimuctieu: loaimuctieu,
                sotienmuctieu: amount,
                ngaybatdau: null,
                ngayketthuc: null,
                tenmuctieu: name,
            }
            if (period && !(start_day || end_day)) {
                if (period == 'week') {
                    budget.ngaybatdau = startOfWeek(new Date(Date.now()), { weekStartsOn: 1 })
                    budget.ngayketthuc = endOfWeek(new Date(Date.now()), { weekStartsOn: 1 })
                }
                else if (period == 'month') {
                    budget.ngaybatdau = startOfMonth(new Date(Date.now()))
                    budget.ngayketthuc = endOfMonth(new Date(Date.now()))
                }
                else if (period == 'year') {
                    budget.ngaybatdau = startOfYear(new Date(Date.now()))
                    budget.ngayketthuc = endOfYear(new Date(Date.now()))
                }
                else {
                    reject('kh??ng t???n t???i lo???i period t????ng x???ng')
                    return
                }
            }
            else if (!period && start_day && end_day) {
                budget.ngaybatdau = start_day
                budget.ngayketthuc = end_day
            }
            else if (period || start_day || end_day) {
                reject('Kh??ng x??? l?? ???????c ng??y b???t ?????u v?? ng??y k???t th??c c???a m???c ti??u ')
                return
            }

            if (loaimuctieu == 'TietKiemDenMuc') {
                budget.loaimuctieu =
                {
                    tietkiemdenmuc: true,
                    tieudungquamuc: false,
                    sodutoithieu: false,
                }
            }
            else if (loaimuctieu == 'TieuDungQuaMuc') {
                budget.loaimuctieu =
                {
                    tietkiemdenmuc: false,
                    tieudungquamuc: true,
                    sodutoithieu: false,
                }
            }
            else if (loaimuctieu == 'SoDuToiThieu') {
                budget.loaimuctieu =
                {
                    tietkiemdenmuc: false,
                    tieudungquamuc: false,
                    sodutoithieu: true,
                }
            }
            else if (loaimuctieu != null) {
                reject('Kh??ng x??? l?? ???????c lo???i m???c ti??u')
                return
            }
            // console.log('budget ????y',JSON.parse(JSON.stringify(budget)))
            updateMucTieuCaNhan(budget).then(muctieu => {
                if (muctieu)
                    resolve(muctieu)
                else
                    reject('Kh??ng c???p nh???t m???c ti??u th??nh c??ng')
            }).catch(er => reject(er))
        }
    })

export const deleteBudget = ({ budgetId }) =>
    new Promise((resolve, reject) => {
        let budid = (budgetId) ? new BSON.ObjectID(budgetId) : null
        deleteMucTieuCaNhan({ idmuctieu: budid }).then(muctieu => {
            if (muctieu == 'ThanhCong')
                resolve({ result: true, message: 'X??a m???c ti??u th??nh c??ng' })
            else
                reject({ result: false, message: 'X??a m???c ti??u th???t b???i' })
        }).catch(err => reject({ result: false, message: err }))
    })