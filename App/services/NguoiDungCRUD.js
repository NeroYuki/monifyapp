import Realm, { schemaVersion } from 'realm';
import {NguoiDungSchema,monifydata} from './Schema'



export const insertNewNguoiDung = newNguoiDung => new Promise((resolve,reject)=> {
    //console.log(JSON.stringify(monifydata))
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
            let updatingNguoiDung =realm.objectForPrimaryKey(monifydata.schema[NguoiDungSchema],nguoiDung.idnguoidung);
            updatingNguoiDung.idnguoidung=nguoiDung.idnguoidung;
            updatingNguoiDung.pass=nguoiDung.pass;
            resolve();
        });
    }).catch((error)=> reject(error));
});
export const deleteNguoiDung = nguoiDungId => new Promise((resolve,reject)=>{
    Realm.open(monifydata).then(realm => {
        realm.write(()=> {
            let deleteintNguoiDung =realm.objectForPrimaryKey(monifydata.schema[NguoiDungSchema],nguoiDungId);
            realm.delete(deleteintNguoiDung);
            resolve();
        });
    }).catch((error)=> reject(error));
}); 
export const deleteAllNguoiDung = () => new Promise((resolve,reject)=>{
    Realm.open(monifydata).then(realm => {
        realm.write(()=> {
            let delAllNguoiDungs =realm.objects(monifydata.schema[NguoiDungSchema]);
            realm.delete(delAllNguoiDungs);
            resolve(delAllNguoiDungs);
        });
    }).catch((error)=> reject(error));
}); 

export const queryAllNguoiDung = () =>new Promise((resolve,reject)=>{
    realm.open(monifydata).then(realm => {
        let allNguoiDungs= realm.objects(monifydata.schema[NguoiDungSchema]);
        resolve(allNguoiDungs);
    }).catch((error)=> reject(error));
})

//export default new Realm(monifydata);
