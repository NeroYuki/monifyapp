import {insertGiaoDich,updateGiaoDich,deleteGiaoDich,queryGiaoDich} from '../App/services/GiaoDichCRUD';
import {BSON} from 'realm'

let idgiaodich=new BSON.ObjectID()
let idnguoidung=new BSON.ObjectID()
let idtaikhoanchuyen=new BSON.ObjectID()
let idtaikhoannhan=new BSON.ObjectID()
let loaihangmuc=new BSON.ObjectID()
let thoigian= new Date('2011-04-11T10:20:30.000Z')

let GiaoDich={
    idgiaodich:idgiaodich,
    idnguoidung:idnguoidung,
    thoigian:thoigian,
    idtaikhoanchuyen:idtaikhoanchuyen,
    idtaikhoannhan:idtaikhoannhan,
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
    idtaikhoanchuyen:idtaikhoanchuyen,
    idtaikhoannhan:idtaikhoannhan,
    sotientieudung:6000,
    sotienthunhap:null,
    loaihangmucgd:loaihangmuc,
    ghichu:'Tiền chơi đá',
}
let GiaoDichtestquery=[{
    idgiaodich:idgiaodich,
    idnguoidung:idnguoidung,
    thoigian:new Date('2011-06-11T10:20:30.000Z'),
    idtaikhoanchuyen:idtaikhoanchuyen,
    idtaikhoannhan:idtaikhoannhan,
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
        idtaikhoanchuyen:idtaikhoanchuyen,
        idtaikhoannhan:idtaikhoannhan,
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
