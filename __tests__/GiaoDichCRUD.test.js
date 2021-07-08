import {insertGiaoDich,updateGiaoDich,deleteGiaoDich,queryGiaoDich} from '../App/services/GiaoDichCRUD';
import {BSON} from 'realm'

let idgiaodich=new BSON.ObjectID()
let idnguoidung=new BSON.ObjectID()
let idtaikhoan=new BSON.ObjectID()
let loaihangmuc=new BSON.ObjectID()
let thoigian= new Date('2011-04-11T10:20:30.000Z')

let GiaoDich={
    idgiaodich:idgiaodich,
    idnguoidung:idnguoidung,
    thoigian:thoigian,
    idtaikhoan:idtaikhoan,
    sotientieudung:2000,
    sotienthunhap:null,
    loaihangmucgd:loaihangmuc,
    ghichu:'Tiền chơi coin',
}

test('testing insert GiaoDich', async () => {
    // console.log(await insertGiaoDichChuKy(GiaoDichTheoChuKy))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await insertGiaoDich(GiaoDich)))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDich)))
})
let GiaoDichtestupdate={
    idgiaodich:idgiaodich,
    idnguoidung:idnguoidung,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoan:idtaikhoan,
    sotientieudung:6000,
    sotienthunhap:null,
    loaihangmucgd:loaihangmuc,
    ghichu:'Tiền chơi đá',
}
let GiaoDichtestquery=[{
    idgiaodich:idgiaodich,
    idnguoidung:idnguoidung,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoan:idtaikhoan,
    sotientieudung:6000,
    sotienthunhap:null,
    loaihangmucgd:loaihangmuc,
    ghichu:'Tiền chơi đá',
}]
test('testing update GiaoDich', async () => {
    // console.log(await insertGiaoDichChuKy(GiaoDichTheoChuKy))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await updateGiaoDich(GiaoDichtestupdate)))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichtestupdate)))
})
test('testing querry GiaoDich', async () => {
    //console.log(JSON.parse(JSON.stringify(await queryHangMucGiaoDich(thoigiantao=date,tenhangmuc='Sắm tết',loaihangmuc='ChiTieu',id=new BSON.ObjectID('609e4dcdec7920f2c5a218a3')))))
    expect(JSON.parse(JSON.stringify(await queryGiaoDich({
        idgiaodich:idgiaodich,
        idnguoidung:idnguoidung,
        thoigian:new Date('2011-06-11T10:20:30.000Z'),
        idtaikhoan:idtaikhoan,
        sotientieudung:6000,
        sotienthunhap:null,
        loaihangmucgd:loaihangmuc,
        ghichu:'Tiền chơi đá',
    })))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichtestquery)))
})
test('testing delete GiaoDich', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
    // console.log(caidattest)
    expect(JSON.parse(JSON.stringify(await deleteGiaoDich(GiaoDichtestupdate)))).toStrictEqual('ThanhCong')
})
////////////////////////////////////////////////test2///////////////////////////////////////////////////
let idgiaodich2=new BSON.ObjectID()
let idnguoidung2=new BSON.ObjectID()
let idtaikhoan2=new BSON.ObjectID()
let loaihangmuc2=new BSON.ObjectID()
let thoigian2= new Date('2011-04-11T10:20:30.000Z')

let GiaoDich2={
    idgiaodich:idgiaodich2,
    idnguoidung:idnguoidung2,
    thoigian:thoigian2,
    idtaikhoan:idtaikhoan2,
    sotientieudung:2000,
    loaihangmucgd:loaihangmuc2,
    ghichu:'Tiền chơi coin',
}
let GiaoDich2KT={
    idgiaodich:idgiaodich2,
    idnguoidung:idnguoidung2,
    thoigian:thoigian2,
    idtaikhoan:idtaikhoan2,
    sotientieudung:2000,
    sotienthunhap:null,
    loaihangmucgd:loaihangmuc2,
    ghichu:'Tiền chơi coin',
}

test('testing insert GiaoDich', async () => {
    // console.log(await insertGiaoDichChuKy(GiaoDichTheoChuKy))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await insertGiaoDich(GiaoDich2)))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDich2KT)))
})
let GiaoDichtestupdate2={
    idgiaodich:idgiaodich2,
    idnguoidung:idnguoidung2,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoan:idtaikhoan2,
    sotientieudung:6000,
    loaihangmucgd:loaihangmuc2,
    ghichu:'Tiền chơi đá',
}
let GiaoDichtestupdate2KT={
    idgiaodich:idgiaodich2,
    idnguoidung:idnguoidung2,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoan:idtaikhoan2,
    sotientieudung:6000,
    sotienthunhap:null,
    loaihangmucgd:loaihangmuc2,
    ghichu:'Tiền chơi đá',
}
let GiaoDichtestquery2=[{
    idgiaodich:idgiaodich2,
    idnguoidung:idnguoidung2,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoan:idtaikhoan2,
    sotientieudung:6000,
    sotienthunhap:null,
    loaihangmucgd:loaihangmuc2,
    ghichu:'Tiền chơi đá',
}]
test('testing update GiaoDich', async () => {
    // console.log(await insertGiaoDichChuKy(GiaoDichTheoChuKy))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await updateGiaoDich(GiaoDichtestupdate2)))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichtestupdate2KT)))
})
test('testing querry GiaoDich', async () => {
    //console.log(JSON.parse(JSON.stringify(await queryHangMucGiaoDich(thoigiantao=date,tenhangmuc='Sắm tết',loaihangmuc='ChiTieu',id=new BSON.ObjectID('609e4dcdec7920f2c5a218a3')))))
    expect(JSON.parse(JSON.stringify(await queryGiaoDich({
        idgiaodich:idgiaodich2,
        thoigian:new Date('2011-06-11T10:20:30.000Z'),
        sotientieudung:6000,
        loaihangmucgd:loaihangmuc2,
        ghichu:'Tiền chơi đá',
    })))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichtestquery2)))
})
test('testing delete GiaoDich', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
    // console.log(caidattest)
    expect(JSON.parse(JSON.stringify(await deleteGiaoDich(GiaoDichtestupdate2)))).toStrictEqual('ThanhCong')
})
////////////////////////////////////////////////////test3////////////////////////////////////////////////////////////////
let idgiaodich3=new BSON.ObjectID()
let idnguoidung3=new BSON.ObjectID()
let idtaikhoan3=new BSON.ObjectID()
let loaihangmuc3=new BSON.ObjectID()
let thoigian3= new Date('2011-04-11T10:20:30.000Z')

let GiaoDich3={
    idgiaodich:idgiaodich3,
    idnguoidung:idnguoidung3,
    thoigian:thoigian3,
    idtaikhoan:idtaikhoan3,
    sotientieudung:2000,
    loaihangmucgd:loaihangmuc3,
    ghichu:'Tiền chơi coin',
}
let GiaoDich3KT={
    idgiaodich:idgiaodich3,
    idnguoidung:idnguoidung3,
    thoigian:thoigian3,
    idtaikhoan:idtaikhoan3,
    sotientieudung:2000,
    sotienthunhap:null,
    loaihangmucgd:loaihangmuc3,
    ghichu:'Tiền chơi coin',
}

test('testing insert GiaoDich', async () => {
    // console.log(await insertGiaoDichChuKy(GiaoDichTheoChuKy))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await insertGiaoDich(GiaoDich3)))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDich3KT)))
})
let GiaoDichtestupdate3={
    idgiaodich:idgiaodich3,
    idnguoidung:idnguoidung3,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoan:idtaikhoan3,
    sotientieudung:6000,
    loaihangmucgd:loaihangmuc3,
    ghichu:'Tiền chơi đá',
}
let GiaoDichtestupdate3KT={
    idgiaodich:idgiaodich3,
    idnguoidung:idnguoidung3,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoan:idtaikhoan3,
    sotientieudung:6000,
    sotienthunhap:null,
    loaihangmucgd:loaihangmuc3,
    ghichu:'Tiền chơi đá',
}
let GiaoDichtestquery3=[{
    idgiaodich:idgiaodich3,
    idnguoidung:idnguoidung3,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoan:idtaikhoan3,
    sotientieudung:6000,
    sotienthunhap:null,
    loaihangmucgd:loaihangmuc3,
    ghichu:'Tiền chơi đá',
}]
test('testing update GiaoDich', async () => {
    // console.log(await insertGiaoDichChuKy(GiaoDichTheoChuKy))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await updateGiaoDich(GiaoDichtestupdate3)))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichtestupdate3KT)))
})
test('testing querry GiaoDich', async () => {
    //console.log(JSON.parse(JSON.stringify(await queryHangMucGiaoDich(thoigiantao=date,tenhangmuc='Sắm tết',loaihangmuc='ChiTieu',id=new BSON.ObjectID('609e4dcdec7920f2c5a218a3')))))
    expect(JSON.parse(JSON.stringify(await queryGiaoDich({
        idgiaodich:idgiaodich3,
    })))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichtestquery3)))
})
test('testing delete GiaoDich', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
    // console.log(caidattest)
    expect(JSON.parse(JSON.stringify(await deleteGiaoDich(GiaoDichtestupdate3)))).toStrictEqual('ThanhCong')
})