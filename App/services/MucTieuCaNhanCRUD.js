import  { monifydata,MucTieuCaNhanSchema,LoaiMucTieuConfigSchema } from './Schema';
import Realm, { schemaVersion,BSON } from 'realm';

const data = monifydata;

export const insertMucTieuCaNhan = (newMucTieuCaNhan,LoaiMucTieu) =>
  new Promise((resolve, reject) => {
    Realm.open(data).then(realm => {
      let LoaiMucTieuObj
      if(realm.objects(LoaiMucTieuConfigSchema.name).filtered("tietkiemdenmuc==true")[0] == undefined &&LoaiMucTieu=='TietKiemDenMuc')
      {
        realm.write(()=>{
            LoaiMucTieuObj=realm.create(LoaiMucTieuConfigSchema.name,{
                tietkiemdenmuc:true,
                tieudungquamuc:false,
                sodutoithieu:false,
          })
        })
      }
      else if(realm.objects(LoaiMucTieuConfigSchema.name).filtered("tietkiemdenmuc==true")[0]!=undefined&&LoaiMucTieu=='TietKiemDenMuc')
      {
        LoaiMucTieuObj=realm.objects(LoaiMucTieuConfigSchema.name).filtered("tietkiemdenmuc==true")[0]
      }
      if(realm.objects(LoaiMucTieuConfigSchema.name).filtered("tieudungquamuc==true")[0] == undefined&&LoaiMucTieu=='TieuDungQuaMuc')
      {
        realm.write(()=>{
            LoaiMucTieuObj=realm.create(LoaiMucTieuConfigSchema.name,{
                tietkiemdenmuc:false,
                tieudungquamuc:true,
                sodutoithieu:false,
          })
        })
      }
      else if(realm.objects(LoaiMucTieuConfigSchema.name).filtered("tieudungquamuc==true")[0]!=undefined&&LoaiMucTieu=='TieuDungQuaMuc')
      {
        LoaiMucTieuObj=realm.objects(LoaiMucTieuConfigSchema.name).filtered("tieudungquamuc==true")[0]
      }
      if(realm.objects(LoaiMucTieuConfigSchema.name).filtered("sodutoithieu==true")[0] == undefined&&LoaiMucTieu=='SoDuToiThieu')
      {
        realm.write(()=>{
            LoaiMucTieuObj=realm.create(LoaiMucTieuConfigSchema.name,{
                tietkiemdenmuc:false,
                tieudungquamuc:false,
                sodutoithieu:true,
          })
        })
      }
      else if(realm.objects(LoaiMucTieuConfigSchema.name).filtered("sodutoithieu==true")[0]!=undefined&&LoaiMucTieu=='SoDuToiThieu')
      {
        LoaiMucTieuObj=realm.objects(LoaiMucTieuConfigSchema.name).filtered("sodutoithieu==true")[0]
      }
      if(typeof newMucTieuCaNhan.loaimuctieu==undefined){
        newMucTieuCaNhan.__proto__="loaimuctieu"
        newMucTieuCaNhan.loaimuctieu=JSON.parse(JSON.stringify(LoaiMucTieuObj))
      }
      else
      {  
        newMucTieuCaNhan.loaimuctieu=JSON.parse(JSON.stringify(LoaiMucTieuObj))
      }
      realm.write(() => {
        let MucTieu=realm.create(MucTieuCaNhanSchema.name, newMucTieuCaNhan)
        resolve(MucTieu)
      })
    }).catch((error)=>reject(error))
  })

export const updateMucTieuCaNhan=MucTieuCaNhan=> new Promise((resolve,reject)=>{
    Realm.open(data).then(realm=>{
        realm.write(()=>{
            if(MucTieuCaNhan.loaimuctieu&&(((MucTieuCaNhan.loaimuctieu.tietkiemdenmuc==true)&&(MucTieuCaNhan.loaimuctieu.tieudungquamuc==false)&&(MucTieuCaNhan.loaimuctieu.sodutoithieu==false))||((MucTieuCaNhan.loaimuctieu.tietkiemdenmuc==false)&&(MucTieuCaNhan.loaimuctieu.tieudungquamuc==true)&&(MucTieuCaNhan.loaimuctieu.sodutoithieu==false))||((MucTieuCaNhan.loaimuctieu.tietkiemdenmuc==false)&&(MucTieuCaNhan.loaimuctieu.tieudungquamuc==false)&&(MucTieuCaNhan.loaimuctieu.sodutoithieu==true))))
            {
              let updateMucTieuCaNhan=realm.objectForPrimaryKey(MucTieuCaNhanSchema.name,MucTieuCaNhan.idmuctieu)
              updateMucTieuCaNhan.loaimuctieu.tietkiemdenmuc=MucTieuCaNhan.loaimuctieu.tietkiemdenmuc
              updateMucTieuCaNhan.loaimuctieu.tieudungquamuc=MucTieuCaNhan.loaimuctieu.tieudungquamuc
              updateMucTieuCaNhan.loaimuctieu.sodutoithieu=MucTieuCaNhan.loaimuctieu.sodutoithieu
              if(MucTieuCaNhan.sotienmuctieu)
              {
                updateMucTieuCaNhan.sotienmuctieu=MucTieuCaNhan.sotienmuctieu
              }
              if(MucTieuCaNhan.ngaybatdau)
              {
                updateMucTieuCaNhan.ngaybatdau=MucTieuCaNhan.ngaybatdau
              }
              if(MucTieuCaNhan.ngayketthuc)
              {
                updateMucTieuCaNhan.ngayketthuc=MucTieuCaNhan.ngayketthuc
              }
              if(MucTieuCaNhan.tenmuctieu)
              {
                updateMucTieuCaNhan.tenmuctieu=MucTieuCaNhan.tenmuctieu
              }
              resolve(updateMucTieuCaNhan)
            }
            else if(!MucTieuCaNhan.loaimuctieu)
            {
              let updateMucTieuCaNhan=realm.objectForPrimaryKey(MucTieuCaNhanSchema.name,MucTieuCaNhan.idmuctieu)
              if(MucTieuCaNhan.sotienmuctieu)
              {
                updateMucTieuCaNhan.sotienmuctieu=MucTieuCaNhan.sotienmuctieu
              }
              if(MucTieuCaNhan.ngaybatdau)
              {
                updateMucTieuCaNhan.ngaybatdau=MucTieuCaNhan.ngaybatdau
              }
              if(MucTieuCaNhan.ngayketthuc)
              {
                updateMucTieuCaNhan.ngayketthuc=MucTieuCaNhan.ngayketthuc
              }
              if(MucTieuCaNhan.tenmuctieu)
              {
                updateMucTieuCaNhan.tenmuctieu=MucTieuCaNhan.tenmuctieu
              }
              resolve(updateMucTieuCaNhan)
            }
            else
            {
              reject('Loại mục tiêu có nhiều hơn 1 loại')
            }
            // console.log(JSON.parse(JSON.stringify(updateMucTieuCaNhan)))
        })
    }).catch((error)=>reject(error))
})

export const deleteMucTieuCaNhan=MucTieuCaNhan=> new Promise((resolve,reject)=>{
    Realm.open(data).then(realm=>{
        let IDMucTieuCaNhanCop = new BSON.ObjectID(JSON.parse(JSON.stringify(MucTieuCaNhan.idmuctieu)))
        realm.write(()=>{
            let deleteMucTieuCaNhan=realm.objectForPrimaryKey(MucTieuCaNhanSchema.name,MucTieuCaNhan.idmuctieu)
            realm.delete(deleteMucTieuCaNhan)
            // console.log(IDHangMucGiaoDichCop)
            // console.log(realm.objectForPrimaryKey(HangMucGiaoDichSchema.name,IDHangMucGiaoDichCop))
            if(!realm.objectForPrimaryKey(MucTieuCaNhanSchema.name,IDMucTieuCaNhanCop))
              resolve('ThanhCong')
            else
              resolve('ThatBai')
            // console.log(JSON.parse(JSON.stringify(realm.objects(MucTieuCaNhanSchema.name))))
        })
    }).catch((error)=>reject(error))
})

export const queryMucTieuCaNhan=(option)=> new Promise((resolve,reject)=>{
  Realm.open(data).then(realm=>{
    let Taget = realm.objects(MucTieuCaNhanSchema.name)
    if(option.id)
    {
      Taget=Taget.filtered('idnguoidung==$0',option.id)
    }
    if(option.idmuctieu)
    {
      Taget=Taget.filtered('idmuctieu==$0',option.idmuctieu)
    }
    if(option.thoigiantao)
    {
      Taget=Taget.filtered('thoigiantao==$0',option.thoigiantao)
    }
    if(option.ngaybatdau)
    {
      Taget=Taget.filtered('ngaybatdau==$0',option.ngaybatdau)
    }
    if(option.ngayketthuc)
    {
      Taget=Taget.filtered('ngayketthuc==$0',option.ngayketthuc)
    }
    if(option.sotienmuctieu)
    {
      Taget=Taget.filtered('sotienmuctieu==$0',option.sotienmuctieu)
    }
    if(option.loaimuctieu&&option.loaimuctieu=='TietKiemDenMuc')
    {
      Taget=Taget.filtered('loaimuctieu.tietkiemdenmuc==$0',true)
    }
    if(option.loaimuctieu&&option.loaimuctieu=='TieuDungQuaMuc')
    {
      Taget=Taget.filtered('loaimuctieu.tieudungquamuc==$0',true)
    }
    if(option.loaimuctieu&&option.loaimuctieu=='SoDuToiThieu')
    {
      Taget=Taget.filtered('loaimuctieu.sodutoithieu==$0',true)
    }
    if(option.tenmuctieu)
    {
      Taget=Taget.filtered('tenmuctieu==$0',option.tenmuctieu)
    }
    resolve(Taget)
  }).catch((error)=>reject(error))
})