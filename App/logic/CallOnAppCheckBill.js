import { updateGiaoDichChuKy, upsertGiaoDichChuKy } from '../services/GiaoDichChuKyCRUD'
import { saveTransaction } from './Component-TransactionEditor'
import { fetchBill, saveBill } from './screen-RecurringBillEditor'
import { queryBill } from './Screen-RecurringBillManager'
import moment from 'moment'

//NOTE: WHY I HAVE TO REWRITE EVERYTHING
export const checkBillForCycle = () =>
    new Promise(async (resolve, reject) => {
        let billAll
        await fetchBill({}).then((bill) => {
            billAll = bill
        }).catch((er) => {
            reject(er)
            return
        })
       console.log(JSON.stringify(billAll, {}, "  "))
       let res = []
       
       billAll.forEach( async (val) => {
            const id = new String(val.idgiaodichtheochuky).toString()
            let start_date = moment(JSON.stringify(val.thoigianbatdau), "YYYY-MM-DDTHH:mm:ss.SSSZ")
            let adding_mode = 'day'
            if (val.chukygiaodichtheothang) adding_mode = 'month'
            let next_trans = start_date
            //add one cycle first
            if (adding_mode === 'day') next_trans = next_trans.add(val.chukygiaodichtheongay, 'days')
            else next_trans = next_trans.add(val.chukygiaodichtheothang, 'months')
            while (next_trans < Date.now() && !val.pause) {
                //if its inside this loop, that mean there is at least one cycle elapsed, we will now make new transaction for each successful loop
                await saveTransaction({
                    userId: val.idnguoidung,
                    note: val.ghichu,
                    amount: (val.sotientieudung) ? val.sotientieudung : val.sotienthunhap,
                    walletId: val.idtaikhoan,
                    occur_date: new Date(Date.now()),
                    categoryId: val.loaihangmucgd
                }).then(async (tran) => {
                    //return operation result
                    let am = (val.sotientieudung != null) ? val.sotientieudung : val.sotienthunhap
                    let loaitien = (val.sotientieudung != null) ? 'tieudung' : 'thunhap'
                    console.log(JSON.parse(JSON.stringify(tran), 'Da vao day'))
                    res.push({ billId: val.idgiaodichtheochuky, name: val.name, eventname: 1, amount: am, loaitien: loaitien })
                }).catch(err => {
                    //return operation result
                    let am = (val.sotientieudung != null) ? val.sotientieudung : val.sotienthunhap
                    let loaitien = (val.sotientieudung != null) ? 'tieudung' : 'thunhap'
                    res.push({ billId: val.idgiaodichtheochuky, name: val.name, eventname: 2, amount: am, loaitien: loaitien })
                })
                //add another cycle for the next loop check
                if (adding_mode === 'day') next_trans = next_trans.add(val.chukygiaodichtheongay, 'days')
                else next_trans = next_trans.add(val.chukygiaodichtheothang, 'months')
            }
            //test notify, please comment later
            //res.push({ billId: val.idgiaodichtheochuky, name: val.name, eventname: 1, amount: 100000, loaitien: 'tieudung' })
           //update last checked date for all 
           let x = await upsertGiaoDichChuKy(val, {thoigiancuoicungcheck: new Date()})
       })
       resolve(res)
    })