import {insertMucTieuCaNhan,updateMucTieuCaNhan,deleteMucTieuCaNhan,queryMucTieuCaNhan} from '../App/services/MucTieuCaNhanCRUD';
import {BSON} from 'realm'

let idmuctieu=new BSON.ObjectID()
let idnguoidung=new BSON.ObjectID()
let datestart= new Date('2011-04-11T10:20:30.000Z')
let dateend= new Date('2011-05-11T10:20:30.000Z')

let muctieucanhantest={
    idmuctieu: idmuctieu,
    idnguoidung:idnguoidung,
    thoigiantao: datestart,
    sotienmuctieu: 200000,
    ngaybatdau: datestart,
    ngayketthuc: dateend,
}
let muctieucanhan={
    idmuctieu: idmuctieu,
    idnguoidung:idnguoidung,
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
    idnguoidung:idnguoidung,
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
    idnguoidung:idnguoidung,
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
   expect(JSON.parse(JSON.stringify(await queryMucTieuCaNhan({idmuctieu: idmuctieu,ngaybatdau:datestart,ngayketthuc:datestart,loaimuctieu:'TieuDungQuaMuc',thoigiantao:datestart,id:idnguoidung,sotienmuctieu:500000})))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhantestquery)))
})
test('testing delete MucTieuCaNhan', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
    // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
   expect(JSON.parse(JSON.stringify(await deleteMucTieuCaNhan(muctieucanhantestupdate)))).toStrictEqual('ThanhCong')
})
//////////////////////////////////test2///////////////////////////////////
let idmuctieu2=new BSON.ObjectID()
let idnguoidung2=new BSON.ObjectID()
let datestart2= new Date('2011-04-11T10:20:30.000Z')
let dateend2= new Date('2011-05-11T10:20:30.000Z')

let muctieucanhantest2={
    idmuctieu: idmuctieu2,
    idnguoidung:idnguoidung2,
    thoigiantao: datestart2,
    sotienmuctieu: 200000,
    ngaybatdau: datestart2,
    ngayketthuc: dateend2,
}
let muctieucanhan2={
    idmuctieu: idmuctieu2,
    idnguoidung:idnguoidung2,
    thoigiantao: datestart2,
    loaimuctieu:{
        tietkiemdenmuc: true,
        tieudungquamuc: false,
        sodutoithieu: false,
    },
    sotienmuctieu: 200000,
    ngaybatdau: datestart2,
    ngayketthuc: dateend2,
}
test('testing insert MucTieuCaNhan', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
    // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
   expect(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest2,'TietKiemDenMuc')))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhan2)))
})
let muctieucanhantestupdate2={
    idmuctieu: idmuctieu2,
    loaimuctieu:{
        tietkiemdenmuc: false,
        tieudungquamuc: false,
        sodutoithieu: true,
    },
    sotienmuctieu: 600000,
    ngaybatdau: datestart2,
    ngayketthuc: datestart2,
}
let muctieucanhantestupdate2KT={
    idmuctieu: idmuctieu2,
    idnguoidung:idnguoidung2,
    thoigiantao: datestart2,
    loaimuctieu:{
        tietkiemdenmuc: false,
        tieudungquamuc: false,
        sodutoithieu: true,
    },
    sotienmuctieu: 600000,
    ngaybatdau: datestart2,
    ngayketthuc: datestart2,
}
let muctieucanhantestquery2=[{
    idmuctieu: idmuctieu2,
    idnguoidung:idnguoidung2,
    thoigiantao: datestart2,
    loaimuctieu:{
        tietkiemdenmuc: false,
        tieudungquamuc: false,
        sodutoithieu: true,
    },
    sotienmuctieu: 600000,
    ngaybatdau: datestart2,
    ngayketthuc: datestart2,
}]
test('testing update MucTieuCaNhan', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
    // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
   expect(JSON.parse(JSON.stringify(await updateMucTieuCaNhan(muctieucanhantestupdate2)))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhantestupdate2KT)))
})
test('testing query MucTieuCaNhan', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
    // console.log(JSON.parse(JSON.stringify(await queryMucTieuCaNhan({ngaybatdau:datestart,ngayketthuc:datestart,loaimuctieu:'TieuDungQuaMuc',thoigiantao:datestart,id:idnguoidung,sotienmuctieu:500000}))))
   expect(JSON.parse(JSON.stringify(await queryMucTieuCaNhan({idmuctieu: idmuctieu2,ngaybatdau:datestart2,ngayketthuc:datestart2,loaimuctieu:'SoDuToiThieu',thoigiantao:datestart2,id:idnguoidung2,sotienmuctieu:600000})))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhantestquery2)))
})
test('testing delete MucTieuCaNhan', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
    // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
   expect(JSON.parse(JSON.stringify(await deleteMucTieuCaNhan(muctieucanhantestupdate2KT)))).toStrictEqual('ThanhCong')
})
////////////////////////////////////////////test3//////////////////////////////////////
let idmuctieu3=new BSON.ObjectID()
let idnguoidung3=new BSON.ObjectID()
let datestart3= new Date('2011-04-11T10:20:30.000Z')
let dateend3= new Date('2011-05-11T10:20:30.000Z')

let muctieucanhantest3={
    idmuctieu: idmuctieu3,
    idnguoidung:idnguoidung3,
    thoigiantao: datestart3,
    sotienmuctieu: 200000,
    ngaybatdau: datestart3,
    ngayketthuc: dateend3,
}
let muctieucanhan3={
    idmuctieu: idmuctieu3,
    idnguoidung:idnguoidung3,
    thoigiantao: datestart3,
    loaimuctieu:{
        tietkiemdenmuc: true,
        tieudungquamuc: false,
        sodutoithieu: false,
    },
    sotienmuctieu: 200000,
    ngaybatdau: datestart3,
    ngayketthuc: dateend3,
}
test('testing insert MucTieuCaNhan', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
    // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
   expect(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest3,'TietKiemDenMuc')))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhan3)))
})
let muctieucanhantestupdate3={
    idmuctieu: idmuctieu3,
    sotienmuctieu: 1000000,
}
let muctieucanhantestupdate3KT={
    idmuctieu: idmuctieu3,
    idnguoidung:idnguoidung3,
    thoigiantao: datestart3,
    loaimuctieu:{
        tietkiemdenmuc: true,
        tieudungquamuc: false,
        sodutoithieu: false,
    },
    sotienmuctieu: 1000000,
    ngaybatdau: datestart3,
    ngayketthuc: dateend3,
}
let muctieucanhantestquery3=[{
    idmuctieu: idmuctieu3,
    idnguoidung:idnguoidung3,
    thoigiantao: datestart3,
    loaimuctieu:{
        tietkiemdenmuc: true,
        tieudungquamuc: false,
        sodutoithieu: false,
    },
    sotienmuctieu: 1000000,
    ngaybatdau: datestart3,
    ngayketthuc: dateend3,
}]
test('testing update MucTieuCaNhan', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
    // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
   expect(JSON.parse(JSON.stringify(await updateMucTieuCaNhan(muctieucanhantestupdate3)))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhantestupdate3KT)))
})
test('testing query MucTieuCaNhan', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
    // console.log(JSON.parse(JSON.stringify(await queryMucTieuCaNhan({ngaybatdau:datestart,ngayketthuc:datestart,loaimuctieu:'TieuDungQuaMuc',thoigiantao:datestart,id:idnguoidung,sotienmuctieu:500000}))))
   expect(JSON.parse(JSON.stringify(await queryMucTieuCaNhan({idmuctieu:idmuctieu3})))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhantestquery3)))
})
test('testing delete MucTieuCaNhan', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
    // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
   expect(JSON.parse(JSON.stringify(await deleteMucTieuCaNhan(muctieucanhantestupdate3)))).toStrictEqual('ThanhCong')
})