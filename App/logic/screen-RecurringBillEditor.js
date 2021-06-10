import {queryGiaoDichChuKy,updateGiaoDichChuKy,insertGiaoDichChuKy} from '../services/GiaoDichChuKyCRUD';
import{queryHangMucGiaoDich} from '../services/HangMucGiaoDichCRUD'
import {BSON} from 'realm';

export const fetchBill = ({billId}) =>
  new Promise((resolve, reject) => {
    let ID=billId
    if(billId)
        ID=new BSON.ObjectID(billId)
    queryGiaoDichChuKy({idgiaodichtheochuky: ID})
      .then(giaodich => {
        resolve(giaodich)
    }).catch(er => reject(er))
})
// số tiền khi cập nhật phải đưa tham số vào lại, nếu không giá trị sẻ lưu null vì amount được phép null, sau này khi người dùng muốn nhập thì nhập
export const saveBill=({billId,userId,loaihangmucId,name,color,note,amount,cycle_start,cycle_duration_day,cycle_duration_month,creation_date})=>
    new Promise(async(resolve,reject)=>{
        if(!billId)
        {
            let Bill={
                idgiaodichtheochuky:new BSON.ObjectID(),
                idnguoidung:new BSON.ObjectID(userId),
                loaihangmucgd:new BSON.ObjectID(loaihangmucId),
                thoigian:new Date(creation_date),
                sotientieudung:(amount)?Math.abs(amount):null,
                sotienthunhap:(amount)?Math.abs(amount):null,
                chukygiaodichtheongay:cycle_duration_day,
                chukygiaodichtheothang:cycle_duration_month,
                thoigiancuoicungcheck:null,
                thoigianbatdau:new Date(cycle_start),
                ghichu:note,
                name:name,
                color:color,
            }
            if(loaihangmucId)
            {
                await queryHangMucGiaoDich({idhangmucgiaodich:Bill.loaihangmucgd}).then(hangmuc=>{
                    if(!hangmuc)
                        reject({result:false,message:'Hạng mục không có trong dữ liệu'})
                    else
                    {
                        if(hangmuc[0].loaihangmuc.chitieu==true)
                        {
                            Bill.sotienthunhap=null
                        }
                        else
                            Bill.sotientieudung=null
                    }
                }).catch((er)=>reject({result:false,message:er}))
            }
            else
                reject({result:false,message:'Không nhập loại hạng mục'})
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
            let BillUpdate
            await queryGiaoDichChuKy({idgiaodichtheochuky: new BSON.ObjectID(billId)})
                .then(giaodich => {
                    if(giaodich)
                    {
                        BillUpdate=giaodich[0]
                    }
                    else    
                        resolve({result:false,message:'Không tìm thấy giao dịch cần thay đổi'})
                }).catch(er => reject({result:false,message:er}))
            let Bill={
                idgiaodichtheochuky:new BSON.ObjectID(billId),
                idnguoidung:(userId)?new BSON.ObjectID(userId):null,
                loaihangmucgd:(loaihangmucId)?new BSON.ObjectID(loaihangmucId):null,
                thoigian:(creation_date)?new Date(creation_date):null,
                sotientieudung:(amount)?Math.abs(amount):null,
                sotienthunhap:(amount)?Math.abs(amount):null,
                chukygiaodichtheongay:cycle_duration_day,
                chukygiaodichtheothang:cycle_duration_month,
                thoigiancuoicungcheck:null,
                thoigianbatdau:(cycle_start)?new Date(cycle_start):null,
                ghichu:note,
                name:name,
                color:color,
            }
            if(loaihangmucId)
            {
                await queryHangMucGiaoDich({idhangmucgiaodich:Bill.loaihangmucgd}).then(hangmuc=>{
                    if(!hangmuc||hangmuc==[])
                        reject({result:false,message:'Hạng mục không có trong dữ liệu'})
                    else
                    {
                        if(Bill.sotienthunhap||Bill.sotientieudung)
                        {
                            if(hangmuc[0].loaihangmuc.chitieu==true)
                            {
                                Bill.sotienthunhap=null
                            }
                            else
                                Bill.sotientieudung=null
                        }
                        else
                        {
                            if(hangmuc[0].loaihangmuc.chitieu==true)
                            {
                                if(BillUpdate.sotientieudung)
                                {
                                    Bill.sotientieudung=BillUpdate.sotientieudung
                                }
                                else
                                    Bill.sotientieudung=BillUpdate.sotienthunhap
                                Bill.sotienthunhap=null
                            }
                            else
                            {
                                if(BillUpdate.sotientieudung)
                                {
                                    Bill.sotienthunhap=BillUpdate.sotientieudung
                                }
                                else
                                {
                                    Bill.sotienthunhap=BillUpdate.sotienthunhap
                                }   
                                Bill.sotientieudung=null
                            }
                        }
                    }
                }).catch((er)=>reject({result:false,message:er}))
            }
            if(!Bill.thoigianbatdau)
            {
                Bill.thoigianbatdau=BillUpdate.thoigianbatdau
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
