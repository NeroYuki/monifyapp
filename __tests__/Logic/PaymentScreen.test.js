import { BSON } from 'realm'
import * as PaymentScreen from '../../App/logic/Screen-payment'
import sessionStore from '../../App/logic/sessionStore'

sessionStore.activeUserId = new BSON.ObjectID('61b00ff0451e46bccdd7119a')

describe('Loan payment', () => {
    it("M8C1TC001", async () => {
        let err = null
        let res = await PaymentScreen.createLoanPayment({
            from_wallet_id: new BSON.ObjectID("61b09047451e46bccdd711bc"),
            for_loan_id: new BSON.ObjectID("61b9a2f0cef20d2890331b6b"),
            amount: 1,
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M8C1TC002", async () => {
        let err = null
        let res = await PaymentScreen.createLoanPayment({
            for_loan_id: new BSON.ObjectID("61b9a2f0cef20d2890331b6b"),
            amount: 1,
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M8C1TC003", async () => {
        let err = null
        let res = await PaymentScreen.createLoanPayment({
            from_wallet_id: new BSON.ObjectID("61b09047451e46bccdd711bc"),
            amount: 1,
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M8C1TC004", async () => {
        let err = null
        let res = await PaymentScreen.createLoanPayment({
            from_wallet_id: new BSON.ObjectID("61b09047451e46bccdd711bc"),
            for_loan_id: new BSON.ObjectID("61b9a2f0cef20d2890331b6b"),
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Saving deposit', () => {
    it("M8C2TC001", async () => {
        let err = null
        let res = await PaymentScreen.createSavingDeposit({
            from_wallet_id: new BSON.ObjectID("61b09047451e46bccdd711bc"),
            for_saving_id: new BSON.ObjectID("61b9a2cacef20d2890331b69"),
            amount: 1,
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M8C2TC002", async () => {
        let err = null
        let res = await PaymentScreen.createSavingDeposit({
            for_saving_id: new BSON.ObjectID("61b9a2cacef20d2890331b69"),
            amount: 1,
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M8C2TC003", async () => {
        let err = null
        let res = await PaymentScreen.createSavingDeposit({
            from_wallet_id: new BSON.ObjectID("61b09047451e46bccdd711bc"),
            amount: 1,
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M8C2TC004", async () => {
        let err = null
        let res = await PaymentScreen.createSavingDeposit({
            from_wallet_id: new BSON.ObjectID("61b09047451e46bccdd711bc"),
            for_saving_id: new BSON.ObjectID("61b9a2cacef20d2890331b69"),
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(err).toBe("Không có số tiền tiêu dùng")
    })
    
})

describe('Saving withdrawal', () => {
    it("M8C3TC001", async () => {
        let err = null
        let res = await PaymentScreen.createSavingWithdraw({
            for_wallet_id: new BSON.ObjectID("61b09047451e46bccdd711bc"),
            from_saving_id: new BSON.ObjectID("61b9a2cacef20d2890331b69"),
            amount: 1,
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M8C3TC002", async () => {
        let err = null
        let res = await PaymentScreen.createSavingWithdraw({
            from_saving_id: new BSON.ObjectID("61b9a2cacef20d2890331b69"),
            amount: 1,
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M8C3TC003", async () => {
        let err = null
        let res = await PaymentScreen.createSavingWithdraw({
            for_wallet_id: new BSON.ObjectID("61b09047451e46bccdd711bc"),
            amount: 1,
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M8C3TC004", async () => {
        let err = null
        let res = await PaymentScreen.createSavingWithdraw({
            for_wallet_id: new BSON.ObjectID("61b09047451e46bccdd711bc"),
            from_saving_id: new BSON.ObjectID("61b9a2cacef20d2890331b69"),
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

})

describe('Wallet transfer', () => {
    it("M8C4TC001", async () => {
        let err = null
        let res = await PaymentScreen.createWalletTransfer({
            from_wallet_id: new BSON.ObjectID("61b09047451e46bccdd711bc"),
            for_wallet_id: new BSON.ObjectID("61b0c993ba2bc5311a8341ef"),
            amount: 1,
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M8C4TC002", async () => {
        let err = null
        let res = await PaymentScreen.createWalletTransfer({
            from_wallet_id: new BSON.ObjectID("61b09047451e46bccdd711bc"),
            amount: 1,
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M8C4TC003", async () => {
        let err = null
        let res = await PaymentScreen.createWalletTransfer({
            for_wallet_id: new BSON.ObjectID("61b0c993ba2bc5311a8341ef"),
            amount: 1,
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M8C4TC004", async () => {
        let err = null
        let res = await PaymentScreen.createWalletTransfer({
            from_wallet_id: new BSON.ObjectID("61b09047451e46bccdd711bc"),
            for_wallet_id: new BSON.ObjectID("61b0c993ba2bc5311a8341ef"),
            note: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
    
})