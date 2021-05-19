import  { monifydata,LoaiHangMucConfigSchema,HangMucGiaoDichSchema } from './Schema';
import Realm, { schemaVersion,BSON } from 'realm';

const data = monifydata;

//HangMucGiaoDichSchema
export const insertHangMucGiaoDich = (newHangMucGiaoDich,LoaiHangMuc) =>
  new Promise((resolve, reject) => {
    Realm.open(data).then(realm => {
      let LoaiHangMucObj
      if(realm.objects(LoaiHangMucConfigSchema.name).filtered("chitieu==true")[0] == "undefined"&&LoaiHangMuc=='chitieu')
      {
        realm.write(()=>{
          LoaiHangMucObj=realm.create(LoaiHangMucConfigSchema.name,{
            chitieu:true,
            thunhap:false,
          })
        })
      }
      else if(realm.objects(LoaiHangMucConfigSchema.name).filtered("chitieu==true")[0]!="undefined"&&LoaiHangMuc=='chitieu')
      {
        LoaiHangMucObj=realm.objects(LoaiHangMucConfigSchema.name).filtered("chitieu==true")[0]
      }
      if(realm.objects(LoaiHangMucConfigSchema.name).filtered("thunhap==true")[0]=="undefined"&&LoaiHangMuc=='thunhap')
      {
        realm.write(()=>{
          LoaiHangMucObj=realm.create(LoaiHangMucConfigSchema.name,{
            chitieu:false,
            thunhap:true,
          })
        })
      }
      else if(realm.objects(LoaiHangMucConfigSchema.name).filtered("thunhap==true")[0]!="undefined"&&LoaiHangMuc=='thunhap')
      {
        LoaiHangMucObj=realm.objects(LoaiHangMucConfigSchema.name).filtered("thunhap==true")[0]
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
        let HangMuc=realm.create(HangMucGiaoDichSchema.name, newHangMucGiaoDich)
        resolve(HangMuc)
      })
    }).catch((error)=>reject(error))
  })

export const updateHangMucGiaoDich=HangMucGiaoDich=> new Promise((resolve,reject)=>{
    Realm.open(data).then(realm=>{
        realm.write(()=>{
            let updateHangMucGiaoDich=realm.objectForPrimaryKey(HangMucGiaoDichSchema.name,HangMucGiaoDich.idhangmucgiaodich)
            updateHangMucGiaoDich.tenhangmuc=HangMucGiaoDich.tenhangmuc
            updateHangMucGiaoDich.loaihangmuc=JSON.parse(JSON.stringify(HangMucGiaoDich.loaihangmuc))
            updateHangMucGiaoDich.iconhangmuc=HangMucGiaoDich.iconhangmuc
            resolve(updateHangMucGiaoDich)
        })
    }).catch((error)=>reject(error))
})

export const deleteHangMucGiaoDich=HangMucGiaoDich=> new Promise((resolve,reject)=>{
    Realm.open(data).then(realm=>{
        let IDHangMucGiaoDichCop = new BSON.ObjectID(JSON.parse(JSON.stringify(HangMucGiaoDich.idhangmucgiaodich)))
        realm.write(()=>{
            let deleteHangMucGiaoDich=realm.objectForPrimaryKey(HangMucGiaoDichSchema.name,HangMucGiaoDich.idhangmucgiaodich)
            realm.delete(deleteHangMucGiaoDich)
            // console.log(IDHangMucGiaoDichCop)
            // console.log(realm.objectForPrimaryKey(HangMucGiaoDichSchema.name,IDHangMucGiaoDichCop))
            if(!realm.objectForPrimaryKey(HangMucGiaoDichSchema.name,IDHangMucGiaoDichCop))
              resolve('ThanhCong')
            else
              resolve('ThatBai')
        })
    }).catch((error)=>reject(error))
})

export const queryHangMucGiaoDich=(option)=> new Promise((resolve,reject)=>{
  Realm.open(data).then(realm=>{
    let Taget = realm.objects(HangMucGiaoDichSchema.name)
    if(option.thoigiantao)
    {
      Taget=Taget.filtered('thoigiantao==$0',option.thoigiantao)
    }
    if(option.tenhangmuc)
    {
      Taget=Taget.filtered('tenhangmuc==$0',option.tenhangmuc)
    }
    if(option.loaihangmuc&&option.loaihangmuc=='ChiTieu')
    {
      Taget=Taget.filtered('loaihangmuc.chitieu==$0',true)
    }
    if(option.loaihangmuc&&option.loaihangmuc=='ThuNhap')
    {
      Taget=Taget.filtered('loaihangmuc.thunhap==$0',true)
    }
    if(option.id)
    {
      Taget=Taget.filtered('idnguoidung.idnguoidung==$0',option.id)
    }
    resolve(Taget)
  }).catch((error)=>reject(error))
})