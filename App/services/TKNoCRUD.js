import Realm, { schemaVersion } from 'realm';
import {TKNoSchema,monifydata,LoaiTaiKhoanConfigSchema} from './Schema'
import {BSON} from 'realm'
const data = monifydata;


export const insertTaiKhoanNo = newTaiKhoan => 
  new Promise((resolve,reject)=> {
    Realm.open(data).then(realm=>{
      realm.write(()=>{
        let tk = realm.create(TKNoSchema.name,newTaiKhoan);
        console.log(tk)
        resolve(tk);
      })
    }).catch((error)=> reject(error));
  });


  export const updateTaiKhoan =  updateTaiKhoan => 
  new Promise((resolve,reject)=>{
    Realm.open(data).then(realm => {
      realm.write(()=> {
        let taiKhoanUpdated = realm.objectForPrimaryKey(TKNoSchema.name,updateTaiKhoan.idtkno)
        taiKhoanUpdated.sotien=updateTaiKhoan.sotien;
        taiKhoanUpdated.laisuatno = updateTaiKhoan.laisuatno;
        taiKhoanUpdated.kyhanno = updateTaiKhoan.kyhanno;
        taiKhoanUpdated.ngaytradukien = updateTaiKhoan.ngaytradukien;
        taiKhoanUpdated.sotientradukien = updateTaiKhoan.sotientradukien;
        resolve(taiKhoanUpdated) 
      })
    })
  });

  export const queryTaiKhoan = (option) =>
  new Promise((resolve,reject)=> {
    Realm.open(data).then(realm => {
      realm.write(()=> {
        let Target = realm.objects(TKNoSchema.name)
        if(option.id){
        Target = Target.filtered('idtaikhoan==$0',option.id)
        }
        if(option.nguoidungid){
        Target= Target.filtered('idnguoidung==$0',option.nguoidungid)
        }
        if(option.thoigiantao){
        Taget=Taget.filtered('thoigiantao==$0',option.thoigiantao)
        }
        resolve(Target)
      })
    }).catch((error)=> reject(error));
  })
export const deleteTaiKhoan = taiKhoanID => new Promise((resolve,reject)=>{
  Realm.open(monifydata).then(realm => {
      realm.write(()=> {
          let deletedTaiKhoan =realm.objectForPrimaryKey(TKNoSchema.name,taiKhoanID);
          realm.delete(deletedTaiKhoan);
          resolve(deletedTaiKhoan);
      });
  }).catch((error)=> reject(error));
}); 

