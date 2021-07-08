import { saveLoan } from "../../App/logic/Screen-loan";
import { createLoanPayment } from "../../App/logic/Screen-payment";
import { querywallet, saveWallet } from "../../App/logic/Screen-wallet";
import { TKTieuDungSchema } from "../../App/services/Schema";

test('loanpayment',async()=> {
    let today = new Date()
    await(saveWallet({walletName:'tieudung',amount: 5000000,color: '#123456'}))
    let wallet = await(querywallet({walletName:'tieudung'}))
    let loan =  await(saveLoan({loanName:'noxau',amount: 5000000,color: '#123456',expire_on:today,interest: 0.5,creationDate:today,cycle:30,applied_wallet_id:wallet[0].walletId}))
    await (createLoanPayment({for_loan_id:loan.loan.idtaikhoan,from_wallet_id:wallet[0].walletId,amount:10000}).then((rs)=>{
        console.log(JSON.stringify(rs))
        expect(rs.result).toEqual(true)
    }))
    expect(loan.result).toEqual(true)
    console.log(JSON.stringify(loan.loan))
})