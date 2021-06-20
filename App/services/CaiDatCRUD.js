import  { monifydata,CaiDatSchema} from './Schema';
import Realm, { schemaVersion,BSON } from 'realm';

const data = monifydata;

export const insertCaiDat = (newCaiDat) =>
  new Promise((resolve, reject) => {
    Realm.open(data).then(realm => {
      realm.write(()=>{
          let CaiDat=realm.create(CaiDatSchema.name,newCaiDat)
          resolve(CaiDat)
      })
    }).catch((error)=>{
      reject(error)
      return
    })
  })

export const updateCaiDat=CaiDat=> new Promise((resolve,reject)=>{
    Realm.open(data).then(realm=>{
        realm.write(()=>{
            let updateCaiDat=realm.objectForPrimaryKey(CaiDatSchema.name,CaiDat.idcaidat)
            if(CaiDat.loaitien)
            {
              updateCaiDat.loaitien=CaiDat.loaitien
            }
            if(CaiDat.chedo)
            {
              updateCaiDat.chedo=CaiDat.chedo
            }
            if(CaiDat.ngonngu)
            {
              updateCaiDat.ngonngu=CaiDat.ngonngu
            }
            if(typeof(CaiDat.chedonghiemngat)=='boolean')
            {
              updateCaiDat.chedonghiemngat=CaiDat.chedonghiemngat
            }
            resolve(updateCaiDat)
        })
    }).catch((error)=>{
      reject(error)
      return
    })
})

export const deleteCaiDat=CaiDat=> new Promise((resolve,reject)=>{
    Realm.open(data).then(realm=>{
        let IDCaiDat = (CaiDat.idcaidat)?new BSON.ObjectID(JSON.parse(JSON.stringify(CaiDat.idcaidat))):null
        if(!IDCaiDat)
        {
          reject('ThatBai')
          return
        }  
        realm.write(()=>{
            let deleteCaiDat=realm.objectForPrimaryKey(CaiDatSchema.name,CaiDat.idcaidat)
            realm.delete(deleteCaiDat)
            // console.log(IDHangMucGiaoDichCop)
            // console.log(realm.objectForPrimaryKey(HangMucGiaoDichSchema.name,IDHangMucGiaoDichCop))
            if(!realm.objectForPrimaryKey(CaiDatSchema.name,IDCaiDat))
              resolve('ThanhCong')
            else
              resolve('ThatBai')
        })
    }).catch((error)=>{
      reject(error)
      return
    })
})

export const queryCaiDat=(option)=> new Promise((resolve,reject)=>{
  Realm.open(data).then(realm=>{
    let Taget = realm.objects(CaiDatSchema.name)
    if(option.idcaidat)
    {
      Taget=Taget.filtered('idcaidat==$0',option.idcaidat)
    }
    if(option.thoigiantao)
    {
      Taget=Taget.filtered('thoigiantao==$0',option.thoigiantao)
    }
    if(option.loaitien)
    {
      Taget=Taget.filtered('loaitien==$0',option.loaitien)
    }
    if(option.chedo)
    {
        Taget=Taget.filtered('chedo==$0',option.chedo)
    }
    if(option.ngonngu)
    {
        Taget=Taget.filtered('ngonngu==$0',option.ngonngu)
    }
    if(typeof(option.chedonghiemngat)=='boolean')
    {
        Taget=Taget.filtered('chedonghiemngat==$0',option.chedonghiemngat)
    }
    if(option.id)
    {
      Taget=Taget.filtered('idnguoidung==$0',option.id)
    }
    // console.log(option.id)
    // console.log(typeof option.id)
    resolve(Taget)
  }).catch((error)=>reject(error))
})