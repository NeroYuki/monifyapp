import { BSON } from "realm"
import { insertHangMucGiaoDich, queryHangMucGiaoDich } from "../services/HangMucGiaoDichCRUD"
import { queryTaiKhoan, updateTaikhoanNo, updateTaikhoanTietKiem, updateTaikhoanTieudung } from "../services/TaiKhoanCRUD"
import { saveCategory } from "./Component-CategoryEditor"
import { saveTransaction } from "./Component-TransactionEditor"
import { fetchLoan } from "./Screen-loan"
import { fetchWallet } from "./Screen-wallet"



export const createLoanPayment= ({from_wallet_id,for_loan_id,amount}) => new Promise((resolve,reject) =>{
    let userid = "60d213a4b04324a927bae538"
    let catid =JSON.parse(JSON.stringify(new BSON.ObjectID()))
    let temp = await(queryHangMucGiaoDich({tenhangmuc:'Default',loaihangmuc:'ChiTieu'}).then((tk)=>{
        if (tk==[]){
            // let hangmuc={
            //     idhangmucgiaodich:new BSON.ObjectID(catid),
            //     idnguoidung:new BSON.ObjectID(userid),
            //     thoigiantao: new Date(Date.now()),
            //     tenhangmuc: 'Default',
            //     iconhangmuc:'',
            //     color:'#666666'
            // }
            // insertHangMucGiaoDich(hangmuc,'chitieu').then(hangmuc=>{
            //     if(hangmuc){}
            //     else
            //     {
            //         reject({result:false,message:'Tạo hạng mục thất bại'})
            //     }
            // }).catch(err=>reject({result:false,message:err}))
            return reject({result:false,message:'khong tim thay hang muc giao dich'})
        }
        else {
            catid = JSON.parse(JSON.stringify(tk[0].idhangmucgiaodich))
        }
    },(er)=>{
        reject(er)
    })) 
   
    
    updateTaikhoanNo({taikhoannoid: for_loan_id, sotienthem: (-amount)}).then((rs)=>
    {
        if(rs==true) updateTaikhoanTieudung({taikhoantieudungid:from_wallet_id,sotienthem:-amount}).then((rs2)=>{
            saveTransaction({
                userId:userid,
                note:'LoanPayment',
                amount:amount,
                walletid:from_wallet_id,
                occur_date: new Date(),
                categoryId: catid
            }).then(
                resolve({result:true, message:' tao loan payment thanh cong',})
            ,((er)=>{reject({result:false,message:er})})
            )
        })
        else if(rs==false) {
            reject({result:false, message:' tao loan payment khong thanh cong',})
            return
        }
         //resolve('that bai')
        // return
    },(er)=>(reject(er)))
})



export const createSavingDeposit= ({from_wallet_id,for_saving_id,amount}) => new Promise((resolve,reject) =>{
    let userid = "60d213a4b04324a927bae538"
    let catid =JSON.parse(JSON.stringify(new BSON.ObjectID()))
    let temp = await(queryHangMucGiaoDich({tenhangmuc:'Default',loaihangmuc:'ChiTieu'}).then((tk)=>{
        if (tk==[]){
            // let hangmuc={
            //     idhangmucgiaodich:new BSON.ObjectID(catid),
            //     idnguoidung:new BSON.ObjectID(userid),
            //     thoigiantao: new Date(Date.now()),
            //     tenhangmuc: 'Default',
            //     iconhangmuc:'',
            //     color:'#666666'
            // }
            // insertHangMucGiaoDich(hangmuc,'chitieu').then(hangmuc=>{
            //     if(hangmuc){}
            //     else
            //     {
            //         reject({result:false,message:'Tạo hạng mục thất bại'})
            //     }
            // }).catch(err=>reject({result:false,message:err}))
            return reject({result:false,message:'khong tim thay hang muc giao dich'})
        }
        else {
            catid = JSON.parse(JSON.stringify(tk[0].idhangmucgiaodich))
        }
    },(er)=>{
        reject(er)
    }))
   
    
    updateTaikhoanTietKiem({taikhoantietkiemid: for_saving_id, sotienthem: amount}).then((rs)=>
    {
        if(rs==true) {
                saveTransaction({
                    userId:userid,
                    note:'Saving deposit',
                    amount:amount,
                    walletid:from_wallet_id,
                    occur_date: new Date(),
                    categoryId: catid
                }).then(
                    resolve({result:true, message:' tao save deposit thanh cong',})
                ,((er)=>reject(er)))
            }
        else if(rs==false) {
            reject({result:false,message:'Tạo transaction thất bại'})
        }
        //reject({result:false,message:'Tạo transaction thất bại'})
    },(er)=>(reject(er)))

})



export const createSavingWithdraw= ({for_wallet_id,from_saving_id,amount}) => new Promise((resolve,reject) =>{
    let userid = "60d213a4b04324a927bae538"
    let catid =JSON.parse(JSON.stringify(new BSON.ObjectID()))
    let temp = queryHangMucGiaoDich({tenhangmuc:'Default',loaihangmuc:'ThuNhap'}).then((tk)=>{
        if (tk==[]){
            // let hangmuc={
            //     idhangmucgiaodich:new BSON.ObjectID(catid),
            //     idnguoidung:new BSON.ObjectID(userid),
            //     thoigiantao: new Date(Date.now()),
            //     tenhangmuc: 'Default',
            //     iconhangmuc:'',
            //     color:'#666666'
            // }
            // insertHangMucGiaoDich(hangmuc,'thunhap').then(hangmuc=>{
            //     if(hangmuc){}
            //     else
            //     {
            //         reject({result:false,message:'Tạo hạng mục thất bại'})
            //     }
            // }).catch(err=>reject({result:false,message:err}))
            return reject({result:false,message:'khong tim thay hang muc giao dich'})
        }
        else {
            catid = JSON.parse(JSON.stringify(tk[0].idhangmucgiaodich))
        }
    },(er)=>{
        reject(er)
    })
   
    
    updateTaikhoanTietKiem({taikhoantietkiemid: from_saving_id, sotienthem: -amount}).then((rs)=>
    {
        if(rs==true) {
                saveTransaction({
                    userId:userid,
                    note:'Saving withdraw',
                    amount:amount,
                    walletid:from_wallet_id,
                    occur_date: new Date(),
                    categoryId: catid
                }).then(
                    resolve({result:true, message:' tao save withdraw thanh cong',})
                ,((er)=>{reject({result:false,message:'tao transaction that bai'})})
                )
            }
        else if(rs==false) {
            reject({result:false,message:'Tạo transaction thất bại'})
        }
       // reject({result:false,message:'Tạo transaction thất bại'})
    },(er)=>(reject(er)))
})


export const createWalletTransfer= ({from_wallet_id,for_wallet_id,amount}) => new Promise((resolve,reject) =>{
    let userid = "60d213a4b04324a927bae538"
    let catid =JSON.parse(JSON.stringify(new BSON.ObjectID()))
    let temp = queryHangMucGiaoDich({tenhangmuc:'Default',loaihangmuc:'ThuNhap'}).then((tk)=>{
        if (tk==[]){
            // let hangmuc={
            //     idhangmucgiaodich:new BSON.ObjectID(catid),
            //     idnguoidung:new BSON.ObjectID(userid),
            //     thoigiantao: new Date(Date.now()),
            //     tenhangmuc: 'Wallet tranfer receive',
            //     iconhangmuc:'',
            //     color:'#666666'
            // }
            // insertHangMucGiaoDich(hangmuc,'thunhap').then(hangmuc=>{
            //     if(hangmuc){}
            //     else
            //     {
            //         reject({result:false,message:'Tạo hạng mục thất bại'})
            //     }
            // }).catch(err=>reject({result:false,message:err}))
            return reject({result:false,message:'khong tim thay hang muc giao dich'})
        }
        else {
            catid = JSON.parse(JSON.stringify(tk[0].idhangmucgiaodich))
        }
    },(er)=>{
        reject(er)
    })
    let catid2 =JSON.parse(JSON.stringify(new BSON.ObjectID()))
    let temp2 = queryHangMucGiaoDich({tenhangmuc:'Default',loaihangmuc:'ChiTieu'}).then((tk)=>{
        if (tk==[]){
            // let hangmuc={
            //     idhangmucgiaodich:new BSON.ObjectID(catid2),
            //     idnguoidung:new BSON.ObjectID(userid),
            //     thoigiantao: new Date(Date.now()),
            //     tenhangmuc: 'Wallet tranfer withdraw',
            //     iconhangmuc:'',
            //     color:'#666666'
            // }
            // insertHangMucGiaoDich(hangmuc,'chitieu').then(hangmuc=>{
            //     if(hangmuc){}
            //     else
            //     {
            //         reject({result:false,message:'Tạo hạng mục thất bại'})
            //     }
            // }).catch(err=>reject({result:false,message:err}))
            return reject({result:false,message:'khong tim thay hang muc giao dich'})
        }
        else {
            catid2 = JSON.parse(JSON.stringify(tk[0].idhangmucgiaodich))
        }
    },(er)=>{
        reject(er)
    })

    await(saveTransaction({
        userId:userid,
        note:'Wallet tranfer withdraw',
        amount:amount,
        walletid:from_wallet_id,
        occur_date: new Date(),
        categoryId: catid2
    }).then(
    saveTransaction({
        userId:userid,
        note:'Wallet tranfer receive',
        amount:amount,
        walletid:for_wallet_id,
        occur_date: new Date(),
        categoryId: catid
    })
    ).then(resolve({result:true, message:' tao wallet tranfer thanh cong',})
    ,((er)=>{reject({result:false,message:'tao transaction that bai'})})))
})
