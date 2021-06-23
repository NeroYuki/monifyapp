import { insertHangMucGiaoDich } from "../services/HangMucGiaoDichCRUD"
import { saveCategory } from "./Component-CategoryEditor"
import { createSavingWithdraw } from "./Screen-payment"
import { checkNguoiDung, fetchuser, login, register } from "./Screen-User"
import catIcon from '../assets/constants/icons'
import sessionStore from '../logic/sessionStore'
import { querywallet } from "./Screen-wallet"
import { queryTaiKhoan, updateTaikhoanTietKiem, updateTaikhoanNo } from "../services/TaiKhoanCRUD"

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
    let today= new Date()
    let rs= []
    queryTaiKhoan({taikhoanno: true}).then((tk)=>{
        tk.forEach(element => {
            let id = element.idtaikhoan
            let laisuat = element.no.laisuatno
            let amount= element.no.sotien
            let ngaytradukien = element.no.ngaytradukien
            let cycle = element.no.kyhano
            let ngaystart = element.no.ngaybatdauno
            let different_in_time
            if(cycle!= -1){               
                if(today>=ngaytradukien){
                    different_in_time = (ngaytradukien.getTime()-ngaystart.addMonths(cycle).getTime())/(1000 * 3600 * 24 * 30)
                    if(different_in_time >= 1){
                        let temp= different_in_time % 1
                        cycle += temp
                        amount = amount*Math.pow(laisuat,temp)
                    }
                    cycle = -1
                    updateTaikhoanNo({taikhoannoid: id,sotienmoi: amount, cycle : cycle})
                    rs.push({
                        loadId:id,
                        name: element.tentaikhoan,
                        eventName:2,
                        current_amount: amount,
                    })
                }
                else{
                    different_in_time = (today.getTime()-ngaystart.addMonths(cycle).getTime())/(1000 * 3600 * 24 * 30)
                    if(different_in_time>=1){
                        let temp= different_in_time % 1
                        cycle += temp
                        amount = amount*Math.pow(laisuat,temp)
                        updateTaikhoanNo({taikhoannoid: id,sotienmoi: amount, cycle : cycle})
                        rs.push({
                            loadId:id,
                            name: element.tentaikhoan,
                            eventName:1,
                            current_amount: amount,
                        })
                    }          
                }
            }

        });
        
        resolve(rs)
    },((er)=> {console.error(er); reject(er)}))
})
export const checkSavingsForCycle = () => new Promise((resolve,reject)=>{
    let today= new Date()
    let rs= []
    queryTaiKhoan({taikhoantietkiem: true}).then((tk)=>{
        tk.forEach(async (element) => {
            //console.log(tk)
            let id = element.idtaikhoan
            let idtaikhoanthuhuong = element.tietkiem.idtkduocthuhuong
            let laisuat = element.tietkiem.laisuattietkiem
            let laisuattruochan = element.tietkiem.laisuattruochan
            let amount= element.tietkiem.sotien
            let ngayrutdukien = element.tietkiem.ngayrutdukien
            let cycle
            if( element.tietkiem.kyhantietkiem) cycle = element.tietkiem.kyhantietkiem
            else cycle =0
            let ngaystart = element.tietkiem.ngaybatdau

            let different_in_time = today.getTime()-ngaystart.addMonths(cycle).getTime()/(1000 * 3600 * 24 * 30)
            let different_in_time2 = ngayrutdukien.getTime()-ngaystart.addMonths(cycle).getTime()/(1000 * 3600 * 24 * 30)
            if(different_in_time < different_in_time2){
                if(cycle < (different_in_time%1)){
                    let tempamount = amount * Math.pow(laisuattruochan,(different_in_time%1)- cycle) - amount
                    cycle = (different_in_time%1)

                    //Possible failure
                    let update_res = await updateTaikhoanTietKiem({taikhoantietkiemid: id,sotienthem: amount, cycle : cycle})
                    console.log(update_res)
                    if(idtaikhoanthuhuong){
                        //Possible failure
                        createSavingWithdraw({for_wallet_id:idtaikhoanthuhuong,from_saving_id:id,amount:tempamount})
                        rs.push({
                            savingId:id,
                            name: element.tentaikhoan,
                            eventName:1 ,
                            current_amount:amount,
                        })
                    }
                    else{
                        rs.push({
                            savingId:id,
                            name: element.tentaikhoan,
                            eventName:1 ,
                            current_amount:amount+tempamount,
                        })
                    }
                }
            }
            else{
                if(cycle < (different_in_time%1)){
                    let tempamount = amount * Math.pow(laisuat,(different_in_time%1)- cycle) - amount
                    cycle = (different_in_time%1)
                    //Possible failure
                    let update_res = await updateTaikhoanTietKiem({taikhoantietkiemid: id,sotienthem: amount, cycle : cycle})
                    console.log(update_res)
                    if(idtaikhoanthuhuong){
                        //Possible failure
                        createSavingWithdraw({for_wallet_id:idtaikhoanthuhuong,from_saving_id:id,amount:tempamount})
                        rs.push({
                            savingId:id,
                            name: element.tentaikhoan,
                            eventName:2,
                            current_amount:amount,
                        })
                    }
                    else {
                        rs.push({
                            savingId:id,
                            name: element.tentaikhoan,
                            eventName:2,
                            current_amount:amount+tempamount,
                        })
                    }
                }
            }
        });
        resolve(rs)
    },((er)=> reject(er)))
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