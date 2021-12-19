import * as RecurringBillCheck from '../../App/logic/CallOnAppCheckBill'
import * as OnAppOpeningRoutine from '../../App/logic/callonappopenning'

describe('Check expiring loan', () => {
    it("M12C1TC001", async () => {
        let err = null
        let res = await OnAppOpeningRoutine.checkLoansForCycle().catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M12C1TC002", async () => {
        let err = null
        let res = await OnAppOpeningRoutine.checkLoansForCycle().catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Check expiring saving', () => {
    it("M12C2TC001", async () => {
        let err = null
        let res = await OnAppOpeningRoutine.checkSavingsForCycle().catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M12C2TC002", async () => {
        let err = null
        let res = await OnAppOpeningRoutine.checkSavingsForCycle().catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Load local user info', () => {
    it("M12C3TC001", async () => {
        let err = null
        let res = await OnAppOpeningRoutine.checkInitialLaunch().catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M12C3TC002", async () => {
        let err = null
        let res = await OnAppOpeningRoutine.checkInitialLaunch().catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Check for incoming bill', () => {
    it("M12C4TC001", async () => {
        let err = null
        let res = await RecurringBillCheck.checkBillForCycle().catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M12C4TC002", async () => {
        let err = null
        let res = await RecurringBillCheck.checkBillForCycle().catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})