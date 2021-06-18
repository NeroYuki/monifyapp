import { id } from 'date-fns/locale';
import Realm, { BSON, schemaVersion } from 'realm';
import {NguoiDungSchema,monifydata} from './Schema'

export const insertNewNguoiDung = newNguoiDung => new Promise((resolve,reject)=> {
    // console.log(JSON.stringify(monifydata))

    Realm.open(monifydata).then(realm => {
        realm.write(()=> {
            realm.create(NguoiDungSchema.name,newNguoiDung);
            resolve(newNguoiDung);
            return
        });
    }).catch((error)=> reject(error));
});
export const updateNguoiDung = nguoiDung => new Promise((resolve,reject)=> {
    Realm.open(monifydata).then(realm => {
        realm.write(()=> {
            let updatingNguoiDung =realm.objectForPrimaryKey(NguoiDungSchema.name,nguoiDung.idnguoidung);
            updateNguoiDung.username=nguoiDung.username;
            updatingNguoiDung.pass=nguoiDung.pass;
            resolve('thanhcong');
            return
        });
    }).catch((error)=> reject(error));
});
export const deleteNguoiDung = nguoiDungId => new Promise((resolve,reject)=>{
    Realm.open(monifydata).then(realm => {
        realm.write(()=> {
            let idnguoidung = new BSON.ObjectId(JSON.parse(JSON.stringify(nguoiDungId)))
            let deleteintNguoiDung =realm.objectForPrimaryKey(NguoiDungSchema.name,idnguoidung);
            realm.delete(deleteintNguoiDung);
            resolve('thanh cong');
            return
        });
    }).catch((error)=> reject(error));
}); 
export const softDeleteNguoiDung = nguoiDungId => new Promise((resolve,reject)=>{
    Realm.open(monifydata).then(realm => {
        realm.write(()=> {
            let idnguoidung = new BSON.ObjectId(JSON.parse(JSON.stringify(nguoiDungId)))
            let deleteintNguoiDung =realm.objectForPrimaryKey(NguoiDungSchema.name,idnguoidung);
            deleteintNguoiDung.deleted=true
            resolve(1);
            return
        });
    }).catch((error)=> reject(error));
}); 

export const queryAllNguoiDung = (option) =>new Promise((resolve,reject)=>{
    Realm.open(monifydata).then(realm => {
        let allNguoiDungs = realm.objects(NguoiDungSchema.name);
        if(option.deleted == 1){
            allNguoiDungs=allNguoiDungs.filtered('deleted==true')
        }
        if(option.deleted == 0){
            allNguoiDungs=allNguoiDungs.filtered('deleted==false')
        }
        resolve(allNguoiDungs);
        return
    }).catch((error)=> reject(error));
});

export const queryNguoiDung = (id) =>new Promise((resolve,reject)=>{
    Realm.open(monifydata).then(realm => {
        //console.log(JSON.parse(JSON.stringify(id)))
        let idnguoidung = new BSON.ObjectId(JSON.parse(JSON.stringify(id)))
        let nguoidung =realm.objectForPrimaryKey(NguoiDungSchema.name,idnguoidung);
        resolve(nguoidung);
    }).catch((error)=> reject(error));
});
