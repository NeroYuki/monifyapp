import {insertTaiKhoan,deleteTaiKhoan, updateTaiKhoan,queryTaiKhoan} from '../App/services/TaiKhoanCRUD';
import {insertNewNguoiDung,updateNguoiDung,queryAllNguoiDung,deleteAllNguoiDung} from '../App/services/NguoiDungCRUD';
import {BSON} from 'realm'


nguoiDung= {idnguoidung: new BSON.ObjectID(), pass: 'minhhieu'};
test('testing database', async () => {
    expect(await insertNewNguoiDung(nguoiDung)).toBe(nguoiDung);
});
taikhoanTest1={
    idtaikhoan: new BSON.ObjectID(),
    tentaikhoan: 'testing',
    bieutuong:'none',
    thoigiantao: new Date(),
    idnguoidung: nguoiDung.idnguoidung,
}
test('insert taikhoan test', async () => {
    await insertTaiKhoan(taikhoanTest1,'no').then((tk) => {
       // console.log(JSON.parse(JSON.stringify(tk)))
        queryTaiKhoan({idtaikhoan:taikhoanTest1.idtaikhoan}).then((taikhoanTest2)=> {
            console.log(taikhoanTest2[0])
            taikhoantest3 = {
                idtaikhoan: taikhoanTest2[0].idtaikhoan,
                tentaikhoan: taikhoanTest2[0].tentaikhoan,  
                bieutuong: taikhoanTest2[0].bieutuong,
                thoigiantao:taikhoanTest2[0].thoigiantao,
                idnguoidung:taikhoanTest2[0].idnguoidung,
                tieudung:taikhoanTest2[0].tieudung,
                tietkiem:taikhoanTest2[0].tietkiem,
                no:taikhoanTest2[0].no,
            }
            taikhoantest3.tentaikhoan = 'fuckkkkkkkk'
            console.log(JSON.parse(JSON.stringify(taikhoantest3)))
            updateTaiKhoan(taikhoantest3).then((tkx) => {
                console.log(JSON.parse(JSON.stringify(tkx)))
            })
            expect(tk.idtaikhoan).toEqual(taikhoanTest1.idtaikhoan)
    })
});
// test('query test', async () => {
//     await queryTaiKhoan({idtaikhoan:taikhoanTest1.idtaikhoan}).then((taikhoanTest2)=> {
//         console.log(taikhoanTest2)
//         taikhoantest3 = {
//             idtaikhoan: taikhoanTest2.idtaikhoan,
//             tentaikhoan: taikhoanTest2.tentaikhoan,  
//             bieutuong: taikhoanTest2.bieutuong,
//             thoigiantao:taikhoanTest2.thoigiantao,
//             idnguoidung:taikhoanTest2.idnguoidung,
//             tieudung:taikhoanTest2.tieudung,
//             tietkiem:taikhoanTest2.tietkiem,
//             no:taikhoanTest2.no,
//         }
//         taikhoantest3.tentaikhoan = 'fuckkkkkkkk'
//         console.log(taikhoantest3)
//         console.log(JSON.parse(JSON.stringify(updateTaiKhoan(taikhoantest3))))
//     })

});// console.log(JSON.parse(JSON.stringify(taikhoanTest2)))
// taikhoanTest2.idtaikhoan= new BSON.ObjectID()
// taikhoanTest2.no.idtkno = new BSON.ObjectID()
// test('insert 2 test', async () => {
//     await insertTaiKhoan(taikhoanTest2).then((tk) => {
//         console.log(JSON.parse(JSON.stringify(tk)))
//     })
// })
// // const sum = require('../App/utils/Sum')
// nguoiDung= {idnguoidung: new BSON.ObjectID(), pass: 'minhhieu'};
// let idtaikhoan=new BSON.ObjectID()
// let idnguoidung=new BSON.ObjectID()
// let date= new Date('2011-04-11T10:20:30.000Z')



// taiKhoanTest={
//     idtaikhoan: idtaikhoan,
//     tentaikhoan: 'taikhoantest',
//     bieutuong: 'none',
//     thoigiantao: date,
//     idnguoidung: idnguoidung,
//     loaitaikhoan: {
//         no: null,
//         tietkiem : null,
//         tieudung:{
//             sotien: 300000
//         }
//     }
// }
// console.log(taiKhoanTest)
// test('test taikahoan insert', async()=>{  
//     await insertTaiKhoan(taiKhoanTest).then((tk) => {
//       //  expect(tk).toBe(taiKhoanTest)
//         expect (JSON.parse(JSON.stringify(tk))).toEqual(JSON.parse(JSON.stringify(taiKhoanTest)));   
//      })
// });
// taiKhoanUpdateTest={
//     idtaikhoan: idtaikhoan,
//     tentaikhoan: 'taikhoantest',
//     bieutuong: 'none',
//     thoigiantao: date,
//     idnguoidung: idnguoidung,
//     loaitaikhoan: {
//         no: null,
//         tietkiem : null,
//         tieudung:{
//             sotien: 600000
//         }
//     }
// }
// test('update taikhoan test', async () => {
//     await updateTaiKhoan(taiKhoanUpdateTest).then((tk) => {
//         expect (tk.loaitaikhoan.tieudung.sotien ).toEqual(600000)
//     })
// })