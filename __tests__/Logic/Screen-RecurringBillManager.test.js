import {queryBill,pauseBill,resumeBill,deleteBill} from '../../App/logic/Screen-RecurringBillManager'

test('testing logic pauseBill', async () => {
  console.log(JSON.parse(JSON.stringify(await pauseBill({billId:'60c08e7ffbf11a1dc4d42890'}))))
  // console.log(caidattest)
  // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

test('testing logic resumeBill', async () => {
  console.log(JSON.parse(JSON.stringify(await resumeBill({billId:'60c08e7ffbf11a1dc4d42890'}))))
  // console.log(caidattest)
  // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

test('testing logic deleteBill', async () => {
  console.log(JSON.parse(JSON.stringify(await deleteBill({billId:'60bf81c035582676b155066d'}))))
  // console.log(caidattest)
  // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

test('testing logic queryBill', async () => {
  console.log(JSON.parse(JSON.stringify(await queryBill({}))))
  // console.log(caidattest)
  // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})



