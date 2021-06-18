import { BSON } from "realm";
import { deleteSaving, querySaving, saveSaving } from "../../App/logic/Screen-saving"

const today = new Date()
const expire_in_days =today.addDays(5)

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

test('add wallet', async () => {
    await(saveSaving({savingName:'saving', color: '#123456', amount: 1000000, expire_on:expire_in_days,interest: 5,applied_wallet_id: new BSON.ObjectID(), early_interest:'15%', creationDate:today})
    .then((tk)=>{
  expect(tk).toBe(true)}))
})
test('wallet update', async() =>{
    let rs = await(querySaving({savingName:'saving'}))
    //console.log(JSON.stringify(rs))
   // console.log(rs[0].walletId)
    await(saveSaving({savingId: rs[0].savingId,amount : 11111+22222,savingName:'opka'}))
    .then(rs2=>{
        console.log('aaaaaaaaaaaaa')
            expect(rs2).not.toBe(null)
    })
})


test('wallet query',async()=>{
    await(querySaving({savingName:'opka'}).then(rs => {
        expect(rs[0].name).toBe('opka')
        expect(rs[0].amount).toEqual(33333)
    }
    ))
})
test('delete okpa',async()=>{
    rs =await(querySaving({savingName:'opka'}))
    await (
        rs.forEach(element => {
        // console.log(JSON.parse(JSON.stringify(element)))
        // console.log((element.loanId))
        deleteSaving(element.savingId)
    }))

    await(querySaving({savingName:'opka'}).then(rs => {
        expect(rs).toEqual([])
    }
    ))
})