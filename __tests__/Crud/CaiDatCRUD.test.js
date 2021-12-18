import { insertCaiDat,updateCaiDat,deleteCaiDat, queryCaiDat } from '../../App/services/CaiDatCRUD'
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
test('test insert caidat case 1',async()=>{
    await insertCaiDat({
        idcaidat: new BSON.ObjectID(),
        idnguoidung: idnguoidung,
        thoigiantao: date,
        loaitien: 'USD',
        chedo: 'Dark',
        ngonngu: 'EN',
        chedonghiemngat: false,
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).loaitien).toBe('USD');
    })
})
test('test insert caidat case 2',async()=>{
    await (expect(insertCaiDat({
        idcaidat: 1,
        idnguoidung: idnguoidung,
        thoigiantao: date,
        loaitien: 'USD',
        chedo: 'Dark',
        ngonngu: 'EN',
        chedonghiemngat: false,
    })).rejects.toThrow());
})

test('test insert caidat case 3',async()=>{
    await (expect(insertCaiDat({
        idcaidat: new BSON.ObjectID(),
        idnguoidung: 1,
        thoigiantao: date,
        loaitien: 'USD',
        chedo: 'Dark',
        ngonngu: 'EN',
        chedonghiemngat: false,
    })).rejects.toThrow());
})
test('test insert caidat case 4',async()=>{
    await (expect(insertCaiDat({
        idcaidat: new BSON.ObjectID(),
        idnguoidung: idnguoidung,
        thoigiantao: 1,
        loaitien: 'USD',
        chedo: 'Dark',
        ngonngu: 'EN',
        chedonghiemngat: false,
    })).rejects.toThrow());
})

test('test insert caidat case 5',async()=>{
    await (expect(insertCaiDat({
        idcaidat: new BSON.ObjectID(),
        idnguoidung: idnguoidung,
        thoigiantao: date,
        loaitien: 1,
        chedo: 'Dark',
        ngonngu: 'EN',
        chedonghiemngat: false,
    })).rejects.toThrow());
})

test('test insert caidat case 6',async()=>{
    await (expect(insertCaiDat({
        idcaidat: new BSON.ObjectID(),
        idnguoidung: idnguoidung,
        thoigiantao: date,
        loaitien: 'USD',
        chedo: 1,
        ngonngu: 'EN',
        chedonghiemngat: false,
    })).rejects.toThrow());
})

test('test insert caidat case 7',async()=>{
    await (expect(insertCaiDat({
        idcaidat: new BSON.ObjectID(),
        idnguoidung: idnguoidung,
        thoigiantao: date,
        loaitien: 'USD',
        chedo: 'Dark',
        ngonngu: 1,
        chedonghiemngat: false,
    })).rejects.toThrow());
})
test('test insert caidat case 8',async()=>{
    await insertCaiDat(caidattest).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).loaitien).toBe('USD');
    })
})
test('update cai dat case 1',async()=>{
    await updateCaiDat({
            idcaidat: idcaidat,
            idnguoidung: idnguoidung,
            thoigiantao: date,
            loaitien: 'VND',
            chedo: 'Light',
            ngonngu: 'VN',
            chedonghiemngat: true,
        }).then((rs)=>{
            expect(JSON.parse(JSON.stringify(rs)).loaitien).toBe('VND');
        })
})
test('update cai dat case  2',async()=>{
    await (expect(updateCaiDat({
        idcaidat: new BSON.ObjectID(),
        idnguoidung: idnguoidung,
        thoigiantao: date,
        loaitien: 'USD',
        chedo: 'Dark',
        ngonngu: 'US',
        chedonghiemngat: false,
    })).rejects.toThrow());
})
test('update cai dat case  3',async()=>{
    await (expect(updateCaiDat({
        idcaidat: 123,
        idnguoidung: idnguoidung,
        thoigiantao: date,
        loaitien: 'USD',
        chedo: 'Dark',
        ngonngu: 'US',
        chedonghiemngat: false,
    })).rejects.toThrow());
})


test('update cai dat case 6',async()=>{
    await (expect(updateCaiDat({
        idcaidat: idcaidat,
        idnguoidung: idnguoidung,
        thoigiantao: date,
        loaitien: 123,
        chedo: 'Dark',
        ngonngu: 'US',
        chedonghiemngat: false,
    })).rejects.toThrow());
})
test('update cai dat case  7',async()=>{
    await (expect(updateCaiDat({
        idcaidat: idcaidat,
        idnguoidung: idnguoidung,
        thoigiantao: date,
        loaitien: 'USD',
        chedo: 123,
        ngonngu: 'US',
        chedonghiemngat: false,
    })).rejects.toThrow());
})
test('update cai dat case  8',async()=>{
    await (expect(updateCaiDat({
        idcaidat: idcaidat,
        idnguoidung: idnguoidung,
        thoigiantao: date,
        loaitien: 'USD',
        chedo: 'Dark',
        ngonngu:123,
        chedonghiemngat: false,
    })).rejects.toThrow());
})

// test('testing insert CaiDat', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
//     // console.log(caidattest)
//     expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
// })
// caidattestupdate={
//     idcaidat: idcaidat,
//     idnguoidung: idnguoidung,
//     thoigiantao: date,
//     loaitien: 'VND',
//     chedo: 'Light',
//     ngonngu: 'VN',
//     chedonghiemngat: true,
// }
// caidattestquery=[{
//     idcaidat: idcaidat,
//     idnguoidung: idnguoidung,
//     thoigiantao: date,
//     loaitien: 'VND',
//     chedo: 'Light',
//     ngonngu: 'VN',
//     chedonghiemngat: true,
// }]
// test('testing update CaiDat', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
//     // console.log(caidattest)
//     expect(JSON.parse(JSON.stringify(await updateCaiDat(caidattestupdate)))).toStrictEqual(JSON.parse(JSON.stringify(caidattestupdate)))
// })
// test('testing querry CaiDat', async () => {
//     // console.log()
//     expect(JSON.parse(JSON.stringify(await queryCaiDat({idcaidat: idcaidat,thoigiantao:date,loaitien:'VND',chedo:'Light',id:idnguoidung,ngonngu:'VN',chedonghiemngat:true})))).toStrictEqual(JSON.parse(JSON.stringify(caidattestquery)))
// })
// test('testing delete CaiDat', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
//     // console.log(caidattest)
//     expect(JSON.parse(JSON.stringify(await deleteCaiDat(caidattestupdate)))).toStrictEqual('ThanhCong')
// })

// //////////////////////////////////////////test2////////////////////////////////////////
// let idcaidat2=new BSON.ObjectID()
// let idnguoidung2=new BSON.ObjectID()
// let date2= new Date('2011-04-11T10:20:30.000Z')
// caidattest2={
//     idcaidat: idcaidat2,
//     idnguoidung: idnguoidung2,
//     thoigiantao: date2,
//     loaitien: 'VND',
//     chedo: 'Dark',
//     ngonngu: 'VN',
//     chedonghiemngat: false,
// }
// test('testing insert CaiDat', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
//     // console.log(caidattest)
//     expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest2)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest2)))
// })
// caidattestupdate2={
//     idcaidat: idcaidat2,
//     idnguoidung: idnguoidung2,
//     loaitien: 'VND',
//     ngonngu: 'EN',
// }
// caidattestupdateKT={
//     idcaidat: idcaidat2,
//     idnguoidung: idnguoidung2,
//     thoigiantao: date2,
//     loaitien: 'VND',
//     chedo: 'Dark',
//     ngonngu: 'EN',
//     chedonghiemngat: false,
// }

// caidattestquerry2=[{
//     idcaidat: idcaidat2,
//     idnguoidung: idnguoidung2,
//     thoigiantao: date2,
//     loaitien: 'VND',
//     chedo: 'Dark',
//     ngonngu: 'EN',
//     chedonghiemngat: false,
// }]
// test('testing update CaiDat', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
//     // console.log(caidattest)
//     expect(JSON.parse(JSON.stringify(await updateCaiDat(caidattestupdate2)))).toStrictEqual(JSON.parse(JSON.stringify(caidattestupdateKT)))
// })
// test('testing querry CaiDat', async () => {
//     // console.log()
//     expect(JSON.parse(JSON.stringify(await queryCaiDat({idcaidat: idcaidat2,thoigiantao:date2,loaitien:'VND',id:idnguoidung2})))).toStrictEqual(JSON.parse(JSON.stringify(caidattestquerry2)))
// })
// test('testing delete CaiDat', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
//     // console.log(caidattest)
//     expect(JSON.parse(JSON.stringify(await deleteCaiDat(caidattestupdateKT)))).toStrictEqual('ThanhCong')
// })

// //////////////////////////////////////test3/////////////////////////////////////////////
// let idcaidat3=new BSON.ObjectID()
// let idnguoidung3=new BSON.ObjectID()
// let date3= new Date('2011-04-11T10:20:30.000Z')
// caidattest3={
//     idcaidat: idcaidat3,
//     idnguoidung: idnguoidung3,
//     thoigiantao: date3,
//     loaitien: 'VND',
//     chedo: 'Dark',
//     ngonngu: 'VN',
//     chedonghiemngat: true,
// }
// test('testing insert CaiDat', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
//     // console.log(caidattest)
//     expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest3)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest3)))
// })
// caidattestupdate3={
//     idcaidat: idcaidat3,
//     idnguoidung: idnguoidung3,
// }
// caidattestupdateKT3={
//     idcaidat: idcaidat3,
//     idnguoidung: idnguoidung3,
//     thoigiantao: date3,
//     loaitien: 'VND',
//     chedo: 'Dark',
//     ngonngu: 'VN',
//     chedonghiemngat: true,
// }

// caidattestquerry3=[{
//     idcaidat: idcaidat3,
//     idnguoidung: idnguoidung3,
//     thoigiantao: date3,
//     loaitien: 'VND',
//     chedo: 'Dark',
//     ngonngu: 'VN',
//     chedonghiemngat: true,
// }]
// test('testing update CaiDat', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
//     // console.log(caidattest)
//     expect(JSON.parse(JSON.stringify(await updateCaiDat(caidattestupdate3)))).toStrictEqual(JSON.parse(JSON.stringify(caidattestupdateKT3)))
// })
// test('testing querry CaiDat', async () => {
//     // console.log()
//     expect(JSON.parse(JSON.stringify(await queryCaiDat({id:idnguoidung3})))).toStrictEqual(JSON.parse(JSON.stringify(caidattestquerry3)))
// })
// test('testing delete CaiDat', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertCaiDat(caidattest))))
//     // console.log(caidattest)
//     expect(JSON.parse(JSON.stringify(await deleteCaiDat(caidattestupdateKT3)))).toStrictEqual('ThanhCong')
// })