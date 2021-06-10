import { saveLoan,fetchLoan, queryLoan } from '../../App/logic/Screen-loanEditor'
const today = new Date()
test('loaneditortest',async ()=> {
    await(saveLoan({loanName:'noxau',amount: 5000000,expire_on:today,interest: 0.5,creationDate:today,cycle:30})
    .then(tk=>{
        
       // expect(tk).toBe(true)
        queryLoan({loanName:'noxau'})
        .then(rs => {
            //console.log(rs)
            //expect(rs[0].name).toBe('noxau')
            //console.log(rs[0])
            saveLoan({loanId: rs[0].loanId,amount : 11111,loanName:'opka'}).then(rs2=>{
                console.log('aaaaaaaaaaaaa')
                expect(rs2).toBe(true)
            })
        })
    })
 )
})

test('loanquery',async()=>{
    await(queryLoan({loanName:'opka'})
    .then(rs => {
        //console.log(rs[0])
        expect(rs[0].name).toBe('opka')
    }
    ))
})