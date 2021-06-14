import {queryGiaoDich} from '../services/GiaoDichCRUD'
import {BSON} from 'realm'
import {startOfWeek,endOfWeek,startOfMonth,endOfMonth,startOfYear,endOfYear} from 'date-fns'

// Xuất ra trans nhưng sau đó khi input ra FE phải sắp xếp theo thời gian vì ở BE mới phân loại theo ngày còn sắp xếp theo giờ thì chưa 
export const queryTransactions = ({period,start_day,end_day,walletId}) =>
    new Promise(async (resolve, reject) => {
    let taikhoan
    taikhoan = (walletId) ? new BSON.ObjectID(walletId) : null
    let InTrans
    await queryGiaoDich({idtaikhoan:taikhoan}).then(giaodich=>{
        InTrans=giaodich
    }).catch(err=>reject(err))
    console.log('Intras ở đây',JSON.parse(JSON.stringify(InTrans)))
    let OutTrans={
        income:0,
        expense:0,
        trans:[],
    }
    let start
    let end
    //////////////Lọc kết quả theo ngày /////////
    if(period&&!(start_day||end_day))
    {
        if(period=='week')
        {
            start=startOfWeek(new Date(Date.now()),{weekStartsOn:1})
            end=endOfWeek(new Date(Date.now()),{weekStartsOn:1})
        }
        else if(period=='month')
        {
            start=startOfMonth(new Date(Date.now()))
            end=endOfMonth(new Date(Date.now()))
        }
        else if(period=='year')
        {
            start=startOfYear(new Date(Date.now()))
            end=endOfYear(new Date(Date.now()))
        }
        else
        {
            reject('không tồn tại loại period tương xứng')
            return
        }
    }
    else if(!period&&start_day&&end_day)
    {
        start=new Date(start_day)
        end=new Date(end_day)
    }
    else if(period||start_day||end_day)
    {
        reject('Không xử lý được ngày bắt đầu và ngày kết thúc của mục tiêu ')
        return
    }
    if(end&&start)
        InTrans=InTrans.filter((tran)=>{
            return tran.thoigian>=start&&tran.thoigian<=end
        })
    ////////////////Tính icome expense/////////
    for(let i of InTrans)
    {
        if(i.sotientieudung)
            OutTrans.expense+=i.sotientieudung
        else if(i.sotienthunhap)
            OutTrans.income+=i.sotienthunhap
    }
    /////////////Lọc theo ngày đổ vào trans////////
    let date=[]
    for(let i of InTrans)
    {
        if(date.length==0)
        {
            date.push(i.thoigian)
        }
        else
        {
            let check = true
            for(let j of date)
            {
                if(Math.floor(new Date(i.thoigian).getTime() / 86400000) == Math.floor( new Date(j).getTime() / 86400000))
                {
                    check=false
                }
            }
            if(check)
                date.push(i.thoigian)
        }
    }
    console.log('date::',JSON.parse(JSON.stringify(date)))
    if(date.length==0)
    {
        resolve([])
        return
    }  
    for (let i of date)
    {
        let node=[]
        for(let j of InTrans)
        {
            if(Math.floor(new Date(j.thoigian).getTime() / 86400000) == Math.floor(new Date(i).getTime() / 86400000))
            {
                node.push(JSON.parse(JSON.stringify(j)))
            }
        }
        if(node.length!=0)
        {
            OutTrans.trans.push(node)
        }
    }
    resolve(OutTrans)
})

export const queryTranCategories = ({period,start_day,end_day,walletId}) =>
    new Promise(async (resolve, reject) => {
    let taikhoan
    taikhoan = (walletId) ? new BSON.ObjectID(walletId) : null
    let InTrans
    await queryGiaoDich({idtaikhoan:taikhoan}).then(giaodich=>{
        InTrans=giaodich
    }).catch(err=>reject(err))
    let OutTrans={
        income:[],
        expense:[],
    }
    let start
    let end
    //////////////Lọc kết quả theo ngày /////////
    if(period&&!(start_day||end_day))
    {
        if(period=='week')
        {
            start=startOfWeek(new Date(Date.now()),{weekStartsOn:1})
            end=endOfWeek(new Date(Date.now()),{weekStartsOn:1})
        }
        else if(period=='month')
        {
            start=startOfMonth(new Date(Date.now()))
            end=endOfMonth(new Date(Date.now()))
        }
        else if(period=='year')
        {
            start=startOfYear(new Date(Date.now()))
            end=endOfYear(new Date(Date.now()))
        }
        else
        {
            reject('không tồn tại loại period tương xứng')
            return
        }
    }
    else if(!period&&start_day&&end_day)
    {
        start=new Date(start_day)
        end=new Date(end_day)
    }
    else if(period||start_day||end_day)
    {
        reject('Không xử lý được ngày bắt đầu và ngày kết thúc của mục tiêu ')
        return
    }
    if(end&&start)
        InTrans=InTrans.filter((tran)=>{
            return tran.thoigian>=start&&tran.thoigian<=end
        })
    ///////Lọc theo income expense catogries////////
    let income=[]
    let expense=[]
    for(let i of InTrans)
    {
        if(i.sotienthunhap)
        {
            let check=true
            if(income.length==0)
            {
                income.push(i.loaihangmucgd)
            }
            else
            {
                for(let j of income)
                {
                    if(i.loaihangmucgd.toString()==j.toString())
                        check=false
                }
                if(check==true)
                    income.push(i.loaihangmucgd)
            }
        }
        else if(i.sotientieudung)
        {
            let check=true
            if(expense.length==0)
            {
                expense.push(i.loaihangmucgd)
            }
            else
            {
                for(let j of expense)
                {
                    if(i.loaihangmucgd.toString()==j.toString())
                        check=false
                }
                if(check==true)
                    expense.push(i.loaihangmucgd)
            }
        }
    }
    /////////////////Tính tổng catogery///////////////
    if(income.length!=0)
    {
        for(let i of income)
        {
            let amount=0
            for(let j of InTrans)
            {
                if(j.loaihangmucgd.toString()==i.toString())
                {
                    amount+=j.sotienthunhap
                }
            }
            let nodeincome={categoryId:JSON.parse(JSON.stringify(i)),amount:amount}
            OutTrans.income.push(nodeincome)
        }
    }
    if(expense.length!=0)
    {
        for(let i of expense)
        {
            let amount=0
            for(let j of InTrans)
            {
                if(j.loaihangmucgd.toString()==i.toString())
                {
                    amount+=j.sotientieudung
                }
            }
            let nodeexpense={categoryId:JSON.parse(JSON.stringify(i)),amount:amount}
            OutTrans.expense.push(nodeexpense)
        }
    }
    resolve(OutTrans)
})