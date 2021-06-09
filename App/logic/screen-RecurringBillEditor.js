import {queryGiaoDichChuKy,updateGiaoDichChuKy,insertGiaoDichChuKy} from '../services/GiaoDichChuKyCRUD';
import {BSON} from 'realm';

export const fetchBill = billId =>
  new Promise((resolve, reject) => {
    let ID=billId
    if(billId)
        ID=new BSON.ObjectID(billId)
    queryGiaoDichChuKy({idgiaodichtheochuky: ID})
      .then(giaodich => {
        resolve(giaodich)
    }).catch(er => reject(er))
})

export const saveBill=({billId,userId,name,color,note,amount,cycle_start,cycle_duration_day,cycle_duration_month,creation_date})=>
    new Promise((resolve,reject)=>{
        if(!billId)
        {
            let Bill={
                idgiaodichtheochuky:new BSON.ObjectID(),
                idnguoidung:(userId)?new BSON.ObjectID(userId):null,
                thoigian:new Date(creation_date),
                sotientieudung:(amount>0)?amount:null,
                sotienthunhap:(amount<=0)?amount:null,
                chukygiaodichtheongay:cycle_duration_day,
                chukygiaodichtheothang:cycle_duration_month,
                thoigiancuoicungcheck:null,
                thoigianbatdau:new Date(cycle_start),
                ghichu:note,
                name:name,
                color:color,
            }
            if(Bill.chukygiaodichtheongay)
            {
                let date=new Date(cycle_start)
                Bill.thoigiancuoicungcheck=new Date(date.setDate(date.getDate()+Bill.chukygiaodichtheongay))
            }
            if(Bill.chukygiaodichtheothang)
            {
                let date=new Date(cycle_start)
                Bill.thoigiancuoicungcheck=new Date(date.getFullYear()+Bill.chukygiaodichtheothang/12,date.getMonth()+(Bill.chukygiaodichtheothang+1)%12,0)
                if(date.getDate()<Bill.thoigiancuoicungcheck.getDate())
                {
                    Bill.thoigiancuoicungcheck=new Date(date.getFullYear()+Bill.chukygiaodichtheothang/12,date.getMonth()+(Bill.chukygiaodichtheothang+1)%12,date.getDate())
                }
            }
            insertGiaoDichChuKy(Bill).then(giaodich=>{
                if(giaodich!='Không được nhập tính chu kỳ theo ngày và cả theo tháng'&&giaodich!='Không được nhập cả số tiền tiêu dùng và thu nhập')
                {
                    resolve({result:true,message:'Nhập thành công'})
                }
                else
                    reject({result:false,message:'Nhập thất bại'})
            }).catch((er)=>reject({result:false,message:er}))
        }
        else
        {
            let Bill={
                idgiaodichtheochuky:new BSON.ObjectID(billId),
                idnguoidung:(userId)?new BSON.ObjectID(userId):null,
                thoigian:new Date(creation_date),
                sotientieudung:(amount>0)?amount:null,
                sotienthunhap:(amount<=0)?amount:null,
                chukygiaodichtheongay:cycle_duration_day,
                chukygiaodichtheothang:cycle_duration_month,
                thoigiancuoicungcheck:null,
                thoigianbatdau:new Date(cycle_start),
                ghichu:note,
                name:name,
                color:color,
            }
            if(Bill.chukygiaodichtheongay)
            {
                let date=new Date(cycle_start)
                Bill.thoigiancuoicungcheck=new Date(date.setDate(date.getDate()+Bill.chukygiaodichtheongay))
            }
            if(Bill.chukygiaodichtheothang)
            {
                let date=new Date(cycle_start)
                Bill.thoigiancuoicungcheck=new Date(date.getFullYear()+Bill.chukygiaodichtheothang/12,date.getMonth()+(Bill.chukygiaodichtheothang+1)%12,0)
                if(date.getDate()<Bill.thoigiancuoicungcheck.getDate())
                {
                    Bill.thoigiancuoicungcheck=new Date(date.getFullYear()+Bill.chukygiaodichtheothang/12,date.getMonth()+(Bill.chukygiaodichtheothang+1)%12,date.getDate())
                }
            }
            updateGiaoDichChuKy(Bill).then(giaodich=>{
                if(giaodich!='Không được nhập tính chu kỳ theo ngày và cả theo tháng'&&giaodich!='Không được nhập cả số tiền tiêu dùng và thu nhập')
                {
                    resolve({result:true,message:'Cập nhật thành công'})
                }
                else
                    reject({result:false,message:'Cập nhật thất bại'})
            }).catch((er)=>reject({result:false,message:er}))
        }
})
