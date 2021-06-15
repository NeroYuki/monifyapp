import {queryTransactions,queryTranCategories} from '../../App/logic/Screen-Overview'

test('testing logic queryTransactions', async () => {
    console.log(JSON.parse(JSON.stringify(await queryTransactions({walletId:'60c6c5cccd27f85b4ce40945'}))))//start_day:'2011-11-11T10:20:30.000Z',end_day:'',period:'week',
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

test('testing logic queryTranCategories', async () => {
    console.log(JSON.parse(JSON.stringify(await queryTranCategories({walletId:'60c6c5cccd27f85b4ce40945'}))))//start_day:'',end_day:'',period:'week',
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})