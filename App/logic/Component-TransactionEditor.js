import { queryGiaoDich, deleteGiaoDich, insertGiaoDich, updateGiaoDich } from '../services/GiaoDichCRUD'
import { queryHangMucGiaoDich } from '../services/HangMucGiaoDichCRUD'
import { updateTaikhoanTieudung, queryTaiKhoan } from '../services/TaiKhoanCRUD'
import { fetchSetting } from './Screen-AppearanceSetting'
import { BSON } from 'realm'

export const fetchTransaction = ({ transactionId }) =>
    new Promise((resolve, reject) => {
        let tranid
        tranid = (transactionId) ? new BSON.ObjectID(transactionId) : null
        queryGiaoDich({ idgiaodich: tranid }).then(giaodich => {
            resolve(giaodich)
        }).catch(err => reject(err))
    })

export const deleteTransaction = ({ transactionId }) =>
    new Promise((resolve, reject) => {
        let tranid = (transactionId) ? new BSON.ObjectID(transactionId) : null
        deleteGiaoDich({ idgiaodich: tranid }).then(giaodich => {
            if (giaodich == 'ThanhCong')
                resolve({ result: true, message: 'Xóa giao dịch thành công' })
            else
                reject({ result: false, message: 'Xóa giao dịch không thành công' })
        }).catch(err => reject({ result: false, message: err }))
    })

export const deleteTransactiontrig = ({ transactionId }) =>
    new Promise(async (resolve, reject) => {
        let tranid = (transactionId) ? new BSON.ObjectID(transactionId) : null
        let sotien
        let giaodich
        let idtaikhoan
        if (!tranid) {
            reject({ result: false, message: 'Giao dịch không có id để xóa' })
            return
        }
        else {
            let chedo = await fetchSetting()
            if (chedo.chedonghiemngat) {
                await fetchTransaction({ transactionId: tranid }).then(tran => {
                    if (!tran) {
                        reject({ result: false, message: 'Không tìm ra giao dịch cần xóa' })
                        return
                    }
                    else {
                        giaodich = tran[0]
                        idtaikhoan = JSON.parse(JSON.stringify(giaodich.idtaikhoan))
                    }
                }).catch(err => {
                    reject({ result: false, message: err })
                    return
                })
                await queryTaiKhoan({ idtaikhoan: giaodich.idtaikhoan }).then(taikhoan => {
                    if (!taikhoan) {
                        reject({ result: false, message: 'Không tồn tại tài khoản' })
                        return
                    }
                    sotien = (giaodich.sotientieudung) ? giaodich.sotientieudung : -giaodich.sotienthunhap
                    if (taikhoan[0].tieudung.sotien + sotien < 0 && sotien < 0) {
                        reject({ result: false, message: 'Chế độ nghiêm ngặt không cho phép xoá giao dịch' })
                        return
                    }
                }).catch(err => {
                    reject({ result: false, message: err, f: '3' })
                    return
                })
            }
            else {
                await fetchTransaction({ transactionId: tranid }).then(tran => {
                    if (!tran) {
                        reject({ result: false, message: 'Không tìm ra giao dịch cần xóa' })
                        return
                    }
                    else {
                        giaodich = tran[0]
                        idtaikhoan = JSON.parse(JSON.stringify(giaodich.idtaikhoan))
                    }
                }).catch(err => {
                    reject({ result: false, message: err })
                    return
                })
                await queryTaiKhoan({ idtaikhoan: giaodich.idtaikhoan }).then(taikhoan => {
                    if (!taikhoan) {
                        reject({ result: false, message: 'Không tồn tại tài khoản' })
                        return
                    }
                    sotien = (giaodich.sotientieudung) ? giaodich.sotientieudung : -giaodich.sotienthunhap
                }).catch(err => {
                    reject({ result: false, message: err, f: '3' })
                    return
                })
            }
        }
        await deleteGiaoDich({ idgiaodich: tranid }).then(async gd => {
            if (gd == 'ThanhCong') {
                await updateTaikhoanTieudung({ taikhoantieudungid: idtaikhoan, sotienthem: sotien })
                    .then(async up => {
                        if (up) {
                            resolve({ result: true, message: 'Xóa giao dịch thành công' })
                            return
                        }
                        else {
                            reject({ result: false, message: 'Xóa giao dịch thành công nhưng không kịp cập nhật tiền trong tài khoản' })
                            return
                        }
                    }).catch(er => {
                        reject({ result: false, message: er, f: '2' })
                        return
                    })
            }
            else {
                reject({ result: false, message: 'Xóa giao dịch không thành công' })
                return
            }
        }).catch(err => {
            reject({ result: false, message: err, f: '1' })
            return
        })
    })

export const saveTransaction = ({ transactionId, userId, note, amount, walletId, occur_date, categoryId }) =>
    new Promise(async (resolve, reject) => {
        if (!transactionId) {
            let giaodich = {
                idgiaodich: new BSON.ObjectID(),
                idnguoidung: (userId) ? new BSON.ObjectID(userId) : null,
                thoigian: (occur_date) ? new Date(occur_date) : null,
                idtaikhoan: (walletId) ? new BSON.ObjectID(walletId) : null,
                sotientieudung: null,
                sotienthunhap: null,
                loaihangmucgd: (categoryId) ? new BSON.ObjectID(categoryId) : null,
                ghichu: note,
            }
            if (categoryId) {
                await queryHangMucGiaoDich({ idhangmucgiaodich: giaodich.loaihangmucgd }).then(hangmuc => {
                    if (hangmuc.length == 0) {
                        reject({ result: false, message: 'Hạng mục không có trong dữ liệu' })
                        return
                    }
                    else {
                        if (hangmuc[0].loaihangmuc.chitieu == true) {
                            giaodich.sotientieudung = amount
                        }
                        else
                            giaodich.sotienthunhap = amount
                    }
                }).catch((er) => reject({ result: false, message: er }))
            }
            else {
                reject({ result: false, message: 'Không nhập loại hạng mục' })
                return
            }
            insertGiaoDich(giaodich).then(async gd => {
                if (gd) {
                    let sotien
                    if (giaodich.sotientieudung) {
                        sotien = -giaodich.sotientieudung
                        let chedo = await fetchSetting()
                        if (chedo.chedonghiemngat) {

                            // Lỗi ở chỗ nào
                            await queryTaiKhoan({ idtaikhoan: giaodich.idtaikhoan }).then(async taikhoan => {
                                if (!taikhoan) {
                                    reject({ result: false, message: 'Không tồn tại tài khoản' })
                                    await deleteTransactiontrig({ transactionId: giaodich.idgiaodich }).catch(err => {
                                        sotien = 0
                                        reject({ result: false, message: err })
                                        return
                                    })
                                    return
                                }
                                if (taikhoan[0].tieudung.sotien + sotien < 0) {
                                    console.log(taikhoan[0].tieudung.sotien, sotien)
                                    await deleteTransaction({ transactionId: giaodich.idgiaodich }).then(() => {
                                        sotien = 0
                                        reject({ result: false, message: 'Chế độ nghiêm ngặt không cho phép trừ số tiền quá tài khoản' })
                                        return
                                    })
                                }
                            }).catch(async er => {
                                reject({ result: false, message: er })
                                await deleteTransactiontrig({ transactionId: giaodich.idgiaodich }).catch(err => {
                                    sotien = 0
                                    reject({ result: false, message: err })
                                    return
                                })
                                return
                            })
                        }
                    }
                    else {
                        sotien = giaodich.sotienthunhap
                    }
                    await updateTaikhoanTieudung({ taikhoantieudungid: giaodich.idtaikhoan, sotienthem: sotien })
                        .then(async up => {
                            if (up) {
                                resolve({ result: true, message: 'Tạo giao dịch thành công' })
                                return
                            }
                            else {
                                await deleteGiaoDich({ transactionId: giaodich.idgiaodich })
                                reject({ result: false, message: 'Tạo giao dịch thất bại' })
                                return
                            }
                        }).catch(er => reject({ result: false, message: er }))
                }
                else
                    reject({ result: false, message: 'Tạo giao dịch thất bại' })
            }).catch(er => {
                reject({ result: false, message: er })
                return
            })
        }
        else {

            let giaodich = {
                idgiaodich: (transactionId) ? new BSON.ObjectID(transactionId) : null,
                idnguoidung: (userId) ? new BSON.ObjectID(userId) : null,
                thoigian: (occur_date) ? new Date(occur_date) : new Date(),
                idtaikhoan: (walletId) ? new BSON.ObjectID(walletId) : null,
                sotientieudung: null,
                sotienthunhap: null,
                loaihangmucgd: (categoryId) ? new BSON.ObjectID(categoryId) : null,
                ghichu: note,
            }
            let sotienchen

            console.log('LOGIC', amount)

            await queryGiaoDich({ idgiaodich: giaodich.idgiaodich }).then(async gd => {
                if (gd.length != 0) {
                    giaodich.idgiaodich = gd[0].idgiaodich
                    if (!categoryId) {
                        giaodich.loaihangmucgd = new BSON.ObjectID(gd[0].loaihangmucgd)
                    }
                    if (!userId) {
                        giaodich.idnguoidung = new BSON.ObjectID(gd[0].idnguoidung)
                    }
                    if (!walletId) {
                        giaodich.idtaikhoan = new BSON.ObjectID(gd[0].idtaikhoan)
                    }
                    if (!note) {
                        giaodich.ghichu = gd[0].ghichu
                    }
                    if (!occur_date) {
                        giaodich.thoigian = new Date(gd[0].thoigian)
                    }

                    //set up default value for amount fields
                    giaodich.sotientieudung = gd[0].sotientieudung
                    giaodich.sotienthunhap = gd[0].sotienthunhap
                    await queryHangMucGiaoDich({ idhangmucgiaodich: giaodich.loaihangmucgd }).then(hangmuc => {
                        if (hangmuc.length == 0) {
                            reject({ result: false, message: 'Hạng mục không có trong dữ liệu' })
                            return
                        }
                        else {
                            if (hangmuc[0].loaihangmuc.chitieu == true) {
                                if (amount) {
                                    giaodich.sotientieudung = amount
                                    giaodich.sotienthunhap = null
                                }
                                else {
                                    if (giaodich.sotienthunhap) {
                                        giaodich.sotientieudung = giaodich.sotienthunhap
                                        giaodich.sotienthunhap = null
                                    }
                                }
                            }
                            else {
                                if (amount) {
                                    giaodich.sotienthunhap = amount
                                    giaodich.sotientieudung = null
                                }
                                else {
                                    if (giaodich.sotientieudung) {
                                        giaodich.sotienthunhap = giaodich.sotientieudung
                                        giaodich.sotientieudung = null
                                    }
                                }
                            }
                        }
                    }).catch((er) => {
                        reject({ result: false, message: er })
                        return
                    })
                    if (giaodich.sotientieudung) {
                        if (gd[0].sotientieudung) {
                            sotienchen = gd[0].sotientieudung - giaodich.sotientieudung
                        }
                        else {
                            sotienchen = -gd[0].sotienthunhap - giaodich.sotientieudung
                        }
                    }
                    else {
                        if (gd[0].sotientieudung) {
                            sotienchen = gd[0].sotientieudung + giaodich.sotienthunhap
                        }
                        else {
                            sotienchen = -gd[0].sotienthunhap + giaodich.sotienthunhap
                        }
                    }
                }
                else {
                    reject({ result: false, message: 'Không nhập loại hạng mục' })
                    return
                }
            })

            let g_taikhoan;

            await fetchSetting().then(async chedo => {
                if (chedo.chedonghiemngat) {
                    await queryTaiKhoan({ idtaikhoan: giaodich.idtaikhoan }).then(async taikhoan => {
                        if (!taikhoan) {
                            reject({ result: false, message: 'Không tồn tại tài khoản' })
                            return
                        }
                        g_taikhoan = taikhoan[0]
                        console.log(JSON.parse(JSON.stringify(taikhoan)), sotienchen)
                        if (taikhoan[0].tieudung.sotien + sotienchen < 0) {
                            reject({ result: false, message: 'Chế độ nghiêm ngặt không cho phép trừ số tiền quá tài khoản ' })
                            return
                        }
                        else {
                            await deleteTransactiontrig({ transactionId: transactionId }).catch(err => {
                                reject({ result: false, message: err })
                                return
                            })
                        }
                    }).catch(er => {
                        reject({ result: false, message: er })
                        return
                    })
                }
                else {
                    await queryTaiKhoan({ idtaikhoan: giaodich.idtaikhoan }).then(async taikhoan => {
                        console.log(JSON.parse(JSON.stringify(taikhoan)), sotienchen)
                        if (!taikhoan) {
                            reject({ result: false, message: 'Không tồn tại tài khoản' })
                            return
                        }
                        g_taikhoan = taikhoan[0]
                        // await deleteTransactiontrig({ transactionId: transactionId }).catch(err => {
                        //     reject({ result: false, message: err })
                        //     return
                        // })
                    }).catch(er => {
                        reject({ result: false, message: er })
                        return
                    })
                }
            })
            await updateGiaoDich(giaodich).then(async gd => {
                if (gd) {
                    let sotien = (g_taikhoan.tieudung.sotien + sotienchen) - g_taikhoan.tieudung.sotien
                    await updateTaikhoanTieudung({ taikhoantieudungid: giaodich.idtaikhoan, sotienthem: sotien })
                        .then(async up => {
                            if (up) {
                                resolve({ result: true, message: 'Cập nhật giao dịch thành công' })
                                return
                            }
                            else {
                                reject({ result: false, message: 'Cập nhật giao dịch thất bại' })
                                return
                            }
                        }).catch(er => {
                            reject({ result: false, message: er })
                            return
                        })
                }
                else
                    reject({ result: false, message: 'Tạo giao dịch thất bại' })
            }).catch(er => {
                reject({ result: false, message: er })
                return
            })
        }
    })
