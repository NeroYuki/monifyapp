import {fetchBill,saveBill} from '../../App/logic/screen-RecurringBillEditor'
import {queryHangMucGiaoDich,insertHangMucGiaoDich} from '../../App/services/HangMucGiaoDichCRUD';
import {BSON} from 'realm'
 
let thoigiancuoicungcheck= new Date('2011-04-11T10:20:30.000Z')
Bill={
    billId:'60c0d8c26638c98738494f2e',
    userId:'60bf81c035582676b155066e',
    loaihangmucId:'60c0cb55a09b8f641df3ca13',//60c0cb2a62cd926b5f692f72,60c0cb55a09b8f641df3ca13
    name:'SSCI',
    color:'#00000',
    note:'bán hàng tự vận',
    amount:777,
    cycle_start:thoigiancuoicungcheck,
    cycle_duration_day:5,
    cycle_duration_month:null,
    creation_date:thoigiancuoicungcheck,
}
test('testing logic saveBill', async () => {
    console.log(JSON.parse(JSON.stringify(await saveBill(Bill))))
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

test('testing logic fetchBill', async () => {
    console.log(JSON.parse(JSON.stringify(await fetchBill({billId:'60c0d8c26638c98738494f2e'}))))
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})
