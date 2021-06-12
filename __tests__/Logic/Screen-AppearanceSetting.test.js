import {saveSetting,fetchSetting} from '../../App/logic/Screen-AppearanceSetting'

let date= new Date('2011-04-11T10:20:30.000Z')

caidattest={
    idnguoidung: '60c0cb55a09b8f641df3ca14',
    loaitien: 'VND',
    chedo: 'Light',
    ngonngu: 'EN',
    chedonghiemngat: true,
}
test('testing logic saveSetting', async () => {
    console.log(JSON.parse(JSON.stringify(await saveSetting(caidattest))))
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})

test('testing logic fetchSetting', async () => {
    console.log(JSON.parse(JSON.stringify(await fetchSetting({}))))
    // console.log(caidattest)
    // expect(JSON.parse(JSON.stringify(await insertCaiDat(caidattest)))).toStrictEqual(JSON.parse(JSON.stringify(caidattest)))
})