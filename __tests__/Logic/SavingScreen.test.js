import { BSON } from 'realm'
import * as SavingScreen from '../../App/logic/Screen-saving'
import sessionStore from '../../App/logic/sessionStore'

sessionStore.activeUserId = new BSON.ObjectID('61b00ff0451e46bccdd7119a')

describe('Fetch all saving', () => {
    it("M9C1TC001", async () => {
        let err = null
        let res = await SavingScreen.querySaving({}).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Fetch a saving', () => {
    it("M9C2TC001", async () => {
        let err = null
        let res = await SavingScreen.fetchSaving(new BSON.ObjectID("61b9a2cacef20d2890331b69")).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M9C2TC002", async () => {
        let err = null
        let res = await SavingScreen.fetchSaving(new BSON.ObjectID()).catch((e) => {err = e})
        console.log(res, err)
        expect(err).toBe("Không tìm thấy id tài khoản tiết kiệm")
    })
})

describe('Remove saving', () => {
    it("M9C3TC001", async () => {
        let err = null
        let res = await SavingScreen.deleteSaving(new BSON.ObjectID()).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M9C3TC002", async () => {
        let err = null
        let res = await SavingScreen.deleteSaving(new BSON.ObjectID()).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Save saving info', () => {
    it("M9C4TC001", async () => {
        let err = null
        let res = await SavingScreen.saveSaving({
            savingName: 'Test Saving',
            color: '#ffffff',
            amount: 300000,
            expire_on: new Date(2022, 1, 1),
            interest: 0.2,
            early_interest: "0.05",
            applied_wallet_id: new BSON.ObjectID(),
            creationDate: new Date()
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M9C4TC002", async () => {
        let err = null
        let res = await SavingScreen.saveSaving({
            savingId: new BSON.ObjectID("61bc056287aacb72705b5a0d"),
            savingName: 'Test Saving',
            color: '#ffffff',
            amount: 300000,
            expire_on: new Date(2022, 1, 1),
            interest: 0.2,
            early_interest: "0.05",
            applied_wallet_id: new BSON.ObjectID(),
            creationDate: new Date()
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M9C4TC003", async () => {
        let err = null
        let res = await SavingScreen.saveSaving({
            savingId: new BSON.ObjectID("61bc056287aacb72705b5a0d"),
            savingName: 'Test Saving',
            color: '#ffffff',
            amount: 300000,
            expire_on: new Date(2022, 1, 1),
            interest: 0.2,
            early_interest: "0.05",
            applied_wallet_id: new BSON.ObjectID(),
            creationDate: new Date()
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M9C4TC004", async () => {
        let err = null
        let res = await SavingScreen.saveSaving({
            savingId: new BSON.ObjectID("61bc056287aacb72705b5a0d"),
            savingName: 'Test Saving',
            color: '#ffffff',
            amount: 300000,
            expire_on: new Date(2022, 1, 1),
            interest: 0.2,
            early_interest: "0.05",
            applied_wallet_id: new BSON.ObjectID(),
            creationDate: new Date()
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M9C4TC005", async () => {
        let err = null
        let res = await SavingScreen.saveSaving({
            savingId: new BSON.ObjectID("61bc056287aacb72705b5a0d"),
            savingName: 'Test Saving',
            color: '#ffffff',
            amount: 300000,
            expire_on: new Date(2022, 1, 1),
            interest: 0.2,
            early_interest: "0.05",
            applied_wallet_id: new BSON.ObjectID(),
            creationDate: new Date()
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M9C4TC006", async () => {
        let err = null
        let res = await SavingScreen.saveSaving({
            savingId: new BSON.ObjectID("61bc056287aacb72705b5a0d"),
            savingName: 'Test Saving',
            color: '#ffffff',
            amount: 300000,
            expire_on: new Date(2022, 1, 1),
            interest: 0.2,
            early_interest: "0.05",
            applied_wallet_id: new BSON.ObjectID(),
            creationDate: new Date()
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M9C4TC007", async () => {
        let err = null
        let res = await SavingScreen.saveSaving({
            savingId: new BSON.ObjectID("61bc056287aacb72705b5a0d"),
            savingName: 'Test Saving',
            color: '#ffffff',
            amount: 300000,
            expire_on: new Date(2022, 1, 1),
            interest: 0.2,
            early_interest: "0.05",
            applied_wallet_id: new BSON.ObjectID(),
            creationDate: new Date()
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M9C4TC008", async () => {
        let err = null
        let res = await SavingScreen.saveSaving({
            savingId: new BSON.ObjectID("61bc056287aacb72705b5a0d"),
            savingName: 'Test Saving',
            color: '#ffffff',
            amount: 300000,
            expire_on: new Date(2022, 1, 1),
            interest: 0.2,
            early_interest: "0.05",
            applied_wallet_id: new BSON.ObjectID(),
            creationDate: new Date()
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Deactivate saving', () => {
    it("M9C5TC001", async () => {
        let err = null
        let res = await SavingScreen.deactivateSaving(new BSON.ObjectID("61bbfe1087aacb72705b5a07")).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M9C5TC002", async () => {
        let err = null
        let res = await SavingScreen.deactivateSaving(new BSON.ObjectID()).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Query saving', () => {
    it("M9C6TC001", async () => {
        let err = null
        let res = await SavingScreen.querySaving({
            savingName: "Test",
            minAmount: 100000,
            maxAmount: 3000000,
            expire_in_days: new Date(2022, 1, 31)
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(undefined)
    })

    it("M9C6TC002", async () => {
        let err = null
        let res = await SavingScreen.querySaving({
            savingName: "Test",
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M9C6TC003", async () => {
        let err = null
        let res = await SavingScreen.querySaving({
            minAmount: 100000,
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(undefined)
    })

    it("M9C6TC004", async () => {
        let err = null
        let res = await SavingScreen.querySaving({
            maxAmount: 3000000,
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M9C6TC005", async () => {
        let err = null
        let res = await SavingScreen.querySaving({
            expire_in_days: new Date(2022, 1, 31)
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})