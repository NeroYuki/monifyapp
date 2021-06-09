import {fetchBill,saveBill} from '../../App/logic/screen-RecurringBillEditor'
import {queryGiaoDichChuKy} from '../../App/services/GiaoDichChuKyCRUD';
let thoigiancuoicungcheck= new Date('2011-04-11T10:20:30.000Z')
Bill={
    billId:'60c09261e9ce59c3f5ab22e2',
    userId:'60bf81c035582676b155066e',
    name:'netflix',
    color:'#00000',
    note:'Mua cuối tháng',
    amount:20000,
    cycle_start:thoigiancuoicungcheck,
    cycle_duration_day:366,
    cycle_duration_month:null,
    creation_date:thoigiancuoicungcheck,
}
test('testing logic saveBill', async () => {
    console.log(JSON.parse(JSON.stringify(await saveBill(Bill))))
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

test('testing logic fetchBill', async () => {
    console.log(JSON.parse(JSON.stringify(await fetchBill())))
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

