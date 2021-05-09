import {insertNewNguoiDung} from '../App/services/NguoiDungCRUD';
import {BSON} from 'realm'

const sum = require('../App/utils/Sum')
nguoiDung= {idnguoidung: new BSON.ObjectID(), pass: 'minhhieu'};
test('testing database', async () => {
    expect(await insertNewNguoiDung(nguoiDung)).toBe(nguoiDung);
});