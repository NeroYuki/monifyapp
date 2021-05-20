import {insertMucTieuCaNhan,updateMucTieuCaNhan,deleteMucTieuCaNhan,queryMucTieuCaNhan} from '../App/services/MucTieuCaNhanCRUD';
import {BSON} from 'realm'

let idmuctieu=new BSON.ObjectID()
let idnguoidung=new BSON.ObjectID()
let datestart= new Date('2011-04-11T10:20:30.000Z')
let dateend= new Date('2011-05-11T10:20:30.000Z')

let muctieucanhantest={
    idmuctieu: idmuctieu,
    idnguoidung:{
        idnguoidung:idnguoidung,
        pass:"123456***",
    },
    thoigiantao: datestart,
    sotienmuctieu: 200000,
    ngaybatdau: datestart,
    ngayketthuc: dateend,
}
let muctieucanhan={
    idmuctieu: idmuctieu,
    idnguoidung:{
        idnguoidung:idnguoidung,
        pass:"123456***",
    },
    thoigiantao: datestart,
    loaimuctieu:{
        tietkiemdenmuc: true,
        tieudungquamuc: false,
        sodutoithieu: false,
    },
    sotienmuctieu: 200000,
    ngaybatdau: datestart,
    ngayketthuc: dateend,
}
test('testing insert MucTieuCaNhan', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
    // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
   expect(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc')))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhan)))
})
let muctieucanhantestupdate={
    idmuctieu: idmuctieu,
    idnguoidung:{
        idnguoidung:idnguoidung,
        pass:"123456***",
    },
    thoigiantao: datestart,
    loaimuctieu:{
        tietkiemdenmuc: false,
        tieudungquamuc: true,
        sodutoithieu: false,
    },
    sotienmuctieu: 500000,
    ngaybatdau: datestart,
    ngayketthuc: datestart,
}
let muctieucanhantestquery=[{
    idmuctieu: idmuctieu,
    idnguoidung:{
        idnguoidung:idnguoidung,
        pass:"123456***",
    },
    thoigiantao: datestart,
    loaimuctieu:{
        tietkiemdenmuc: false,
        tieudungquamuc: true,
        sodutoithieu: false,
    },
    sotienmuctieu: 500000,
    ngaybatdau: datestart,
    ngayketthuc: datestart,
}]
test('testing update MucTieuCaNhan', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
    // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
   expect(JSON.parse(JSON.stringify(await updateMucTieuCaNhan(muctieucanhantestupdate)))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhantestupdate)))
})
test('testing query MucTieuCaNhan', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
    // console.log(JSON.parse(JSON.stringify(await queryMucTieuCaNhan({ngaybatdau:datestart,ngayketthuc:datestart,loaimuctieu:'TieuDungQuaMuc',thoigiantao:datestart,id:idnguoidung,sotienmuctieu:500000}))))
   expect(JSON.parse(JSON.stringify(await queryMucTieuCaNhan({ngaybatdau:datestart,ngayketthuc:datestart,loaimuctieu:'TieuDungQuaMuc',thoigiantao:datestart,id:idnguoidung,sotienmuctieu:500000})))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhantestquery)))
})
test('testing delete MucTieuCaNhan', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
    // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
   expect(JSON.parse(JSON.stringify(await deleteMucTieuCaNhan(muctieucanhantestupdate)))).toStrictEqual('ThanhCong')
})

