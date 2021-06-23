import {saveTransaction} from './Component-TransactionEditor'
import {fetchBill,saveBill} from './screen-RecurringBillEditor' 

export const checkBillForCycle = () =>
  new Promise(async(resolve, reject) => {
    let billAll
    await fetchBill({}).then((bill)=>{
        billAll=bill
        // console.log('0',JSON.parse(JSON.stringify(billAll)))
    }).catch((er)=>{
        reject(er)
        return
    })
    billAll=billAll.filter((bill)=>{
        return Math.floor(new Date(bill.thoigiancuoicungcheck).getTime() / 86400000) == Math.floor( new Date(Date.now()).getTime() / 86400000) && !bill.pause
    })
    console.log('1',JSON.parse(JSON.stringify(billAll)))
    let checkbill=[]
    console.log('2')
    for(let i of billAll)
    {
        if(!i.idtaikhoan)
        {
            let am=(i.sotientieudung!=null)?i.sotientieudung:i.sotienthunhap
            let loaitien=(i.sotientieudung!=null)?'tieudung':'thunhap'
            checkbill.push({billId:i.idgiaodichtheochuky,name:i.name,eventname:3,amount:am,loaitien:loaitien})
        }
        else
        {
            console.log('6 - saving trans')
            await saveTransaction({
                userId:i.idnguoidung,
                note:i.ghichu,
                amount:(i.sotientieudung)?i.sotientieudung:i.sotienthunhap,
                walletId:i.idtaikhoan,
                occur_date:new Date(Date.now()),
                categoryId:i.loaihangmucgd
            }).then(async (tran)=>{
                let am=(i.sotientieudung!=null)?i.sotientieudung:i.sotienthunhap
                let loaitien=(i.sotientieudung!=null)?'tieudung':'thunhap'
                console.log(JSON.parse(JSON.stringify(tran),'Da vao day'))
                checkbill.push({billId:i.idgiaodichtheochuky,name:i.name,eventname:1,amount:am,loaitien:loaitien})
                await saveBill({billId:i.idgiaodichtheochuky,cycle_start:new Date(Date.now())}).catch(er=>reject(er))
            }).catch(err=>{
                let am=(i.sotientieudung!=null)?i.sotientieudung:i.sotienthunhap
                let loaitien=(i.sotientieudung!=null)?'tieudung':'thunhap'
                checkbill.push({billId:i.idgiaodichtheochuky,name:i.name,eventname:2,amount:am,loaitien:loaitien})
            })
        }
    }
    console.log('3')
    let bill
    await fetchBill({}).then((b)=>{
        bill=b
        // console.log('4',JSON.parse(JSON.stringify(bill)))
    }).catch((er)=>{
        reject(er)
        return
    })
    for(let i of bill)
    {
        console.log('4',JSON.parse(JSON.stringify(i)))
        if(Math.floor(new Date(i.thoigiancuoicungcheck).getTime() / 86400000) < Math.floor( new Date(Date.now()).getTime() / 86400000))
        {
            console.log('5',new Date(Date.now()))
            await saveBill({billId:i.idgiaodichtheochuky,cycle_start:new Date(Date.now())}).then((bill)=>{
                console.log('5',JSON.parse(JSON.stringify(bill)))
            }).catch(er=>reject(er))
        }
    }
    resolve(checkbill)
})