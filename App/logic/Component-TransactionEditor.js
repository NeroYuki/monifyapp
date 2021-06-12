import {queryGiaoDich,deleteGiaoDich,insertGiaoDich,updateGiaoDich} from '../services/GiaoDichCRUD'
import{queryHangMucGiaoDich} from '../services/HangMucGiaoDichCRUD'
import {BSON} from 'realm'

export const fetchTransaction = ({transactionId}) =>
    new Promise((resolve, reject) => {
    let tranid
    tranid = (transactionId) ? new BSON.ObjectID(transactionId) : null
    queryGiaoDich({idgiaodich:tranid}).then(giaodich=>{
        resolve(giaodich)
    }).catch(err=>reject(err))
})

export const deleteTransaction = ({transactionId}) =>
    new Promise((resolve, reject) => {
    let tranid = new BSON.ObjectID(transactionId)
    deleteGiaoDich({idgiaodich:tranid}).then(giaodich=>{
        if(giaodich=='ThanhCong')
            resolve({result:true,message:'Xóa giao dịch thành công'})
        else 
            reject({result:false,message:'Xóa giao dịch không thành công'})
    }).catch(err=>reject({result:false,message:err}))
})

export const saveTransaction = ({transactionId, userId, note, amount, walletId, occur_date, categoryId}) =>
    new Promise(async(resolve, reject) => {
    if(!transactionId)
    {
        let giaodich={
            idgiaodich: new BSON.ObjectID(),
            idnguoidung: new BSON.ObjectID(userId),
            thoigian: new Date(occur_date),
            idtaikhoan: new BSON.ObjectID(walletId),
            sotientieudung: null,
            sotienthunhap: null,
            loaihangmucgd: new BSON.ObjectID(categoryId),
            ghichu:note,
        }
        if(categoryId)
        {
            await queryHangMucGiaoDich({idhangmucgiaodich:giaodich.loaihangmucgd}).then(hangmuc=>{
                if(!hangmuc)
                        reject({result:false,message:'Hạng mục không có trong dữ liệu'})
                else
                {
                    if(hangmuc[0].loaihangmuc.chitieu==true)
                    {
                        giaodich.sotientieudung=amount
                    }
                    else
                        giaodich.sotienthunhap=amount
                }
            }).catch((er)=>reject({result:false,message:er}))
        }
        else
            reject({result:false,message:'Không nhập loại hạng mục'})
        insertGiaoDich(giaodich).then(giaodich=>{
            if(giaodich)
                resolve({result:true,message:'Tạo giao dịch thành công'})
            else
                reject({result:false,message:'Tạo giao dịch thất bại'})
        }).catch(er=>reject({result:false,message:er}))
    }
    else{
        let giaodich={
            idgiaodich: new BSON.ObjectID(transactionId),
            idnguoidung: (userId)?new BSON.ObjectID(userId):null,
            thoigian: (occur_date)?new Date(occur_date):null,
            idtaikhoan: (walletId)?new BSON.ObjectID(walletId):null,
            sotientieudung: null,
            sotienthunhap: null,
            loaihangmucgd: (categoryId)?new BSON.ObjectID(categoryId):null,
            ghichu:note,
        }
        await queryGiaoDich({idgiaodich:giaodich.idgiaodich}).then(gd=>{
            if(gd)
            {
                if(!categoryId)
                {
                    giaodich.loaihangmucgd=new BSON.ObjectID(gd.loaihangmucgd)
                }
                giaodich.sotientieudung=gd.sotientieudung
                giaodich.sotienthunhap=gd.sotienthunhap
            }
            else
            {
                reject({result:false,message:'Không tìm thấy dử liệu cần cập nhật'})
            }
        })
        if(amount)
        {
            await queryHangMucGiaoDich({idhangmucgiaodich:giaodich.loaihangmucgd}).then(hangmuc=>{
                if(!hangmuc)
                    reject({result:false,message:'Hạng mục không có trong dữ liệu'})
                else
                {
                    if(hangmuc[0].loaihangmuc.chitieu==true)
                    {
                        giaodich.sotientieudung=amount
                        giaodich.sotienthunhap=null
                    }
                    else
                    {
                        giaodich.sotienthunhap=amount
                        giaodich.sotientieudung=null
                    }
                }
            }).catch((er)=>reject({result:false,message:er}))
        }
        else
        {
            await queryHangMucGiaoDich({idhangmucgiaodich:giaodich.loaihangmucgd}).then(hangmuc=>{
                if(!hangmuc)
                    reject({result:false,message:'Hạng mục không có trong dữ liệu'})
                else
                {
                    if(hangmuc[0].loaihangmuc.chitieu==true)
                    {
                        if(giaodich.sotienthunhap)
                        {
                            giaodich.sotientieudung=giaodich.sotienthunhap
                            giaodich.sotienthunhap=null
                        }
                    }
                    else
                    {
                        if(giaodich.sotientieudung)
                        {
                            giaodich.sotienthunhap=giaodich.sotientieudung
                            giaodich.sotientieudung=null
                        }
                    }
                }
            }).catch((er)=>reject({result:false,message:er}))
        }
        updateGiaoDich(giaodich).then(giaodich=>{
            if(giaodich)
                resolve({result:true,message:'Cập nhật giao dịch thành công'})
            else
                reject({result:false,message:'Cập nhật giao dịch thất bại'})
        }).catch(er=>reject({result:false,message:er}))
    }
})