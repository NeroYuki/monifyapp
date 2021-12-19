import { BSON } from 'realm'
import * as CategoriesModal from '../../App/logic/Component-CategoriesModal'

describe('Fetch all transaction category', () => {
    it("M2C1TC001", async () => {
        let err = null
        let res = await CategoriesModal.fetchCategories().catch((e) => {err = e})
        console.log(res, err)
        expect(res).not.toBe(null)
    })

})

describe('Remove transaction category', () => {
    it("M2C2TC001", async () => {
        let err = null
        let res = await CategoriesModal.deleteCategory({categoryId: "61b038cd451e46bccdd7119f"}).catch((e) => {err = e})
        console.log(res, err)
        expect(res).toStrictEqual({result:true,message:'Xóa hạng mục thành công'})
    })

    it("M2C2TC002", async () => {
        let err = null
        let res = await CategoriesModal.deleteCategory({categoryId: "61b0231b451e46bccdd7119d"}).catch((e) => {err = e})
        console.log(res, err)
        expect(res).toStrictEqual({result:true,message:'Xóa hạng mục thành công'})
    })

    it("M2C2TC003", async () => {
        let err = null
        let res = await CategoriesModal.deleteCategory({categoryId: new BSON.ObjectID()}).catch((e) => {err = e})
        console.log(res, err)
        expect(err).toStrictEqual({result:false,message:'Xóa hạng mục thất bại'})
    })

})

