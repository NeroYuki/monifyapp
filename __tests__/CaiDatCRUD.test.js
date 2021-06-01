import {insertCaiDat,updateCaiDat,deleteCaiDat, queryCaiDat} from '../App/services/CaiDatCRUD';
import {BSON} from 'realm'
let idcaidat=new BSON.ObjectID()
let idnguoidung=new BSON.ObjectID()
let date= new Date('2011-04-11T10:20:30.000Z')
caidattest={
    idcaidat: idcaidat,
    idnguoidung: idnguoidung,
    thoigiantao: date,
    loaitien: 'USD',
    chedo: 'Dark',
    ngonngu: 'EN',
    chedonghiemngat: false,
}
test('testing insert CaiDat', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
    // console.log(caidattest)
    expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})
caidattestupdate={
    idcaidat: idcaidat,
    idnguoidung: idnguoidung,
    thoigiantao: date,
    loaitien: 'VND',
    chedo: 'Light',
    ngonngu: 'VN',
    chedonghiemngat: true,
}
caidattestquery=[{
    idcaidat: idcaidat,
    idnguoidung: idnguoidung,
    thoigiantao: date,
    loaitien: 'VND',
    chedo: 'Light',
    ngonngu: 'VN',
    chedonghiemngat: true,
}]
test('testing update CaiDat', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
    // console.log(caidattest)
    expect(JSON.parse(JSON.stringify(await updateCaiDat(caidattestupdate)))).toStrictEqual(JSON.parse(JSON.stringify(caidattestupdate)))
})
test('testing querry CaiDat', async () => {
    // console.log()
    expect(JSON.parse(JSON.stringify(await queryCaiDat({idcaidat: idcaidat,thoigiantao:date,loaitien:'VND',chedo:'Light',id:idnguoidung,ngonngu:'VN',chedonghiemngat:true})))).toStrictEqual(JSON.parse(JSON.stringify(caidattestquery)))
})
test('testing delete CaiDat', async () => {
    // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
    // console.log(caidattest)
    expect(JSON.parse(JSON.stringify(await deleteCaiDat(caidattestupdate)))).toStrictEqual('ThanhCong')
})

