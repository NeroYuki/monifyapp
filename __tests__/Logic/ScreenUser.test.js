import { fetchuser, login, register } from "../../App/logic/Screen-User"
import { deleteNguoiDung } from "../../App/services/NguoiDungCRUD"


test('nguoi dung register', async() =>{
    await(register({username:'ahahavip',password:'minhhieu',email:null}).then((tk)=>{
        expect(tk).toEqual(true)
    },(error)=>{
        console.log(error)
    }))
})
test('log in', async()=>{
    let rs = await(login({username:'ahahavip',password: 'minhhieu'}))
    //console.log(rs)
    expect(rs).not.toBe(null)
    let rs2 = await(login({username:'ahahavip',password: 'minhhieu2'}))
    //console.log(rs2)
    expect(rs2).toEqual(false)
})
test('fetchuser',async()=>{
    let rs = await(login({username:'ahahavip',password: 'minhhieu'}))
    await(fetchuser(rs).then(tk=>{
        console.log(tk)
        deleteNguoiDung(rs).then(tk=>console.log(tk),(er)=> {console.error(er);})
    },(er)=> {reject(er);}))
})