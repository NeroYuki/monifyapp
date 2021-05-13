import  { monifydata,LoaiHangMucConfigSchema,HangMucGiaoDichSchema } from './Schema';
import Realm, { schemaVersion } from 'realm';

const data = monifydata;

//HangMucGiaoDichSchema
export const insertHangMucGiaoDich = (newHangMucGiaoDich,LoaiHangMuc) =>
  new Promise((resolve, reject) => {
    Realm.open(data).then(realm => {
      let LoaiHangMucObj
      if(realm.objects(LoaiHangMucConfigSchema.name).filtered("chitieu=true")[0] == "undefined"&&LoaiHangMuc=='chitieu')
      {
        realm.write(()=>{
          LoaiHangMucObj=realm.create(LoaiHangMucConfigSchema.name,{
            chitieu:true,
            thunhap:false,
          })
        })
      }
      else if(realm.objects(LoaiHangMucConfigSchema.name).filtered("chitieu=true")[0]!="undefined"&&LoaiHangMuc=='chitieu')
      {
        LoaiHangMucObj=realm.objects(LoaiHangMucConfigSchema.name).filtered("chitieu=true")[0]
      }
      if(realm.objects(LoaiHangMucConfigSchema.name).filtered("thunhap=true")[0]=="undefined"&&LoaiHangMuc=='thunhap')
      {
        realm.write(()=>{
          LoaiHangMucObj=realm.create(LoaiHangMucConfigSchema.name,{
            chitieu:false,
            thunhap:true,
          })
        })
      }
      else if(realm.objects(LoaiHangMucConfigSchema.name).filtered("thunhap=true")[0]!="undefined"&&LoaiHangMuc=='thunhap')
      {
        LoaiHangMucObj=realm.objects(LoaiHangMucConfigSchema.name).filtered("thunhap=true")[0]
      }
      if(typeof newHangMucGiaoDich.loaihangmuc=='undefined'){
        newHangMucGiaoDich.__proto__="loaihangmuc"
        newHangMucGiaoDich.loaihangmuc=JSON.parse(JSON.stringify(LoaiHangMucObj))
      }
      else
      {  
        newHangMucGiaoDich.loaihangmuc=JSON.parse(JSON.stringify(LoaiHangMucObj))
      }
      realm.write(() => {
        realm.create(HangMucGiaoDichSchema.name, newHangMucGiaoDich)
        resolve(newHangMucGiaoDich)
      })
    }).catch((error)=>reject(error))
  })

export const updateHangMucGiaoDich=HangMucGiaoDich=> new Promise((resolve,reject)=>{
    Realm.open(data).then(realm=>{
        realm.write(()=>{
            let updateHangMucGiaoDich=realm.objectForPrimaryKey(HangMucGiaoDich,HangMucGiaoDich.idhangmucgiaodich)
            updateHangMucGiaoDich.tenhangmuc=HangMucGiaoDich.tenhangmuc
            updateHangMucGiaoDich.loaihangmuc.chitieu=HangMucGiaoDich.chitieu
            updateHangMucGiaoDich.loaihangmuc.thunhap=HangMucGiaoDich.thunhap
            updateHangMucGiaoDich.iconhangmuc=HangMucGiaoDich.iconhangmuc
            resolve()
        })
    }).catch((error)=>reject(error))
})
export const deleteHangMucGiaoDich=HangMucGiaoDich=> new Promise((resolve,reject)=>{
    Realm.open(data).then(realm=>{
        realm.write(()=>{
            let deleteHangMucGiaoDich=realm.objectForPrimaryKey(HangMucGiaoDich,HangMucGiaoDich.idhangmucgiaodich)
            realm.delete(deleteHangMucGiaoDich)
            resolve()
        })
    }).catch((error)=>reject(error))
})
