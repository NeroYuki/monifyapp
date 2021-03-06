import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Divider, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from '../../assets/constants';
import { CategoriesModal, SplashScreen } from '../../components';
import { RecurringModal } from '../../components/TransactionEditor/RecurringModal';

import DateTimePicker from '@react-native-community/datetimepicker';
import { saveTransaction } from '../../logic/Component-TransactionEditor';
import { queryTaiKhoan } from '../../services/TaiKhoanCRUD';
import sessionStore from '../../logic/sessionStore';
import { checkLoansForCycle, checkSavingsForCycle, checkInitialLaunch } from '../../logic/callonappopenning';
import { checkBillForCycle } from '../../logic/CallOnAppCheckBill';
import { currencyFormat, initFormat } from '../../utils/formatNumber';

export class AddNewTransaction extends Component {

    constructor(props) {
        super(props)

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

            snackbarMessage: "",
            snackbarMessageVisible: false,

            splashScreenVisible: true,
        }

        this.openCategoriesModal = this.openCategoriesModal.bind(this)
        this.onChangeDateTime = this.onChangeDateTime.bind(this)
        this.handleChooseIcon = this.handleChooseIcon.bind(this)
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

    handleChooseIcon(val) {
        console.log("ADD NEW TRANS - ICON: ", val)
        this.setState({
            icon: val
        })
    }

    handleSaveTransaction = async () => {
        console.log("SAVE TRANSACTION");

        // console.log(sessionStore.activeUserId, ' -- ', sessionStore.activeWalletId)

        let GiaoDich = {
            // transactionId: '60c36b9f7ab578ff8656f01b',
            userId: sessionStore.activeUserId,
            occur_date: this.state.currentDate,
            walletId: sessionStore.activeWalletId,
            amount: parseInt(this.state.money),
            categoryId: this.state.icon.id,
            note: this.state.note,
        }

        await saveTransaction(GiaoDich).then(
            (res) => { this.setState({ snackbarMessage: "Your new transaction info have been saved" }) },
            (e) => { this.setState({ snackbarMessage: "Failed to save your new transaction info" }) }
        )

        this.setState({ snackbarMessageVisible: true })
    }

    async componentDidMount() {

        console.log("Add New Trans: - ComponentDidMount")

        await checkInitialLaunch()
        await initFormat()
        //check routine
        if (sessionStore.activeUserId) {
            let message = ""
            await checkSavingsForCycle().then(
                res => { 
                    const status = ["...", "VALUE UPDATED", "EXPIRED"]
                    res.forEach((val) => {
                        message += `- Saving fund ${val.name} has ${status[val.eventname]} for ${currencyFormat(val.amount)}` + "\n"
                    })
                },
                er => { message += "Error checking for saving\n" }
            )
            await checkLoansForCycle().then(
                res => {
                    const status = ["...", "VALUE UPDATED", "EXPIRED"]
                    res.forEach((val) => {
                        message += `- Loan fund ${val.name} has ${status[val.eventname]} with ${currencyFormat(val.amount)} left` + "\n"
                    })
                },
                er => { message += "Error checking for loan\n" }
            )
            await checkBillForCycle().then(
                res => {
                    const status = ["...", "SUCCESSFULLY", "FAILED"]
                    res.forEach((val) => {
                        let isChiTieu = (val.loaitien === 'tieudung')? true : false
                        message += `- Recurring bill ${val.name} has ${status[val.eventname]} made new transaction for ${currencyFormat(val.amount * (isChiTieu ? -1 : 1))}` + "\n"
                    })
                },
                er => { message += "Error checking for bill\n" }
            )
            if (message)
                Alert.alert('Information', message)
        }

        

        setTimeout(() => {
            this.setState({ splashScreenVisible: false })
        }, 2000)
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <View style={styles.container}>

                    {/* Header Label */}
                    <View style={styles.header}>
                        <Text style={{ fontSize: 20 }}>NEW TRANSACTION</Text>
                    </View>


                    {/* Money Title  */}
                    <View style={styles.moneyTitle}>
                        <TextInput
                            style={{
                                height: '100%',
                                fontSize: 40,
                                fontWeight: '300'
                            }}
                            keyboardType='numeric'
                            placeholder='0'
                            onChangeText={text => this.setState({ money: text })}
                        />
                    </View>

                    {/* Input  */}
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
                                //defaultValue={this.props.currentData.describe}
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

                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ recurringVisible: !this.state.recurringVisible })
                            }}
                        >
                            <View style={styles.info_field_item}>
                                <Icon name="repeat" size={24} />
                                <Text style={styles.info_field_item_text}>Make Recurring</Text>
                            </View>
                        </TouchableOpacity>

                        <Divider style={{ height: 1 }} />
                    </View>

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

                    {/* Button  */}
                    <View style={{ height: 64, top: 50, flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', marginRight: 16, marginLeft: 16 }}
                            onPress={this.handleSaveTransaction}
                        >
                            <View style={styles.button}>
                                <Text style={{ fontSize: 17, color: COLORS.white }}> SAVE </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <Snackbar
                    visible={this.state.snackbarMessageVisible}
                    onDismiss={() => { this.setState({ snackbarMessageVisible: false }) }}>
                    {this.state.snackbarMessage}
                </Snackbar>

                <RecurringModal
                    isVisible={this.state.recurringVisible}

                    closePeriod={() => {
                        this.setState({ recurringVisible: false })
                    }}
                />

                <CategoriesModal
                    isVisible={this.state.categoriesVisible}
                    chooseIcon={this.handleChooseIcon}
                    onRequestClose={() => { this.setState({ categoriesVisible: false }) }}
                />

                {this.state.splashScreenVisible && <SplashScreen
                    isVisible={this.state.splashScreenVisible}
                    onRequestClose={() => { }}
                ></SplashScreen>}


            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white'
    },
    header: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    moneyTitle: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink'
    },
    info_field: {
        minHeight: 192,
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
        shadowOpacity: 0.20,
        shadowRadius: 10,
    },
})