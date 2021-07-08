import React, { Component } from "react";
import { View, Modal, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView, StyleSheet, Alert } from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from '../../assets/constants';
import { deleteBudget, saveBudget } from "../../logic/Screen-budget";
import sessionStore from "../../logic/sessionStore";
import { BudgetSettingPeriodModal } from "./BudgetSettingPeriodModal";

// import { saveBudget } from "../../logic/Screen-Budget";
export class BudgetSettingModal extends Component {

    constructor(props) {

        console.log("BUDGET SETTING - constructor")
        super(props)

        this.state = {

            periodVisible: false,
            addBudgetExpenseVisible: false,
            transactionVisible: false,

            periodOptions: ["Weekly, Monthly, Yearly"],

            periodCurrent: "Monthly",
            name: 'My Wallet',
            income: "0",
            expense: "0",
            balance: "0",
            // income: (this.props.income.sotienmuctieu != 1) ? this.props.income.sotienmuctieu : 1,
            // expense: (this.props.expense.sotienmuctieu != 1) ? this.props.expense.sotienmuctieu : 1,
            // balance: (this.props.balance.sotienmuctieu != 1) ? this.props.balance.sotienmuctieu : 1,
        }

        this.changePeriod = this.changePeriod.bind(this)
        this.handleSaveBudget = this.handleSaveBudget.bind(this)
        this.changeTypeOfPeriod = this.changeTypeOfPeriod.bind(this)
    }

    async componentDidMount() {
        console.log("BUDGET SETTING - COMPONENT DID MOUNT")

        await this.setState({
            income: this.props.income.sotienmuctieu.toString(),
            expense: this.props.expense.sotienmuctieu.toString(),
            balance: this.props.balance.sotienmuctieu.toString(),
        })

        console.log(this.state)
    }

    changePeriod(val) {
        this.setState({
            periodCurrent: val,
            periodVisible: false
        })
    }

    changeTypeOfPeriod = (value) => {
        switch (value) {
            case 'Weekly':
                return 'week'
            case 'Monthly':
                return 'month'
            case 'Yearly':
                return 'year'
        }
    }

    handleSaveBudget = async () => {
        console.log("SAVE BUTTON", this.state)

        if (this.state.income == 0 || this.state.expense == 0 || this.state.balance == 0) {
            Alert.alert(
                "Something wrong!",
                "Please fill in all the field",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
        }
        else {
            try {
                if (this.state.income != 0) {
                    var value = {
                        budgetId: (this.props.income.idmuctieu != '') ? this.props.income.idmuctieu : null,
                        userId: sessionStore.activeWalletId,
                        name: this.state.name,
                        amount: parseInt(this.state.income) || 1,
                        loaimuctieu: 'TietKiemDenMuc', //TieuDungQuaMuc, SoDuToiThieu, TietKiemDenMuc
                        period: this.changeTypeOfPeriod(this.state.periodCurrent),
                        //year, month, week
                    }
                    console.log("INCOME SAVE: ", JSON.parse(JSON.stringify(await saveBudget(value))))
                }

                if (this.state.expense != 0) {
                    var value = {
                        budgetId: (this.props.expense.idmuctieu != '') ? this.props.expense.idmuctieu : null,
                        userId: sessionStore.activeWalletId,
                        name: this.state.name,
                        amount: parseInt(this.state.expense) || 1,
                        loaimuctieu: 'TieuDungQuaMuc', //TieuDungQuaMuc, SoDuToiThieu, TietKiemDenMuc
                        period: this.changeTypeOfPeriod(this.state.periodCurrent), //year, month, week
                    }

                    console.log("EXPENSE SAVE: ", JSON.parse(JSON.stringify(await saveBudget(value))))
                }

                if (this.state.balance != 0) {
                    var value = {
                        budgetId: (this.props.balance.idmuctieu != '') ? this.props.balance.idmuctieu : null,
                        userId: sessionStore.activeWalletId,
                        name: this.state.name,
                        amount: parseInt(this.state.balance) || 1,
                        loaimuctieu: 'SoDuToiThieu', //TieuDungQuaMuc, SoDuToiThieu, TietKiemDenMuc
                        period: this.changeTypeOfPeriod(this.state.periodCurrent), //year, month, week
                    }

                    console.log("BALANCE SAVE: ", JSON.parse(JSON.stringify(await saveBudget(value))))
                }

                Alert.alert(
                    "Info",
                    "Successfully to create budget",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )
            } catch (error) {
                Alert.alert(
                    "Something wrong!",
                    error,
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )
            }
        }
    }

    handleDeleteBudget = async () => {
        console.log("DELETE budget")

        // console.log(await deleteBudget("60e26298e4ddf0e2231fc8b1"))
        // console.log(await deleteBudget("60e26298e4ddf0e2231fc8b2"))
        // console.log(await deleteBudget("60e26298e4ddf0e2231fc8b3"))

        // try {
        //     if (this.props.income != 0) {
        //         var value = {
        //             budgetId: (this.props.income.idmuctieu != '') ? this.props.income.idmuctieu : null,
        //         }

        //         console.log(value.budgetId)
        //         await deleteBudget(value.budgetId)
        //         //console.log("INCOME SAVE: ", JSON.parse(JSON.stringify(await deleteBudget(value.budgetId))))
        //     }

        //     if (this.props.expense != 0) {
        //         var value = {
        //             budgetId: (this.props.expense.idmuctieu != '') ? this.props.expense.idmuctieu : null,
        //         }

        //         console.log(value.budgetId)
        //         await deleteBudget(value.budgetId)
        //         //console.log("EXPENSE SAVE: ", JSON.parse(JSON.stringify(await deleteBudget(value.budgetId))))
        //     }

        //     if (this.props.balance != 0) {
        //         var value = {
        //             budgetId: (this.props.balance.idmuctieu != '') ? this.props.balance.idmuctieu : null,
        //         }

        //         console.log(value.budgetId)
        //         await deleteBudget(value.budgetId)
        //         //console.log("BALANCE SAVE: ", JSON.parse(JSON.stringify(await deleteBudget(value.budgetId))))
        //     }

        //     Alert.alert(
        //         "Successfully to delete budget",
        //         [
        //             { text: "OK", onPress: () => console.log("OK Pressed") }
        //         ]
        //     )
        // } catch (error) {
        //     Alert.alert(
        //         "Something wrong!",
        //         { error },
        //         [
        //             {
        //                 text: "Cancel",
        //                 onPress: () => console.log("Cancel Pressed"),
        //                 style: "cancel"
        //             },
        //             { text: "OK", onPress: () => console.log("OK Pressed") }
        //         ]
        //     )
        // }
    }

    render() {

        console.log("BUDGET SETTING - RENDER")
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onRequestClose}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGray }}>
                    <ScrollView>
                        {/* Header */}
                        <View style={{ alignItems: 'center', flexDirection: 'row', height: 48, backgroundColor: COLORS.white }}>
                            <TouchableOpacity style={{ marginLeft: 16, height: 32, width: 32 }} >
                                <Icon size={32} name='close' onPress={this.props.onRequestClose} />
                            </TouchableOpacity>
                            <Text style={{ flex: 1, textAlign: 'center', marginRight: 16 }}> BUDGET </Text>
                            <View style={{ height: 32, width: 32, marginRight: 16 }}></View>
                        </View>

                        {/* Name  */}
                        <View style={{ marginTop: 20, height: 100, backgroundColor: 'white' }}>
                            <View style={{ flex: 1, marginLeft: 20 }}>
                                <Text style={{ marginTop: 20, color: COLORS.blueText }}> NAME </Text>
                            </View>
                            <View style={{ justifyContent: 'center', flex: 1, marginLeft: 20 }}>
                                <TextInput
                                    style={{
                                        height: '100%',
                                        fontSize: 17
                                    }}
                                    placeholder="Type here to translate!"
                                    defaultValue={this.state.name}
                                    onChangeText={text => {
                                        console.log(text)
                                        this.setState({ name: text })
                                    }}
                                />
                            </View>
                        </View>

                        {/* Setting Period */}
                        <View style={{ marginTop: 20, height: 100, backgroundColor: 'white' }}>
                            <View style={{ flex: 1, marginLeft: 20 }}>
                                <Text style={{ marginTop: 20, color: COLORS.blueText }}> SETTING PERIOD </Text>
                            </View>
                            <TouchableOpacity style={{ justifyContent: 'center', flex: 1 }}
                                onPress={() => {
                                    console.log("Change Period")
                                    this.setState({
                                        periodVisible: !this.state.periodVisible
                                    })
                                }}
                            >
                                <View style={{ justifyContent: 'center', flex: 1 }}>
                                    <Text style={{ marginLeft: 20, fontSize: 17 }}> {this.state.periodCurrent} Budget </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* INCOME/EXPENSE Item List */}
                        <View style={{ marginTop: 20, height: 100, backgroundColor: 'white' }}>
                            <View style={{ flex: 1, marginLeft: 20 }}>
                                <Text style={{ marginTop: 20, color: COLORS.blueText }}> INCOME </Text>
                            </View>
                            <View style={{ justifyContent: 'center', flex: 1, marginLeft: 20 }}>
                                <TextInput
                                    style={{
                                        height: '100%',
                                        paddingLeft: 4,
                                        fontSize: 17
                                    }}
                                    placeholder="Type your income target"
                                    defaultValue={(this.props.income.sotienmuctieu != 1) ? this.props.income.sotienmuctieu.toString() : ' '}
                                    onChangeText={number => {
                                        console.log(number)

                                        this.setState({ income: number })
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{ marginTop: 20, height: 100, backgroundColor: 'white' }}>
                            <View style={{ flex: 1, marginLeft: 20 }}>
                                <Text style={{ marginTop: 20, color: COLORS.blueText }}> EXPENSE </Text>
                            </View>
                            <View style={{ justifyContent: 'center', flex: 1, marginLeft: 20 }}>
                                <TextInput
                                    style={{
                                        height: '100%',
                                        paddingLeft: 4,
                                        fontSize: 17
                                    }}
                                    placeholder="Type your expense target"
                                    defaultValue={(this.props.expense.sotienmuctieu != 1) ? this.props.expense.sotienmuctieu.toString() : ' '}
                                    onChangeText={number => {
                                        console.log(number)

                                        this.setState({ expense: number })
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{ marginTop: 20, height: 100, backgroundColor: 'white' }}>
                            <View style={{ flex: 1, marginLeft: 20 }}>
                                <Text style={{ marginTop: 20, color: COLORS.blueText }}> BALANCE </Text>
                            </View>
                            <View style={{ justifyContent: 'center', flex: 1, marginLeft: 20 }}>
                                <TextInput
                                    style={{
                                        height: '100%',
                                        paddingLeft: 4,
                                        fontSize: 17
                                    }}
                                    placeholder="Type your balance target"
                                    defaultValue={(this.props.balance.sotienmuctieu != 1) ? this.props.balance.sotienmuctieu.toString() : ' '}
                                    onChangeText={number => {
                                        console.log(number)

                                        this.setState({ balance: number })
                                    }}
                                />
                            </View>
                        </View>


                        <TouchableOpacity
                            style={{ paddingTop: 30, flex: 1, justifyContent: 'center', marginRight: 16, marginLeft: 16 }}
                            onPress={this.handleSaveBudget}
                        >
                            <View style={[styles.button, { backgroundColor: COLORS.yellow }]}>
                                <Text style={{ fontSize: 17, color: COLORS.white }}> SAVE </Text>
                            </View>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                            style={{ paddingTop: 16, flex: 1, justifyContent: 'center', marginRight: 16, marginLeft: 16 }}
                            onPress={this.handleDeleteBudget}
                        >
                            <View style={[styles.button, { backgroundColor: COLORS.red }]}>
                                <Text style={{ fontSize: 17, color: COLORS.white }}> DELETE </Text>
                            </View>
                        </TouchableOpacity> */}

                        <BudgetSettingPeriodModal
                            isVisible={this.state.periodVisible}

                            closePeriod={() => {
                                this.setState({ periodVisible: false })
                            }}

                            periodCurrent={this.state.periodCurrent}
                            selectionList={this.state.periodOptions}

                            changePeriod={this.changePeriod}
                        />
                    </ScrollView>

                </SafeAreaView>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        height: 48,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
})