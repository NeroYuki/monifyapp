import { BSON } from "realm"
import { insertNewNguoiDung, queryAllNguoiDung } from "../services/NguoiDungCRUD"


export const register = ({name, password,email}) => new Promise((resovle, reject) => {
    insertNewNguoiDung({
        idnguoidung: new BSON.ObjectID(),
        username: name,
        email: email,
        pass: password,
    }).then(resovle(true),reject(false))
})  
export const login = ({username, password})=> new Promise((resovle, reject) => {
    queryAllNguoiDung({deleted= 0}).then((nguoidungs)=>{
        let rs 
        nguoidungs.forEach(element => {
            if(element.username== username && element.pass==password) rs = element.idnguoidung
        });
        if(rs!=null)resovle(rs)
        resovle(false)
    },(er)=>{reject(er)})

})
export const fetchuser = ({userId})=> new Promise((resovle, reject) => {
    queryNguoiDung({userId}).then((nguoidung)=>{
        if(nguoidung != null)
        resovle({
            idnguoidung: nguoidung.userId,
            username: nguoidung.username,
            email:nguoidung.email,
            pass: nguoidung.pass,
        })
        else
        resovle(false)
    },(er)=>{reject(er)})
})