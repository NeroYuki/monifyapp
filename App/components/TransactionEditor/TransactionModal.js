import React, { Component } from "react";
import { stylesheet } from './style'
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Modal, SafeAreaView } from "react-native";
import { Button, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS, icons } from "../../assets/constants";
import { CategoriesModal } from "../CategoriesModal";

import DateTimePicker from '@react-native-community/datetimepicker';
import { RecurringModal } from "./RecurringModal";
import { currencyFormat } from "../../utils/formatNumber";
import { deleteTransaction, deleteTransactiontrig, saveTransaction } from "../../logic/Component-TransactionEditor";
import { deleteGiaoDich } from "../../services/GiaoDichCRUD";
import sessionStore from "../../logic/sessionStore";
import { fetchCategory } from "../../logic/Component-CategoryEditor";
import moment from 'moment';


export class TransactionModal extends Component {

    constructor(props) {
        super(props)

        console.log("TRANSACTION MODAL: - CONSTRUCTOR")

        this.state = {
            categoriesVisible: false,
            recurringVisible: false,
            showPickerDialog: false,

            // Data 
            money: '',
            icon: '',
            note: '',
            currentDate: new Date(),
            recurring: 'Never repeat',
        }

        this.openCategoriesModal = this.openCategoriesModal.bind(this)
        this.onChangeDateTime = this.onChangeDateTime.bind(this)
        this.handleDeleteTransaction = this.handleDeleteTransaction.bind(this)
    }


    async componentDidMount() {
        console.log("TRANSACTION MODAL: - Component Did Mount")
        console.log(this.props.currentData.datas)
        let arr_res = await fetchCategory({ categoryId: this.props.currentData.datas.loaihangmucgd })
        if (arr_res.length === 0) return
        let res = arr_res[0]
        console.log(res)
        this.setState({
            note: this.props.currentData.datas.ghichu,
            icon: (res) ? { type: res.tenhangmuc, id: res.idhangmucgiaodich, icon: res.iconhangmuc } : {},
            money: (this.props.currentData.datas.sotienthunhap == null) ? (this.props.currentData.datas.sotientieudung.toString()) : (this.props.currentData.datas.sotienthunhap.toString()),
            currentDate: moment(JSON.stringify(this.props.currentData.datas.thoigian), "YYYY-MM-DDTHH:mm:ss.SSSZ").toDate()
        })
    }

    openCategoriesModal() {
        this.setState({
            categoriesVisible: !this.state.categoriesVisible
        })
    }

    onChangeDateTime = (event, selectedDate) => {
        console.log(selectedDate)

        const date = selectedDate || this.state.currentDate;

        console.log("CHOOSDE DATE: ", date)
        this.setState({
            currentDate: date,
            showPickerDialog: (Platform.OS === 'ios')
        })
    }

    handleDeleteTransaction = async () => {
        try {
            let transactionID = this.props.currentData.datas.idgiaodich
            console.log("DELETE TRANS", transactionID)
            await deleteTransactiontrig({ transactionId: transactionID })

            if (this.props.onComplete) {
                this.props.onComplete("Transaction has been deleted")
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleSaveTransaction = async () => {
        console.log("SAVE TRANSACTION");

        // console.log(sessionStore.activeUserId, ' -- ', sessionStore.activeWalletId)

        let GiaoDich = {
            transactionId: this.props.currentData.datas.idgiaodich,
            userId: sessionStore.activeUserId,
            occur_date: this.state.currentDate,
            walletId: sessionStore.activeWalletId,
            amount: parseFloat(this.state.money) || 0,
            categoryId: this.state.icon.id,
            note: this.state.note,
        }

        let complete_message = "default message"

        await saveTransaction(GiaoDich).then(
            (res) => { console.log(res); complete_message = "Your transaction info have been saved" },
            (e) => { console.log(e); complete_message = "Failed to save your transaction info" }
        )

        if (this.props.onComplete) {
            this.props.onComplete(complete_message)
        }
    }

    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onRequestClose}
            >
                <View style={styles.background}>
                    <View style={styles.container}>

                        <View style={styles.header}>
                            <TouchableOpacity onPress={this.props.onRequestClose}>
                                <Icon name='close' size={24} />
                            </TouchableOpacity>

                            <Text style={styles.textHeader}>EDIT TRANSACTION</Text>
                        </View>

                        <View style={styles.moneyTitle}>
                            <TextInput
                                style={{
                                    height: '100%',
                                    fontSize: 40,
                                    fontWeight: '300'
                                }}
                                defaultValue={
                                    (this.props.currentData.datas.sotienthunhap == null)
                                        ? (this.props.currentData.datas.sotientieudung.toString())
                                        : (this.props.currentData.datas.sotienthunhap.toString())
                                }
                                keyboardType='numeric'
                                placeholder='0'
                                onChangeText={text => this.setState({ money: text })}
                            />
                        </View>

                        <View style={styles.info_field}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ categoriesVisible: !this.state.categoriesVisible })
                                }}>
                                {
                                    (this.state.icon == '') ?
                                        <View style={styles.info_field_item}>
                                            <Icon name="sack" size={24} />
                                            <Text style={styles.info_field_item_text}>Category</Text>
                                        </View>
                                        :
                                        <View style={styles.info_field_item}>
                                            <Image
                                                source={this.state.icon.icon}
                                                resizeMode='contain'
                                                style={{
                                                    height: 24,
                                                    width: 24,
                                                }}
                                            />
                                            <Text style={styles.info_field_item_text}>{this.state.icon.type}</Text>
                                        </View>
                                }
                            </TouchableOpacity>
                            <Divider style={{ height: 1 }} />

                            <View style={styles.info_field_item}>
                                <Icon name="notebook" size={24} />
                                <TextInput
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        fontSize: 17,
                                        marginLeft: 16,
                                    }}
                                    defaultValue={this.props.currentData.datas.ghichu}
                                    placeholder="Note"
                                    onChangeText={text => this.setState({ note: text })}
                                />
                            </View>
                            <Divider style={{ height: 1 }} />

                            <TouchableOpacity
                                onPress={() => this.setState({ showPickerDialog: true })}
                            >
                                <View style={styles.info_field_item}>
                                    <Icon name="calendar" size={24} />
                                    <Text style={styles.info_field_item_text}>{this.state.currentDate.toDateString()}</Text>
                                </View>
                            </TouchableOpacity>

                            <Divider style={{ height: 1 }} />

                            {/* <TouchableOpacity
                                onPress={() => {
                                    this.setState({ recurringVisible: !this.state.recurringVisible })
                                }}
                            >
                                <View style={styles.info_field_item}>
                                    <Icon name="repeat" size={24} />
                                    <Text style={styles.info_field_item_text}>Make Recurring</Text>
                                </View>
                            </TouchableOpacity> */}

                            <Divider style={{ height: 1 }} />
                        </View>

                        <View style={{ height: 64, marginBottom: 16, flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{ height: 64, width: 64 }}
                                onPress={this.handleDeleteTransaction}
                            >
                                <Image
                                    source={icons.trash}
                                    resizeMode='cover'
                                    style={{
                                        width: 64,
                                        height: 64,
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleSaveTransaction}
                                style={{
                                    flex: 1, justifyContent: 'center', marginRight: 16, marginLeft: 16

                                }}>
                                <View style={styles.button}>
                                    <Text style={{ fontSize: 17, color: COLORS.white }}> SAVE </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* <RecurringModal
                        isVisible={this.state.recurringVisible}
                        closePeriod={() => {
                            this.setState({ recurringVisible: false })
                        }}
                    /> */}

                    <CategoriesModal
                        isVisible={this.state.categoriesVisible}
                        onRequestClose={() => { this.setState({ categoriesVisible: false }) }}
                    />

                    {this.state.showPickerDialog && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.currentDate}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChangeDateTime}
                            style={{
                                height: 40,
                                width: 400,
                                backgroundColor: COLORS.white,
                                color: COLORS.white

                            }}
                        />
                    )}

                </View>

            </Modal>
        )

    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: COLORS.blackBlur,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        height: '80%',
        width: '90%',
        backgroundColor: COLORS.white,
        borderRadius: 20,

        // Shadow 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,

        elevation: 5
    },

    header: {
        marginLeft: 16,
        marginRight: 16,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textHeader: {
        flex: 1,
        fontSize: 17,
        fontWeight: '300',
        textAlign: 'center',
    },
    moneyTitle: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        height: 48,
        backgroundColor: COLORS.yellow,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

        // Shadow 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    info_field: {
        flex: 1,
    },
    info_field_item: {
        height: 48,
        margin: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    info_field_item_text: {
        marginLeft: 20,
        fontSize: 17,
    },
})

