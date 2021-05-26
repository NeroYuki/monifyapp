import {insertGiaoDichChuKy,updateGiaoDichChuKy,deleteGiaoDichChuKy,queryGiaoDichChuKy} from '../App/services/GiaoDichChuKyCRUD';
import {BSON} from 'realm'

let idgiaodichtheochuky=new BSON.ObjectID()
let idnguoidung=new BSON.ObjectID()
let idtaikhoanchuyen=new BSON.ObjectID()
let idtaikhoannhan=new BSON.ObjectID()
let loaihangmuc=new BSON.ObjectID()
let thoigian= new Date('2011-04-11T10:20:30.000Z')

let GiaoDichTheoChuKy={
    idgiaodichtheochuky:idgiaodichtheochuky,
    idnguoidung:idnguoidung,
    thoigian:thoigian,
    idtaikhoanchuyen:idtaikhoanchuyen,
    idtaikhoannhan:idtaikhoannhan,
    sotientieudung:null,
    sotienthunhap:5000,
    loaihangmucgd:loaihangmuc,
    name:'okay',
    chukygiaodichtheongay:60,
    chukygiaodichtheothang:null,
    ghichu:'Tiền chơi coin',
    thoigianbatdau: null,
}

test('testing insert GiaoDichTheoChuKy', async () => {
    // console.log(await insertGiaoDichChuKy(GiaoDichTheoChuKy))
    // console.log(hangmucgiaodichtest)
   expect(JSON.parse(JSON.stringify(await insertGiaoDichChuKy(GiaoDichTheoChuKy)))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichTheoChuKy)))
})
let GiaoDichTheoChuKytestupdate={
    idgiaodichtheochuky:idgiaodichtheochuky,
    idnguoidung:idnguoidung,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoanchuyen:idtaikhoanchuyen,
    idtaikhoannhan:idtaikhoannhan,
    sotientieudung:null,
    sotienthunhap:15000,
    loaihangmucgd:loaihangmuc,
    name:'okay',
    chukygiaodichtheongay:120,
    chukygiaodichtheothang:null,
    ghichu:'Tiền chơi đá',
    thoigianbatdau: null,
}
let GiaoDichTheoChuKytestquery=[{
    idgiaodichtheochuky:idgiaodichtheochuky,
    idnguoidung:idnguoidung,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoanchuyen:idtaikhoanchuyen,
    idtaikhoannhan:idtaikhoannhan,
    sotientieudung:null,
    sotienthunhap:15000,
    loaihangmucgd:loaihangmuc,
    name:'okay',
    chukygiaodichtheongay:120,
    chukygiaodichtheothang:null,
    ghichu:'Tiền chơi đá',
    thoigianbatdau: null,
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
        idtaikhoanchuyen:idtaikhoanchuyen,
        idtaikhoannhan:idtaikhoannhan,
        sotientieudung:null,
        sotienthunhap:15000,
        loaihangmucgd:loaihangmuc,
        name:'okay',
        chukygiaodichtheongay:120,
        chukygiaodichtheothang:null,
        ghichu:'Tiền chơi đá',
        thoigianbatdau: null,
    })))).toStrictEqual(JSON.parse(JSON.stringify(GiaoDichTheoChuKytestquery)))
})
test('testing delete GiaoDichTheoChuKy', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
    // console.log(caidattest)
    expect(JSON.parse(JSON.stringify(await deleteGiaoDichChuKy(GiaoDichTheoChuKytestupdate)))).toStrictEqual('ThanhCong')
})
