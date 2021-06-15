import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from '../../assets/constants';
import { CategoriesModal } from '../../components';
import { RecurringModal } from '../../components/TransactionEditor/RecurringModal';

import DateTimePicker from '@react-native-community/datetimepicker';


export class AddNewTransaction extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categoriesVisible: false,
            recurringVisible: false,

            customDate: new Date(),
            showPickerDialog: false,
        }

        this.openCategoriesModal = this.openCategoriesModal.bind(this)
        this.onChangeDateTime = this.onChangeDateTime.bind(this)
    }

    openCategoriesModal() {
        this.setState({
            categoriesVisible: !this.state.categoriesVisible
        })
    }

    onChangeDateTime(event, selectedDate) {

        const currentDate = selectedDate || this.state.customDate;
        this.setState({
            customDate: currentDate,
            showPickerDialog: false
        })
    }

    handleSaveTransaction = async () => {
        console.log("SAVE TRANSACTION");

        let idtaikhoan = new BSON.ObjectID()

        let GiaoDich = {
            transactionId: '60c36b9f7ab578ff8656f01b',
            userId: '60c22a3e29fc94b5464910a8',
            occur_date: new Date('2011-11-11T10:20:30.000Z'),
            walletId: idtaikhoan,
            amount: 6969696,
            categoryId: '60c1e454c706ae2f3930f623',//60c20d3075a2f3751ad6e731,60c1e454c706ae2f3930f623
            note: 'Tiền chơi gáiii',
        }

        console.log(JSON.parse(JSON.stringify(await saveTransaction(GiaoDich))))
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
                            onChangeText={text => console.log(text)}
                        />
                    </View>

                    {/* Input  */}
                    <View style={styles.info_field}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ categoriesVisible: !this.state.categoriesVisible })
                            }}
                        >
                            <View style={styles.info_field_item}>
                                <Icon name="sack" size={24} />
                                <Text style={styles.info_field_item_text}>Category</Text>
                            </View>
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
                                onChangeText={text => console.log(text)}
                            />
                        </View>
                        <Divider style={{ height: 1 }} />

                        <TouchableOpacity
                            onPress={() => this.setState({ showPickerDialog: true })}
                        >
                            <View style={styles.info_field_item}>
                                <Icon name="calendar" size={24} />
                                <Text style={styles.info_field_item_text}>Today</Text>

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
                    onRequestClose={() => { this.setState({ categoriesVisible: false }) }}
                />

                {this.state.showPickerDialog && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.customDate}
                        mode={'date'}
                        is24Hour={true}
                        display='default'
                        onChange={this.onChangeDateTime}
                        style={{
                            height: 40,
                            width: 400,
                            backgroundColor: COLORS.pink,
                            color: COLORS.black

                        }}
                    />
                )}
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