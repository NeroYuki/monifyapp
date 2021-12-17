
import {insertNewNguoiDung,updateNguoiDung,queryAllNguoiDung,deleteAllNguoiDung, queryNguoiDung, deleteNguoiDung} from '../App/services/NguoiDungCRUD';
import { BSON } from 'realm';
newidnguoidung = new BSON.ObjectID()
nguoiDung= {idnguoidung: new BSON.ObjectID(),username:'ahahavip',email: 'ahahavip@gmail.com', pass : 'minhhieu',deleted: false}

//insert nguoi dung
test('nguoidungCrud test insertnewnguoidung usecase 1 ', async()=> {
    expect((await insertNewNguoiDung({idnguoidung:newidnguoidung,username:'ahahavip',email: 'ahahavip@gmail.com', pass : 'minhhieu',deleted: false })).username).toBe('ahahavip');
})
test('nguoidungCrud test insertnewnguoidung usecase 2 ', async()=> {
    await(expect(insertNewNguoiDung( {idnguoidung: null,username:'ahahavip',email: 'ahahavip@gmail.com', pass : 'minhhieu',deleted: false })).rejects.toThrow("NguoiDung.idnguoidung must be of type 'objectId', got 'null' (null)"))
})
test('nguoidungCrud test insertnewnguoidung usecase 3 ', async()=> {
    await(expect(insertNewNguoiDung( {idnguoidung: new BSON.ObjectID(),username:null,email: 'ahahavip@gmail.com', pass : 'minhhieu',deleted: false })).rejects.toThrow());
})
test('nguoidungCrud test insertnewnguoidung usecase 4 ', async()=> {
    await(expect( insertNewNguoiDung( {idnguoidung: new BSON.ObjectID(),username:'ahahavip',email: null, pass : null,deleted: false })).rejects.toThrow());
})
test('nguoidungCrud test insertnewnguoidung usecase 5 ', async()=> {
    expect(JSON.parse(JSON.stringify(await insertNewNguoiDung( {idnguoidung: new BSON.ObjectID(),username:'ahahavip',email: 'ahahavip@gmail.com', pass : 'minhhieu'}))).username).toBe('ahahavip')
})
test('nguoidungCrud test insertnewnguoidung usecase 6 ', async()=> {
    await(expect(insertNewNguoiDung( {idnguoidung: 99,username:null,email: 'ahahavip@gmail.com', pass : 'minhhieu',deleted: false })).rejects.toThrow());
})
test('nguoidungCrud test insertnewnguoidung usecase 7 ', async()=> {
    await(expect(insertNewNguoiDung( {idnguoidung: new BSON.ObjectID(),username:99,email: 'ahahavip@gmail.com', pass : 'minhhieu',deleted: false })).rejects.toThrow());
})
test('nguoidungCrud test insertnewnguoidung usecase 8 ', async()=> {
    await(expect(insertNewNguoiDung( {idnguoidung: new BSON.ObjectID(),username:'ahahavip',email: 99, pass : 'minhhieu',deleted: false })).rejects.toThrow());
})
test('nguoidungCrud test insertnewnguoidung usecase 9 ', async()=> {
    await(expect(insertNewNguoiDung( {idnguoidung: new BSON.ObjectID(),username:'ahahavip',email: 'ahahavip@gmail.com', pass : 99,deleted: false })).rejects.toThrow());
})
test('nguoidungCrud test insertnewnguoidung usecase 10 ', async()=> {
    await(expect(insertNewNguoiDung( {idnguoidung: new BSON.ObjectID(),username:'ahahavip',email: 'ahahavip@gmail.com', pass : '',deleted: 10 })).rejects.toThrow());
})
test('nguoidungCrud test insertnewnguoidung usecase 11 ', async()=> {
    await(expect(insertNewNguoiDung({idnguoidung: new BSON.ObjectID(),username:'ahahavip',email: 'ahahavip@gmail.com', pass : true })).rejects.toThrow());
})

//update nguoidung
test('nguoidungCrud test updatenguoidung usecase 1', async()=> {
    expect(await updateNguoiDung({idnguoidung:newidnguoidung,username:'ahahabeu',email: 'ahahabeu@gmail.com', pass : '123+++',deleted: false })).toBe('thanhcong')
})
test('nguoidungCrud test insertnewnguoidung usecase 2 ', async()=> {
    await(expect( updateNguoiDung({idnguoidung:newidnguoidung,username:null,email: 'ahahabeu@gmail.com', pass : '123+++',deleted: false })).resolves.toBe('thanhcong'));
})
test('nguoidungCrud test updatenguoidung usecase 3 ', async()=> {
    expect(await updateNguoiDung({idnguoidung:newidnguoidung,username:'ahahabeu',email: null, pass : '123+++',deleted: false })).toBe('thanhcong')
})
test('nguoidungCrud test updatenguoidung usecase 4 ', async()=> {
    await(expect( updateNguoiDung({idnguoidung:newidnguoidung,username:'ahahabeu',email: 'ahahabeu@gmail.com', pass : null,deleted: false })).rejects.toThrow());
})
test('nguoidungCrud test updatenguoidung usecase 5 ', async()=> {
    expect(await updateNguoiDung({idnguoidung:newidnguoidung,username:'ahahabeu',email: 'ahahabeu@gmail.com', pass : '123+++',deleted: true })).toBe('thanhcong')
})
test('nguoidungCrud test updatenguoidung usecase 6 ', async()=> {
    expect(await updateNguoiDung({idnguoidung:newidnguoidung,username:'ahahabeu',email: 'ahahabeu@gmail.com', pass : '123+++',deleted: false})).toBe('thanhcong')
})
test('nguoidungCrud test updatenguoidung usecase 7 ', async()=> {
    await(expect( updateNguoiDung({username:'ahahabeu',email: 'ahahabeu@gmail.com', pass : '123+++',deleted: false})).rejects.toThrow());
})

test('nguoidungCrud test updatenguoidung usecase 8 ', async()=> {
    await(expect( updateNguoiDung({idnguoidung:new BSON.ObjectID(),username:'ahahabeu',email: 'ahahabeu@gmail.com', pass : '',deleted: false })).rejects.toThrow());
})
test('nguoidungCrud test updatenguoidung usecase 9 ', async()=> {
    await(expect( updateNguoiDung({idnguoidung:new BSON.ObjectID(),username:null,email: 'ahahabeu@gmail.com', pass : '',deleted: false })).rejects.toThrow());
})
test('nguoidungCrud test updatenguoidung usecase 10 ', async()=> {
    await(expect( updateNguoiDung({idnguoidung:new BSON.ObjectID(),username:'ahahabeu',email: 99, pass : '',deleted: false })).rejects.toThrow());
})
test('nguoidungCrud test updatenguoidung usecase 11 ', async()=> {
    await(expect( updateNguoiDung({idnguoidung:new BSON.ObjectID(),username:99,email: 'ahahabeu@gmail.com', pass : null, deleted: false })).rejects.toThrow());
})
test('nguoidungCrud test updatenguoidung usecase 12 ', async()=> {
    await(expect( updateNguoiDung({idnguoidung:new BSON.ObjectID(),username:'ahahabeu',email: 'ahahabeu@gmail.com', pass : '' })).rejects.toThrow());
})



//query nguoidung
test('nguoidungCrud test querynguodung usecase 1 ', async()=> {
    expect(JSON.parse(JSON.stringify(await queryNguoiDung(newidnguoidung))).username).toBe('ahahavip')
})
test('nguoidungCrud test querynguodung usecase 2 ', async()=> {
    await(expect( queryNguoiDung("")).rejects.toThrow());

})
//deletenguoidung
test('nguoidungCrud test deletenguoidung usecase 1 ', async()=> {
    await(expect( deleteNguoiDung()).rejects.toThrow());
})
test('nguoidungCrud test deletenguoidung usecase 1 ', async()=> {
    await(expect(deleteNguoiDung(newidnguoidung)).resolves.toBe('thanh cong'));
})

