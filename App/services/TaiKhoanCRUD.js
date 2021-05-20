import Realm, { schemaVersion } from 'realm';
import {TaiKhoanSchema,monifydata,LoaiTaiKhoanConfigSchema} from './Schema'
import {BSON} from 'realm'

const data = monifydata;

export const insertTaiKhoan = newTaiKhoan => 
  new Promise((resolve,reject)=> {
    Realm.open(data).then(realm=>{
      realm.write(()=>{
        let tk = realm.create(TaiKhoanSchema.name,newTaiKhoan);
        console.log(tk)
        resolve(tk);
      })
    }).catch((error)=> reject(error));
  });

export const updateTaiKhoan =  updateTaiKhoan => 
  new Promise((resolve,reject)=>{
    Realm.open(data).then(realm => {
      let taiKhoanUpdated = realm.objectForPrimaryKey(TaiKhoanSchema.name,updateTaiKhoan.idtaikhoan)
      taiKhoanUpdated.tentaikhoan=updateTaiKhoan.tentaikhoan;
      taiKhoanUpdated.bieutuong = updateTaiKhoan.bieutuong;
      if(taiKhoanUpdated.loaitaikhoan != null) {
        Object.assign(taiKhoanUpdated.loaitaikhoan, updateTaiKhoan.loaitaikhoan)
        // if(taiKhoanUpdated.loaitaikhoan.tieudung != null  {
        //   taiKhoanUpdated.loaitaikhoan.tieudung = updateTaiKhoan.loaitaikhoan.tieudung
        // }
        // else if(taiKhoanUpdated.loaitaikhoan.tietkiem != null){

        // }
        // else if(taiKhoanUpdated.loaitaikhoan.no != null){

        // }
      }     
      resolve(taiKhoanUpdated) 
    }).catch((error)=> reject(error));
  });
export const queryTaiKhoan = (taiKhoanId,loaiTaiKhoanQuery,sotien1,sotien2,date1,date2) =>
  new Promise((resolve,reject)=> {
    Realm.open(data).then(realm => {
      let AllTaiKhoan = realm.objects(TaiKhoanSchema.name).filtered()
        
    })
  })
export const deleteTaiKhoan = taiKhoanID => new Promise((resolve,reject)=>{
  Realm.open(monifydata).then(realm => {
      realm.write(()=> {
          let deletedTaiKhoan =realm.objectForPrimaryKey(TaiKhoanSchema.name,taiKhoanID);
          realm.delete(deletedTaiKhoan);
          resolve(deletedTaiKhoan);
      });
  }).catch((error)=> reject(error));
}); 









// //HangMucGiaoDichSchema
// export const insertHangMucGiaoDich = (newHangMucGiaoDich,LoaiHangMuc) =>
//   new Promise((resolve, reject) => {
//     Realm.open(data).then(realm => {
//       let LoaiHangMucObj
//       if(realm.objects(LoaiHangMucConfigSchema.name).filtered("chitieu=true")[0] == "undefined"&&LoaiHangMuc=='chitieu')
//       {
//         realm.write(()=>{
//           LoaiHangMucObj=realm.create(LoaiHangMucConfigSchema.name,{
//             chitieu:true,
//             thunhap:false,
//           })
//         })
//       }
//       else if(realm.objects(LoaiHangMucConfigSchema.name).filtered("chitieu=true")[0]!="undefined"&&LoaiHangMuc=='chitieu')
//       {
//         LoaiHangMucObj=realm.objects(LoaiHangMucConfigSchema.name).filtered("chitieu=true")[0]
//       }
//       if(realm.objects(LoaiHangMucConfigSchema.name).filtered("thunhap=true")[0]=="undefined"&&LoaiHangMuc=='thunhap')
//       {
//         realm.write(()=>{
//           LoaiHangMucObj=realm.create(LoaiHangMucConfigSchema.name,{
//             chitieu:false,
//             thunhap:true,
//           })
//         })
//       }
//       else if(realm.objects(LoaiHangMucConfigSchema.name).filtered("thunhap=true")[0]!="undefined"&&LoaiHangMuc=='thunhap')
//       {
//         LoaiHangMucObj=realm.objects(LoaiHangMucConfigSchema.name).filtered("thunhap=true")[0]
//       }
//       if(typeof newHangMucGiaoDich.loaihangmuc=='undefined'){
//         newHangMucGiaoDich.__proto__="loaihangmuc"
//         newHangMucGiaoDich.loaihangmuc=JSON.parse(JSON.stringify(LoaiHangMucObj))
//       }
//       else
//       {  
//         newHangMucGiaoDich.loaihangmuc=JSON.parse(JSON.stringify(LoaiHangMucObj))
//       }
//       realm.write(() => {
//         realm.create(HangMucGiaoDichSchema.name, newHangMucGiaoDich)
//         resolve(newHangMucGiaoDich)
//       })
//     }).catch((error)=>reject(error))
//   })

// export const updateHangMucGiaoDich=HangMucGiaoDich=> new Promise((resolve,reject)=>{
//     Realm.open(data).then(realm=>{
//         realm.write(()=>{
//             let updateHangMucGiaoDich=realm.objectForPrimaryKey(HangMucGiaoDich,HangMucGiaoDich.idhangmucgiaodich)
//             updateHangMucGiaoDich.tenhangmuc=HangMucGiaoDich.tenhangmuc
//             updateHangMucGiaoDich.loaihangmuc.chitieu=HangMucGiaoDich.chitieu
//             updateHangMucGiaoDich.loaihangmuc.thunhap=HangMucGiaoDich.thunhap
//             updateHangMucGiaoDich.iconhangmuc=HangMucGiaoDich.iconhangmuc
//             resolve()
//         })
//     }).catch((error)=>reject(error))
// })
// export const deleteHangMucGiaoDich=HangMucGiaoDich=> new Promise((resolve,reject)=>{
//     Realm.open(data).then(realm=>{
//         realm.write(()=>{
//             let deleteHangMucGiaoDich=realm.objectForPrimaryKey(HangMucGiaoDich,HangMucGiaoDich.idhangmucgiaodich)
//             realm.delete(deleteHangMucGiaoDich)
//             resolve()
//         })
//     }).catch((error)=>reject(error))
// })