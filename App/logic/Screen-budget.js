import {queryMucTieuCaNhan,insertMucTieuCaNhan,updateMucTieuCaNhan,deleteMucTieuCaNhan} from '../services/MucTieuCaNhanCRUD'
import {BSON} from 'realm'
import {startOfWeek,endOfWeek,startOfMonth,endOfMonth,startOfYear,endOfYear} from 'date-fns'

export const fetchBugetList = () =>
  new Promise((resolve, reject) => {
    queryMucTieuCaNhan({}).then(muctieu=>{
        resolve(muctieu)
    }).catch(err=>reject(err))
})

export const fetchBudget = ({budgetId}) =>
  new Promise((resolve, reject) => {
    let budid=new BSON.ObjectID(budgetId)
    queryMucTieuCaNhan({idmuctieu:budid}).then(muctieu=>{
        resolve(muctieu)
    }).catch(err=>reject(err))
})

export const saveBudget = ({budgetId,userId,name,loaimuctieu,amount,period,start_day,end_day}) =>
  new Promise((resolve, reject) => {
    if(!budgetId)
    {
        let budget={
            idmuctieu:new BSON.ObjectID(),
            idnguoidung:new BSON.ObjectID(userId),
            thoigiantao: new Date(Date.now()),
            loaimuctieu:loaimuctieu,
            sotienmuctieu:amount,
            ngaybatdau:null,
            ngayketthuc:null,
            tenmuctieu:name,
        }
        if(period&&!(start_day||end_day))
        {
            if(period=='week')
            {
                budget.ngaybatdau=startOfWeek(new Date(Date.now()),{weekStartsOn:1})
                budget.ngayketthuc=endOfWeek(new Date(Date.now()),{weekStartsOn:1})
            }
            else if(period=='month')
            {
                budget.ngaybatdau=startOfMonth(new Date(Date.now()))
                budget.ngayketthuc=endOfMonth(new Date(Date.now()))
            }
            else if(period=='year')
            {
                budget.ngaybatdau=startOfYear(new Date(Date.now()))
                budget.ngayketthuc=endOfYear(new Date(Date.now()))
            }
            else
            {
                reject('không tồn tại loại period tương xứng')
            }
        }
        else if(!period&&start_day&&end_day)
        {
            budget.ngaybatdau=start_day
            budget.ngayketthuc=end_day
        }
        else
        {
            reject('Không xử lý được ngày bắt đầu và ngày kết thúc của mục tiêu ')
        }
        insertMucTieuCaNhan(budget,loaimuctieu).then(muctieu=>{
            if(muctieu)
                resolve(muctieu)
            else
                reject('Không tạo mục tiêu thành công')
        }).catch(er=>reject(er))
    }
    else{
        let budget={
            idmuctieu:new BSON.ObjectID(budgetId),
            idnguoidung:(userId)?new BSON.ObjectID(userId):null,
            loaimuctieu:loaimuctieu,
            sotienmuctieu:amount,
            ngaybatdau:null,
            ngayketthuc:null,
            tenmuctieu:name,
        }
        if(period&&!(start_day||end_day))
        {
            if(period=='week')
            {
                budget.ngaybatdau=startOfWeek(new Date(Date.now()),{weekStartsOn:1})
                budget.ngayketthuc=endOfWeek(new Date(Date.now()),{weekStartsOn:1})
            }
            else if(period=='month')
            {
                budget.ngaybatdau=startOfMonth(new Date(Date.now()))
                budget.ngayketthuc=endOfMonth(new Date(Date.now()))
            }
            else if(period=='year')
            {
                budget.ngaybatdau=startOfYear(new Date(Date.now()))
                budget.ngayketthuc=endOfYear(new Date(Date.now()))
            }
            else
            {
                reject('không tồn tại loại period tương xứng')
            }
        }
        else if(!period&&start_day&&end_day)
        {
            budget.ngaybatdau=start_day
            budget.ngayketthuc=end_day
        }
        else if(period||start_day||end_day)
        {
            reject('Không xử lý được ngày bắt đầu và ngày kết thúc của mục tiêu ')
        }

        if(loaimuctieu=='TietKiemDenMuc')
        {
            budget.loaimuctieu=
            {
                tietkiemdenmuc: true,
                tieudungquamuc: false,
                sodutoithieu: false,
            }
        }
        else if(loaimuctieu=='TieuDungQuaMuc')
        {
            budget.loaimuctieu=
            {
                tietkiemdenmuc: false,
                tieudungquamuc: true,
                sodutoithieu: false,
            }
        }
        else if(loaimuctieu=='SoDuToiThieu')
        {
            budget.loaimuctieu=
            {
                tietkiemdenmuc: false,
                tieudungquamuc: false,
                sodutoithieu: true,
            }
        }
        else if(loaimuctieu!=null)
        {
            reject('Không xử lý được loại mục tiêu')
        }
        // console.log('budget đây',JSON.parse(JSON.stringify(budget)))
        updateMucTieuCaNhan(budget).then(muctieu=>{
            if(muctieu)
                resolve(muctieu)
            else
                reject('Không cập nhật mục tiêu thành công')
        }).catch(er=>reject(er))
    }
})

export const deleteBudget = ({budgetId}) =>
  new Promise((resolve, reject) => {
    let budid=new BSON.ObjectID(budgetId)
    deleteMucTieuCaNhan({idmuctieu:budid}).then(muctieu=>{
        if(muctieu=='ThanhCong')
            resolve({result:true,message:'Xóa mục tiêu thành công'})
        else
            reject({result:false,message:'Xóa mục tiêu thất bại'})
    }).catch(err=>reject({result:false,message:err}))
})