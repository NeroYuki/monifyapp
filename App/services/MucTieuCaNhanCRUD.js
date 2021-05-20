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
            let updateMucTieuCaNhan=realm.objectForPrimaryKey(MucTieuCaNhanSchema.name,MucTieuCaNhan.idmuctieu)
            updateMucTieuCaNhan.loaimuctieu.tietkiemdenmuc=MucTieuCaNhan.loaimuctieu.tietkiemdenmuc
            updateMucTieuCaNhan.loaimuctieu.tieudungquamuc=MucTieuCaNhan.loaimuctieu.tieudungquamuc
            updateMucTieuCaNhan.loaimuctieu.sodutoithieu=MucTieuCaNhan.loaimuctieu.sodutoithieu
            updateMucTieuCaNhan.sotienmuctieu=MucTieuCaNhan.sotienmuctieu
            updateMucTieuCaNhan.ngaybatdau=MucTieuCaNhan.ngaybatdau
            updateMucTieuCaNhan.ngayketthuc=MucTieuCaNhan.ngayketthuc
            resolve(updateMucTieuCaNhan)
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
      Taget=Taget.filtered('idnguoidung.idnguoidung==$0',option.id)
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
    resolve(Taget)
  }).catch((error)=>reject(error))
})