import {checkBillForCycle} from '../../App/logic/CallOnAppCheckBill'

test('testing logic checkBillForCycle', async () => {
    console.log(JSON.parse(JSON.stringify(await checkBillForCycle())))
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
  })