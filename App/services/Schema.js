import Realm, { schemaVersion } from 'realm';

export const NguoiDungSchema = {
  name: 'NguoiDung',
  embeded: true,
  properties: {
    idnguoidung: 'objectId',
    pass: 'string',
  },
  primaryKey: 'idnguoidung',
};

export const TaiKhoanSchema = {
  name: 'TaiKhoan',
  embeded: true,
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
 primaryKey: 'idtktieudung',
}

export const TKTietKiemSchema = {
  name: 'TKTietKiem',
  embeded: true,
  properties: {
    idtktietkiem: 'objectId',
    sotien: 'double?',
    laisuattietkiem: 'double?',
    laisuattruochan: 'string?',
    idtkduocthuhuong: 'int?',
    kyhantietkiem: 'int?', // đơn vị tháng
    //loaitietkiem: 'LoaiTietKiemConfig',
    ngaybatdau: 'date?',
    ngayrutdukien: 'date?',
    sotiencodukien: 'double?',
    ruttatca: { type: 'bool', default: false }, //Rút tất cả gốc lẫn lãi
    tieptuc: { type: 'bool', default: false }, //Tiếp tục tiết kiệm cả gốc lẫn lãi
    rutlai: { type: 'bool', default: false }, //Tiếp tục nhưng rút lãi
  },
  primaryKey: 'idtktietkiem',
}

// export const LoaiTietKiemConfigSchema = {
//   name: "LoaiTietKiemConfig",
//   embeded: true,
//   properties: {
    
//   }
// }

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
    idtaikhoan: 'objectId?'
    
  },
  primaryKey: 'idtkno',
}

export const GiaoDichSchema = {
  name: 'GiaoDich',
  embeded: true,
  properties: {
    idgiaodich: 'objectId',
    thoigian: 'date',
    idtaikhoanchuyen: 'TaiKhoan',
    idtaikhoannhan: 'TaiKhoan?',
    sotientieudung: 'double',
    sotienthunhap: 'double',
    loaihangmucgd: 'HangMucGiaoDich',
  },
  primaryKey: 'idgiaodich',
};

export const GiaoDichTheoCKSchema={
  name:'GiaoDichTheoCK',
  embeded: true,
  properties:{
    idgiaodichtheochuky:'objectId',
    idnguoidung: 'NguoiDung',
    thoigian: 'date',
    idtaikhoanchuyen: 'TaiKhoan?',
    idtaikhoannhan: 'TaiKhoan?',
    sotientieudung: 'double?',
    sotienthunhap: 'double?',
    loaihangmucgd: 'HangMucGiaoDich',
    chukygiaodichtheongay: 'int',
    chukygiaodichtheothang: 'int',
  },
  primaryKey:'idgiaodichtheochuky',
}

export const MucTieuCaNhanSchema = {
  name: 'MucTieuCaNhan',
  embeded: true,
  properties: {
    idmuctieu: 'objectId',
    idnguoidung: 'NguoiDung',
    thoigiantao: 'date',
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
    idnguoidung: 'NguoiDung',
    thoigiantao: 'date',
    tenhangmuc: 'string',
    loaihangmuc: 'LoaiHangMucConfig',
    iconhangmuc: 'string',
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
    idnguoidung: 'string',
    thoigiantao: 'string',
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
    LoaiTaiKhoanConfigSchema,
    //LoaiTietKiemConfigSchema,
    LoaiMucTieuConfigSchema,
    LoaiHangMucConfigSchema],
  schemaVersion:0,
}