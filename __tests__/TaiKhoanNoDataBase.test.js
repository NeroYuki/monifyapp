import {insertTaiKhoan,deleteTaiKhoan, updateTaiKhoan,queryTaiKhoan} from '../App/services/TaiKhoanCRUD';
import {BSON} from 'realm'

id = new BSON.ObjectID();
id2 = new BSON.ObjectID();
taikhoantest = {
    idtaikhoan: new BSON.ObjectID(),
    tentaikhoan: 'tentest',
    bieutuong: 'icon',
    color: 'color',
    thoigiantao: new Date(),
    idnguoidung: id,
    tieudung: null,
    tietkiem: null,
    no: {
        idtkno: new BSON.ObjectID(),
        sotien: 10000000,
        laisuatno: 0.15,
        kyhanno: 0,
        ngaybatdauno: new Date(121,3,31),
        ngaytradukien: new Date(121,6,31),
        sotientradukien: 10000000,
    },
}

test('taikhoan no test insert case 1', async()=>{
    await insertTaiKhoan( {
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung: null,
        tietkiem: null,
        no: {
            idtkno: new BSON.ObjectID(),
            sotien: 10000000,
            laisuatno: 0.15,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    }).then((tk)=>{
        expect(JSON.parse(JSON.stringify(tk)).tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoan no test insert case 3', async()=>{
    await insertTaiKhoan( {
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung: null,
        tietkiem: null,
        no: {
            idtkno: new BSON.ObjectID(),
            sotien: -1,
            laisuatno: 0.15,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    }).then((tk)=>{
        expect(JSON.parse(JSON.stringify(tk)).tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoantieudung test insert case 2', async()=>{
    await (expect(insertTaiKhoan({
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung: null,
        tietkiem: null,
        no: {
            idtkno: 99,
            sotien: -1,
            laisuatno: 0.15,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 4', async()=>{
    await (expect(insertTaiKhoan({
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung: null,
        tietkiem: null,
        no: {
            idtkno: new BSON.ObjectID(),
            sotien:'abc',
            laisuatno: 0.15,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 5', async()=>{
    await (expect(insertTaiKhoan({
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung: null,
        tietkiem: null,
        no: {
            idtkno: new BSON.ObjectID(),
            sotien:'abc',
            laisuatno: -1,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})

test('taikhoantieudung test insert case 6', async()=>{
    await (expect(insertTaiKhoan({
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung: null,
        tietkiem: null,
        no: {
            idtkno: new BSON.ObjectID(),
            sotien: 10000000,
            laisuatno: "abc",
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 7', async()=>{
    await (expect(insertTaiKhoan({
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung: null,
        tietkiem: null,
        no: {
            idtkno: new BSON.ObjectID(),
            sotien: 10000000,
            laisuatno:  'abc',
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 8', async()=>{
    await (expect(insertTaiKhoan({
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung: null,
        tietkiem: null,
        no: {
            idtkno: new BSON.ObjectID(),
            sotien: 10000000,
            laisuatno:   0.15,
            kyhanno: "abc",
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 9', async()=>{
    await (expect(insertTaiKhoan({
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung: null,
        tietkiem: null,
        no: {
            idtkno: new BSON.ObjectID(),
            sotien: 10000000,
            laisuatno:   0.15,
            kyhanno: 0,
            ngaybatdauno: "abc",
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 10', async()=>{
    await (expect(insertTaiKhoan({
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung: null,
        tietkiem: null,
        no: {
            idtkno: new BSON.ObjectID(),
            sotien: 10000000,
            laisuatno:   0.15,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: "abc",
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 11', async()=>{
    await (expect(insertTaiKhoan({
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung: null,
        tietkiem: null,
        no: {
            idtkno: new BSON.ObjectID(),
            sotien: 10000000,
            laisuatno:   0.15,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: "abc",
        },
    })).rejects.toThrow());
})

test('taikhoan no test insert case 12', async()=>{
    await insertTaiKhoan( {
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung: null,
        tietkiem: null,
        no: {
            idtkno: new BSON.ObjectID(),
            sotien: 10000000,
            laisuatno:   0.15,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: -1,
        },
    }).then((tk)=>{
        expect(JSON.parse(JSON.stringify(tk)).tentaikhoan).toBe('Tien luong');
    })
})