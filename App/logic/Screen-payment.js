import { saveTransaction } from "./Component-TransactionEditor"
import { fetchLoan } from "./Screen-loan"
import { fetchWallet } from "./Screen-wallet"



export const createLoanPayment= ({from_wallet_id,for_loan_id,amount}) => new Promise((resolve,reject) =>{
    await(wallet =fetchWallet(from_wallet_id))
    await(loan = fetchLoan(for_loan_id))
    await(saveTransaction({
        
    }))
})
export const createSavingDeposit= ({from_wallet_id,for_saving_id,amount}) => new Promise((resolve,reject) =>{


})
export const createSavingWithdraw= ({for_wallet_id,from_saving_id,amount}) => new Promise((resolve,reject) =>{


})
export const createWalletTransfer= ({from_wallet_id,for_wallet_id,amount}) => new Promise((resolve,reject) =>{


})
