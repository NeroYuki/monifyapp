import {insertHangMucGiaoDich} from '../App/services/HangMucGiaoDichCRUD';
import {BSON} from 'realm'

let idhangmuc=new BSON.ObjectID()
let idnguoidung=new BSON.ObjectID()
let date= new Date('2011-04-11T10:20:30Z')
hangmucgiaodichtest= {
    idhangmucgiaodich: idhangmuc,
    idnguoidung:{
        idnguoidung:idnguoidung,
        pass:'123456'
    },
    thoigiantao: date,
    tenhangmuc: 'Sắm tết',
    iconhangmuc: '123456###',
    loaihangmuc: {
        chitieu:true,
        thunhap:false,  
    },
}
hangmucgiaodich= {
    idhangmucgiaodich: idhangmuc,
    idnguoidung:{
        idnguoidung:idnguoidung,
        pass:'123456'
    },
    thoigiantao: date,
    tenhangmuc: 'Sắm tết',
    iconhangmuc: '123456###',
}
test('testing insert HangMucGiaoDich', async () => {
    // console.log(await insertHangMucGiaoDich(hangmucgiaodich,'chitieu'))
    // console.log(hangmucgiaodichtest)
   expect(await insertHangMucGiaoDich(hangmucgiaodich,'chitieu')).toStrictEqual(hangmucgiaodichtest)
});