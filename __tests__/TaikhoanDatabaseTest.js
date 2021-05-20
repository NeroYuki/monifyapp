import {insertTaiKhoan,deleteTaiKhoan} from '../App/services/TaiKhoanCRUD';
import {BSON} from 'realm'

const sum = require('../App/utils/Sum')
nguoiDung= {idnguoidung: new BSON.ObjectID(), pass: 'minhhieu'};

// tkTieuDungConfig={
//     sotien: 300000
// };
// taiKhoanConfig={
//     tieudung: tkTieuDungConfig, 
// }

taiKhoanTest={
    idtaikhoan: new BSON.ObjectID(),
    tentaikhoan: 'taikhoantest',
    bieutuong: 'none',
    thoigiantao: new Date('2011-04-11T10:20:30.000Z'),
    idnguoidung: new BSON.ObjectID(),
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
