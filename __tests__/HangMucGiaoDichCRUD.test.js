import {insertHangMucGiaoDich,updateHangMucGiaoDich,deleteHangMucGiaoDich,queryHangMucGiaoDich} from '../App/services/HangMucGiaoDichCRUD';
import {BSON} from 'realm'
 
let idhangmuc=new BSON.ObjectID()
let idnguoidung=new BSON.ObjectID()
let date= new Date('2011-04-11T10:20:30.000Z')
hangmucgiaodichtest= {
    idhangmucgiaodich: idhangmuc,
    idnguoidung:idnguoidung,
    thoigiantao: date,
    tenhangmuc: 'Sắm tết',
    iconhangmuc: '123456###',
    loaihangmuc: {
        chitieu:true,
        thunhap:false,  
    },
    color:'#123456'
}
hangmucgiaodich= {
    idhangmucgiaodich: idhangmuc,
    idnguoidung:idnguoidung,
    thoigiantao: date,
    tenhangmuc: 'Sắm tết',
    iconhangmuc: '123456###',
    color:'#123456'
}
test('testing insert HangMucGiaoDich', async () => {
    // console.log(await insertHangMucGiaoDich(hangmucgiaodich,'chitieu'))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await insertHangMucGiaoDich(hangmucgiaodich,'chitieu')))).toStrictEqual(JSON.parse(JSON.stringify(hangmucgiaodichtest)))
})
hangmucgiaodichtestupdate= {
    idhangmucgiaodich: idhangmuc,
    idnguoidung:idnguoidung,
    thoigiantao: date,
    tenhangmuc: 'Sắm tết 3',
    iconhangmuc: '123456###',
    loaihangmuc: {
        chitieu:true,
        thunhap:false,  
    },
    color:'#123456'
}
hangmuctestquery=[{
    idhangmucgiaodich: idhangmuc,
    idnguoidung: idnguoidung,
    thoigiantao: '2011-04-11T10:20:30.000Z',
    tenhangmuc: 'Sắm tết 3',
    loaihangmuc: { chitieu: true, thunhap: false },
    iconhangmuc: '123456###',
    color:'#123456'
  }]
test('testing update HangMucGiaoDich', async () => {
    // console.log(BSON.deserialize(BSON.serialize(updateHangMucGiaoDich(hangmucgiaodichtestupdate))))
    // console.log(hangmucgiaodichtestupdate)
     expect(JSON.parse(JSON.stringify(await updateHangMucGiaoDich(hangmucgiaodichtestupdate)))).toStrictEqual(JSON.parse(JSON.stringify(hangmucgiaodichtestupdate)))
    // expect(EJSON.parse(EJSON.stringify(await updateHangMucGiaoDich(hangmucgiaodichtestupdate)))).toStrictEqual(hangmucgiaodichtestupdate)
})
test('testing querry HangMucGiaoDich', async () => {
    //console.log(JSON.parse(JSON.stringify(await queryHangMucGiaoDich(thoigiantao=date,tenhangmuc='Sắm tết',loaihangmuc='ChiTieu',id=new BSON.ObjectID('609e4dcdec7920f2c5a218a3')))))
    expect(JSON.parse(JSON.stringify(await queryHangMucGiaoDich({idhangmucgiaodich: idhangmuc,thoigiantao:date,tenhangmuc:'Sắm tết 3',loaihangmuc:'ChiTieu',id:idnguoidung,iconhangmuc: '123456###'})))).toStrictEqual(JSON.parse(JSON.stringify(hangmuctestquery)))
})
test('testing delete HangMucGiaoDich', async () => {
    expect(await deleteHangMucGiaoDich(hangmucgiaodichtestupdate)).toStrictEqual('ThanhCong')
})

///////////////////////////////////////////////test2//////////////////////////////////////////////////////////////////////////////////
let idhangmuc2=new BSON.ObjectID()
let idnguoidung2=new BSON.ObjectID()
let date2= new Date('2011-04-11T10:20:30.000Z')
hangmucgiaodichtest2= {
    idhangmucgiaodich: idhangmuc2,
    idnguoidung:idnguoidung2,
    thoigiantao: date2,
    tenhangmuc: 'Bán xe',
    iconhangmuc: '123456###',
    loaihangmuc: {
        chitieu:false,
        thunhap:true,  
    },
    color:'#123456'
}
hangmucgiaodich2= {
    idhangmucgiaodich: idhangmuc2,
    idnguoidung:idnguoidung2,
    thoigiantao: date2,
    tenhangmuc: 'Bán xe',
    iconhangmuc: '123456###',
    color:'#123456'
}
test('testing insert HangMucGiaoDich', async () => {
    // console.log(await insertHangMucGiaoDich(hangmucgiaodich,'chitieu'))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await insertHangMucGiaoDich(hangmucgiaodich2,'thunhap')))).toStrictEqual(JSON.parse(JSON.stringify(hangmucgiaodichtest2)))
})
hangmucgiaodichtestupdate2= {
    idhangmucgiaodich: idhangmuc2,
    idnguoidung:idnguoidung2,
    thoigiantao: date2,
    tenhangmuc: 'Bán oto',
    loaihangmuc: {
        chitieu:true,
        thunhap:false,  
    },
    color:'#123456'
}
hangmucgiaodichtestupdate2KT= {
    idhangmucgiaodich: idhangmuc2,
    idnguoidung:idnguoidung2,
    thoigiantao: date2,
    tenhangmuc: 'Bán oto',
    iconhangmuc: '123456###',
    loaihangmuc: {
        chitieu:true,
        thunhap:false,  
    },
    color:'#123456'
}
hangmuctestquery2=[{
    idhangmucgiaodich: idhangmuc2,
    idnguoidung: idnguoidung2,
    thoigiantao: '2011-04-11T10:20:30.000Z',
    tenhangmuc: 'Bán oto',
    loaihangmuc: { chitieu: true, thunhap: false },
    iconhangmuc: '123456###',
    color:'#123456'
  }]
test('testing update HangMucGiaoDich', async () => {
    // console.log(BSON.deserialize(BSON.serialize(updateHangMucGiaoDich(hangmucgiaodichtestupdate))))
    // console.log(hangmucgiaodichtestupdate)
     expect(JSON.parse(JSON.stringify(await updateHangMucGiaoDich(hangmucgiaodichtestupdate2)))).toStrictEqual(JSON.parse(JSON.stringify(hangmucgiaodichtestupdate2KT)))
    // expect(EJSON.parse(EJSON.stringify(await updateHangMucGiaoDich(hangmucgiaodichtestupdate)))).toStrictEqual(hangmucgiaodichtestupdate)
})
test('testing querry HangMucGiaoDich', async () => {
    //console.log(JSON.parse(JSON.stringify(await queryHangMucGiaoDich(thoigiantao=date,tenhangmuc='Sắm tết',loaihangmuc='ChiTieu',id=new BSON.ObjectID('609e4dcdec7920f2c5a218a3')))))
    expect(JSON.parse(JSON.stringify(await queryHangMucGiaoDich({idhangmucgiaodich: idhangmuc2,thoigiantao:date2,tenhangmuc:'Bán oto',loaihangmuc:'ChiTieu',id:idnguoidung2,iconhangmuc: '123456###'})))).toStrictEqual(JSON.parse(JSON.stringify(hangmuctestquery2)))
})
test('testing delete HangMucGiaoDich', async () => {
    expect(await deleteHangMucGiaoDich(hangmucgiaodichtestupdate2)).toStrictEqual('ThanhCong')
})
///////////////////////////////////////////////test3//////////////////////////////////////////////////////////////////////////////////
let idhangmuc3=new BSON.ObjectID()
let idnguoidung3=new BSON.ObjectID()
let date3= new Date('2011-04-11T10:20:30.000Z')
hangmucgiaodichtest3= {
    idhangmucgiaodich: idhangmuc3,
    idnguoidung:idnguoidung3,
    thoigiantao: date3,
    tenhangmuc: 'Crypto',
    iconhangmuc: '*****',
    loaihangmuc: {
        chitieu:false,
        thunhap:true,  
    },
    color:'#123456'
}
hangmucgiaodich3= {
    idhangmucgiaodich: idhangmuc3,
    idnguoidung:idnguoidung3,
    thoigiantao: date3,
    tenhangmuc: 'Crypto',
    iconhangmuc: '*****',
    color:'#123456'
}
test('testing insert HangMucGiaoDich', async () => {
    // console.log(await insertHangMucGiaoDich(hangmucgiaodich,'chitieu'))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await insertHangMucGiaoDich(hangmucgiaodich3,'thunhap')))).toStrictEqual(JSON.parse(JSON.stringify(hangmucgiaodichtest3)))
})
hangmucgiaodichtestupdate3= {
    idhangmucgiaodich: idhangmuc3,
    loaihangmuc: {
        chitieu:true,
        thunhap:false,  
    },
    color:'#123456'
}
hangmucgiaodichtestupdate3KT= {
    idhangmucgiaodich: idhangmuc3,
    idnguoidung:idnguoidung3,
    thoigiantao: date3,
    tenhangmuc: 'Crypto',
    iconhangmuc: '*****',
    loaihangmuc: {
        chitieu:true,
        thunhap:false,  
    },
    color:'#123456'
}
hangmuctestquery3=[{
    idhangmucgiaodich: idhangmuc3,
    idnguoidung: idnguoidung3,
    thoigiantao: date3,
    tenhangmuc: 'Crypto',
    loaihangmuc: { chitieu: true, thunhap: false },
    iconhangmuc: '*****',
    color:'#123456'
  }]
test('testing update HangMucGiaoDich', async () => {
    // console.log(BSON.deserialize(BSON.serialize(updateHangMucGiaoDich(hangmucgiaodichtestupdate))))
    // console.log(hangmucgiaodichtestupdate)
     expect(JSON.parse(JSON.stringify(await updateHangMucGiaoDich(hangmucgiaodichtestupdate3)))).toStrictEqual(JSON.parse(JSON.stringify(hangmucgiaodichtestupdate3KT)))
    // expect(EJSON.parse(EJSON.stringify(await updateHangMucGiaoDich(hangmucgiaodichtestupdate)))).toStrictEqual(hangmucgiaodichtestupdate)
})
test('testing querry HangMucGiaoDich', async () => {
    //console.log(JSON.parse(JSON.stringify(await queryHangMucGiaoDich(thoigiantao=date,tenhangmuc='Sắm tết',loaihangmuc='ChiTieu',id=new BSON.ObjectID('609e4dcdec7920f2c5a218a3')))))
    expect(JSON.parse(JSON.stringify(await queryHangMucGiaoDich({idhangmucgiaodich: idhangmuc3})))).toStrictEqual(JSON.parse(JSON.stringify(hangmuctestquery3)))
})
test('testing delete HangMucGiaoDich', async () => {
    expect(await deleteHangMucGiaoDich(hangmucgiaodichtestupdate3)).toStrictEqual('ThanhCong')
})