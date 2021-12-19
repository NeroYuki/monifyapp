import { BSON } from 'realm'
import * as LoanScreen from '../../App/logic/Screen-loan'
import sessionStore from '../../App/logic/sessionStore'

sessionStore.activeUserId = new BSON.ObjectID('61b00ff0451e46bccdd7119a')

describe('Fetch all loan', () => {
    it("M6C1TC001", async () => {
        let err = null
        let res = await LoanScreen.queryLoan({}).catch((e) => {err = e})
        console.log(res, err)
        expect(res.length).toBeGreaterThan(0)
    })
})

describe('Fetch a loan', () => {
    it("M6C2TC001", async () => {
        let err = null
        let res = await LoanScreen.fetchLoan(new BSON.ObjectID("61b9a2f0cef20d2890331b6b")).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M6C2TC002", async () => {
        let err = null
        let res = await LoanScreen.fetchLoan(new BSON.ObjectID()).catch((e) => {err = e})
        console.log(res, err)
        expect(err).toBe("Không tìm thấy tài khoản")
    })
})

describe('Remove loan', () => {
    it("M6C3TC001", async () => {
        let err = null
        let res = await LoanScreen.deleteLoan(new BSON.ObjectID()).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M6C3TC002", async () => {
        let err = null
        let res = await LoanScreen.deleteLoan(new BSON.ObjectID()).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Save loan info', () => {
    it("M6C4TC001", async () => {
        let err = null
        let res = await LoanScreen.saveLoan({
            loanName: 'Test Loan',
            color: '#ffffff',
            amount: 300000,
            expire_on: new Date(2021, 1, 15),
            interest: 0.2,
            creationDate: new Date(),
            cycle: 'month',
            applied_wallet_id: new BSON.ObjectID("61b09047451e46bccdd711bc")
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M6C4TC002", async () => {
        let err = null
        let res = await LoanScreen.saveLoan({
            loanId: new BSON.ObjectID("61bc044787aacb72705b5a09"),
            loanName: 'Test Loan',
            color: '#ffffff',
            amount: 300000,
            expire_on: new Date(2021, 1, 15),
            interest: 0.2,
            creationDate: new Date(),
            cycle: 'month',
            applied_wallet_id: new BSON.ObjectID()
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M6C4TC003", async () => {
        let err = null
        let res = await LoanScreen.saveLoan({
            loanId: new BSON.ObjectID("61bc044787aacb72705b5a09"),
            loanName: 'Test Loan',
            color: '#ffffff',
            amount: 300000,
            expire_on: new Date(2021, 1, 15),
            interest: 0.2,
            creationDate: new Date(),
            cycle: 'month',
            applied_wallet_id: new BSON.ObjectID()
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M6C4TC004", async () => {
        let err = null
        let res = await LoanScreen.saveLoan({
            loanId: new BSON.ObjectID("61bc044787aacb72705b5a09"),
            loanName: 'Test Loan',
            color: '#ffffff',
            amount: 300000,
            expire_on: new Date(2021, 1, 15),
            interest: 0.2,
            creationDate: new Date(),
            cycle: 'month',
            applied_wallet_id: new BSON.ObjectID()
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M6C4TC005", async () => {
        let err = null
        let res = await LoanScreen.saveLoan({
            loanId: new BSON.ObjectID("61bc044787aacb72705b5a09"),
            loanName: 'Test Loan',
            color: '#ffffff',
            amount: 300000,
            expire_on: new Date(2021, 1, 15),
            interest: 0.2,
            creationDate: new Date(),
            cycle: 'month',
            applied_wallet_id: new BSON.ObjectID()
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M6C4TC006", async () => {
        let err = null
        let res = await LoanScreen.saveLoan({
            loanId: new BSON.ObjectID("61bc044787aacb72705b5a09"),
            loanName: 'Test Loan',
            color: '#ffffff',
            amount: 300000,
            expire_on: new Date(2021, 1, 15),
            interest: 0.2,
            creationDate: new Date(),
            cycle: 'month',
            applied_wallet_id: new BSON.ObjectID()
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M6C4TC007", async () => {
        let err = null
        let res = await LoanScreen.saveLoan({
            loanId: new BSON.ObjectID("61bc044787aacb72705b5a09"),
            loanName: 'Test Loan',
            color: '#ffffff',
            amount: 300000,
            expire_on: new Date(2021, 1, 15),
            interest: 0.2,
            creationDate: new Date(),
            cycle: 'month',
            applied_wallet_id: new BSON.ObjectID()
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Deactivate loan', () => {
    it("M6C5TC001", async () => {
        let err = null
        let res = await LoanScreen.deactivateLoan(new BSON.ObjectID("61bbfdd287aacb72705b5a05")).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M6C5TC002", async () => {
        let err = null
        let res = await LoanScreen.deactivateLoan(new BSON.ObjectID()).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Query loan', () => {
    it("M6C6TC001", async () => {
        let err = null
        let res = await LoanScreen.queryLoan({
            loanName: "Test",
            minAmount: 100000,
            maxAmount: 3000000,
            expire_in_days: new Date(2021, 12, 31)
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(undefined)
    })

    it("M6C6TC002", async () => {
        let err = null
        let res = await LoanScreen.queryLoan({
            minAmount: 100000,
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M6C6TC003", async () => {
        let err = null
        let res = await LoanScreen.queryLoan({
            maxAmount: 3000000,
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(undefined)
    })

    it("M6C6TC004", async () => {
        let err = null
        let res = await LoanScreen.queryLoan({
            expire_in_days: new Date(2021, 12, 31)
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M6C6TC005", async () => {
        let err = null
        let res = await LoanScreen.queryLoan({
            loanName: "Test"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})