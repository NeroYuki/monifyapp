import {fetchCategories,deleteCategory} from '../../App/logic/Component-CategoriesModal'

test('testing logic deleteCategory', async () => {
    console.log(JSON.parse(JSON.stringify(await deleteCategory({categoryId:'60c0cb55a09b8f641df3ca13'}))))
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

test('testing logic fetchCategories', async () => {
  console.log(JSON.parse(JSON.stringify(await fetchCategories({}))))
  // console.log(caidattest)
  // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

