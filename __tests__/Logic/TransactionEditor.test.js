import { BSON } from 'realm'
import * as TransactionScreen from '../../App/logic/Component-TransactionEditor'
import sessionStore from '../../App/logic/sessionStore'

sessionStore.activeUserId = new BSON.ObjectID('61b00ff0451e46bccdd7119a')

describe('Fetch a transaction', () => {
    it("M1C1TC001", async () => {
        let err = null
        let res = await TransactionScreen.fetchTransaction("61b03a52451e46bccdd711a2").catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M1C1TC001", async () => {
        let err = null
        let res = await TransactionScreen.fetchTransaction(new BSON.ObjectID()).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Hard remove transaction', () => {
    it("M1C2TC001", async () => {
        let err = null
        let res = await TransactionScreen.deleteTransaction("60d213a4b04324a927bae538").catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M1C2TC001", async () => {
        let err = null
        let res = await TransactionScreen.deleteTransaction(new BSON.ObjectID()).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Remove transaction', () => {
    it("M1C3TC001", async () => {
        let err = null
        let res = await TransactionScreen.deleteTransactiontrig("60d213a4b04324a927bae538").catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M1C3TC002", async () => {
        let err = null
        let res = await TransactionScreen.deleteTransactiontrig(new BSON.ObjectID()).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M1C3TC003", async () => {
        let err = null
        let res = await TransactionScreen.deleteTransactiontrig("60d213a4b04324a927bae538").catch((e) => {err = e})
        console.log(res, err)
        expect(err).toStrictEqual({ result: false, message: 'Chế độ nghiêm ngặt không cho phép trừ số tiền quá tài khoản' })
    })
})

describe('Save transaction info', () => {
    it("M1C4TC001", async () => {
        let err = null
        let res = await TransactionScreen.saveTransaction({
            userId: new BSON.ObjectID(),
            note: "a test",
            walletId: "61b09047451e46bccdd711bc",
            amount: 80000,
            occur_date: new Date(),
            categoryId: "61b0231b451e46bccdd7119d",
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M1C4TC002", async () => {
        let err = null
        let res = await TransactionScreen.saveTransaction({
            transactionId: "60d213a4b04324a927bae538",
            userId: new BSON.ObjectID(),
            note: "a test",
            walletId: "61b09047451e46bccdd711bc",
            amount: 80000,
            occur_date: new Date(),
            categoryId: "61b0231b451e46bccdd7119d",
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M1C4TC003", async () => {
        let err = null
        let res = await TransactionScreen.saveTransaction({
            transactionId: "60d213a4b04324a927bae538",
            userId: new BSON.ObjectID(),
            note: "a test",
            walletId: "61b09047451e46bccdd711bc",
            amount: 80000,
            occur_date: new Date(),
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M1C4TC004", async () => {
        let err = null
        let res = await TransactionScreen.saveTransaction({
            transactionId: "60d213a4b04324a927bae538",
            userId: new BSON.ObjectID(),
            note: "a test",
            walletId: "61b09047451e46bccdd711bc",
            amount: 80000,
            occur_date: new Date(),
            categoryId: new BSON.ObjectID(),
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M1C4TC005", async () => {
        let err = null
        let res = await TransactionScreen.saveTransaction({
            userId: new BSON.ObjectID(),
            note: "a test",
            walletId: "61b09047451e46bccdd711bc",
            amount: 20000000000,
            occur_date: new Date(),
            categoryId: "61b0231b451e46bccdd7119d",
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(err).toStrictEqual({result: "false", message: "Số tiền vượt quá giá trị cho phép"})
    })

    it("M1C4TC006", async () => {
        let err = null
        let res = await TransactionScreen.saveTransaction({
            userId: new BSON.ObjectID(),
            note: "a test",
            walletId: "61b09047451e46bccdd711bc",
            amount: 2000000,
            occur_date: new Date(),
            categoryId: "61b0231b451e46bccdd7119d",
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})