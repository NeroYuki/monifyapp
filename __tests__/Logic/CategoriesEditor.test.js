import { BSON } from 'realm'
import * as CategoriesEditor from '../../App/logic/Component-CategoryEditor'

describe('Fetch transaction category', () => {
    it("M3C1TC001", async () => {
        let err = null
        let res = await CategoriesEditor.fetchCategory({categoryId: "61b0231b451e46bccdd7119d"}).catch((e) => {err = e})
        expect(res).not.toBe(null)
    })

    it("M3C1TC002", async () => {
        let err = null
        let res = await CategoriesEditor.fetchCategory({categoryId: new BSON.ObjectID()}).catch((e) => {err = e})
        expect(res).toHaveLength(0)
    })
})

describe('Save transaction category info', () => {
    it("M3C2TC001", async () => {
        let err = null
        let res = await CategoriesEditor.saveCategory({name: "November Wage", color: "#0033ff", icon: "salary", loaihangmuc: "thunhap"}).catch((e) => {err = e})
        expect(res).toStrictEqual({result:true, message:'Tạo hạng mục thành công'})
    })

    it("M3C2TC002", async () => {
        let err = null
        let res = await CategoriesEditor.saveCategory({category_id: "61b0231b451e46bccdd7119d", name: 'Grocery', color: "#0033ff", icon: "home", loaihangmuc: "chitieu"}).catch((e) => {err = e})
        expect(res).toStrictEqual({result:true,message:'Cập nhật hạng mục thành công'})
    })

    it("M3C2TC003", async () => {
        let err = null
        let res = await CategoriesEditor.saveCategory({category_id: new BSON.ObjectID(), name: 'Grocery', color: "#0033ff", icon: "home", loaihangmuc: "chitieu"}).catch((e) => {err = e})
        expect(err).toStrictEqual({result:false, mesage:'Cập nhật hạng mục thất bại'})
    })

    it("M2C2TC004", async () => {
        let err = null
        let res = await CategoriesEditor.saveCategory({category_id: "61b0231b451e46bccdd7119d", name: 'Grocery', color: "#0033ff", icon: "home", loaihangmuc: "N/A"}).catch((e) => {err = e})
        expect(err).toStrictEqual({result:false,mesage:'Không tìm thấy loại hạng mục'})
    })
})
