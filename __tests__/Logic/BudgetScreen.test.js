import * as BudgetScreen from '../../App/logic/Screen-budget'
import {BSON} from 'realm'
import sessionStore from '../../App/logic/sessionStore'

sessionStore.activeUserId = new BSON.ObjectID('61b00ff0451e46bccdd7119a')

describe('Fetch all budget', () => {
    it("M5C1TC001", async () => {
        let err = null
        let res = await BudgetScreen.fetchBugetList().catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Fetch a budget', () => {
    it("M5C2TC001", async () => {
        let err = null
        //insert real object id her
        let res = await BudgetScreen.fetchBudget({budgetId: new BSON.ObjectID("61b9a462cef20d2890331b6f")}).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M5C2TC002", async () => {
        let err = null
        let res = await BudgetScreen.fetchBudget({budgetId: new BSON.ObjectID()}).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Remove budget', () => {
    it("M5C3TC001", async () => {
        let err = null
        //insert real object id her
        let res = await BudgetScreen.deleteBudget({budgetId: new BSON.ObjectID()}).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M5C3TC002", async () => {
        let err = null
        let res = await BudgetScreen.deleteBudget({budgetId: new BSON.ObjectID()}).catch((e) => {err = e})
        console.log(res, err)
        expect(err).toStrictEqual({result: "false", message: "Không tìm thấy mục tiêu tài chính"})
    })
})

describe('Save budget info', () => {
    it("M5C4TC001", async () => {

        let err = null
        let res = await BudgetScreen.saveBudget({
            userId: new BSON.ObjectID(sessionStore.activeUserId),
            name: "Test Budget",
            loaimuctieu: 'TieuDungQuaMuc',
            amount: 2000000,
            period: 'month',
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M5C4TC002", async () => {
        
        let err = null
        let res = await BudgetScreen.saveBudget({
            budgetId: new BSON.ObjectID("61bcc3a887aacb72705b5a21"),
            userId: new BSON.ObjectID(sessionStore.activeUserId),
            name: "Test Budget",
            loaimuctieu: 'TieuDungQuaMuc',
            amount: 2000000,
            period: 'month',
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M5C4TC003", async () => {
        let err = null
        let res = await BudgetScreen.saveBudget({
            budgetId: new BSON.ObjectID("61bcc3a887aacb72705b5a21"),
            userId: new BSON.ObjectID(sessionStore.activeUserId),
            name: "Test Budget",
            loaimuctieu: 'TieuDungQuaMuc',
            amount: 2000000,
            start_day: new Date(2021, 12, 1),
            end_day: new Date(2021, 12, 31)
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M5C4TC004", async () => {
        let err = null
        let res = await BudgetScreen.saveBudget({
            budgetId: new BSON.ObjectID("61bcc3a887aacb72705b5a21"),
            userId: new BSON.ObjectID(sessionStore.activeUserId),
            name: "Test Budget",
            loaimuctieu: 'TieuDungQuaMuc',
            amount: 2000000,
            start_day: new Date(2021, 12, 1),
            end_day: new Date(2021, 12, 31)
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M5C4TC005", async () => {
        let err = null
        let res = await BudgetScreen.saveBudget({
            budgetId: new BSON.ObjectID("61bcc3a887aacb72705b5a21"),
            userId: new BSON.ObjectID(sessionStore.activeUserId),
            name: "Test Budget",
            loaimuctieu: 'TieuDungQuaMuc',
            amount: 2000000,
            start_day: new Date(2021, 12, 1),
            end_day: new Date(2021, 12, 31)
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M5C4TC006", async () => {
        let err = null
        let res = await BudgetScreen.saveBudget({
            budgetId: new BSON.ObjectID("61bcc3a887aacb72705b5a21"),
            userId: new BSON.ObjectID(sessionStore.activeUserId),
            name: "Test Budget",
            loaimuctieu: 'TieuDungQuaMuc',
            amount: 2000000,
            start_day: new Date(2021, 12, 1),
            end_day: new Date(2021, 12, 31)
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})