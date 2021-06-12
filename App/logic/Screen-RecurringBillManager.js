import {queryGiaoDichChuKy,updateGiaoDichChuKy,insertGiaoDichChuKy,deleteGiaoDichChuKy} from '../services/GiaoDichChuKyCRUD';
import {BSON} from 'realm';

export const queryBill = ({billName,minAmount,maxAmount}) =>
  new Promise((resolve, reject) => {
    queryGiaoDichChuKy({name: billName})
      .then(giaodich => {
        // console.log(JSON.parse(JSON.stringify(giaodich)))
        if(!giaodich||giaodich==[])
            resolve(giaodich)
        else
        {
            let kq=giaodich.filter(gd=>{
                if(gd.sotientieudung)
                    if(minAmount&&maxAmount)
                        return gd.sotientieudung>=minAmount&&gd.sotientieudung<=maxAmount
                    else if(minAmount&&!maxAmount)
                        return gd.sotientieudung>=minAmount
                    else if(!minAmount&&maxAmount)
                        return gd.sotientieudung<=maxAmount
                    else
                        return gd
                else if(gd.sotienthunhap)
                    if(minAmount&&maxAmount)
                        return gd.sotienthunhap>=minAmount&&gd.sotienthunhap<=maxAmount
                    else if(minAmount&&!maxAmount)
                        return gd.sotienthunhap>=minAmount
                    else if(!minAmount&&maxAmount)
                        return gd.sotienthunhap<=maxAmount
                    else
                        return gd
                else
                    return gd
            })
            resolve(kq)
        }
    }).catch(er => reject(er))
})

export const pauseBill=({billId})=>
new Promise((resolve, reject) => {
    updateGiaoDichChuKy({idgiaodichtheochuky:new BSON.ObjectID(billId),pause:true}).then(giaodich=>{
        // console.log(JSON.parse(JSON.stringify(giaodich)))
        if(giaodich.pause==true)
            resolve({result:true,message:'Pause thành công'})
        else
            reject({result:false,message:'Pause thất bại'})
    }).catch(err=>reject({result:false,message:err}))
})

export const resumeBill=({billId})=>
new Promise((resolve, reject) => {
    updateGiaoDichChuKy({idgiaodichtheochuky:new BSON.ObjectID(billId),pause:false}).then(giaodich=>{
        if(giaodich.pause==false)
            resolve({result:true,message:'Resume thành công'})
        else
            reject({result:false,message:'Resume thất bại'})
    }).catch(err=>reject({result:false,message:err}))
})

export const deleteBill=({billId})=>
new Promise((resolve, reject) => {
    deleteGiaoDichChuKy({idgiaodichtheochuky:new BSON.ObjectID(billId)}).then(giaodich=>{
        if(giaodich=='ThanhCong')
            resolve({result:true,message:'Delete thành công'})
        else
            reject({result:false,message:'Delete thất bại'})
    }).catch(err=>reject({result:false,message:err}))
})

