import Realm, { schemaVersion } from 'realm';

export const NguoiDungSchema = {
  name: 'NguoiDung',
  //embeded: true,
  properties: {
    idnguoidung: 'objectId',
    pass: 'string',
    deleted: { type: 'bool', default: false },
  },
  primaryKey: 'idnguoidung',
};

export const TaiKhoanSchema = {
  name: 'TaiKhoan',
  //embeded: true,
  properties: {
    idtaikhoan: 'objectId',
    tentaikhoan: 'string',

    bieutuong: 'string',
    thoigiantao: 'date',
    idnguoidung: 'objectId',
    tieudung:'TKTieuDung?',
    tietkiem:'TKTietKiem?',
    no:'TKNo?',
  },
  primaryKey: 'idtaikhoan',
};
// export const LoaiTaiKhoanConfigSchema = {
//   name: 'LoaiTaiKhoanConfig',
//   embeded: true,
//   properties:{
//     tieudung:'TKTieuDung',
//     tietkiem:'TKTietKiem',
//     no:'TKNo',
//   }
// }

export const TKTieuDungSchema = {
  name: 'TKTieuDung',
  embeded: true,
  properties: {
    idtktieudung: 'objectId',
    sotien: 'double?',
  },
 //primaryKey: 'idtktieudung',
}

export const TKTietKiemSchema = {
  name: 'TKTietKiem',
  embeded: true,
  properties: {
    idtktietkiem: 'objectId',
    sotien: 'double?',
    laisuattietkiem: 'double?',
    laisuattruochan: 'string?',
    idtkduocthuhuong: 'objectId?',
    kyhantietkiem: 'int?', // đơn vị tháng
    //loaitietkiem: 'LoaiTietKiemConfig',
    ngaybatdau: 'date?',
    ngayrutdukien: 'date?',
    sotiencodukien: 'double?',
    ruttatca: { type: 'bool', default: false }, //Rút tất cả gốc lẫn lãi
    tieptuc: { type: 'bool', default: false }, //Tiếp tục tiết kiệm cả gốc lẫn lãi
    rutlai: { type: 'bool', default: false }, //Tiếp tục nhưng rút lãi
  },
  //primaryKey: 'idtktietkiem',
}


export const TKNoSchema = {
  name: 'TKNo',
  embeded: true,
  properties: {
    idtkno: 'objectId',
    sotien: 'double?',
    laisuatno: 'double?',
    kyhanno: 'int?',
    ngaybatdauno: 'date?',
    ngaytradukien: 'date?',
    sotientradukien: 'double?',    
  },
  //primaryKey: 'idtkno',
}

export const GiaoDichSchema = {
  name: 'GiaoDich',
  embeded: true,
  properties: {
    idgiaodich: 'objectId',
    idnguoidung: 'objectId',
    thoigian: 'date',
    idtaikhoan: 'objectId',
    // idtaikhoannhan: 'objectId?',
    sotientieudung: 'double?',
    sotienthunhap: 'double?',
    loaihangmucgd: 'objectId',
    ghichu:'string',
  },
  primaryKey: 'idgiaodich',
};
export const GiaoDichNoiBoSchema = {
  name: 'GiaoDichNoiBo',
  embeded: true,
  properties: {
    idgiaodich: 'objectId',
    idnguoidung: 'objectId',
    thoigian: 'date',
    idtaikhoanchuyen: 'objectId',
    idtaikhoannhan: 'objectId?',
    sotienchuyen: 'double?',
    ghichu:'string',
  },
  primaryKey: 'idgiaodich',
};
export const GiaoDichTheoCKSchema={
  name:'GiaoDichTheoCK',
  embeded: true,
  properties:{
    idgiaodichtheochuky:'objectId',
    idnguoidung: 'objectId',
    thoigian: 'date',
    idtaikhoan: 'objectId?',
    // idtaikhoannhan: 'objectId?',
    sotientieudung: 'double?',
    sotienthunhap: 'double?',
    loaihangmucgd: 'objectId',
    chukygiaodichtheongay: 'int?',
    chukygiaodichtheothang: 'int?',
    thoigiancuoicungcheck: 'date',
    //add because UI demand
    thoigianbatdau: 'date',
    ghichu: 'string?',
    name: 'string?',
    color:'string?',
    pause : { type: 'bool', default: false }, 
  },
  primaryKey:'idgiaodichtheochuky',
}

export const MucTieuCaNhanSchema = {
  name: 'MucTieuCaNhan',
  embeded: true,
  properties: {
    idmuctieu: 'objectId',
    idnguoidung: 'objectId',
    thoigiantao: 'date',
    tenmuctieu:'string',
    loaimuctieu:  'LoaiMucTieuConfig',
    sotienmuctieu: 'double',
    ngaybatdau: 'date',
    ngayketthuc: 'date',
  },
  primaryKey: 'idmuctieu',
};
export const LoaiMucTieuConfigSchema = {
  name: 'LoaiMucTieuConfig',
  embeded: true,
  properties: {
    tietkiemdenmuc: { type: 'bool', default: false },
    tieudungquamuc: { type: 'bool', default: false },
    sodutoithieu: { type: 'bool', default: false },
  }
}
export const HangMucGiaoDichSchema = {
  name: 'HangMucGiaoDich',
  embeded: true,
  properties: {
    idhangmucgiaodich: 'objectId',
    idnguoidung: 'objectId',
    thoigiantao: 'date',
    tenhangmuc: 'string',
    loaihangmuc: 'LoaiHangMucConfig',
    iconhangmuc: 'string',
    color:'string',
    invs:{type:'bool',default:true}
  },
  primaryKey: 'idhangmucgiaodich',
};
export const LoaiHangMucConfigSchema = {
  name : 'LoaiHangMucConfig',
  embeded: true,
  properties:{
    chitieu: { type: 'bool', default: false },
    thunhap: { type: 'bool', default: false },
  }
}
export const CaiDatSchema = {
  name: 'CaiDat',
  embeded: true,
  properties: {
    idcaidat: 'objectId',
    idnguoidung: 'objectId',
    thoigiantao: 'date',
    loaitien: 'string',
    chedo: 'string',
    ngonngu: 'string',
    chedonghiemngat: 'bool',
  },
  primaryKey: 'idcaidat',
};

export const monifydata = {
  path:'monifydata.realm',
  schema:[
    CaiDatSchema,
    GiaoDichSchema,
    HangMucGiaoDichSchema,
    MucTieuCaNhanSchema,
    GiaoDichTheoCKSchema,
    TKNoSchema,
    TKTietKiemSchema,
    TKTieuDungSchema,
    TaiKhoanSchema,
    NguoiDungSchema,
    GiaoDichNoiBoSchema,
    //LoaiTaiKhoanConfigSchema,
    //LoaiTietKiemConfigSchema,
    LoaiMucTieuConfigSchema,
    LoaiHangMucConfigSchema],
    schemaVersion:8,
}