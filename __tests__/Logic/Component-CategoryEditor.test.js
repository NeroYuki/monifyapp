import { fetchCategory, saveCategory } from '../../App/logic/Component-CategoryEditor'
import { fetchCategories, deleteCategory } from '../../App/logic/Component-CategoriesModal'

hangmucgiaodich = {
  // category_id: '60c1e454c706ae2f3930f623',
  userid: '60c0cb55a09b8f641df3ca14',
  name: 'Food',
  icon: '123456###',
  loaihangmuc: 'thunhap',//'chitieu'
  color: '#123456'
}
test('testing logic saveCategory', async () => {
  console.log(JSON.parse(JSON.stringify(await saveCategory(hangmucgiaodich))))
  // console.log(caidattest)
  // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

test('testing logic fetchCategory', async () => {
  console.log(JSON.parse(JSON.stringify(await fetchCategory({ categoryId: '60c1e454c706ae2f3930f623' }))))
  // console.log(caidattest)
  // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})
test('testing logic fetchCategories', async () => {
  console.log(JSON.parse(JSON.stringify(await fetchCategories({}))))
  // console.log(caidattest)
  // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})
