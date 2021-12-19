import * as RecurringBillManager from '../../App/logic/Screen-RecurringBillManager'
import * as RecurringBillEditor from '../../App/logic/screen-RecurringBillEditor'
import { BSON } from 'realm'
import sessionStore from '../../App/logic/sessionStore'

sessionStore.activeUserId = new BSON.ObjectID('61b00ff0451e46bccdd7119a')

describe('Fetch all recurring bill', () => {
    it("M10C1TC001", async () => {
        let err = null
        let res = await RecurringBillManager.queryBill({}).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Fetch a recurring bill', () => {
    it("M10C2TC001", async () => {
        let err = null
        let res = await RecurringBillEditor.fetchBill(new BSON.ObjectID("61b96d07cef20d2890331b63")).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M10C2TC002", async () => {
        let err = null
        let res = await RecurringBillEditor.fetchBill(new BSON.ObjectID()).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Remove recurring bill', () => {
    it("M10C3TC001", async () => {
        let err = null
        let res = await RecurringBillManager.deleteBill(new BSON.ObjectID()).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M10C3TC002", async () => {
        let err = null
        let res = await RecurringBillManager.deleteBill(new BSON.ObjectID()).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Save recurring bill info', () => {
    it("M10C4TC001", async () => {
        let err = null
        let res = await RecurringBillEditor.saveBill({
            userId: new BSON.ObjectID(sessionStore.activeUserId),
            loaihangmucId: new BSON.ObjectID("61bcbcdd87aacb72705b5a14"),
            name: "Test Bill",
            color: "#ffffff",
            amount: 1000,
            note: "Test Test",
            cycle_start: new Date(2021, 12, 1),
            cycle_duration_day: null,
            cycle_duration_month: 1
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M10C4TC002", async () => {
        let err = null
        let res = await RecurringBillEditor.saveBill({
            billId: new BSON.ObjectID("61bcc1df87aacb72705b5a1b"),
            userId: new BSON.ObjectID(sessionStore.activeUserId),
            loaihangmucId: new BSON.ObjectID("61bcbcdd87aacb72705b5a13"),
            name: "Test Bill",
            color: "#ffffff",
            amount: 1000,
            note: "Test Test",
            cycle_start: new Date(2021, 12, 1),
            cycle_duration_day: null,
            cycle_duration_month: 1
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M10C4TC003", async () => {
        let err = null
        let res = await RecurringBillEditor.saveBill({
            billId: new BSON.ObjectID("61bcc1df87aacb72705b5a1b"),
            userId: new BSON.ObjectID(sessionStore.activeUserId),
            loaihangmucId: new BSON.ObjectID(),
            name: "Test Bill",
            color: "#ffffff",
            amount: 1000,
            note: "Test Test",
            cycle_start: new Date(2021, 12, 1),
            cycle_duration_day: null,
            cycle_duration_month: 1
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M10C4TC004", async () => {
        let err = null
        let res = await RecurringBillEditor.saveBill({
            billId: new BSON.ObjectID("61bcc1df87aacb72705b5a1b"),
            userId: new BSON.ObjectID(sessionStore.activeUserId),
            loaihangmucId: new BSON.ObjectID(),
            name: "Test Bill",
            color: "#ffffff",
            amount: 1000,
            note: "Test Test",
            cycle_start: new Date(2021, 12, 1),
            cycle_duration_day: null,
            cycle_duration_month: 1
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M10C4TC005", async () => {
        let err = null
        let res = await RecurringBillEditor.saveBill({
            billId: new BSON.ObjectID("61bcc1df87aacb72705b5a1b"),
            userId: new BSON.ObjectID(sessionStore.activeUserId),
            loaihangmucId: new BSON.ObjectID(),
            name: "Test Bill",
            color: "#ffffff",
            amount: 1000,
            note: "Test Test",
            cycle_start: new Date(2021, 12, 1),
            cycle_duration_day: null,
            cycle_duration_month: 1
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M10C4TC006", async () => {
        let err = null
        let res = await RecurringBillEditor.saveBill({
            billId: new BSON.ObjectID("61bcc1df87aacb72705b5a1b"),
            userId: new BSON.ObjectID(sessionStore.activeUserId),
            loaihangmucId: new BSON.ObjectID(),
            name: "Test Bill",
            color: "#ffffff",
            amount: 1000,
            note: "Test Test",
            cycle_start: new Date(2021, 12, 1),
            cycle_duration_day: null,
            cycle_duration_month: 1
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M10C4TC007", async () => {
        let err = null
        let res = await RecurringBillEditor.saveBill({
            billId: new BSON.ObjectID("61bcc1df87aacb72705b5a1b"),
            userId: new BSON.ObjectID(sessionStore.activeUserId),
            loaihangmucId: new BSON.ObjectID(),
            name: "Test Bill",
            color: "#ffffff",
            amount: 1000,
            note: "Test Test",
            cycle_start: new Date(2021, 12, 1),
            cycle_duration_day: null,
            cycle_duration_month: 1
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Pause recurring bill', () => {
    it("M10C5TC001", async () => {
        let err = null
        let res = await RecurringBillManager.pauseBill({ billId: new BSON.ObjectID("61b96d07cef20d2890331b63") }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M10C5TC002", async () => {
        let err = null
        let res = await RecurringBillManager.pauseBill({ billId: new BSON.ObjectID() }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Resume recurring bill', () => {
    it("M10C6TC001", async () => {
        let err = null
        let res = await RecurringBillManager.resumeBill({ billId: new BSON.ObjectID("61b96d07cef20d2890331b63") }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M10C6TC002", async () => {
        let err = null
        let res = await RecurringBillManager.resumeBill({ billId: new BSON.ObjectID() }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})

describe('Query recurring bill', () => {
    it("M10C7TC001", async () => {
        let err = null
        let res = await RecurringBillManager.queryBill({
            billName: "Test",
            minAmount: 100000,
            maxAmount: 3000000
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M10C7TC002", async () => {
        let err = null
        let res = await RecurringBillManager.queryBill({
            minAmount: 100000
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M10C7TC003", async () => {
        let err = null
        let res = await RecurringBillManager.queryBill({
            maxAmount: 3000000
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

    it("M10C7TC004", async () => {
        let err = null
        let res = await RecurringBillManager.queryBill({
            billName: "Test",
        }).catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })
})