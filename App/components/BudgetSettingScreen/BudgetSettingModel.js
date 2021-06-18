import React, { Component } from "react";
import { View, Modal, Text, TouchableHighlight, TouchableOpacity, SafeAreaView, TextInput, ScrollView, StyleSheet } from "react-native";
import { Divider, Avatar, Modal as PModal } from "react-native-paper"
import { CategoryEditor } from "../CategoryEditor";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from '../../assets/constants';
import { ItemsBudget } from '../../components/BudgetSettingScreen/ItemsBudget';
import { BudgetSettingPeriodModal } from "./BudgetSettingPeriodModal";

import { AddNewBudgetExpenseModal } from "./AddNewBudgetExpenseModal";
import { TransactionModal } from "../TransactionEditor/TransactionModal";
export class BudgetSettingModal extends Component {

    constructor(props) {
        super(props)

        this.state = {

            periodVisible: false,
            addBudgetExpenseVisible: false,
            transactionVisible: false,

            periodOptions: ["Weekly, Monthly, Yearly"],
            periodCurrent: "Weekly",

            // Tap on item report then set data on this
            currentData: {

            }
        }

        this.changePeriod = this.changePeriod.bind(this)
        this.addNewCatgory = this.addNewCatgory.bind(this)
    }

    changePeriod(val) {
        this.setState({
            periodCurrent: val,
            periodVisible: false
        })
    }

    addNewCatgory() {
        this.setState({
            addBudgetExpenseVisible: !this.state.addBudgetExpenseVisible
        })
    }

    render() {
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
                            <Text style={{ flex: 1, textAlign: 'center', marginRight: 16 }}> EDIT BUDGET </Text>
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
                                    defaultValue='My Wallet'
                                    onChangeText={text => console.log(text)}
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
                                        fontSize: 17
                                    }}
                                    placeholder="Type your income target"
                                    onChangeText={text => console.log(text)}
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
                                        fontSize: 17
                                    }}
                                    placeholder="Type your expense target"
                                    onChangeText={text => console.log(text)}
                                />
                            </View>
                        </View>


                        <TouchableOpacity style={{ paddingTop: 30, flex: 1, justifyContent: 'center', marginRight: 16, marginLeft: 16 }}>
                            <View style={[styles.button, { backgroundColor: COLORS.yellow }]}>
                                <Text style={{ fontSize: 17, color: COLORS.white }}> SAVE </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ paddingTop: 16, flex: 1, justifyContent: 'center', marginRight: 16, marginLeft: 16 }}>
                            <View style={[styles.button, { backgroundColor: COLORS.red }]}>
                                <Text style={{ fontSize: 17, color: COLORS.white }}> DELETE </Text>
                            </View>
                        </TouchableOpacity>

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