import { deleteWallet, querywallet, saveWallet } from "../../App/logic/Screen-wallet"

const today = new Date()

test('add wallet', async () => {
    await(saveWallet({walletName:'tieudung',amount: 5000000,color: '#123456'})
    .then((tk)=>{
  expect(tk).toBe(true)}))
})
test('wallet update', async() =>{
    let rs = await(querywallet({walletName:'tieudung'}))
    //console.log(JSON.stringify(rs))
   // console.log(rs[0].walletId)
    await(saveWallet({walletId: rs[0].walletId,amount : 11111+22222,walletName:'opka'}))
    .then(rs2=>{
        console.log('aaaaaaaaaaaaa')
            expect(rs2).not.toBe(null)
    })
})


test('wallet query',async()=>{
    await(querywallet({walletName:'opka'}).then(rs => {
        expect(rs[0].name).toBe('opka')
        expect(rs[0].amount).toEqual(33333)
    }
    ))
})
test('delete okpa',async()=>{
    rs =await(querywallet({walletName:'opka'}))
    await (
        rs.forEach(element => {
        // console.log(JSON.parse(JSON.stringify(element)))
        // console.log((element.loanId))
        deleteWallet(element.walletId)
    }))

    await(querywallet({walletName:'opka'}).then(rs => {
        expect(rs).toEqual([])
    }
    ))
})