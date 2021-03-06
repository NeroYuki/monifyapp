import { resolvePlugin } from "@babel/core"
import { BSON } from "realm"
import { insertNewNguoiDung, queryAllNguoiDung, queryNguoiDung } from "../services/NguoiDungCRUD"


export const register = ({username, password,email}) => new Promise((resolve, reject) => {
    insertNewNguoiDung({
        idnguoidung: new BSON.ObjectID(),
        username: username,
        email: email,
        pass: password,
    }).then(resolve(true),reject(false))
})  
export const login = ({username, password})=> new Promise((resovle, reject) => {
    queryAllNguoiDung({deleted: false}).then((nguoidungs)=>{
        let rs 
        nguoidungs.forEach(element => {
            if(element.username== username && element.pass==password) rs = element.idnguoidung
        });
        if(rs!=null)resovle(JSON.parse(JSON.stringify(rs)))
        resovle(false)
    },(er)=>{console.error(er);return false;  })

})

export const checkNguoiDung = () =>  new Promise((resolve, reject) => {
    queryAllNguoiDung({deleted: false}).then((nguoidungs)=>{
        if (nguoidungs != null && nguoidungs.length > 0) resolve(true)
        else resolve(false)
    },(er)=>{ console.error(er);return false;  })
})

export const fetchuser = (userId)=> new Promise((resovle, reject) => {
    queryNguoiDung(userId).then((nguoidung)=>{
        if(nguoidung != null){
            let rs = {
                idnguoidung: JSON.parse(JSON.stringify(nguoidung.idnguoidung)),
                username: nguoidung.username,
                email:nguoidung.email,
                pass: nguoidung.pass,
                deleted: nguoidung.deleted
            }  
            resovle(rs)
        }
        else
        resovle(false)
    },(er)=>{console.error(er);})
})