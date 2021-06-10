import {queryTaiKhoan} from 'App/services/TaiKhoanCRUD.js';
import Realm from 'realm';

export function fetchBudgetList () {
    let rsarr
    let rs = queryTaiKhoan({})   
    rs.forEach(element => {
        rsarr.push({
            budgetId: element.budgetId,
            name: element.tentaikhoan,
        })
    });
    return rsarr
}

export function fetchBudget({budgetid}){
    let temp = queryTaiKhoan({idtaikhoan:budgetid})
    rs=Realm.copyFromRealm(rs[0],0)
    return rs
}
