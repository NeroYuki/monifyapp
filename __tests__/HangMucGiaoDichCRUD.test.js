import {insertHangMucGiaoDich,updateHangMucGiaoDich,deleteHangMucGiaoDich,queryHangMucGiaoDich} from '../App/services/HangMucGiaoDichCRUD';
import {BSON} from 'realm'
 
let idhangmuc=new BSON.ObjectID()
let idnguoidung=new BSON.ObjectID()
let date= new Date('2011-04-11T10:20:30.000Z')
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
   expect(JSON.parse(JSON.stringify(await insertHangMucGiaoDich(hangmucgiaodich,'chitieu')))).toStrictEqual(JSON.parse(JSON.stringify(hangmucgiaodichtest)))
})
hangmucgiaodichtestupdate= {
    idhangmucgiaodich: idhangmuc,
    idnguoidung:{
        idnguoidung:idnguoidung,
        pass:'123456'
    },
    thoigiantao: date,
    tenhangmuc: 'Sắm tết 3',
    iconhangmuc: '123456###',
    loaihangmuc: {
        chitieu:true,
        thunhap:false,  
    },
}
hangmuctestquery=[{
    idhangmucgiaodich: new BSON.ObjectID('609e4dcdec7920f2c5a218a2'),
    idnguoidung: { idnguoidung: new BSON.ObjectID('609e4dcdec7920f2c5a218a3'), pass: '123456' },
    thoigiantao: '2011-04-11T10:20:30.000Z',
    tenhangmuc: 'Sắm tết',
    loaihangmuc: { chitieu: true, thunhap: false },
    iconhangmuc: '123456###'
  }]
test('testing update HangMucGiaoDich', async () => {
    // console.log(BSON.deserialize(BSON.serialize(updateHangMucGiaoDich(hangmucgiaodichtestupdate))))
    // console.log(hangmucgiaodichtestupdate)
     expect(JSON.parse(JSON.stringify(await updateHangMucGiaoDich(hangmucgiaodichtestupdate)))).toStrictEqual(JSON.parse(JSON.stringify(hangmucgiaodichtestupdate)))
    // expect(EJSON.parse(EJSON.stringify(await updateHangMucGiaoDich(hangmucgiaodichtestupdate)))).toStrictEqual(hangmucgiaodichtestupdate)
})
test('testing delete HangMucGiaoDich', async () => {
    expect(await deleteHangMucGiaoDich(hangmucgiaodichtestupdate)).toStrictEqual('ThanhCong')
})
test('testing querry HangMucGiaoDich', async () => {
    //console.log(JSON.parse(JSON.stringify(await queryHangMucGiaoDich(thoigiantao=date,tenhangmuc='Sắm tết',loaihangmuc='ChiTieu',id=new BSON.ObjectID('609e4dcdec7920f2c5a218a3')))))
    expect(JSON.parse(JSON.stringify(await queryHangMucGiaoDich({thoigiantao:date,tenhangmuc:'Sắm tết',loaihangmuc:'ChiTieu',id:new BSON.ObjectID('609e4dcdec7920f2c5a218a3')})))).toStrictEqual(JSON.parse(JSON.stringify(hangmuctestquery)))
})
