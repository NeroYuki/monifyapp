import {insertHangMucGiaoDich,updateHangMucGiaoDich,deleteHangMucGiaoDich,queryHangMucGiaoDich} from '../../App/services/HangMucGiaoDichCRUD';
import {BSON} from 'realm'
 
let idhangmuc=new BSON.ObjectID()
let idnguoidung=new BSON.ObjectID()
let date= new Date('2011-04-11T10:20:30.000Z')
hangmucgiaodichtest= {
    idhangmucgiaodich: idhangmuc,
    idnguoidung:idnguoidung,
    thoigiantao: date,
    tenhangmuc: 'Sắm tết',
    iconhangmuc: '123456###',
    loaihangmuc: {
        chitieu:true,
        thunhap:false,  
    },
    invs:true,
    color:'#123456'
}
hangmucgiaodich= {
    idhangmucgiaodich: idhangmuc,
    idnguoidung:idnguoidung,
    thoigiantao: date,
    tenhangmuc: 'Sắm tết',
    iconhangmuc: '123456###',
    invs:true,
    color:'#123456'
}

test('testing insert HangMucGiaoDich 1', async () => {
    await insertHangMucGiaoDich({
        idhangmucgiaodich: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: date,
        tenhangmuc: 'Sắm tết',
        iconhangmuc: '123456###',
        invs:true,
        color:'#123456'
    },'chitieu').then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenhangmuc).toBe('Sắm tết');
   })    
})

test('testing insert HangMucGiaoDich 2', async () => {
    await insertHangMucGiaoDich({
        idhangmucgiaodich: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: date,
        tenhangmuc: 'Sắm tết',
        iconhangmuc: '123456###',
        invs:true,
        color:'#123456'
    },'thunhap').then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenhangmuc).toBe('Sắm tết');
   })    
})
test('testing insert HangMucGiaoDich 9', async () => {
    await insertHangMucGiaoDich({
        idhangmucgiaodich: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: date,
        tenhangmuc: 'Sắm tết',
        iconhangmuc: '123456###',
        invs:false,
        color:'#123456'
    },'chitieu').then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenhangmuc).toBe('Sắm tết');
   })    
})

test('testing insert HangMucGiaoDich 3', async () => {
    await (expect(insertHangMucGiaoDich({
        idhangmucgiaodich: 99,
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: date,
        tenhangmuc: 'Sắm tết',
        iconhangmuc: '123456###',
        invs:true,
        color:'#123456'
    },'chitieu')).rejects.toThrow());
})
test('testing insert HangMucGiaoDich 4', async () => {
    await (expect(insertHangMucGiaoDich({
        idhangmucgiaodich: new BSON.ObjectID(),
        idnguoidung:99,
        thoigiantao: date,
        tenhangmuc: 'Sắm tết',
        iconhangmuc: '123456###',
        invs:true,
        color:'#123456'
    },'chitieu')).rejects.toThrow());
})
test('testing insert HangMucGiaoDich 5', async () => {
    await (expect(insertHangMucGiaoDich({
        idhangmucgiaodich: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: 'abc',
        tenhangmuc: 'Sắm tết',
        iconhangmuc: '123456###',
        invs:true,
        color:'#123456'
    },'chitieu')).rejects.toThrow());
})
test('testing insert HangMucGiaoDich 6', async () => {
    await (expect(insertHangMucGiaoDich({
        idhangmucgiaodich: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: date,
        tenhangmuc: 99,
        iconhangmuc: '123456###',
        invs:true,
        color:'#123456'
    },'chitieu')).rejects.toThrow());
})
test('testing insert HangMucGiaoDich 7', async () => {
    await (expect(insertHangMucGiaoDich({
        idhangmucgiaodich: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: date,
        tenhangmuc: 'Sắm tết',
        iconhangmuc: 22,
        invs:true,
        color:'#123456'
    },'chitieu')).rejects.toThrow());
})
test('testing insert HangMucGiaoDich 8', async () => {
    await (expect(insertHangMucGiaoDich({
        idhangmucgiaodich: new BSON.ObjectID(),
        idnguoidung:new BSON.ObjectID(),
        thoigiantao: date,
        tenhangmuc: 'Sắm tết',
        iconhangmuc: '123456###',
        invs:true,
        color:66,
    },'chitieu')).rejects.toThrow());
})

test('testing insert HangMucGiaoDich 0', async () => {
    await insertHangMucGiaoDich({
        idhangmucgiaodich: idhangmuc,
        idnguoidung:idnguoidung,
        thoigiantao: date,
        tenhangmuc: 'Sắm tết',
        iconhangmuc: '123456###',
        invs:true,
        color:'#123456',
    },'chitieu');
})

test('testing update HangMucGiaoDich 2', async () => {
    await updateHangMucGiaoDich({
    idhangmucgiaodich: idhangmuc,
    idnguoidung:idnguoidung,
    thoigiantao: date,
    tenhangmuc: 'Sắm tết 3',
    iconhangmuc: '123456###',
    loaihangmuc: {
        chitieu:false,
        thunhap:true,  
    },
    invs:true,
    color:'#123456'
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenhangmuc).toBe('Sắm tết 3');
   })    
})
test('testing update HangMucGiaoDich 3', async () => {
    await updateHangMucGiaoDich({
    idhangmucgiaodich: idhangmuc,
    idnguoidung:idnguoidung,
    thoigiantao: date,
    tenhangmuc: 'Sắm tết 3',
    iconhangmuc: '123456###',
    loaihangmuc: {
        chitieu:true,
        thunhap:false,  
    },
    invs:false,
    color:'#123456'
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenhangmuc).toBe('Sắm tết 3');
   })    
})
test('testing update HangMucGiaoDich 4', async () => {
    await (expect(updateHangMucGiaoDich({
    idhangmucgiaodich: 99,
    idnguoidung:idnguoidung,
    thoigiantao: date,
    tenhangmuc: 'Sắm tết 3',
    iconhangmuc: '123456###',
    loaihangmuc: {
        chitieu:true,
        thunhap:false,  
    },
    invs:true,
    color:'#123456'
    })).rejects.toThrow()); 
})


test('testing update HangMucGiaoDich 7', async () => {
    await (expect(updateHangMucGiaoDich({
    idhangmucgiaodich: idhangmuc,
    idnguoidung:idnguoidung,
    thoigiantao: date,
    tenhangmuc:1213,
    iconhangmuc: '123456###',
    loaihangmuc: {
        chitieu:true,
        thunhap:false,  
    },
    invs:true,
    color:'#123456'
    })).rejects.toThrow()); 
})
test('testing update HangMucGiaoDich 8', async () => {
    await (expect(updateHangMucGiaoDich({
    idhangmucgiaodich: idhangmuc,
    idnguoidung:idnguoidung,
    thoigiantao: date,
    tenhangmuc: 'Sắm tết 3',
    iconhangmuc: 213,
    loaihangmuc: {
        chitieu:true,
        thunhap:false,  
    },
    invs:true,
    color:'#123456'
    })).rejects.toThrow()); 
})
test('testing update HangMucGiaoDich 9', async () => {
    await (expect(updateHangMucGiaoDich({
    idhangmucgiaodich: idhangmuc,
    idnguoidung:idnguoidung,
    thoigiantao: date,
    tenhangmuc: 'Sắm tết 3',
    iconhangmuc: '123456###',
    loaihangmuc: {
        chitieu:true,
        thunhap:false,  
    },
    invs:true,
    color:122
    })).rejects.toThrow()); 
})
test('testing update HangMucGiaoDich 1', async () => {
    await updateHangMucGiaoDich({
    idhangmucgiaodich: idhangmuc,
    idnguoidung:idnguoidung,
    thoigiantao: date,
    tenhangmuc: 'Sắm tết 3',
    iconhangmuc: '123456###',
    loaihangmuc: {
        chitieu:true,
        thunhap:false,  
    },
    invs:true,
    color:'#123456'
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs)).tenhangmuc).toBe('Sắm tết 3');
   })    
})
test('testing query hangmucgiaodich 1', async()=>{
    await queryHangMucGiaoDich({
        thoigiantao: date,
        iconhangmuc: '123456###',
        tenhangmuc: 'Sắm tết 3',
        idhangmucgiaodich: idhangmuc,
        loaihangmuc:'ChiTieu',
        id:idnguoidung,
        color:'#123456',
        invs:true,
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs))[0].tenhangmuc).toBe('Sắm tết 3');
    })
})
test('testing query hangmucgiaodich 2', async()=>{
    await queryHangMucGiaoDich({
        thoigiantao: date,
        iconhangmuc: '123456###',
        tenhangmuc: 'Sắm tết 3',
        idhangmucgiaodich: idhangmuc,
        loaihangmuc:'ThuNhap',
        id:idnguoidung,
        color:'#123456',
        invs:true,
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs))).toEqual([]);
    })
})
test('testing query hangmucgiaodich 3', async()=>{
    await queryHangMucGiaoDich({
        thoigiantao: date,
        iconhangmuc: '123456###',
        tenhangmuc: 'Sắm tết 3',
        idhangmucgiaodich: idhangmuc,
        loaihangmuc:'ThuNhap',
        id:idnguoidung,
        color:'#123456',
        invs:false,
    }).then((rs)=>{
        expect(JSON.parse(JSON.stringify(rs))).toEqual([]);
    })
})
test('testing query hangmucgiaodich 4 ', async()=>{
    await (expect(queryHangMucGiaoDich({
        thoigiantao: 11,
        iconhangmuc: '123456###',
        tenhangmuc: 'Sắm tết 3',
        idhangmucgiaodich: idhangmuc,
        loaihangmuc:'ChiTieu',
        id:idnguoidung,
        color:'#123456',
        invs:true,
    })).rejects.toThrow());
})
test('testing query hangmucgiaodich 5', async()=>{
    await (expect(queryHangMucGiaoDich({
        thoigiantao: date,
        iconhangmuc: 22,
        tenhangmuc: 'Sắm tết 3',
        idhangmucgiaodich: idhangmuc,
        loaihangmuc:'ChiTieu',
        id:idnguoidung,
        color:'#123456',
        invs:true,
    })).rejects.toThrow());
})

test('testing query hangmucgiaodich 6', async()=>{
    await (expect(queryHangMucGiaoDich({
        thoigiantao: date,
        iconhangmuc: '123456###',
        tenhangmuc: 123,
        idhangmucgiaodich: idhangmuc,
        loaihangmuc:'ChiTieu',
        id:idnguoidung,
        color:'#123456',
        invs:true,
    })).rejects.toThrow());
})


test('testing query hangmucgiaodich 7', async()=>{
    await (expect(queryHangMucGiaoDich({
        thoigiantao: date,
        iconhangmuc: '123456###',
        tenhangmuc: 'Sắm tết 3',
        idhangmucgiaodich: 12343,
        loaihangmuc:'ChiTieu',
        id:idnguoidung,
        color:'#123456',
        invs:true,
    })).rejects.toThrow());
})




test('testing query hangmucgiaodich 8', async()=>{
    await (expect(queryHangMucGiaoDich({
        thoigiantao: date,
        iconhangmuc: '123456###',
        tenhangmuc: 'Sắm tết 3',
        idhangmucgiaodich: idhangmuc,
        loaihangmuc:'ChiTieu',
        id:111,
        color:'#123456',
        invs:true,
    })).rejects.toThrow());
})
test('testing query hangmucgiaodich 9', async()=>{
    await (expect(queryHangMucGiaoDich({
        thoigiantao: date,
        iconhangmuc: '123456###',
        tenhangmuc: 'Sắm tết 3',
        idhangmucgiaodich: idhangmuc,
        loaihangmuc:'ChiTieu',
        id:idnguoidung,
        color:112,
        invs:true,
    })).rejects.toThrow());
})




// test('testing delete hangmucgiaodich 1', async()=>{
//     await deleteHangMucGiaoDich({idhangmuc:idhangmuc}).then((rs)=> {
//         expect(rs).toBe('ThanhCong')
//     })
// })
// test('testing delete hangmucgiaodich 2', async()=>{
//     await (expect(deleteHangMucGiaoDich({idhangmuc:123})).rejects.toThrow());
// })