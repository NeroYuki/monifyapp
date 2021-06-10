import Realm, { schemaVersion } from 'realm';
import {TaiKhoanSchema,monifydata,TKTieuDungSchema,TKTietKiemSchema,TKNoSchema} from './Schema'
import {BSON} from 'realm'

const data = monifydata;

export const insertTaiKhoan = (newTaiKhoan,loaitaikhoan) => 
  new Promise((resolve,reject)=> {
    Realm.open(data).then(realm=>{
      if(loaitaikhoan === undefined){
        if(newTaiKhoan.tieudung != null) {
          let tieudungoption = realm.objects(TKTieuDungSchema.name).filtered("idtktieudung==$0",newTaiKhoan.tieudung.idtktieudung)
          if(tieudungoption== null) newTaiKhoan.tieudung = tieudungoption
        }
        else if(newTaiKhoan.tietkiem != null){
          let tietkiemoption = realm.objects(TKTietKiemSchema.name).filtered("idtktietkiem==$0", newTaiKhoan.tietkiem.idtktietkiem)
          if(tietkiemoption==null)newTaiKhoan.tietkiem = tietkiemoption
        }
        else if(newTaiKhoan.no != null){
          let nooption = realm.objects(TKNoSchema.name).filtered("idtkno==$0", newTaiKhoan.no.idtkno)
          if(nooption == null)newTaiKhoan.no = nooption
        }
        realm.write(()=>{
          //console.log(newTaiKhoan)
          let tk = realm.create(TaiKhoanSchema.name,newTaiKhoan);
          resolve(tk);
        })
      }
      else if (loaitaikhoan !== undefined) {
        if (newTaiKhoan.tieudung == null && loaitaikhoan=='tieudung' ) {
          realm.write(()=>{
            let tk = realm.create(TaiKhoanSchema.name,newTaiKhoan);
            tk.tieudung = realm.create(TKTieuDungSchema.name,
              {
                idtktieudung: new BSON.ObjectID(),
                sotien: 0,
              }
            )
            //console.log(tk)
            resolve(tk);
          })      
        }
        else if (newTaiKhoan.tietkiem ==null  && loaitaikhoan=='tietkiem' ) {
          realm.write(()=>{
            let tk = realm.create(TaiKhoanSchema.name,newTaiKhoan);
            tk.tietkiem = realm.create(TKTietKiemSchema.name,
              {
                idtktietkiem: new BSON.ObjectID(),
                sotien: 0,
                laisuattietkiem: 0,
                laisuattruochan: '0',
                kyhantietkiem: 1, // đơn vị tháng
                ngaybatdau: new Date(),
                ruttatca: false, //Rút tất cả gốc lẫn lãi
                tieptuc: false , //Tiếp tục tiết kiệm cả gốc lẫn lãi
                rutlai: false , //Tiếp tục nhưng rút lãi
              }
            )
            //console.log(tk)
            resolve(tk);
          })      
        }
        else if (newTaiKhoan.no == null && loaitaikhoan=='no' ) {
          realm.write(()=>{
            let tk = realm.create(TaiKhoanSchema.name,newTaiKhoan);
            tk.no = realm.create(TKNoSchema.name,
              {
                idtkno: new BSON.ObjectID(),
                sotien: 0,
                laisuatno: 0,
                //loaitietkiem: 'LoaiTietKiemConfig',
                ngaybatdauno: new Date(),
                sotientradukien: 0,
              }
            )
            //console.log(tk)
            resolve(tk);
          })      
        }
      }
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
        if(option.deactivate){
          Target = Target.filtered('deactivate==$0',option.deactivate)
        }
        if(option.tentaikhoan)
        {
          Target = Target.filtered('tentaikhoan==$0',option.tentaikhoan)
        }
        if(option.idtaikhoan){
          Target = Target.filtered('idtaikhoan==$0',option.idtaikhoan)
        //  console.log(JSON.stringify(Target))
        }
        if(option.nguoidungid){
          Target= Target.filtered('idnguoidung==$0',option.nguoidungid)
        }
        if(option.idtktieudung){
          Target= Target.filtered('tieudung.idtktieudung==$0',option.idtktieudung)
        }
        if(option.idtktietkiem){
          Target= Target.filtered('tietkiem.idtktietkiem==$0',option.idtktietkiem)
        }
        if(option.idtkno){
          Target= Target.filtered('no.idtkno==$0',option.idtkno)
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
        if(option.nominAmount){
          Target= Target.filtered('no.sotien>=$0',option.idtkno)
        }
        if(option.nomaxAmount){
          Target= Target.filtered('no.sotien<=$0',option.idtkno)
        }

        //  console.log(JSON.stringify(Target))
        resolve(Target)
      })
    }).catch((error)=> reject(error));
  })



export const deleteTaiKhoan = taiKhoanID => new Promise((resolve,reject)=>{
  Realm.open(monifydata).then(realm => {
      realm.write(()=> {
          let deletedTaiKhoan =realm.objectForPrimaryKey(TaiKhoanSchema.name,taiKhoanID);
          realm.delete(deletedTaiKhoan);
          resolve(true);
      });
  }).catch((error)=> reject(error));
}); 
export const deactiavteTaiKhoan = taiKhoanID => new Promise((resolve,reject)=>{
  Realm.open(monifydata).then(realm => {
      realm.write(()=> {
          let deletedTaiKhoan =realm.objectForPrimaryKey(TaiKhoanSchema.name,taiKhoanID);
          deleteTaiKhoan.deactivate= true
          resolve(true);
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