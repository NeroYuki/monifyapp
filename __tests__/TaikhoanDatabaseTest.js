import {insertTaiKhoan,deleteTaiKhoan, updateTaiKhoan} from '../App/services/TaiKhoanCRUD';
import {BSON} from 'realm'

const sum = require('../App/utils/Sum')
nguoiDung= {idnguoidung: new BSON.ObjectID(), pass: 'minhhieu'};
let idtaikhoan=new BSON.ObjectID()
let idnguoidung=new BSON.ObjectID()
let date= new Date('2011-04-11T10:20:30.000Z')
// tkTieuDungConfig={
//     sotien: 300000
// };
// taiKhoanConfig={
//     tieudung: tkTieuDungConfig, 
// }

taiKhoanTest={
    idtaikhoan: idtaikhoan,
    tentaikhoan: 'taikhoantest',
    bieutuong: 'none',
    thoigiantao: date,
    idnguoidung: idnguoidung,
    loaitaikhoan: {
        no: null,
        tietkiem : null,
        tieudung:{
            sotien: 300000
        }
    }
}
console.log(taiKhoanTest)
test('test taikahoan insert', async()=>{  
    await insertTaiKhoan(taiKhoanTest).then((tk) => {
      //  expect(tk).toBe(taiKhoanTest)
        expect (JSON.parse(JSON.stringify(tk))).toEqual(JSON.parse(JSON.stringify(taiKhoanTest)));   
     })
});
taiKhoanUpdateTest={
    idtaikhoan: idtaikhoan,
    tentaikhoan: 'taikhoantest',
    bieutuong: 'none',
    thoigiantao: date,
    idnguoidung: idnguoidung,
    loaitaikhoan: {
        no: null,
        tietkiem : null,
        tieudung:{
            sotien: 600000
        }
    }
}
test('update taikhoan test', async () => {
    await updateTaiKhoan(taiKhoanUpdateTest).then((tk) => {
        expect (tk.loaitaikhoan.tieudung.sotien ).toEqual(600000)
    })
})