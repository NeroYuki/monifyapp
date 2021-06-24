import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from '../../assets/constants';
import { CategoriesModal } from '../../components';
import { RecurringModal } from '../../components/TransactionEditor/RecurringModal';

import DateTimePicker from '@react-native-community/datetimepicker';
import { saveTransaction } from '../../logic/Component-TransactionEditor';
import { queryTaiKhoan } from '../../services/TaiKhoanCRUD';
import sessionStore from '../../logic/sessionStore';
import { checkLoansForCycle, checkSavingsForCycle, checkInitialLaunch } from '../../logic/callonappopenning';
import { checkBillForCycle } from '../../logic/CallOnAppCheckBill';

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

        console.log(JSON.parse(JSON.stringify(await saveTransaction(GiaoDich))))
    }

    async componentDidMount() {

        console.log("Add New Trans: - ComponentDidMount")

        await checkInitialLaunch()
        //check routine
        if (sessionStore.activeUserId) {
            //FIXME: weird shit happen
            console.log(await checkSavingsForCycle())
            console.log(await checkLoansForCycle())
            console.log(await checkBillForCycle())
        }
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