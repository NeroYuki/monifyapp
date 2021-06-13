import  { monifydata,GiaoDichSchema } from './Schema';
import Realm, { schemaVersion,BSON } from 'realm';

const data = monifydata;

export const insertGiaoDich = (newGiaoDich) =>
  new Promise((resolve, reject) => {
    Realm.open(data).then(realm => {
      if((newGiaoDich.sotienthunhap!=null&&newGiaoDich.sotientieudung==null)||(newGiaoDich.sotienthunhap==null&&newGiaoDich.sotientieudung!=null))
      {
        realm.write(() => {
          let GiaoDich=realm.create(GiaoDichSchema.name, newGiaoDich)
          resolve(GiaoDich)
        })
      }
      else{
        reject('Không được nhập cả số tiền tiêu dùng và thu nhập')
      }
    }).catch((error)=>reject(error))
  })

export const updateGiaoDich=GiaoDich=> new Promise((resolve,reject)=>{
    Realm.open(data).then(realm=>{
        realm.write(()=>{
            if((GiaoDich.sotienthunhap!=null&&GiaoDich.sotientieudung==null)||(GiaoDich.sotienthunhap==null&&GiaoDich.sotientieudung!=null))
            {
              let updateGiaoDich=realm.objectForPrimaryKey(GiaoDichSchema.name,GiaoDich.idgiaodich)
              if(GiaoDich.thoigian)
              {
                updateGiaoDich.thoigian=GiaoDich.thoigian
              }
              if(GiaoDich.idtaikhoan)
              {
                updateGiaoDich.idtaikhoan=GiaoDich.idtaikhoan
              }
              updateGiaoDich.sotientieudung=GiaoDich.sotientieudung
              updateGiaoDich.sotienthunhap=GiaoDich.sotienthunhap
              if(GiaoDich.loaihangmucgd)
              {
                updateGiaoDich.loaihangmucgd=GiaoDich.loaihangmucgd
              }
              if(GiaoDich.ghichu)
              {
                updateGiaoDich.ghichu=GiaoDich.ghichu
              }
              if(GiaoDich.name)
              {
                updateGiaoDich.name=GiaoDich.name
              }
              resolve(updateGiaoDich)
              // console.log(JSON.parse(JSON.stringify(updateGiaoDichChuKy)))
            }
            else{
              reject('Chỉ được điền một trong hai loại tiền')
            }
        })
    }).catch((error)=>reject(error))
})

export const deleteGiaoDich=GiaoDich=> new Promise((resolve,reject)=>{
    Realm.open(data).then(realm=>{
        let IDGiaoDichCop = (GiaoDich.idgiaodich)?new BSON.ObjectID(JSON.parse(JSON.stringify(GiaoDich.idgiaodich))):null
        if(!IDGiaoDichCop)
        {  
          reject('ThatBai')
          return
        }
        realm.write(()=>{
            let deleteGiaoDich=realm.objectForPrimaryKey(GiaoDichSchema.name,GiaoDich.idgiaodich)
            realm.delete(deleteGiaoDich)
            // console.log(IDHangMucGiaoDichCop)
            // console.log(realm.objectForPrimaryKey(HangMucGiaoDichSchema.name,IDHangMucGiaoDichCop))
            if(!realm.objectForPrimaryKey(GiaoDichSchema.name,IDGiaoDichCop))
              resolve('ThanhCong')
            else
              resolve('ThatBai')
        })
    }).catch((error)=>reject(error))
})

export const queryGiaoDich=(option)=> new Promise((resolve,reject)=>{
  Realm.open(data).then(realm=>{
    let Taget = realm.objects(GiaoDichSchema.name)
    if(option.idgiaodich)
    {
      Taget=Taget.filtered('idgiaodich==$0',option.idgiaodich)
    }
    if(option.idnguoidung)
    {
      Taget=Taget.filtered('idnguoidung==$0',option.idnguoidung)
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
    if(option.ghichu)
    {
      Taget=Taget.filtered('ghichu==$0',option.ghichu)
    }
    resolve(Taget)
  }).catch((error)=>reject(error))
})