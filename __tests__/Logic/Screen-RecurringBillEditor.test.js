import {fetchBill,saveBill} from '../../App/logic/screen-RecurringBillEditor'
import {queryHangMucGiaoDich,insertHangMucGiaoDich} from '../../App/services/HangMucGiaoDichCRUD';
import {BSON} from 'realm'
 
let thoigiancuoicungcheck= new Date('2021-06-12T05:20:30.000Z')
Bill={
    billId:'60bf81d4ac9a7a9b89f4802c',
    userId:'60bf81c035582676b155066e',
    idtaikhoan:'60c215597db98e07e0ecf147',
    loaihangmucId:'60c20d3075a2f3751ad6e731',//60c2124cff795ef6c9ba7d59,60c1e454c706ae2f3930f623
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
    console.log(JSON.parse(JSON.stringify(await fetchBill({}))))
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})
