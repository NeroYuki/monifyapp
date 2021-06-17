import {queryHangMucGiaoDich,deleteHangMucGiaoDich,updateHangMucGiaoDich} from '../services/HangMucGiaoDichCRUD';
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
            reject({result:false,message:'Xóa hạng mục thất bại'})
            return
        }
        updateHangMucGiaoDich({idhangmucgiaodich:catId,invs:false}).then(hangmuc=>{
            if(hangmuc)
                resolve({result:true,message:'Xóa hạng mục thành công'})
            else
                reject({result:false,message:'Xóa hạng mục thất bại'})
        }).catch(err=>reject({result:false,message:err}))
})

