import {fetchBudget,fetchBugetList,saveBudget,deleteBudget} from '../../App/logic/Screen-Budget'
import{insertMucTieuCaNhan} from '../../App/services/MucTieuCaNhanCRUD'
import {BSON} from 'realm'

// let idmuctieu=new BSON.ObjectID()
// let idnguoidung=new BSON.ObjectID()
// let datestart= new Date('2011-04-11T10:20:30.000Z')
// let dateend= new Date('2011-05-11T10:20:30.000Z')
// let muctieucanhantest={
//     idmuctieu: idmuctieu,
//     idnguoidung:idnguoidung,
//     thoigiantao: datestart,
//     sotienmuctieu: 200000,
//     ngaybatdau: datestart,
//     ngayketthuc: dateend,
// }
// let muctieucanhan={
//   idmuctieu: idmuctieu,
//   idnguoidung:idnguoidung,
//   thoigiantao: datestart,
//   loaimuctieu:{
//       tietkiemdenmuc: false,
//       tieudungquamuc: false,
//       sodutoithieu: true,
//   },
//   sotienmuctieu: 200000,
//   ngaybatdau: datestart,
//   ngayketthuc: dateend,
// }

// test('testing insert MucTieuCaNhan', async () => {
//   // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
//   // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
//  expect(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'SoDuToiThieu')))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhan)))
// })

test('testing logic saveBudget', async () => {
    console.log(JSON.parse(JSON.stringify(await saveBudget({
        budgetId:'60c2d5fe651fc49ab59d4400',
        userId:'60c22a3e29fc94b5464910a8',
        name:'Mua may 7',
        amount:777,
        loaimuctieu:'SoDuToiThieu',//TieuDungQuaMuc,SoDuToiThieu,TietKiemDenMuc
        period:'month',//year,month,week
        // start_day:'2011-05-11T10:20:30.000Z',
        // end_day:'2011-05-11T10:20:30.000Z',
    }))))
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

test('testing logic deleteBudget', async () => {
    console.log(JSON.parse(JSON.stringify(await deleteBudget({budgetId:'60c229bed53a5da856e26889'}))))
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

test('testing logic fetchBudget', async () => {
    console.log(JSON.parse(JSON.stringify(await fetchBudget({budgetId:'60c2e2de9ef12535790d2d1b'}))))
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

test('testing logic fetchBugetList', async () => {
    console.log(JSON.parse(JSON.stringify(await fetchBugetList({}))))
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})