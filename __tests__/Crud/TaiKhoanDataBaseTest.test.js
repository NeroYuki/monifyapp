import {insertTaiKhoan,deleteTaiKhoan, updateTaiKhoan,queryTaiKhoan} from '../../App/services/TaiKhoanCRUD';
import {BSON} from 'realm'

id = new BSON.ObjectID();
id2 = new BSON.ObjectID();
id3 = new BSON.ObjectID();


taikhoantest = {
    idtaikhoan: new BSON.ObjectID(),
    tentaikhoan: 'tentest',
    bieutuong: 'icon',
    color: 'color',
    thoigiantao: new Date(),
    idnguoidung: id,
    tieudung: null,
    tietkiem: null,
    no: null,
}

test('taikhoan update test update cate 0', async()=>{
    await insertTaiKhoan( {
        idtaikhoan: id,
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: null,
        tietkiem: null,
        no: null,
    })
})
test('taikhoan update test update cate 1', async()=>{
    await updateTaiKhoan({
        idtaikhoan: id,
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: {       
            idtktieudung: new BSON.ObjectID(),
            sotien: 100000
        },
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
        no: {
            idtkno: id3,
            sotien: 10000000,
            laisuatno: 0.2,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    }).then((tk)=>{
        expect(JSON.parse(JSON.stringify(tk)).tentaikhoan).toBe('Tien luong');
    })
})









test('taikhoan update test update cate 2', async()=>{
    await (expect(updateTaiKhoan({
        idtaikhoan: 99,
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: {       
            idtktieudung: new BSON.ObjectID(),
            sotien: 100000
        },
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
        no: {
            idtkno: id3,
            sotien: 10000000,
            laisuatno: 0.15,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})

test('taikhoan update test update cate 3', async()=>{
    await (expect(updateTaiKhoan({
        idtaikhoan: id,
        tentaikhoan: 99,
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: {       
            idtktieudung: new BSON.ObjectID(),
            sotien: 100000
        },
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
        no: {
            idtkno: id3,
            sotien: 10000000,
            laisuatno: 0.15,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})

test('taikhoan update test update cate 4', async()=>{
    await (expect(updateTaiKhoan({
        idtaikhoan: id,
        tentaikhoan: 'Tien luong',
        bieutuong: 99,
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: {       
            idtktieudung: new BSON.ObjectID(),
            sotien: 100000
        },
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
        no: {
            idtkno: id3,
            sotien: 10000000,
            laisuatno: 0.15,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})
test('taikhoan update test update cate 5', async()=>{
    await (expect(updateTaiKhoan({
        idtaikhoan: id,
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: 99,
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: {       
            idtktieudung: new BSON.ObjectID(),
            sotien: 100000
        },
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
        no: {
            idtkno: id3,
            sotien: 10000000,
            laisuatno: 0.15,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})
test('taikhoan update test update cate 6', async()=>{
    await updateTaiKhoan({
        idtaikhoan: id,
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: {       
            idtktieudung: new BSON.ObjectID(),
            sotien: -1
        },
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
        no: {
            idtkno: id3,
            sotien: 10000000,
            laisuatno: 0.2,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    }).then((tk)=>{
        expect(JSON.parse(JSON.stringify(tk)).tentaikhoan).toBe('Tien luong');
    })
})

test('taikhoan update test update cate 7', async()=>{
    await (expect(updateTaiKhoan({
        idtaikhoan: id,
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: {       
            idtktieudung: new BSON.ObjectID(),
            sotien: 'abc'
        },
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
        no: {
            idtkno: id3,
            sotien: 10000000,
            laisuatno: 0.15,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})
test('taikhoan update test update cate 8', async()=>{
    await updateTaiKhoan({
        idtaikhoan: id,
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: {       
            idtktieudung: new BSON.ObjectID(),
            sotien: 100000
        },
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
        no: {
            idtkno: id3,
            sotien: 10000000,
            laisuatno: 0.2,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    }).then((tk)=>{
        expect(JSON.parse(JSON.stringify(tk)).tentaikhoan).toBe('Tien luong');
    })
})

test('taikhoan update test update cate 9', async()=>{
    await (expect(updateTaiKhoan({
        idtaikhoan: id,
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: {       
            idtktieudung: new BSON.ObjectID(),
            sotien: 100000
        },
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
        no: {
            idtkno: id3,
            sotien: 10000000,
            laisuatno: 0.15,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})

test('taikhoan update test update cate 10', async()=>{
    await (expect(updateTaiKhoan({
        idtaikhoan: id,
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: {       
            idtktieudung: new BSON.ObjectID(),
            sotien: 100000
        },
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 10000,
            laisuattietkiem: 'abc',
            laisuattruochan:  '0.15',
            idtkduocthuhuong: id,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: {
            idtkno: id3,
            sotien: 10000000,
            laisuatno: 0.15,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})

test('taikhoan update test update cate', async()=>{
    await (expect(updateTaiKhoan({
        idtaikhoan: id,
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: {       
            idtktieudung: new BSON.ObjectID(),
            sotien: 100000
        },
        tietkiem: {
            idtktietkiem: new BSON.ObjectID(),
            sotien: 10000,
            laisuattietkiem:0.15,
            laisuattruochan:  1,
            idtkduocthuhuong: id,
            ngaybatdau:new Date(121,3,31),
            ngayrutdukien:new Date(121,3,31),
            ruttatca:true,
            tieptuc:false,
            rutlai:false,
        },
        no: {
            idtkno: id3,
            sotien: 10000000,
            laisuatno: 0.15,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})
test('taikhoan update test update cate 12', async()=>{
    await updateTaiKhoan({
        idtaikhoan: id,
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: {       
            idtktieudung: new BSON.ObjectID(),
            sotien: 100000
        },
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
        no: {
            idtkno: id3,
            sotien: -1,
            laisuatno: 0.2,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    }).then((tk)=>{
        expect(JSON.parse(JSON.stringify(tk)).tentaikhoan).toBe('Tien luong');
    })
})

test('taikhoan update test update cate 13', async()=>{
    await (expect(updateTaiKhoan({
        idtaikhoan: id,
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: {       
            idtktieudung: new BSON.ObjectID(),
            sotien: 100000
        },
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
        no: {
            idtkno: id3,
            sotien: 'abc',
            laisuatno: -1,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})

test('taikhoan update test update cate 14', async()=>{
    await (expect(updateTaiKhoan({
        idtaikhoan: id,
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: {       
            idtktieudung: new BSON.ObjectID(),
            sotien: 100000
        },
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
        no: {
            idtkno: id3,
            sotien: 10000000,
            laisuatno: '-1',
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})
test('taikhoan update test  case 15', async()=>{
    await (expect(updateTaiKhoan({
        idtaikhoan: id,
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: id2,
        tieudung: {       
            idtktieudung: new BSON.ObjectID(),
            sotien: 100000
        },
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
        no: {
            idtkno: id3,
            sotien: 10000000,
            laisuatno:'abc',
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })).rejects.toThrow());
})
idquery1  = new BSON.ObjectID();
idquery2  = new BSON.ObjectID();
idquery3  = new BSON.ObjectID();
idquery4  = new BSON.ObjectID();
idquery5  = new BSON.ObjectID();


test('taikhoan query  case 0', async()=>{
    await insertTaiKhoan( {
        idtaikhoan: idquery1,
        tentaikhoan: 'Tien luong',
        bieutuong: 'icon',
        color: '#32a852',
        thoigiantao: new Date(),
        idnguoidung: idquery2,
        tieudung: {       
            idtktieudung: idquery3,
            sotien: 100000
        },
        tietkiem: {
            idtktietkiem: idquery4,
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
        no: {
            idtkno: idquery5,
            sotien: 10000000,
            laisuatno: 0.2,
            kyhanno: 0,
            ngaybatdauno: new Date(121,3,31),
            ngaytradukien: new Date(121,6,31),
            sotientradukien: 10000000,
        },
    })
})
test('taikhoan query test case 1 ', async ()=>{
    await queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:idquery1,
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoanno:true,
        nominAmount:0}).then((tks)=>{
       expect(JSON.parse(JSON.stringify(tks))[0].tentaikhoan).toBe('Tien luong');
    })
})
//
test('taikhoan query test case 2 ', async ()=>{
    await (expect(queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:99,
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:0})).rejects.toThrow());
})

test('taikhoan query test case  3', async ()=>{
    await queryTaiKhoan({
        deactivate:false,
        tentaikhoan:99,
        idtaikhoan:idquery1,
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:0}).then((tks)=>{
            expect(JSON.parse(JSON.stringify(tks))).toEqual([]);
         })
     })
test('taikhoan query test case  4', async ()=>{
    await queryTaiKhoan({
        deactivate:false,
        idtaikhoan:idquery1,
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:0}).then((tks)=>{
      expect(JSON.parse(JSON.stringify(tks))[0].tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoan query test case 5 ', async ()=>{
    await (expect(queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:99,
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:0})).rejects.toThrow());
})
test('taikhoan query test case 6 ', async ()=>{
    await queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:0}).then((tks)=>{
      expect(JSON.parse(JSON.stringify(tks))[0].tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoan query test case 7 ', async ()=>{
    await (expect(queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        nguoidungid:99,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:0})).rejects.toThrow());
})
test('taikhoan query test case 8', async ()=>{
    await queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:idquery1,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:0}).then((tks)=>{
      expect(JSON.parse(JSON.stringify(tks))[0].tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoan query test case  9', async ()=>{
    await (expect(queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:idquery1,
        nguoidungid:idquery2,
        idtktieudung:99,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:0})).rejects.toThrow());
})
test('taikhoan query test case  10', async ()=>{
    await queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:idquery1,
        nguoidungid:idquery2,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:0}).then((tks)=>{
      expect(JSON.parse(JSON.stringify(tks))[0].tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoan query test case 11 ', async ()=>{
    await (expect(queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:idquery1,
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtktietkiem:99,
        idtkno:idquery5,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:0})).rejects.toThrow());
    })
test('taikhoan query test case 12 ', async ()=>{
    await queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:idquery1,
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtkno:idquery5,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:0}).then((tks)=>{
      expect(JSON.parse(JSON.stringify(tks))[0].tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoan query test case 13 ', async ()=>{
    await (expect(queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:idquery1,
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        idtkno:99,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:0})).rejects.toThrow());
})
test('taikhoan query test case 14  ', async ()=>{
    await queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:idquery1,
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        taikhoantieudung:true,
        nominAmount:0}).then((tks)=>{
      expect(JSON.parse(JSON.stringify(tks))[0].tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoan query test case 15 ', async ()=>{
    await queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:idquery1,
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoantieudung:true,
        nominAmount:0}).then((tks)=>{
      expect(JSON.parse(JSON.stringify(tks))[0].tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoan query test case  16', async ()=>{
    await queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:idquery1,
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoanno:true,
        nominAmount:0}).then((tks)=>{
      expect(JSON.parse(JSON.stringify(tks))[0].tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoan query test case 17 ', async ()=>{
    await queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:idquery1,
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:0}).then((tks)=>{
      expect(JSON.parse(JSON.stringify(tks))[0].tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoan query test case 18  ', async ()=>{
    await queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:idquery1,
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:0}).then((tks)=>{
      expect(JSON.parse(JSON.stringify(tks))[0].tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoan query test case 19 ', async ()=>{
    await queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:idquery1,
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:10000000}).then((tks)=>{
      expect(JSON.parse(JSON.stringify(tks))[0].tentaikhoan).toBe('Tien luong');
    })
})
test('taikhoan query test case  20', async ()=>{
    await (expect(queryTaiKhoan({
        deactivate:false,
        tentaikhoan:'Tien luong',
        idtaikhoan:idquery1,
        nguoidungid:idquery2,
        idtktieudung:idquery3,
        idtktietkiem:idquery4,
        idtkno:idquery5,
        taikhoanno:false,
        taikhoantietkiem:false,
        taikhoantieudung:false,
        nominAmount:"abc"})).rejects.toThrow());
})

test('delete taikhoan case 1', async()=>{
    await deleteTaiKhoan(idquery1).then((rs)=>{
        expect(rs).toBe(true);
    })
})
test('delete taikhoan case 2', async()=>{
    await (expect(deleteTaiKhoan(99))).rejects.toThrow();
})