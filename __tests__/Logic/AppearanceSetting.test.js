import * as AppearanceSetting from '../../App/logic/Screen-AppearanceSetting'
import * as DBConnection from '../../App/services/RealmConnection'
import {BSON} from 'realm'

const data = {
    idnguoidung: new BSON.ObjectID(),
    loaitien: "vnd",
    chedo: "dark",
    ngonngu: "vn",
    chedonghiemngat: true,
}

const data_2 = {
    idnguoidung: new BSON.ObjectID(),
    loaitien: "vnd",
    chedo: "dark",
    ngonngu: "zh",
    chedonghiemngat: true,
}

const data_3 = {
    idnguoidung: new BSON.ObjectID(),
    loaitien: "eur",
    chedo: "dark",
    ngonngu: "vn",
    chedonghiemngat: true,
}

const data_4 = {
    idnguoidung: new BSON.ObjectID(),
    loaitien: "vnd",
    chedo: "neutral",
    ngonngu: "vn",
    chedonghiemngat: true,
}


describe('Fetch appearance preference', () => {
    it("M4C1TC001", async () => {
        let res= await AppearanceSetting.fetchSetting()
        expect(res).toStrictEqual({
            loaitien: "usd",
            chedo: "light",
            ngonngu: "en",
            chedonghiemngat: false,
        })
    })
})

describe('Save appearance preference', () => {
    it("M4C2TC001", async () => {
        let err = null
        let res = await AppearanceSetting.saveSetting(data).catch((e) => {err = e})
        expect(res).toStrictEqual({ result: true, message: 'Lưu cài đặt thành công' })
    })

    it("M4C2TC002", async () => {
        let err = null
        let res = await AppearanceSetting.saveSetting(data_2).catch((e) => {err = e})
        expect(err).toStrictEqual({ result: false, message: 'Lưu cài đặt thất bại' })
    })

    it("M4C2TC003", async () => {
        let err = null
        let res = await AppearanceSetting.saveSetting(data_3).catch((e) => {err = e})
        expect(err).toStrictEqual({ result: false, message: 'Lưu cài đặt thất bại' })
    })

    it("M4C2TC004", async () => {
        let err = null
        let res = await AppearanceSetting.saveSetting(data_4).catch((e) => {err = e})
        expect(err).toStrictEqual({ result: false, message: 'Lưu cài đặt thất bại' })
    })
})

describe('Fetch appearance preference (cont.)', () => {
    it("M4C1TC002", async () => {
        let res = await AppearanceSetting.fetchSetting()
        expect(res).not.toBe(null)
    })
})