import {fetchTransaction,deleteTransaction,saveTransaction} from '../../App/logic/Component-TransactionEditor'
import {BSON} from 'realm'

let idtaikhoan=new BSON.ObjectID('60c215597db98e07e0ecf147')

let GiaoDich={
    transactionId:'60c9cff16167e5bc3c8fd6aa',
    userId:'60c22a3e29fc94b5464910a8',
    occur_date:new Date('2011-11-11T10:20:30.000Z'),
    walletId:idtaikhoan,
    amount:10,
    categoryId:'60c20d3075a2f3751ad6e731',//60c20d3075a2f3751ad6e731,60c1e454c706ae2f3930f623
    note:'Tiền chơi crypto',
}

test('testing logic saveTransaction', async () => {
    console.log(JSON.parse(JSON.stringify(await saveTransaction(GiaoDich))))
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

// test('testing logic deleteTransaction', async () => {
//     console.log(JSON.parse(JSON.stringify(await deleteTransaction({transactionId:'60c36b9f7ab578ff8656f01b'}))))
//     // console.log(caidattest)
//     // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
// })

test('testing logic fetchTransaction', async () => {
    console.log(JSON.parse(JSON.stringify(await fetchTransaction({}))))
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})
