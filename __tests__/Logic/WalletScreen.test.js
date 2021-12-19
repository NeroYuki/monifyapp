import { BSON } from 'realm'
import * as ScreenWallet from '../../App/logic/Screen-wallet'

describe('Fetch all wallet', () => {
    it("M11C1TC001", async () => {
        let err = null
        let res = await ScreenWallet.querywallet({}).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
    
})

describe('Fetch a wallet', () => {
    it("M11C2TC001", async () => {
        let err = null
        let res = await ScreenWallet.fetchWallet("61b09047451e46bccdd711bc").catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M11C2TC002", async () => {
        let err = null
        let res = await ScreenWallet.fetchWallet(new BSON.ObjectID().toHexString()).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Remove wallet', () => {
    it("M11C3TC001", async () => {
        let queryRes = await ScreenWallet.querywallet({walletName: "ToBeDeleted"})
        if (!queryRes || queryRes.length === 0) return
        let deleteId = queryRes[0].walletId

        let err = null
        let res = await ScreenWallet.deleteWallet(deleteId).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M11C3TC002", async () => {
        let err = null
        let res = await ScreenWallet.deleteWallet(new BSON.ObjectID()).catch((e) => {err = e})
        console.log(res, err)
        expect(err).not.toBe(null)
    })
})

describe('Save wallet info', () => {
    it("M11C4TC001", async () => {
        let err = null
        let res = await ScreenWallet.saveWallet({walletName: "Test Wallet", color: "#332211", amount: 150000}).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
    
    it("M11C4TC002", async () => {
        let err = null
        let res = await ScreenWallet.saveWallet({walletId: "61b09047451e46bccdd711bc", walletName: "Test Wallet 2", color: "#332211", amount: 150000}).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M11C4TC003", async () => {
        let err = null
        let res = await ScreenWallet.saveWallet({walletId: "61b09047451e46bccdd711bc", color: "#332211", amount: 120000}).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
    
})

describe('Query wallet', () => {
    it("M11C5TC001", async () => {
        let err = null
        let res = await ScreenWallet.querywallet({walletName: "Test", minAmount: 100000, maxAmount: 3000000}).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M11C5TC002", async () => {
        let err = null
        let res = await ScreenWallet.querywallet({minAmount: 100000}).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M11C5TC003", async () => {
        let err = null
        let res = await ScreenWallet.querywallet({maxAmount: 3000000}).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M11C5TC004", async () => {
        let err = null
        let res = await ScreenWallet.querywallet({walletName: "Test"}).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

afterAll(async () => {
    await ScreenWallet.saveWallet({walletName: "ToBeDeleted", color: "#332211", amount: 120000})
})