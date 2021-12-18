import {insertMucTieuCaNhan,updateMucTieuCaNhan,deleteMucTieuCaNhan,queryMucTieuCaNhan} from '../../App/services/MucTieuCaNhanCRUD';
import {BSON} from 'realm'
import { tr } from 'date-fns/locale';

let idmuctieu=new BSON.ObjectID()
let idnguoidung=new BSON.ObjectID()
let datestart= new Date('2011-04-11T10:20:30.000Z')
let dateend= new Date('2011-05-11T10:20:30.000Z')

let muctieucanhantest={
    idmuctieu: new BSON.ObjectID(),
    idnguoidung:new BSON.ObjectID(),
    thoigiantao: datestart,
    sotienmuctieu: 200000,
    ngaybatdau: datestart,
    ngayketthuc: dateend,
    tenmuctieu:'nameXXX',
}
test('Muctieucanhan test case 1', async()=>{
    await insertMucTieuCaNhan( {
        idmuctieu: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: datestart,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    },'TietKiemDenMuc').then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenmuctieu).toBe('nameXXX');
    })
})
test('Muctieucanhan test case 6', async()=>{
    await insertMucTieuCaNhan( {
        idmuctieu: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: datestart,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    },'TieuDungQuaMuc').then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenmuctieu).toBe('nameXXX');
    })
})
test('Muctieucanhan test case 7', async()=>{
    await insertMucTieuCaNhan( {
        idmuctieu: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: datestart,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    },'SoDuToiThieu').then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenmuctieu).toBe('nameXXX');
    })
})
test('Muctieucanhan test case 2', async()=>{
    await (expect(insertMucTieuCaNhan( {
        idmuctieu: 99,
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: datestart,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})
test('Muctieucanhan test case 3', async()=>{
    await (expect(insertMucTieuCaNhan( {
        idmuctieu: new BSON.ObjectID(),
        idnguoidung:99,
        thoigiantao: datestart,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})
test('Muctieucanhan test case 4', async()=>{
    await (expect(insertMucTieuCaNhan( {
        idmuctieu: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: 'abc',
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})
test('Muctieucanhan test case 5', async()=>{
    await (expect(insertMucTieuCaNhan( {
        idmuctieu: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: datestart,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:99,
    })).rejects.toThrow());
})

test('Muctieucanhan test case 8', async()=>{
    await (expect(insertMucTieuCaNhan( {
        idmuctieu: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: datestart,
        sotienmuctieu: -1,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})
test('Muctieucanhan test case 9', async()=>{
    await (expect(insertMucTieuCaNhan( {
        idmuctieu: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: datestart,
        sotienmuctieu: 'abc',
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})
test('Muctieucanhan test case 10', async()=>{
    await (expect(insertMucTieuCaNhan( {
        idmuctieu: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: datestart,
        sotienmuctieu: 200000,
        ngaybatdau: 'abc',
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})
test('Muctieucanhan test case 11', async()=>{
    await (expect(insertMucTieuCaNhan( {
        idmuctieu: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: datestart,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: 'abc',
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})


test('Muctieucanhan update test case 0',async()=>{
    await insertMucTieuCaNhan({
        idmuctieu: idmuctieu,
        idnguoidung:idnguoidung,
        thoigiantao: datestart,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    },'TietKiemDenMuc')
})

test('Muctieucanhan update test case 1',async()=>{
    await updateMucTieuCaNhan({
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
        tenmuctieu:'nameXXX',
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenmuctieu).toBe('nameXXX');
    })
})

test('Muctieucanhan update test case 6',async()=>{
    await updateMucTieuCaNhan({
        idmuctieu: idmuctieu,
        idnguoidung:idnguoidung,
        thoigiantao: datestart,
        loaimuctieu:{
            tietkiemdenmuc: false,
            tieudungquamuc: true,
            sodutoithieu: false,
        },
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenmuctieu).toBe('nameXXX');
    })
})
test('Muctieucanhan update test case 7',async()=>{
    await updateMucTieuCaNhan({
        idmuctieu: idmuctieu,
        idnguoidung:idnguoidung,
        thoigiantao: datestart,
        loaimuctieu:{
            tietkiemdenmuc: false,
            tieudungquamuc: false,
            sodutoithieu: true,
        } ,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenmuctieu).toBe('nameXXX');
    })
})
test('Muctieucanhan update test case 2',async()=>{
    await (expect(updateMucTieuCaNhan({
        idmuctieu: 99,
        idnguoidung:idnguoidung,
        thoigiantao: datestart,
        loaimuctieu:{
            tietkiemdenmuc: true,
            tieudungquamuc: false,
            sodutoithieu: false,
        } ,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})
test('Muctieucanhan update test case 3',async()=>{
    await updateMucTieuCaNhan({
        idmuctieu: idmuctieu,
        idnguoidung:99,
        thoigiantao: datestart,
        loaimuctieu:{
            tietkiemdenmuc: true,
            tieudungquamuc: false,
            sodutoithieu: false,
        } ,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenmuctieu).toBe('nameXXX');
    })
})

test('Muctieucanhan update test case 5',async()=>{
    await (expect(updateMucTieuCaNhan({
        idmuctieu: idmuctieu,
        idnguoidung:idnguoidung,
        thoigiantao: datestart,
        loaimuctieu:{
            tietkiemdenmuc: true,
            tieudungquamuc: false,
            sodutoithieu: false,
        } ,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:99,
    })).rejects.toThrow());
})
test('Muctieucanhan update test case 8',async()=>{
    await updateMucTieuCaNhan({
        idmuctieu: idmuctieu,
        idnguoidung:idnguoidung,
        thoigiantao: datestart,
        loaimuctieu:{
            tietkiemdenmuc: true,
            tieudungquamuc: false,
            sodutoithieu: false,
        } ,
        sotienmuctieu: -1,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenmuctieu).toBe('nameXXX');
    })
})
test('Muctieucanhan update test case 9',async()=>{
    await (expect(updateMucTieuCaNhan({
        idmuctieu: idmuctieu,
        idnguoidung:idnguoidung,
        thoigiantao: datestart,
        loaimuctieu:{
            tietkiemdenmuc: true,
            tieudungquamuc: false,
            sodutoithieu: false,
        } ,
        sotienmuctieu: 'abc',
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})
test('Muctieucanhan update test case 10',async()=>{
    await (expect(updateMucTieuCaNhan({
        idmuctieu: idmuctieu,
        idnguoidung:idnguoidung,
        thoigiantao: datestart,
        loaimuctieu:{
            tietkiemdenmuc: true,
            tieudungquamuc: false,
            sodutoithieu: false,
        } ,
        sotienmuctieu: 200000,
        ngaybatdau: 'abc',
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})
test('Muctieucanhan update test case 11',async()=>{
    await (expect(updateMucTieuCaNhan({
        idmuctieu: idmuctieu,
        idnguoidung:idnguoidung,
        thoigiantao: datestart,
        loaimuctieu:{
            tietkiemdenmuc: true,
            tieudungquamuc: false,
            sodutoithieu: false,
        } ,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: 'abc',
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})

test('Muctieucanhan update test case 0',async()=>{
    await updateMucTieuCaNhan({
        idmuctieu: idmuctieu,
        idnguoidung:idnguoidung,
        thoigiantao: datestart,
        loaimuctieu:{
            tietkiemdenmuc: true,
            tieudungquamuc: false,
            sodutoithieu: false,
        } ,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenmuctieu).toBe('nameXXX');
    })
})
test('query muctieucanhan case 1', async()=>{
    await queryMucTieuCaNhan({
        id:idnguoidung,
        idmuctieu:idmuctieu,
        thoigiantao: datestart,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        sotienmuctieu: 200000,
        loaimuctieu:'TietKiemDenMuc',
        tenmuctieu:'nameXXX',
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs))[0].tenmuctieu).toBe('nameXXX');

    })
})
test('Muctieucanhan update test case 0',async()=>{
    await updateMucTieuCaNhan({
        idmuctieu: idmuctieu,
        idnguoidung:idnguoidung,
        thoigiantao: datestart,
        loaimuctieu:{
            tietkiemdenmuc: false,
            tieudungquamuc: true,
            sodutoithieu: false,
        } ,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenmuctieu).toBe('nameXXX');
    })
})
test('query muctieucanhan case 10', async()=>{
    await queryMucTieuCaNhan({
        id:idnguoidung,
        idmuctieu:idmuctieu,
        thoigiantao: datestart,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        sotienmuctieu: 200000,
        loaimuctieu:'TieuDungQuaMuc',
        tenmuctieu:'nameXXX',
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs))[0].tenmuctieu).toBe('nameXXX');

    })
})
test('Muctieucanhan update test case 0',async()=>{
    await updateMucTieuCaNhan({
        idmuctieu: idmuctieu,
        idnguoidung:idnguoidung,
        thoigiantao: datestart,
        loaimuctieu:{
            tietkiemdenmuc: false,
            tieudungquamuc: false,
            sodutoithieu: true,
        } ,
        sotienmuctieu: 200000,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        tenmuctieu:'nameXXX',
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenmuctieu).toBe('nameXXX');
    })
})
test('query muctieucanhan case 11', async()=>{
    await queryMucTieuCaNhan({
        id:idnguoidung,
        idmuctieu:idmuctieu,
        thoigiantao: datestart,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        sotienmuctieu: 200000,
        loaimuctieu:'SoDuToiThieu',
        tenmuctieu:'nameXXX',
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs))[0].tenmuctieu).toBe('nameXXX');
    })
})
test('query muctieucanhan case 2', async()=>{
    await (expect(queryMucTieuCaNhan({
        id:99,
        idmuctieu:idmuctieu,
        thoigiantao: datestart,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        sotienmuctieu: 200000,
        loaimuctieu:'SoDuToiThieu',
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})
test('query muctieucanhan case 3', async()=>{
    await (expect(queryMucTieuCaNhan({
        id:idnguoidung,
        idmuctieu:99,
        thoigiantao: datestart,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        sotienmuctieu: 200000,
        loaimuctieu:'SoDuToiThieu',
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})
test('query muctieucanhan case 4', async()=>{
    await (expect(queryMucTieuCaNhan({
        id:idnguoidung,
        idmuctieu:idmuctieu,
        thoigiantao: -1,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        sotienmuctieu: 200000,
        loaimuctieu:'SoDuToiThieu',
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})
test('query muctieucanhan case 5', async()=>{
    await (expect(queryMucTieuCaNhan({
        id:idnguoidung,
        idmuctieu:idmuctieu,
        thoigiantao: 'abc',
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        sotienmuctieu: 200000,
        loaimuctieu:'SoDuToiThieu',
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})
test('query muctieucanhan case 6', async()=>{
    await (expect(queryMucTieuCaNhan({
        id:idnguoidung,
        idmuctieu:idmuctieu,
        thoigiantao: datestart,
        ngaybatdau: 'abc',
        ngayketthuc: dateend,
        sotienmuctieu: 200000,
        loaimuctieu:'SoDuToiThieu',
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})
test('query muctieucanhan case 7 ', async()=>{
    await (expect(queryMucTieuCaNhan({
        id:idnguoidung,
        idmuctieu:idmuctieu,
        thoigiantao: 'abc',
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        sotienmuctieu: 200000,
        loaimuctieu:'SoDuToiThieu',
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})
test('query muctieucanhan case 8', async()=>{
    await queryMucTieuCaNhan({
        id:idnguoidung,
        idmuctieu:idmuctieu,
        thoigiantao: datestart,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        sotienmuctieu: -1,
        loaimuctieu:'SoDuToiThieu',
        tenmuctieu:'nameXXX',
    }).then((rs)=>{expect(JSON.parse(JSON.stringify(rs))).toEqual([])})
})
test('query muctieucanhan case 9 ', async()=>{
    await (expect(queryMucTieuCaNhan({
        id:idnguoidung,
        idmuctieu:idmuctieu,
        thoigiantao: datestart,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        sotienmuctieu: 'abc',
        loaimuctieu:'SoDuToiThieu',
        tenmuctieu:'nameXXX',
    })).rejects.toThrow());
})

test('query muctieucanhan case 12 ', async()=>{
    await (expect(queryMucTieuCaNhan({
        id:idnguoidung,
        idmuctieu:idmuctieu,
        thoigiantao: datestart,
        ngaybatdau: datestart,
        ngayketthuc: dateend,
        sotienmuctieu: 200000,
        loaimuctieu:'SoDuToiThieu',
        tenmuctieu:99,
    })).rejects.toThrow());
})

// let muctieucanhantest={
//     idmuctieu: idmuctieu,
//     idnguoidung:idnguoidung,
//     thoigiantao: datestart,
//     sotienmuctieu: 200000,
//     ngaybatdau: datestart,
//     ngayketthuc: dateend,
//     tenmuctieu:'nameXXX',
// }
// let muctieucanhan={
//     idmuctieu: idmuctieu,
//     idnguoidung:idnguoidung,
//     thoigiantao: datestart,
//     loaimuctieu:{
//         tietkiemdenmuc: true,
//         tieudungquamuc: false,
//         sodutoithieu: false,
//     },
//     sotienmuctieu: 200000,
//     ngaybatdau: datestart,
//     ngayketthuc: dateend,
//     tenmuctieu:'nameXXX',
// }
// test('testing insert MucTieuCaNhan', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
//     // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
//    expect(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc')))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhan)))
// })
// let muctieucanhantestupdate={
//     idmuctieu: idmuctieu,
//     idnguoidung:idnguoidung,
//     thoigiantao: datestart,
//     loaimuctieu:{
//         tietkiemdenmuc: false,
//         tieudungquamuc: true,
//         sodutoithieu: false,
//     },
//     sotienmuctieu: 500000,
//     ngaybatdau: datestart,
//     ngayketthuc: datestart,
//     tenmuctieu:'nameXXX',
// }
// let muctieucanhantestquery=[{
//     idmuctieu: idmuctieu,
//     idnguoidung:idnguoidung,
//     thoigiantao: datestart,
//     loaimuctieu:{
//         tietkiemdenmuc: false,
//         tieudungquamuc: true,
//         sodutoithieu: false,
//     },
//     sotienmuctieu: 500000,
//     ngaybatdau: datestart,
//     ngayketthuc: datestart,
//     tenmuctieu:'nameXXX',
// }]
// test('testing update MucTieuCaNhan', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
//     // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
//    expect(JSON.parse(JSON.stringify(await updateMucTieuCaNhan(muctieucanhantestupdate)))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhantestupdate)))
// })
// test('testing query MucTieuCaNhan', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
//     // console.log(JSON.parse(JSON.stringify(await queryMucTieuCaNhan({ngaybatdau:datestart,ngayketthuc:datestart,loaimuctieu:'TieuDungQuaMuc',thoigiantao:datestart,id:idnguoidung,sotienmuctieu:500000}))))
//    expect(JSON.parse(JSON.stringify(await queryMucTieuCaNhan({idmuctieu: idmuctieu,ngaybatdau:datestart,ngayketthuc:datestart,loaimuctieu:'TieuDungQuaMuc',thoigiantao:datestart,id:idnguoidung,sotienmuctieu:500000})))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhantestquery)))
// })
// test('testing delete MucTieuCaNhan', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
//     // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
//    expect(JSON.parse(JSON.stringify(await deleteMucTieuCaNhan(muctieucanhantestupdate)))).toStrictEqual('ThanhCong')
// })
// //////////////////////////////////test2///////////////////////////////////
// let idmuctieu2=new BSON.ObjectID()
// let idnguoidung2=new BSON.ObjectID()
// let datestart2= new Date('2011-04-11T10:20:30.000Z')
// let dateend2= new Date('2011-05-11T10:20:30.000Z')

// let muctieucanhantest2={
//     idmuctieu: idmuctieu2,
//     idnguoidung:idnguoidung2,
//     thoigiantao: datestart2,
//     sotienmuctieu: 200000,
//     ngaybatdau: datestart2,
//     ngayketthuc: dateend2,
//     tenmuctieu:'nameXXX',
// }
// let muctieucanhan2={
//     idmuctieu: idmuctieu2,
//     idnguoidung:idnguoidung2,
//     thoigiantao: datestart2,
//     loaimuctieu:{
//         tietkiemdenmuc: true,
//         tieudungquamuc: false,
//         sodutoithieu: false,
//     },
//     sotienmuctieu: 200000,
//     ngaybatdau: datestart2,
//     ngayketthuc: dateend2,
//     tenmuctieu:'nameXXX',
// }
// test('testing insert MucTieuCaNhan', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
//     // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
//    expect(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest2,'TietKiemDenMuc')))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhan2)))
// })
// let muctieucanhantestupdate2={
//     idmuctieu: idmuctieu2,
//     loaimuctieu:{
//         tietkiemdenmuc: false,
//         tieudungquamuc: false,
//         sodutoithieu: true,
//     },
//     sotienmuctieu: 600000,
//     ngaybatdau: datestart2,
//     ngayketthuc: datestart2,
//     tenmuctieu:'nameXXX',
// }
// let muctieucanhantestupdate2KT={
//     idmuctieu: idmuctieu2,
//     idnguoidung:idnguoidung2,
//     thoigiantao: datestart2,
//     loaimuctieu:{
//         tietkiemdenmuc: false,
//         tieudungquamuc: false,
//         sodutoithieu: true,
//     },
//     sotienmuctieu: 600000,
//     ngaybatdau: datestart2,
//     ngayketthuc: datestart2,
//     tenmuctieu:'nameXXX',
// }
// let muctieucanhantestquery2=[{
//     idmuctieu: idmuctieu2,
//     idnguoidung:idnguoidung2,
//     thoigiantao: datestart2,
//     loaimuctieu:{
//         tietkiemdenmuc: false,
//         tieudungquamuc: false,
//         sodutoithieu: true,
//     },
//     sotienmuctieu: 600000,
//     ngaybatdau: datestart2,
//     ngayketthuc: datestart2,
//     tenmuctieu:'nameXXX',
// }]
// test('testing update MucTieuCaNhan', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
//     // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
//    expect(JSON.parse(JSON.stringify(await updateMucTieuCaNhan(muctieucanhantestupdate2)))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhantestupdate2KT)))
// })
// test('testing query MucTieuCaNhan', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
//     // console.log(JSON.parse(JSON.stringify(await queryMucTieuCaNhan({ngaybatdau:datestart,ngayketthuc:datestart,loaimuctieu:'TieuDungQuaMuc',thoigiantao:datestart,id:idnguoidung,sotienmuctieu:500000}))))
//    expect(JSON.parse(JSON.stringify(await queryMucTieuCaNhan({idmuctieu: idmuctieu2,ngaybatdau:datestart2,ngayketthuc:datestart2,loaimuctieu:'SoDuToiThieu',thoigiantao:datestart2,id:idnguoidung2,sotienmuctieu:600000})))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhantestquery2)))
// })
// test('testing delete MucTieuCaNhan', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
//     // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
//    expect(JSON.parse(JSON.stringify(await deleteMucTieuCaNhan(muctieucanhantestupdate2KT)))).toStrictEqual('ThanhCong')
// })
// ////////////////////////////////////////////test3//////////////////////////////////////
// let idmuctieu3=new BSON.ObjectID()
// let idnguoidung3=new BSON.ObjectID()
// let datestart3= new Date('2011-04-11T10:20:30.000Z')
// let dateend3= new Date('2011-05-11T10:20:30.000Z')

// let muctieucanhantest3={
//     idmuctieu: idmuctieu3,
//     idnguoidung:idnguoidung3,
//     thoigiantao: datestart3,
//     sotienmuctieu: 200000,
//     ngaybatdau: datestart3,
//     ngayketthuc: dateend3,
//     tenmuctieu:'nameXXX',
// }
// let muctieucanhan3={
//     idmuctieu: idmuctieu3,
//     idnguoidung:idnguoidung3,
//     thoigiantao: datestart3,
//     loaimuctieu:{
//         tietkiemdenmuc: true,
//         tieudungquamuc: false,
//         sodutoithieu: false,
//     },
//     sotienmuctieu: 200000,
//     ngaybatdau: datestart3,
//     ngayketthuc: dateend3,
//     tenmuctieu:'nameXXX',
// }
// test('testing insert MucTieuCaNhan', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
//     // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
//    expect(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest3,'TietKiemDenMuc')))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhan3)))
// })
// let muctieucanhantestupdate3={
//     idmuctieu: idmuctieu3,
//     sotienmuctieu: 1000000,
//     tenmuctieu:'nameXXX',
// }
// let muctieucanhantestupdate3KT={
//     idmuctieu: idmuctieu3,
//     idnguoidung:idnguoidung3,
//     thoigiantao: datestart3,
//     loaimuctieu:{
//         tietkiemdenmuc: true,
//         tieudungquamuc: false,
//         sodutoithieu: false,
//     },
//     sotienmuctieu: 1000000,
//     ngaybatdau: datestart3,
//     ngayketthuc: dateend3,
//     tenmuctieu:'nameXXX',
// }
// let muctieucanhantestquery3=[{
//     idmuctieu: idmuctieu3,
//     idnguoidung:idnguoidung3,
//     thoigiantao: datestart3,
//     loaimuctieu:{
//         tietkiemdenmuc: true,
//         tieudungquamuc: false,
//         sodutoithieu: false,
//     },
//     sotienmuctieu: 1000000,
//     ngaybatdau: datestart3,
//     ngayketthuc: dateend3,
//     tenmuctieu:'nameXXX',
// }]
// test('testing update MucTieuCaNhan', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
//     // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
//    expect(JSON.parse(JSON.stringify(await updateMucTieuCaNhan(muctieucanhantestupdate3)))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhantestupdate3KT)))
// })
// test('testing query MucTieuCaNhan', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
//     // console.log(JSON.parse(JSON.stringify(await queryMucTieuCaNhan({ngaybatdau:datestart,ngayketthuc:datestart,loaimuctieu:'TieuDungQuaMuc',thoigiantao:datestart,id:idnguoidung,sotienmuctieu:500000}))))
//    expect(JSON.parse(JSON.stringify(await queryMucTieuCaNhan({idmuctieu:idmuctieu3})))).toStrictEqual(JSON.parse(JSON.stringify(muctieucanhantestquery3)))
// })
// test('testing delete MucTieuCaNhan', async () => {
//     // console.log(JSON.parse(JSON.stringify(await insertMucTieuCaNhan(muctieucanhantest,'TietKiemDenMuc'))))
//     // console.log(JSON.parse(JSON.stringify(muctieucanhan)))
//    expect(JSON.parse(JSON.stringify(await deleteMucTieuCaNhan(muctieucanhantestupdate3)))).toStrictEqual('ThanhCong')
// })




