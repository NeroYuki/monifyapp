import {queryHangMucGiaoDich,insertHangMucGiaoDich,updateHangMucGiaoDich} from '../services/HangMucGiaoDichCRUD';
import {BSON} from 'realm';

export const fetchCategory = ({categoryId}) =>
  new Promise((resolve, reject) => {
    let catId=(categoryId)?new BSON.ObjectID(categoryId):null
    queryHangMucGiaoDich({idhangmucgiaodich:catId}).then(hangmuc=>{
        resolve(hangmuc)
    }).catch(err=>reject(err))
})
export const saveCategory = ({category_id,userid,name,color,icon,loaihangmuc})=>
    new Promise((resolve, reject )=>{
        if(!category_id)
        {
            let hangmuc={
                idhangmucgiaodich:new BSON.ObjectID(),
                idnguoidung:(userid)?new BSON.ObjectID(userid):null,
                thoigiantao: new Date(Date.now()),
                tenhangmuc:name,
                iconhangmuc:icon,
                color:color
            }
            insertHangMucGiaoDich(hangmuc,loaihangmuc).then(hangmuc=>{
                if(hangmuc)
                {
                    resolve({result:true,message:'Tạo hạng mục thành công'})
                }
                else
                {
                    reject({result:false,message:'Tạo hạng mục thất bại'})
                }
            }).catch(err=>reject({result:false,message:err}))
        }
        else
        {
            let hangmuc={
                idhangmucgiaodich:(category_id)?new BSON.ObjectID(category_id):null,
                idnguoidung:(userid)?new BSON.ObjectID(userid):null,
                tenhangmuc:name,
                iconhangmuc:icon,
                loaihangmuc:null,
                color:color
            }
            if(loaihangmuc)
            {
                if(loaihangmuc=='chitieu')
                {
                    hangmuc.loaihangmuc={ chitieu: true, thunhap: false }
                }
                else if(loaihangmuc=='thunhap')
                {
                    hangmuc.loaihangmuc={ chitieu: false, thunhap: true }
                }
                else
                {
                    reject({result:false,mesage:'Không tìm thấy loại hạng mục'})
                    return
                }
            }
            updateHangMucGiaoDich(hangmuc).then(hangmuc=>{
                if(hangmuc!='Hai loại hạng mục cùng giá trị')
                {
                    resolve({result:true,message:'Cập nhật hạng mục thành công'})
                }
                else
                {
                    reject({result:false,message:'Cập nhật hạng mục thất bại'})
                }
            }).catch(err=>reject({result:false,message:err}))
        }
})