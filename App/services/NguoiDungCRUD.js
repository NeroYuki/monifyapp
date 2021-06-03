import Realm, { schemaVersion } from 'realm';
import {NguoiDungSchema,monifydata} from './Schema'

export const insertNewNguoiDung = newNguoiDung => new Promise((resolve,reject)=> {
    // console.log(JSON.stringify(monifydata))
    Realm.open(monifydata).then(realm => {
        realm.write(()=> {
            realm.create(NguoiDungSchema.name,newNguoiDung);
            resolve(newNguoiDung);
        });
    }).catch((error)=> reject(error));
});
export const updateNguoiDung = nguoiDung => new Promise((resolve,reject)=> {
    Realm.open(monifydata).then(realm => {
        realm.write(()=> {
            let updatingNguoiDung =realm.objectForPrimaryKey(NguoiDungSchema.name,nguoiDung.idnguoidung);
            updatingNguoiDung.pass=nguoiDung.pass;
            resolve('thanhcong');
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
export const softDeleteNguoiDung = nguoiDungId => new Promise((resolve,reject)=>{
    Realm.open(monifydata).then(realm => {
        realm.write(()=> {
            let deleteintNguoiDung =realm.objectForPrimaryKey(NguoiDungSchema.name,nguoiDungId);
            deleteintNguoiDung.deleted=true
            resolve('thanhcong');
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

export const queryAllNguoiDung = (option) =>new Promise((resolve,reject)=>{
    Realm.open(monifydata).then(realm => {
        let allNguoiDungs = realm.objects(NguoiDungSchema.name);
        if(option == 1){
            allNguoiDungs=allNguoiDungs.filtered('deleted==true')
        }
        resolve(allNguoiDungs);
    }).catch((error)=> reject(error));
});

