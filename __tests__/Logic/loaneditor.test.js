import { saveLoan,fetchLoan, queryLoan, deleteLoan } from '../../App/logic/Screen-loan'
const today = new Date()
test('loaneditortest',async ()=> {
    await(saveLoan({loanName:'noxau',amount: 5000000,color: '#123456',expire_on:today,interest: 0.5,creationDate:today,cycle:30})
      .then((tk)=>{
    expect(tk).toBe(true)}))


})
  
test('loan update', async() =>{
    let rs = await(queryLoan({loanName:'noxau'}))
    console.log(JSON.stringify(rs))
    //console.log(rs[0].loanId)
    await(saveLoan({loanId: rs[0].loanId,amount : 11111,loanName:'opka'})).then(rs2=>{
        console.log('aaaaaaaaaaaaa')
            expect(rs2).not.toBe(null)
    })
})
test('loanquery',async()=>{                                                                               
    await(queryLoan({loanName:'opka'}).then(rs => {
        console.log(rs)
        expect(rs[0].name).toBe('opka')
    }
    ))
})
test('delete okpa',async()=>{
    rs =await(queryLoan({loanName:'opka'}))
    console.log(rs)
    await (
        rs.forEach(element => {
        // console.log(JSON.parse(JSON.stringify(element)))
        // console.log((element.loanId))
        deleteLoan(element.loanId)
    }))

    await(queryLoan({loanName:'opka'}).then(rs => {
        expect(rs).toEqual([])
    }
    ))
})