import  { monifydata,GiaoDichTheoCKSchema } from './Schema';
import Realm, { schemaVersion,BSON } from 'realm';

const data = monifydata;

export const insertGiaoDichChuKy = (newGiaoDichChuKy) =>
  new Promise((resolve, reject) => {
    Realm.open(data).then(realm => {
      if(!(newGiaoDichChuKy.sotienthunhap!=null&&newGiaoDichChuKy.sotientieudung!=null))
      {
        if((newGiaoDichChuKy.chukygiaodichtheongay==null&&newGiaoDichChuKy.chukygiaodichtheothang!=null)||(newGiaoDichChuKy.chukygiaodichtheongay!=null&&newGiaoDichChuKy.chukygiaodichtheothang==null))
        {
          realm.write(() => {
            let GiaoDich=realm.create(GiaoDichTheoCKSchema.name, newGiaoDichChuKy)
            resolve(GiaoDich)
          })
        }
        else
        {
          reject('Không được nhập tính chu kỳ theo ngày và cả theo tháng')
        }
      }
      else{
        reject('Không được nhập cả số tiền tiêu dùng và thu nhập')
      }
    }).catch((error)=>reject(error))
  })

export const updateGiaoDichChuKy=GiaoDichChuKy=> new Promise((resolve,reject)=>{
    Realm.open(data).then(realm=>{
        realm.write(()=>{
          if(!(GiaoDichChuKy.sotienthunhap!=null&&GiaoDichChuKy.sotientieudung!=null))
          {
            if(((GiaoDichChuKy.chukygiaodichtheongay==null&&GiaoDichChuKy.chukygiaodichtheothang!=null)||(GiaoDichChuKy.chukygiaodichtheongay!=null&&GiaoDichChuKy.chukygiaodichtheothang==null)))
            {
              let updateGiaoDichChuKy=realm.objectForPrimaryKey(GiaoDichTheoCKSchema.name,GiaoDichChuKy.idgiaodichtheochuky)
              if(GiaoDichChuKy.thoigian)
              {
                updateGiaoDichChuKy.thoigian=GiaoDichChuKy.thoigian
              }
              if(GiaoDichChuKy.name)
              {
                updateGiaoDichChuKy.name=GiaoDichChuKy.name
              }
              if(GiaoDichChuKy.idtaikhoan)
              {
                updateGiaoDichChuKy.idtaikhoan=GiaoDichChuKy.idtaikhoan
              }
              if(GiaoDichChuKy.color)
              {
                updateGiaoDichChuKy.color=GiaoDichChuKy.color
              }
              if(typeof(GiaoDichChuKy.pause)=='boolean')
              {
                updateGiaoDichChuKy.pause=GiaoDichChuKy.pause
              }
              updateGiaoDichChuKy.sotientieudung=GiaoDichChuKy.sotientieudung
              updateGiaoDichChuKy.sotienthunhap=GiaoDichChuKy.sotienthunhap

              if(GiaoDichChuKy.loaihangmucgd)
              {
                updateGiaoDichChuKy.loaihangmucgd=GiaoDichChuKy.loaihangmucgd
              }
              if(GiaoDichChuKy.ghichu)
              {
                updateGiaoDichChuKy.ghichu=GiaoDichChuKy.ghichu
              }
              if(GiaoDichChuKy.thoigiancuoicungcheck)
              {
                updateGiaoDichChuKy.thoigiancuoicungcheck=GiaoDichChuKy.thoigiancuoicungcheck
              }
              if(GiaoDichChuKy.thoigianbatdau)
              {
                updateGiaoDichChuKy.thoigianbatdau=GiaoDichChuKy.thoigianbatdau
              }
              updateGiaoDichChuKy.chukygiaodichtheongay=GiaoDichChuKy.chukygiaodichtheongay
              updateGiaoDichChuKy.chukygiaodichtheothang=GiaoDichChuKy.chukygiaodichtheothang
              resolve(updateGiaoDichChuKy)
              // console.log(JSON.parse(JSON.stringify(updateGiaoDichChuKy)))
            }
            else if((GiaoDichChuKy.chukygiaodichtheongay==null&&GiaoDichChuKy.chukygiaodichtheothang==null)){
              let updateGiaoDichChuKy=realm.objectForPrimaryKey(GiaoDichTheoCKSchema.name,GiaoDichChuKy.idgiaodichtheochuky)
              if(GiaoDichChuKy.thoigian)
              {
                updateGiaoDichChuKy.thoigian=GiaoDichChuKy.thoigian
              }
              if(GiaoDichChuKy.thoigianbatdau)
              {
                updateGiaoDichChuKy.thoigianbatdau=GiaoDichChuKy.thoigianbatdau
              }
              if(GiaoDichChuKy.name)
              {
                updateGiaoDichChuKy.name=GiaoDichChuKy.name
              }
              if(GiaoDichChuKy.idtaikhoan)
              {
                updateGiaoDichChuKy.idtaikhoan=GiaoDichChuKy.idtaikhoan
              }
              if(GiaoDichChuKy.pause==null||GiaoDichChuKy.pause==undefined)
              {
                updateGiaoDichChuKy.sotientieudung=GiaoDichChuKy.sotientieudung
                updateGiaoDichChuKy.sotienthunhap=GiaoDichChuKy.sotienthunhap
              }
              if(GiaoDichChuKy.color)
              {
                updateGiaoDichChuKy.color=GiaoDichChuKy.color
              }
              if(typeof(GiaoDichChuKy.pause)=='boolean')
              {
                updateGiaoDichChuKy.pause=GiaoDichChuKy.pause
              }
              if(GiaoDichChuKy.loaihangmucgd)
              {
                updateGiaoDichChuKy.loaihangmucgd=GiaoDichChuKy.loaihangmucgd
              }
              if(GiaoDichChuKy.ghichu)
              {
                updateGiaoDichChuKy.ghichu=GiaoDichChuKy.ghichu
              }
              if(GiaoDichChuKy.thoigiancuoicungcheck)
              {
                updateGiaoDichChuKy.thoigiancuoicungcheck=GiaoDichChuKy.thoigiancuoicungcheck
              }
              resolve(updateGiaoDichChuKy)
            }
            else
            {
              reject('Không được nhập tính chu kỳ theo ngày và cả theo tháng')
            }
          }
          else{
            reject('Không được nhập cả số tiền tiêu dùng và thu nhập')
          }
        })
    }).catch((error)=>reject(error))
})

export const deleteGiaoDichChuKy=GiaoDichChuKy=> new Promise((resolve,reject)=>{
    Realm.open(data).then(realm=>{
        let IDGiaoDichChuKyCop = (GiaoDichChuKy.idgiaodichtheochuky)?new BSON.ObjectID(JSON.parse(JSON.stringify(GiaoDichChuKy.idgiaodichtheochuky))):null
        if(!IDGiaoDichChuKyCop)
        {
          reject('ThatBai')
          return
        }
        realm.write(()=>{
            let deleteGiaoDichChuKy=realm.objectForPrimaryKey(GiaoDichTheoCKSchema.name,GiaoDichChuKy.idgiaodichtheochuky)
            realm.delete(deleteGiaoDichChuKy)
            // console.log(IDHangMucGiaoDichCop)
            // console.log(realm.objectForPrimaryKey(HangMucGiaoDichSchema.name,IDHangMucGiaoDichCop))
            if(!realm.objectForPrimaryKey(GiaoDichTheoCKSchema.name,IDGiaoDichChuKyCop))
              resolve('ThanhCong')
            else
              resolve('ThatBai')
        })
    }).catch((error)=>reject(error))
})

export const queryGiaoDichChuKy=(option)=> new Promise((resolve,reject)=>{
  Realm.open(data).then(realm=>{
    let Taget = realm.objects(GiaoDichTheoCKSchema.name)
    if(option.idgiaodichtheochuky)
    {
      Taget=Taget.filtered('idgiaodichtheochuky==$0',option.idgiaodichtheochuky)
    }
    if(option.idnguoidung)
    {
      Taget=Taget.filtered('idnguoidung==$0',option.idnguoidung)
    }
    if(option.color)
    {
      Taget=Taget.filtered('color==$0',option.color)
    }
    if(typeof(option.pause)=='boolean')
    {
      Taget=Taget.filtered('pause==$0',option.pause)
    }
    if(option.thoigian)
    {
      Taget=Taget.filtered('thoigian==$0',option.thoigian)
    }
    if(option.idtaikhoan)
    {
      Taget=Taget.filtered('idtaikhoan==$0',option.idtaikhoan)
    }
    if(option.sotientieudung)
    {
      Taget=Taget.filtered('sotientieudung==$0',option.sotientieudung)
    }
    if(option.sotienthunhap)
    {
      Taget=Taget.filtered('sotienthunhap==$0',option.sotienthunhap)
    }
    if(option.loaihangmucgd)
    {
      Taget=Taget.filtered('loaihangmucgd==$0',option.loaihangmucgd)
    }
    if(option.chukygiaodichtheongay)
    {
      Taget=Taget.filtered('chukygiaodichtheongay==$0',option.chukygiaodichtheongay)
    }
    if(option.chukygiaodichtheothang)
    {
      Taget=Taget.filtered('chukygiaodichtheothang==$0',option.chukygiaodichtheothang)
    }
    if(option.ghichu)
    {
      Taget=Taget.filtered('ghichu==$0',option.ghichu)
    }
    if(option.thoigiancuoicungcheck)
    {
      Taget=Taget.filtered('thoigiancuoicungcheck==$0',option.thoigiancuoicungcheck)
    }
    if(option.name)
    {
      Taget=Taget.filtered('name==$0',option.name)
    }
    resolve(Taget)
  }).catch((error)=>reject(error))
})