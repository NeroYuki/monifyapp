import {insertTaiKhoan,deleteTaiKhoan, updateTaiKhoan,queryTaiKhoan} from '../../App/services/TaiKhoanCRUD';
import {BSON} from 'realm'

 id = new BSON.ObjectID();

taikhoantest = {
    idtaikhoan: new BSON.ObjectID(),
    tentaikhoan: 'tentest',
    bieutuong: 'icon',
    color: 'color',
    thoigiantao: new Date(),
    idnguoidung: id,
    tieudung: {
        idtktieudung: new BSON.ObjectID(),
        sotien: 100000,
    },
    tietkiem: null,
    no: null
}

///insert tai khoan tieu dung

test('taikhoantieudung test insert case1', async()=>{
    await insertTaiKhoan(taikhoantest).then((tk)=>{
        expect(JSON.parse(JSON.stringify(tk)).tentaikhoan).toBe('tentest');
    });
    
})
test('taikhoantieudung test insert case 2', async()=>{
    await insertTaiKhoan({
    idtaikhoan: new BSON.ObjectID(),
    tentaikhoan: 'tentest',
    bieutuong: 'icon',
    color: 'color',
    thoigiantao: new Date(),
    idnguoidung: id,
    tieudung: {
        idtktieudung: new BSON.ObjectID(),
        sotien: 1200000,
    },
    tietkiem: null,
    no: null
    }).then((tk)=>{
        expect(JSON.parse(JSON.stringify(tk)).bieutuong).toBe('icon');
    })
})
test('taikhoantieudung test insert case 3', async()=>{
    await insertTaiKhoan({
    idtaikhoan: new BSON.ObjectID(),
    tentaikhoan: 'tien luong',
    bieutuong: 'icon',
    color: '#32a852',
    thoigiantao: new Date(),
    idnguoidung: id,
    tieudung: {
        idtktieudung: new BSON.ObjectID(),
        sotien: -1,
    },
    tietkiem: null,
    no: null
    }).then((tk)=>{
        expect(JSON.parse(JSON.stringify(tk)).tentaikhoan).toBe('tien luong');
    })
})
test('taikhoantieudung test insert case 4', async()=>{
    await (expect(insertTaiKhoan({
    idtaikhoan: 99,
    tentaikhoan: 'tien luong',
    bieutuong: 'icon',
    color: '#32a852',
    thoigiantao: new Date(),
    idnguoidung: id,
    tieudung: {
        idtktieudung: new BSON.ObjectID(),
        sotien: "abc",
    },
    tietkiem: null,
    no: null
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 5', async()=>{
    await (expect(insertTaiKhoan({
    idtaikhoan: 99,
    tentaikhoan: 99,
    bieutuong: 99,
    color: 99,
    thoigiantao: new Date(),
    idnguoidung: 99,
    tieudung: {
        idtktieudung: 99,
        sotien: -1,
    },
    tietkiem: null,
    no: null
    }).then((tk)=>{
        expect(JSON.parse(JSON.stringify(tk))).toBe(null);
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 6', async()=>{
    await(expect( insertTaiKhoan({
    idtaikhoan: 99,
    tentaikhoan: 99,
    bieutuong: 99,
    color: 99,
    thoigiantao: new Date(),
    idnguoidung: 99,
    tieudung: {
        idtktieudung: 99,
        sotien: 'abc',
    },
    tietkiem: null,
    no: null
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 7', async()=>{
    await (expect(insertTaiKhoan({
    idtaikhoan: new BSON.ObjectID(),
    tentaikhoan: 99,
    bieutuong: 99,
    color: 99,
    thoigiantao: new Date(),
    idnguoidung: id,
    tieudung: {
        idtktieudung: 99,
        sotien: -1,
    },
    tietkiem: null,
    no: null
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 8', async()=>{
    await(expect( insertTaiKhoan({
    idtaikhoan: new BSON.ObjectID(),
    tentaikhoan:99,
    bieutuong: 'icon',
    color: 99,
    thoigiantao: new Date(),
    idnguoidung: id,
    tieudung: {
        idtktieudung: 99,
        sotien: 10000,
    },
    tietkiem: null,
    no: null
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 9', async()=>{
    await(expect( insertTaiKhoan({
    idtaikhoan: new BSON.ObjectID(),
    tentaikhoan:99,
    bieutuong: 'icon',
    color: 99,
    thoigiantao: new Date(),
    idnguoidung: id,
    tieudung: {
        idtktieudung: 99,
        sotien: 'abc',
    },
    tietkiem: null,
    no: null
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 10', async()=>{
    await(expect(insertTaiKhoan({
    idtaikhoan: new BSON.ObjectID(),
    tentaikhoan:99,
    bieutuong: 'icon',
    color: 99,
    thoigiantao: new Date(),
    idnguoidung: id,
    tieudung: {
        idtktieudung: 99,
        sotien: 'abc',
    },
    tietkiem: null,
    no: null
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 11', async()=>{
    await(expect( insertTaiKhoan({
    idtaikhoan: 99,
    tentaikhoan:'tien luong',
    bieutuong: '99',
    color: '#32a852',
    thoigiantao: new Date(),
    idnguoidung: 99,
    tieudung: {
        idtktieudung: new BSON.ObjectID(),
        sotien: 10000,
    },
    tietkiem: null,
    no: null
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 12', async()=>{
    await (expect(insertTaiKhoan({
    idtaikhoan: 99,
    tentaikhoan:'tien luong',
    bieutuong: '99',
    color: '#32a852',
    thoigiantao: new Date(),
    idnguoidung: 99,
    tieudung: {
        idtktieudung: new BSON.ObjectID(),
        sotien: 'abc',
    },
    tietkiem: null,
    no: null
    })).rejects.toThrow());
})