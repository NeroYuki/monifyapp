import {insertTaiKhoan,deleteTaiKhoan, updateTaiKhoan,queryTaiKhoan} from '../../App/services/TaiKhoanCRUD';
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
    tieudung:null,
    tietkiem: {
        idtktietkiem: new BSON.ObjectID(),
        sotien: 10000,
        laisuattietkiem: 1.5,
        laisuattruochan: '2',
        idtkduocthuhuong: id,
        ngaybatdau:new Date(121,3,31),
        ngayrutdukien:new Date(121,3,31),
        ruttatca:true,
        tieptuc:false,
        rutlai:false,

    },
    no: null
}


test('taikhoantietkiem test insert case 1', async()=>{
    await insertTaiKhoan( {
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 10000,
            laisuattietkiem: 0.15,
            laisuattruochan:  '0.15',
            idtkduocthuhuong: id,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: null
    }).then((tk)=>{
        expect(JSON.parse(JSON.stringify(tk)).tentaikhoan).toBe('Tien luong');
    })
})

test('taikhoantietkiem test insert case 3', async()=>{
    await insertTaiKhoan( {
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: -1,
            laisuattietkiem: 0.15,
            laisuattruochan:  '0.15',
            idtkduocthuhuong: id,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: null
    }).then((tk)=>{
        expect(JSON.parse(JSON.stringify(tk)).tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoantietkiem test insert case 16', async()=>{
    await insertTaiKhoan( {
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 10000000,
            laisuattietkiem: 0.15,
            laisuattruochan: ' 0.15',
            idtkduocthuhuong: id,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            ruttatca:false,
            tieptuc:false,
            rutlai:false,
        },
        no: null
    }).then((tk)=>{
        expect(JSON.parse(JSON.stringify(tk)).tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoantietkiem test insert case 17', async()=>{
    await insertTaiKhoan( {
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 10000000,
            laisuattietkiem: 0.15,
            laisuattruochan: ' 0.15',
            idtkduocthuhuong: id,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            ruttatca:true,
            tieptuc:true,
            rutlai:false,
        },
        no: null
    }).then((tk)=>{
        expect(JSON.parse(JSON.stringify(tk)).tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoantietkiem test insert case 18', async()=>{
    await insertTaiKhoan( {
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 10000000,
            laisuattietkiem: 0.15,
            laisuattruochan:  '0.15',
            idtkduocthuhuong: id,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            ruttatca:true,
            tieptuc:false,
            rutlai:true,
        },
        no: null
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
        tieudung:null,
        tietkiem: {
            idtktietkiem: 99,
            sotien: 10000,
            laisuattietkiem: 0.15,
            laisuattruochan: '0.15',
            idtkduocthuhuong: id,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: null
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
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 'abc',
            laisuattietkiem: 0.15,
            laisuattruochan:  '0.15',
            idtkduocthuhuong: id,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: null
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
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 'abc',
            laisuattietkiem: 'abc',
            laisuattruochan:  '0.15',
            idtkduocthuhuong: id,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: null
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
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 'abc',
            laisuattietkiem: 0.15,
            laisuattruochan:  -1,
            idtkduocthuhuong: id,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: null
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
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 'abc',
            laisuattietkiem: 0.15,
            laisuattruochan:  1,
            idtkduocthuhuong: id,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: null
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
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 'abc',
            laisuattietkiem: 0.15,
            laisuattruochan:  '0.15',
            idtkduocthuhuong: 99,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: null
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
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 'abc',
            laisuattietkiem: 0.15,
            laisuattruochan:  '0.15',
            idtkduocthuhuong: 99,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: null
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
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 'abc',
            laisuattietkiem: 0.15,
            laisuattruochan:  '0.15',
            idtkduocthuhuong: 99,
            kyhantietkiem:"abc",
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: null
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 12', async()=>{
    await (expect(insertTaiKhoan({
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 'abc',
            laisuattietkiem: 0.15,
            laisuattruochan:  '0.15',
            idtkduocthuhuong: 99,
            ngaybatdau:'abc',
            ngayrutdukien:new Date(121,3,31),
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: null
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 13', async()=>{
    await (expect(insertTaiKhoan({
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 'abc',
            laisuattietkiem: 0.15,
            laisuattruochan:  '0.15',
            idtkduocthuhuong: id,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:'abc',
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: null
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 13', async()=>{
    await (expect(insertTaiKhoan({
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 'abc',
            laisuattietkiem: 0.15,
            laisuattruochan:  '0.15',
            idtkduocthuhuong: id,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            sotiencodukien:'abc',
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: null
    })).rejects.toThrow());
})
test('taikhoantieudung test insert case 14', async()=>{
    await (expect(insertTaiKhoan({
        idtaikhoan: new BSON.ObjectID(),
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id,
        tieudung:null,
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 'abc',
            laisuattietkiem: 0.15,
            laisuattruochan:  '0.15',
            idtkduocthuhuong: id,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            sotiencodukien:'abc',
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: null
    })).rejects.toThrow());
})