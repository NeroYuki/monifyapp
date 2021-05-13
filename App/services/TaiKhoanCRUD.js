import Realm, { schemaVersion } from 'realm';
import {TaiKhoanSchema,monifydata,LoaiTaiKhoanConfigSchema} from './Schema'



export const insertNewTaiKhoan = newTaiKhoan => new Promise((resolve,reject)=> {
    // console.log(JSON.stringify(monifydata))
    Realm.open(monifydata).then(realm => {
        realm.write(()=> {
            realm.create(TaiKhoanSchema.name,newTaiKhoan);
            resolve(newTaiKhoan);
        });
    }).catch((error)=> reject(error));
});
export const updateTaiKhoan = taiKhoan => new Promise((resolve,reject)=> {
    Realm.open(monifydata).then(realm => {
        realm.write(()=> {
            let updatingTaiKhoan =realm.objectForPrimaryKey(TaiKhoanSchema.name,taiKhoan.idtaikhoan);
            updatingTaiKhoan.tentaikhoan=taiKhoan.tentaikhoan;
            updatingTaiKhoan.bieutuong = taiKhoan.bieutuong;
            updatingTaiKhoan.idnguoidung = taiKhoan.idnguoidung;
            updatingTaiKhoan.loaitaikhoan = taiKhoan.loaitaikhoan;
            resolve();
        });
    }).catch((error)=> reject(error));
});
export const deleteNguoiDung = nguoiDungId => new Promise((resolve,reject)=>{
    Realm.open(monifydata).then(realm => {
        realm.write(()=> {
            let deleteintNguoiDung =realm.objectForPrimaryKey(NguoiDungSchema.name,nguoiDungId);
            realm.delete(deleteintNguoiDung);
            resolve();
        });
    }).catch((error)=> reject(error));
}); 
export const deleteAllNguoiDung = () => new Promise((resolve,reject)=>{
    Realm.open(monifydata).then(realm => {
        realm.write(()=> {
            let delAllNguoiDungs =realm.objects(NguoiDungSchema.name);
            realm.delete(delAllNguoiDungs);
            resolve(delAllNguoiDungs);
        });
    }).catch((error)=> reject(error));
}); 

export const queryAllNguoiDung = () =>new Promise((resolve,reject)=>{
    Realm.open(monifydata).then(realm => {
        let allNguoiDungs = realm.objects(NguoiDungSchema.name);
        resolve(allNguoiDungs);
    }).catch((error)=> reject(error));
});

