import { insertHangMucGiaoDich } from "../services/HangMucGiaoDichCRUD"
import { saveCategory } from "./Component-CategoryEditor"
import { createSavingWithdraw } from "./Screen-payment"
import { checkNguoiDung, fetchuser, login, register } from "./Screen-User"
import catIcon from '../assets/constants/icons'
import sessionStore from '../logic/sessionStore'
import { fetchWallet, querywallet } from "./Screen-wallet"
import { queryTaiKhoan, updateTaikhoanTietKiem, updateTaikhoanNo } from "../services/TaiKhoanCRUD"
import { fetchBudget } from "./Screen-budget"
import { deactivateSaving } from "./Screen-saving"
import { queryTransactions } from "./Screen-Overview"

export const checkInitialLaunch = () => new Promise((resolve, reject) => {
    //check if there is any user account
        checkNguoiDung().then( async (res) => {
        if(res) { 
            let user = await login({username: "Guest", password: "1"})
            sessionStore.activeUserId = user.toString()
            let wallets = await querywallet({})
            if (wallets.length > 0) sessionStore.activeWalletId = wallets[0].walletId
            console.log(user)
            resolve(true)
        }
        else {
            //if cant find any user user, create default data
            register({
                username: "Guest",
                password: "1",
                email: "test@gmail.com"
            })
            saveCategory({
                userid: "60d213a4b04324a927bae538",
                name: "Default",
                color: "",
                icon: String(catIcon.investmentIcon.source),
                loaihangmuc: 'chitieu'
            })
            saveCategory({
                userid: "60d213a4b04324a927bae538",
                name: "Default",
                color: "",
                icon: String(catIcon.investmentIcon.source),
                loaihangmuc: 'thunhap'
            })
            resolve(false)
        }
    },(er)=>{console.error(er);})
})

export const checkLoansForCycle = () => new Promise((resolve,reject)=>{
    let rs= []
    queryTaiKhoan({taikhoanno: true, deactivate: false}).then((tk)=>{
        tk.forEach(async (element) => {
            //iterate thru all loan account thats still active
            console.log(element)
            let no_info = element.no
            // since lastCheckedDate is not present, reduce the number of possible case
            //possible case:
            //1. due date arrived
            let today = new Date()
            let due_date = no_info.ngaytradukien
            let start_date = no_info.ngaybatdauno
            let current_amount = no_info.sotien
            let interest = no_info.laisuatno
            let id = element.idtaikhoan
            let name = element.tentaikhoan
            console.log(due_date.getTime() - today.getTime())
            if (due_date.getTime() - today.getTime() < 0) {
                //if due date arrive, update the loan amount to the loan + interest amount
                //calculate past cycle count (in month)
                let past_cycle = Math.floor((due_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24 * 30))
                console.log(past_cycle)
                let total_amount = current_amount * Math.pow(1 + (interest / 100), past_cycle)
                console.log(total_amount) 
                // update loan info with new amount value
                let update_result = await updateTaikhoanNo({
                    taikhoantietkiemid: id,
                    sotienthem: total_amount - current_amount,
                })
                if (!update_result) return reject("failed amount update")
                rs.push({
                    loanId: id,
                    name: name,
                    eventname: 2,
                    current_amount: total_amount
                })
            }
            else {
                // //do nothing, you cant do much really
            }
        });
        resolve(rs)
    },((er)=> {console.error(er); reject(er)}))
})

export const checkSavingsForCycle = () => new Promise((resolve,reject)=>{
    let rs= []
    queryTaiKhoan({taikhoantietkiem: true, deactivate: true }).then((tk)=>{
        tk.forEach(async (element) => {
            //iterate thru all saving account thats still active
            console.log(element)
            let tietkiem_info = element.tietkiem
            // since lastCheckedDate is not present, reduce the number of possible case
            //possible case:
            //1. due date arrived
            let today = new Date()
            let due_date = tietkiem_info.ngayrutdukien
            let start_date = tietkiem_info.ngaybatdau
            let current_amount = tietkiem_info.sotien
            let interest = tietkiem_info.laisuattietkiem
            let id = element.idtaikhoan
            let inherited_wallet_id = JSON.stringify(tietkiem_info.idtkduocthuhuong)
            let name = element.tentaikhoan
            console.log(due_date.getTime() - today.getTime())
            if (due_date.getTime() - today.getTime() < 0) {
                //if due date arrive, update the saving amount to the saving + interest amount, then withdraw all to inherited wallet
                //calculate past cycle count (in month)
                let past_cycle = Math.floor((due_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24 * 30))
                console.log(past_cycle)
                let total_amount = current_amount * Math.pow(1 + (interest / 100), past_cycle)
                console.log(total_amount) 
                // update saving info with new amount value
                let update_result = await updateTaikhoanTietKiem({
                    taikhoantietkiemid: id,
                    sotienthem: total_amount - current_amount,
                })
                if (!update_result) return reject("failed amount update")
                // make a withdrawal to the inherited wallet
                let withdraw_result = await createSavingWithdraw({
                    for_wallet_id: inherited_wallet_id,
                    from_saving_id: id,
                    amount: total_amount,
                    note: "Auto withdrawal from saving"
                })
                if (withdraw_result.result === false) return reject("failed creating withdrawal")
                //deactivate this saving
                let deactivate_result = await deactivateSaving(id)
                if (!deactivate_result) return reject("failed deactivate saving")
                rs.push({
                    savingId: id,
                    name: name,
                    eventname: 2,
                    current_amount: total_amount
                })
            }
            else {
                // //do nothing, you cant do much really
            }
        });
        resolve(rs)
    },((er)=> reject(er)))
})
export const checkGoalForBudget = (budgetId) => new Promise(async(resolve,reject)=>{
    let today = new Date()
    fetchBudget({budgetId:budgetId}).then((bg)=>{
        if(bg==[]) return reject({result: false,message: 'budget ko ton tai'})
        //budgetid
        let budget = bg[0]
        //startday + endday
        let end_day=budget[0].ngayketthuc
        if(today<end_day) end_day = today
        let start_day= budget[0].ngaybatdau
        //query all transaction
        if(budget.idnguoidung==null) return reject({result:false,message: 'muc tieu khong co tai khoan'})
        let transaclist = await(queryTransactions({start_day:start_day,end_day:end_day,walletId:budget.idnguoidung}))
        //fetch wallet info get current money amount
        let wallet = await(fetchWallet(budget.idnguoidung))

    })
})
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
Date.prototype.addMonths = function(days) {
    var date = new Date(this.valueOf());
    date.setMonth(date.getMonth() + days);
    return date;
}

function linearRegression(y,x){
    var lr = {};
    var n = y.length;
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var sum_yy = 0;

    for (var i = 0; i < y.length; i++) {

        sum_x += x[i];
        sum_y += y[i];
        sum_xy += (x[i]*y[i]);
        sum_xx += (x[i]*x[i]);
        sum_yy += (y[i]*y[i]);
    } 

    lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
    lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
    lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

    return lr;
}