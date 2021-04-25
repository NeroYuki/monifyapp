import Realm from 'realm';

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
      tieudung: {
        sotien: 'double?',
      },
      tietkiem: {
        sotien: 'double?',
        laisuattietkiem: 'double?',
        laisuattruochan: 'string?',
        idtkduocthuhuong: 'int?',
        kyhantietkiem: 'int?', // đơn vị tháng
        loaitietkiem: {
          ruttatca: {type: 'bool', default: false}, //Rút tất cả gốc lẫn lãi
          tieptuc: {type: 'bool', default: false}, //Tiếp tục tiết kiệm cả gốc lẫn lãi
          rutlai: {type: 'bool', default: false}, //Tiếp tục nhưng rút lãi
        },
        ngaybatdau: 'date?',
        ngayrutdukien: 'date?',
        sotiencodukien: 'double?',
      },
      no: {
        sotien: 'double?',
        laisuatno: 'double?',
        kyhanno: 'int?',
        ngaybatdauno: 'date?',
        ngaytradukien: 'date?',
        sotientradukien: 'double?',
      },
    },
  },
  primaryKey: 'idtaikhoan',
};

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

    giaodichtheochuky: {
      loaihangmucgd: 'HangMucTaiChinh',
      chukygiaodichtheongay: 'int',
      chukygiaodichtheothang: 'int',
    },
  },
  primaryKey: 'idgiaodich',
};

export const MucTieuCaNhanSchema = {
  name: 'MucTieuCaNhan',
  properties: {
    idmuctieu: 'objectId',
    idnguoidung: 'NguoiDung',
    thoigiantao: 'date',
    loaimuctieu: {
      tietkiemdenmuc: {type: 'bool', default: false},
      tieudungquamuc: {type: 'bool', default: false},
      sodutoithieu: {type: 'bool', default: false},
    },
    sotienmuctieu: 'double',
    ngaybatdau: 'date',
    ngayketthuc: 'date',
    phantrammuctieuhoanthanh: 'double',
    songayconlai: 'date',
    khanangmuctieuhoanthanh: 'double',
  },
  primaryKey: 'idmuctieu',
};
export const HangMucTaiChinhSchema = {
  name: 'HangMucTaiChinh',
  properties: {
    idhangmuctaichinh: 'objectId',
    idnguoidung: 'NguoiDung',
    thoigiantao: 'date',
    tenhangmuc: 'string',
    loaihangmuc: {
      chitieu: {type: 'bool', default: false},
      thunhap: {type: 'bool', default: false},
    },
    iconhangmuc: 'string',
  },
  primaryKey: 'idmuctieu',
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
