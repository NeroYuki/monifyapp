import React, { Component } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Button, Modal } from "react-native-paper";
import { COLORS } from "../../assets/constants";
import { CategoriesModal, TabSwitcher, TimespanPicker, TransactionEditor, WalletHeader } from "../../components";
import { ChartOverview } from "../../components/OverviewScreen/ChartOverview";
import { ExpenseOrIncomeModal } from "../../components/OverviewScreen/ExpenseOrIncomeModal";
import { ItemsOverView } from "../../components/OverviewScreen/ItemsOverview";
import { RecurringModal } from "../../components/TransactionEditor/RecurringModal";
import { TransactionModal } from "../../components/TransactionEditor/TransactionModal";

import Moment from 'moment'
import { format, addDays, addMonths, addYears } from 'date-fns'

export class OverviewScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            categoriesVisible: false,
            recurringVisible: false,
            chartView: false,
            periodVisible: false,
            expenseOrIncomeVisible: false,

            // Tap on item report then set data on this
            currentData: {

            },

            dateTime: "",
        }

        this.onCategoriesPress = this.onCategoriesPress.bind(this)
        this.onListPress = this.onListPress.bind(this)
        this.onChartCategoriesPress = this.onChartCategoriesPress.bind(this)
        this.onRecurringPress = this.onRecurringPress.bind(this)
        this.onHideRecurring = this.onHideRecurring.bind(this)
        this.onPressTransactionEditor = this.onPressTransactionEditor.bind(this)
        this.onTimeTextPress = this.onTimeTextPress.bind(this)
        this.onPressShowing = this.onPressShowing.bind(this)

        this.getDate = this.getDate.bind(this)
        this.decreasePeriod = this.decreasePeriod.bind(this)
        this.increasePeriod = this.increasePeriod.bind(this)
    }

    getDate() {

        // Becuz getMonth() start from 0. You need to date.getMonth() - 1 to achieve what u want
        var basicFormat = new Date()

        var date = {
            currentTime: format(new Date(), 'MMM yyyy'),
            otherFormat: new Date(basicFormat.setMonth(basicFormat.getMonth() - 1))
        };

        this.setState({
            dateTime: date
        });
    }

    decreasePeriod() {
        console.log("Decrease Period")

        var currentDate = this.state.dateTime.otherFormat
        var newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

        var date = {
            currentTime: format(newDate, 'MMM yyyy'),
            otherFormat: newDate
        }

        this.setState({
            dateTime: date
        });
    }

    increasePeriod() {
        console.log("Increase Period")

        var currentDate = this.state.dateTime.otherFormat
        var newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));

        var date = {
            currentTime: format(newDate, 'MMM yyyy'),
            otherFormat: newDate
        }

        this.setState({
            dateTime: date
        });
    }


    componentDidMount() {
        console.log("COMPONENT DID MOUNT")
        this.getDate()
    }

    // MARK: - CALL MODAL
    onCategoriesPress() {
        this.setState({ categoriesVisible: true })
    }

    onChartCategoriesPress() {
        this.setState({ chartView: true })
    }

    onListPress() {
        this.setState({ chartView: false })
    }

    onHideRecurring() {
        this.setState({ recurringVisible: false })
    }

    onPressTransactionEditor(val) {
        console.log(val)
        this.setState({
            currentData: val,
            visible: !this.state.visible,
        })
    }

    onRecurringPress() {
        this.setState({ recurringVisible: !this.state.recurringVisible })
    }

    onTimeTextPress() {
        this.setState({ periodVisible: !this.state.periodVisible })
    }

    onPressShowing() {
        this.setState({ expenseOrIncomeVisible: !this.state.expenseOrIncomeVisible })
    }

    // MARK: - ACTION
    reportView = () => {
        return (
            (!this.state.chartView) ?
                <ItemsOverView onPressTransactionEditor={this.onPressTransactionEditor} />
                :
                <ChartOverview onPressShowing={this.onPressShowing} />
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>

                        <WalletHeader
                            currentTab={this.state.chartView}
                            onCategoriesPress={this.onChartCategoriesPress}
                            onListPress={this.onListPress}
                        />

                        <SafeAreaView style={{ flex: 1 }}>
                            <TabSwitcher
                                text={this.state.dateTime.currentTime}
                                onTimeTextPress={this.onTimeTextPress}
                                decreasePeriod={this.decreasePeriod}
                                increasePeriod={this.increasePeriod}
                            />

                            <this.reportView />


                            {/* <Button onPress={() => { this.setState({ visible: true }) }}>Click me</Button>
                    <Button onPress={() => { this.setState({ categoriesVisible: !this.state.categoriesModal }) }}>Click me 2</Button>

                    <Modal visible={this.state.visible} onDismiss={() => { this.setState({ visible: false }) }} contentContainerStyle={containerStyle} style={style}>
                        <TransactionEditor></TransactionEditor>
                    </Modal>

                    <TimespanPicker isVisible={this.state.periodVisible} onRequestClose={() => { this.setState({ periodVisible: false }) }}></TimespanPicker>

                    <CategoriesModal isVisible={this.state.categoriesVisible} onRequestClose={() => { this.setState({ categoriesVisible: false }) }}></CategoriesModal> */}
                        </SafeAreaView>
                    </View>


                </ScrollView>
                {/* <Modal
                    visible={this.state.visible}
                    onDismiss={() => { this.setState({ visible: false }) }}
                    contentContainerStyle={styles.containerStyle}
                    style={styles.modalStyle}
                >

                    <TransactionEditor
                        currentData={this.state.currentData}
                        onCategoriesPress={this.onCategoriesPress}
                        onRecurringPress={this.onRecurringPress}
                        onRequestClose={this.onPressTransactionEditor}
                    />

                </Modal> */}

                <TransactionModal
                    isVisible={this.state.visible}
                    onRequestClose={() => this.setState({ visible: false })}
                    currentData={this.state.currentData}
                    onCategoriesPress={this.onCategoriesPress}
                    onRecurringPress={this.onRecurringPress}
                />

                {/* <CategoriesModal
                    isVisible={this.state.categoriesVisible}
                    onRequestClose={() => { this.setState({ categoriesVisible: false }) }}
                />

                <RecurringModal
                    isVisible={this.state.recurringVisible}
                    closePeriod={() => {
                        this.setState({ recurringVisible: false })
                    }}
                />*/}

                <ExpenseOrIncomeModal
                    isVisible={this.state.expenseOrIncomeVisible}
                    closePeriod={() => {
                        this.setState({ expenseOrIncomeVisible: false })
                    }}
                />

                <TimespanPicker
                    isVisible={this.state.periodVisible}
                    onRequestClose={() => {
                        this.setState({ periodVisible: false })
                    }}
                />
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        height: "80%",
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 20,
    },
    modalStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})