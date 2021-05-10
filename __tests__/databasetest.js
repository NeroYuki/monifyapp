import {insertNewNguoiDung,updateNguoiDung,queryAllNguoiDung,deleteAllNguoiDung} from '../App/services/NguoiDungCRUD';
import {BSON} from 'realm'

const sum = require('../App/utils/Sum')
nguoiDung= {idnguoidung: new BSON.ObjectID(), pass: 'minhhieu'};
test('testing database', async () => {
    expect(await insertNewNguoiDung(nguoiDung)).toBe(nguoiDung);
});
nguoiDung.pass = 'ahaha';
test('testing database', async () => {
    expect(await updateNguoiDung(nguoiDung)).toBe();
});
test('testing database', async () => {
    await queryAllNguoiDung().then((nguoiDungs) => {
        console.log(JSON.stringify(nguoiDungs));
        //expect (nguoiDungs).toBe();
    });
});
test('testing database', async () => {
    await deleteAllNguoiDung().then((nguoiDungs) => {
        console.log(JSON.stringify(nguoiDungs));
        //expect (nguoiDungs).toBe();
    });
});