import {insertGiaoDichChuKy,updateGiaoDichChuKy,deleteGiaoDichChuKy,queryGiaoDichChuKy} from '../App/services/GiaoDichChuKyCRUD';
import {BSON} from 'realm'

let idgiaodichtheochuky=new BSON.ObjectID()
let idnguoidung=new BSON.ObjectID()
let idtaikhoan=new BSON.ObjectID()
let loaihangmuc=new BSON.ObjectID()
let thoigian= new Date('2011-04-11T10:20:30.000Z')
let thoigiancuoicungcheck= new Date('2011-04-11T10:20:30.000Z')

let GiaoDichTheoChuKy={
    idgiaodichtheochuky:idgiaodichtheochuky,
    idnguoidung:idnguoidung,
    thoigian:thoigian,
    idtaikhoan:idtaikhoan,
    sotientieudung:null,
    sotienthunhap:5000,
    loaihangmucgd:loaihangmuc,
    name:'okay',
    chukygiaodichtheongay:60,
    chukygiaodichtheothang:null,
    ghichu:'Tiền chơi coin',
    thoigianbatdau: thoigiancuoicungcheck,
    color:null,
    pause:false,
    thoigiancuoicungcheck:thoigiancuoicungcheck
}

test('testing insert GiaoDichTheoChuKy', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertGiaoDichChuKy(GiaoDichTheoChuKy))))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await insertGiaoDichChuKy(GiaoDichTheoChuKy)))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichTheoChuKy)))
})
let GiaoDichTheoChuKytestupdate={
    idgiaodichtheochuky:idgiaodichtheochuky,
    idnguoidung:idnguoidung,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoan:idtaikhoan,
    sotientieudung:null,
    sotienthunhap:15000,
    loaihangmucgd:loaihangmuc,
    name:'okay',
    chukygiaodichtheongay:120,
    chukygiaodichtheothang:null,
    ghichu:'Tiền chơi đá',
    thoigianbatdau: thoigiancuoicungcheck,
    color:null,
    pause:false,
    thoigiancuoicungcheck:thoigiancuoicungcheck
}
let GiaoDichTheoChuKytestquery=[{
    idgiaodichtheochuky:idgiaodichtheochuky,
    idnguoidung:idnguoidung,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoan:idtaikhoan,
    sotientieudung:null,
    sotienthunhap:15000,
    loaihangmucgd:loaihangmuc,
    name:'okay',
    chukygiaodichtheongay:120,
    chukygiaodichtheothang:null,
    ghichu:'Tiền chơi đá',
    thoigianbatdau: thoigiancuoicungcheck,
    color:null,
    pause:false,
    thoigiancuoicungcheck:thoigiancuoicungcheck
}]
test('testing update GiaoDichTheoChuKy', async () => {
    // console.log(await insertGiaoDichChuKy(GiaoDichTheoChuKy))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await updateGiaoDichChuKy(GiaoDichTheoChuKytestupdate)))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichTheoChuKytestupdate)))
})
test('testing querry GiaoDichTheoChuKy', async () => {
    //console.log(JSON.parse(JSON.stringify(await queryHangMucGiaoDich(thoigiantao=date,tenhangmuc='Sắm tết',loaihangmuc='ChiTieu',id=new BSON.ObjectID('609e4dcdec7920f2c5a218a3')))))
    expect(JSON.parse(JSON.stringify(await queryGiaoDichChuKy({
        idgiaodichtheochuky:idgiaodichtheochuky,
        idnguoidung:idnguoidung,
        thoigian:new Date('2011-06-11T10:20:30.000Z'),
        idtaikhoan:idtaikhoan,
        sotientieudung:null,
        sotienthunhap:15000,
        loaihangmucgd:loaihangmuc,
        name:'okay',
        chukygiaodichtheongay:120,
        chukygiaodichtheothang:null,
        ghichu:'Tiền chơi đá',
        thoigianbatdau: thoigiancuoicungcheck,
        thoigiancuoicungcheck:thoigiancuoicungcheck
    })))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichTheoChuKytestquery)))
})
test('testing delete GiaoDichTheoChuKy', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
    // console.log(caidattest)
    expect(JSON.parse(JSON.stringify(await deleteGiaoDichChuKy(GiaoDichTheoChuKytestupdate)))).toStrictEqual('ThanhCong')
})
//////////////////////////////////////test2/////////////////////////////////////////////////////////////////////
let idgiaodichtheochuky2=new BSON.ObjectID()
let idnguoidung2=new BSON.ObjectID()
let idtaikhoan2=new BSON.ObjectID()
let loaihangmuc2=new BSON.ObjectID()
let thoigian2= new Date('2011-04-11T10:20:30.000Z')
let thoigiancuoicungcheck2= new Date('2011-04-11T10:20:30.000Z')

let GiaoDichTheoChuKy2={
    idgiaodichtheochuky:idgiaodichtheochuky2,
    idnguoidung:idnguoidung2,
    thoigian:thoigian2,
    idtaikhoan:idtaikhoan2,
    sotienthunhap:5000,
    loaihangmucgd:loaihangmuc2,
    chukygiaodichtheongay:60,
    ghichu:'Tiền chơi coin',
    thoigiancuoicungcheck:thoigiancuoicungcheck2,
    color:null,
    pause:false,
    thoigianbatdau:thoigiancuoicungcheck2
}
let GiaoDichTheoChuKy2KT={
    idgiaodichtheochuky:idgiaodichtheochuky2,
    idnguoidung:idnguoidung2,
    thoigian:thoigian2,
    idtaikhoan:idtaikhoan2,
    sotientieudung:null,
    sotienthunhap:5000,
    loaihangmucgd:loaihangmuc2,
    chukygiaodichtheongay:60,
    chukygiaodichtheothang:null,
    ghichu:'Tiền chơi coin',
    name:null,
    thoigianbatdau:thoigiancuoicungcheck2,
    color:null,
    pause:false,
    thoigiancuoicungcheck:thoigiancuoicungcheck2
}

test('testing insert GiaoDichTheoChuKy', async () => {
    // console.log(await insertGiaoDichChuKy(GiaoDichTheoChuKy))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await insertGiaoDichChuKy(GiaoDichTheoChuKy2)))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichTheoChuKy2KT)))
})
let GiaoDichTheoChuKytestupdate2={
    idgiaodichtheochuky:idgiaodichtheochuky2,
    idnguoidung:idnguoidung2,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoan:idtaikhoan2,
    sotienthunhap:15000,
    loaihangmucgd:loaihangmuc2,
    chukygiaodichtheongay:120,
    ghichu:'Tiền chơi đá',
    thoigiancuoicungcheck:thoigiancuoicungcheck2,
    color:null,
    pause:false,
    thoigianbatdau:thoigiancuoicungcheck2,
}
let GiaoDichTheoChuKytestupdate2KT={
    idgiaodichtheochuky:idgiaodichtheochuky2,
    idnguoidung:idnguoidung2,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoan:idtaikhoan2,
    sotientieudung:null,
    sotienthunhap:15000,
    loaihangmucgd:loaihangmuc2,
    chukygiaodichtheongay:120,
    chukygiaodichtheothang:null,
    ghichu:'Tiền chơi đá',
    name:null,
    thoigianbatdau:thoigiancuoicungcheck2,
    color:null,
    pause:false,
    thoigiancuoicungcheck:thoigiancuoicungcheck2
}
let GiaoDichTheoChuKytestquery2=[{
    idgiaodichtheochuky:idgiaodichtheochuky2,
    idnguoidung:idnguoidung2,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoan:idtaikhoan2,
    sotientieudung:null,
    sotienthunhap:15000,
    loaihangmucgd:loaihangmuc2,
    chukygiaodichtheongay:120,
    chukygiaodichtheothang:null,
    ghichu:'Tiền chơi đá',
    name:null,
    thoigianbatdau:thoigiancuoicungcheck2,
    color:null,
    pause:false,
    thoigiancuoicungcheck:thoigiancuoicungcheck2
}]
test('testing update GiaoDichTheoChuKy', async () => {
    // console.log(await insertGiaoDichChuKy(GiaoDichTheoChuKy))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await updateGiaoDichChuKy(GiaoDichTheoChuKytestupdate2)))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichTheoChuKytestupdate2KT)))
})
test('testing querry GiaoDichTheoChuKy', async () => {
    //console.log(JSON.parse(JSON.stringify(await queryHangMucGiaoDich(thoigiantao=date,tenhangmuc='Sắm tết',loaihangmuc='ChiTieu',id=new BSON.ObjectID('609e4dcdec7920f2c5a218a3')))))
    expect(JSON.parse(JSON.stringify(await queryGiaoDichChuKy({
        thoigian:new Date('2011-06-11T10:20:30.000Z'),
        idtaikhoan:idtaikhoan2,
        sotienthunhap:15000,
        loaihangmucgd:loaihangmuc2,
    })))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichTheoChuKytestquery2)))
})
test('testing delete GiaoDichTheoChuKy', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
    // console.log(caidattest)
    expect(JSON.parse(JSON.stringify(await deleteGiaoDichChuKy(GiaoDichTheoChuKytestupdate2)))).toStrictEqual('ThanhCong')
})
////////////////////////////////////////test3//////////////////////////////////////////////////////////////////////
let idgiaodichtheochuky3=new BSON.ObjectID()
let idnguoidung3=new BSON.ObjectID()
let loaihangmuc3=new BSON.ObjectID()
let thoigian3= new Date('2011-04-11T10:20:30.000Z')
let thoigiancuoicungcheck3= new Date('2011-04-11T10:20:30.000Z')

let GiaoDichTheoChuKy3={
    idgiaodichtheochuky:idgiaodichtheochuky3,
    idnguoidung:idnguoidung3,
    thoigian:thoigian3,
    loaihangmucgd:loaihangmuc3,
    chukygiaodichtheongay:60,
    ghichu:'Tiền chơi coin',
    thoigiancuoicungcheck:thoigiancuoicungcheck3,
    color:null,
    pause:false,
    thoigianbatdau:thoigiancuoicungcheck3,
}
let GiaoDichTheoChuKy3KT={
    idgiaodichtheochuky:idgiaodichtheochuky3,
    idnguoidung:idnguoidung3,
    thoigian:thoigian3,
    idtaikhoan:null,
    sotientieudung:null,
    sotienthunhap:null,
    loaihangmucgd:loaihangmuc3,
    chukygiaodichtheongay:60,
    chukygiaodichtheothang:null,
    ghichu:'Tiền chơi coin',
    thoigiancuoicungcheck:thoigiancuoicungcheck3,
    name:null,
    color:null,
    pause:false,
    thoigianbatdau:thoigiancuoicungcheck3,
}

test('testing insert GiaoDichTheoChuKy', async () => {
    // console.log(await insertGiaoDichChuKy(GiaoDichTheoChuKy))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await insertGiaoDichChuKy(GiaoDichTheoChuKy3)))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichTheoChuKy3KT)))
})
let GiaoDichTheoChuKytestupdate3={
    idgiaodichtheochuky:idgiaodichtheochuky3,
    idnguoidung:idnguoidung3,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    loaihangmucgd:loaihangmuc3,
    chukygiaodichtheongay:120,
    ghichu:'Tiền chơi đá',
    thoigiancuoicungcheck:thoigiancuoicungcheck3,
    color:null,
    pause:false,
    thoigianbatdau:thoigiancuoicungcheck3,
}
let GiaoDichTheoChuKytestupdate3KT={
    idgiaodichtheochuky:idgiaodichtheochuky3,
    idnguoidung:idnguoidung3,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoan:null,
    sotientieudung:null,
    sotienthunhap:null,
    loaihangmucgd:loaihangmuc3,
    chukygiaodichtheongay:120,
    chukygiaodichtheothang:null,
    ghichu:'Tiền chơi đá',
    name:null,
    thoigianbatdau:thoigiancuoicungcheck3,
    color:null,
    pause:false,
    thoigiancuoicungcheck:thoigiancuoicungcheck3
}
let GiaoDichTheoChuKytestquery3=[{
    idgiaodichtheochuky:idgiaodichtheochuky3,
    idnguoidung:idnguoidung3,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoan:null,
    sotientieudung:null,
    sotienthunhap:null,
    loaihangmucgd:loaihangmuc3,
    chukygiaodichtheongay:120,
    chukygiaodichtheothang:null,
    ghichu:'Tiền chơi đá',
    name:null,
    thoigianbatdau:thoigiancuoicungcheck3,
    color:null,
    pause:false,
    thoigiancuoicungcheck:thoigiancuoicungcheck3
}]
test('testing update GiaoDichTheoChuKy', async () => {
    // console.log(await insertGiaoDichChuKy(GiaoDichTheoChuKy))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await updateGiaoDichChuKy(GiaoDichTheoChuKytestupdate3)))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichTheoChuKytestupdate3KT)))
})
test('testing querry GiaoDichTheoChuKy', async () => {
    //console.log(JSON.parse(JSON.stringify(await queryHangMucGiaoDich(thoigiantao=date,tenhangmuc='Sắm tết',loaihangmuc='ChiTieu',id=new BSON.ObjectID('609e4dcdec7920f2c5a218a3')))))
    expect(JSON.parse(JSON.stringify(await queryGiaoDichChuKy({
        thoigian:new Date('2011-06-11T10:20:30.000Z'),
        loaihangmucgd:loaihangmuc3,
    })))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichTheoChuKytestquery3)))
})
test('testing delete GiaoDichTheoChuKy', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
    // console.log(caidattest)
    expect(JSON.parse(JSON.stringify(await deleteGiaoDichChuKy(GiaoDichTheoChuKytestupdate3)))).toStrictEqual('ThanhCong')
})