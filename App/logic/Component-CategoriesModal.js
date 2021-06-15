import {queryHangMucGiaoDich,deleteHangMucGiaoDich} from '../services/HangMucGiaoDichCRUD';
import {BSON} from 'realm';

export const fetchCategories = () =>
  new Promise((resolve, reject) => {
    queryHangMucGiaoDich({}).then(hangmuc=>{
        resolve(hangmuc)
    }).catch(err=>reject(err))
})

export const deleteCategory = ({categoryId})=>
    new Promise((resolve, reject )=>{
        let catId=(categoryId)?new BSON.ObjectID(categoryId):null
        if(!catId)
        {
            resolve({result:false,message:'Xóa hạng mục thất bại'})
            return
        }
        deleteHangMucGiaoDich({idhangmucgiaodich:catId}).then(hangmuc=>{
            if(hangmuc=='ThanhCong')
                resolve({result:true,message:'Xóa hạng mục thành công'})
            else
                resolve({result:false,message:'Xóa hạng mục thất bại'})
        }).catch(err=>reject({result:false,message:err}))
})