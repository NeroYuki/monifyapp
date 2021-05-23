import Realm, { schemaVersion } from 'realm';
import {TaiKhoanSchema,monifydata,TKTieuDungSchema,TKTietKiemSchema,TKNoSchema} from './Schema'
import {BSON} from 'realm'

const data = monifydata;

export const insertTaiKhoan = newTaiKhoan => 
  new Promise((resolve,reject)=> {
    Realm.open(data).then(realm=>{
      if(newTaiKhoan.tieudung != null) {
        let tieudungoption = realm.objectForPrimaryKey(TKTieuDungSchema.name, newTaiKhoan.tieudung.idtktieudung)
        newTaiKhoan.tieudung = tieudungoption
      }
      else if(newTaiKhoan.tietkiem != null){
        let tietkiemoption = realm.objectForPrimaryKey(TKTietKiemSchema.name, newTaiKhoan.tietkiem.idtktietkiem)
        newTaiKhoan.tietkiem = tietkiemoption
      }
      else if(newTaiKhoan.no != null){
        let nooption = realm.objectForPrimaryKey(TKNoSchema.name, newTaiKhoan.no.idtkno)
        newTaiKhoan.no = nooption
      }
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
      realm.write(()=> {
        let taiKhoanUpdated = realm.objectForPrimaryKey(TaiKhoanSchema.name,updateTaiKhoan.idtaikhoan)
        taiKhoanUpdated.tentaikhoan=updateTaiKhoan.tentaikhoan;
        taiKhoanUpdated.bieutuong = updateTaiKhoan.bieutuong;
        taiKhoanUpdated.tieudung=updateTaiKhoan.tieudung;
        taiKhoanUpdated.tietkiem=updateTaiKhoan.tietkiem;
        taiKhoanUpdated.no=updateTaiKhoan.no;
        resolve(taiKhoanUpdated) 
      })
    }).catch((error)=> reject(error));
  });
export const queryTaiKhoan = (option) =>
  new Promise((resolve,reject)=> {
    Realm.open(data).then(realm => {
      realm.write(()=> {
        let Target = realm.objects(TaiKhoanSchema.name)
        if(option.id){
          Target = Target.filtered('idtaikhoan==$0',option.id)
        }
        if(option.nguoidungid){
          Target= Target.filtered('idnguoidung==$0',option.nguoidungid)
        }
        if(option.thoigiantao){
        Taget=Taget.filtered('thoigiantao==$0',option.thoigiantao)
        }
        if(option.taikhoanno){
          filterUnwantedno(Target)
        }
        if(option.taikhoantietkiem){
          filterUnwantedtietkiem(Target)
        }
        if(option.taikhoantieudun){
            filterUnwantedtieudung(Target)
        }
        resolve(Target)
      })
    }).catch((error)=> reject(error));
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

const filterUnwantedtieudung = (arr) => {
   const required = arr.filter(el => {
      return el.tieudung;
   });
   return required;
};

const filterUnwantedtietkiem= (arr) => {
  const required = arr.filter(el => {
     return el.tietkiem;
  });
  return required;
};

const filterUnwantedno= (arr) => {
  const required = arr.filter(el => {
     return el.no;
  });
  return required;
};


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