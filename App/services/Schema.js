import Realm, { schemaVersion } from 'realm';

export const NguoiDungSchema = {
  name: 'NguoiDung',
  properties: {
    idnguoidung: 'objectId',
    pass: 'string',
  },
  primaryKey: 'idnguoidung',
};

export const TaiKhoanSchema = {
  name: 'TaiKhoan',
  properties: {
    idtaikhoan: 'objectId',
    tentaikhoan: 'string',

    bieutuong: 'string',
    thoigiantao: 'date',
    idnguoidung: 'NguoiDung',
    loaitaikhoan: {
      tieudung:'TKTieuDung',
      tietkiem:'TKTietKiem',
      no:'TKNo',
    },
  },
  primaryKey: 'idtaikhoan',
};

export const TKTieuDungSchema = {
  name: 'TKTieuDung',
  properties: {
    idtktieudung: 'objectId',
    sotien: 'double?',
  },
  primaryKey: 'idtktieudung',
}

export const TKTietKiemSchema = {
  name: 'TKTietKiem',
  properties: {
    idtktietkiem: 'objectId',
    sotien: 'double?',
    laisuattietkiem: 'double?',
    laisuattruochan: 'string?',
    idtkduocthuhuong: 'int?',
    kyhantietkiem: 'int?', // đơn vị tháng
    loaitietkiem: {
      ruttatca: { type: 'bool', default: false }, //Rút tất cả gốc lẫn lãi
      tieptuc: { type: 'bool', default: false }, //Tiếp tục tiết kiệm cả gốc lẫn lãi
      rutlai: { type: 'bool', default: false }, //Tiếp tục nhưng rút lãi
    },
    ngaybatdau: 'date?',
    ngayrutdukien: 'date?',
    sotiencodukien: 'double?',
  },
  primaryKey: 'idtktietkiem',
}

export const TKNoSchema = {
  name: 'TKNo',
  properties: {
    idtkno: 'objectId',
    sotien: 'double?',
    laisuatno: 'double?',
    kyhanno: 'int?',
    ngaybatdauno: 'date?',
    ngaytradukien: 'date?',
    sotientradukien: 'double?',
  },
  primaryKey: 'idtkno',
}

export const GiaoDichSchema = {
  name: 'GiaoDich',
  properties: {
    idgiaodich: 'objectId',
    idnguoidung: 'NguoiDung',
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
  properties: {
    idmuctieu: 'objectId',
    idnguoidung: 'NguoiDung',
    thoigiantao: 'date',
    loaimuctieu: {
      tietkiemdenmuc: { type: 'bool', default: false },
      tieudungquamuc: { type: 'bool', default: false },
      sodutoithieu: { type: 'bool', default: false },
    },
    sotienmuctieu: 'double',
    ngaybatdau: 'date',
    ngayketthuc: 'date',
  },
  primaryKey: 'idmuctieu',
};
export const HangMucGiaoDichSchema = {
  name: 'HangMucGiaoDich',
  properties: {
    idhangmucgiaodich: 'objectId',
    idnguoidung: 'NguoiDung',
    thoigiantao: 'date',
    tenhangmuc: 'string',
    loaihangmuc: {
      chitieu: { type: 'bool', default: false },
      thunhap: { type: 'bool', default: false },
    },
    iconhangmuc: 'string',
  },
  primaryKey: 'idhangmucgiaodich',
};

export const CaiDatSchema = {
  name: 'CaiDat',
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
  path:'monifydata',
  schema:[CaiDatSchema,GiaoDichSchema,HangMucGiaoDichSchema,MucTieuCaNhanSchema,GiaoDichTheoCKSchema,TKNoSchema,TKTietKiemSchema,TKTieuDungSchema,TaiKhoanSchema,NguoiDungSchema],
  schemaVersion:0,
}