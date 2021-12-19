import * as OverviewScreen from '../../App/logic/Screen-Overview'

describe('Query transaction', () => {
    it("M7C1TC001", async () => {
        let err = null
        let res = await OverviewScreen.queryTransactions({
            start_day: new Date(2021, 11, 11),
            end_day: new Date(2021, 12, 11),
            wallet_id: "61801bc72e9b4e30975cc13d"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M7C1TC002", async () => {
        let err = null
        let res = await OverviewScreen.queryTransactions({
            period: "month",
            wallet_id: "61801bc72e9b4e30975cc13d"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M7C1TC003", async () => {
        let err = null
        let res = await OverviewScreen.queryTransactions({
            end_day: new Date(2021, 12, 11),
            wallet_id: "61801bc72e9b4e30975cc13d"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M7C1TC004", async () => {
        let err = null
        let res = await OverviewScreen.queryTransactions({
            start_day: new Date(2021, 11, 11),
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Query transaction category', () => {
    it("M7C2TC001", async () => {
        let err = null
        let res = await OverviewScreen.queryTranCategories({
            start_day: new Date(2021, 11, 11),
            end_day: new Date(2021, 12, 11),
            wallet_id: "61801bc72e9b4e30975cc13d"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M7C2TC002", async () => {
        let err = null
        let res = await OverviewScreen.queryTranCategories({
            period: "month",
            wallet_id: "61801bc72e9b4e30975cc13d"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M7C2TC003", async () => {
        let err = null
        let res = await OverviewScreen.queryTranCategories({
            end_day: new Date(2021, 12, 11),
            wallet_id: "61801bc72e9b4e30975cc13d"
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M7C2TC004", async () => {
        let err = null
        let res = await OverviewScreen.queryTranCategories({
            start_day: new Date(2021, 11, 11),
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})