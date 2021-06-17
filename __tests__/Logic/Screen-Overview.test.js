import { queryTransactions, queryTranCategories } from '../../App/logic/Screen-Overview'

test('testing logic queryTransactions', async () => {

    var value = await queryTransactions({ walletId: '60c96efa9bd6d1e6e1aed7a6' }) //start_day:'2011-11-11T10:20:30.000Z',end_day:'',period:'week',

    console.log(value)
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

test('testing logic queryTranCategories', async () => {
    console.log(JSON.parse(JSON.stringify(await queryTranCategories({ walletId: '60c96efa9bd6d1e6e1aed7a6' }))))//start_day:'',end_day:'',period:'week',
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})