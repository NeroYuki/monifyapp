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
import { queryTranCategories, queryTransactions } from "../../logic/Screen-Overview";

export class OverviewScreen extends Component {
    constructor(props) {
        super(props)

        console.log("Overview Screen: - Constructor")

        this.state = {
            visible: false,
            categoriesVisible: false,
            recurringVisible: false,
            chartView: false,
            periodVisible: false,
            expenseOrIncomeVisible: false,

            // All trans data 
            overviewData: {},
            categoriesData: {},

            // Tap on item report then set data on this
            // List - Tab 
            currentData: {},

            // Categories - Tab
            currentOption: 'Expense',

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
        this.changeShowingOption = this.changeShowingOption.bind(this)


    }

    componentDidMount() {

        console.log("Overview Screen: - Component Did Mount")


        this.getDate()

        this.getDataOverview()
    }

    getDataOverview = async () => {

        var data = JSON.parse(JSON.stringify(await queryTransactions({ walletId: '60c96efa9bd6d1e6e1aed7a6' })))
        var percentageData = JSON.parse(JSON.stringify(await queryTranCategories({ walletId: '60c96efa9bd6d1e6e1aed7a6' })))

        // console.log("PERCENTAGE", percentageData)

        this.setState({
            overviewData: data,
            categoriesData: percentageData,
        })

    }

    getDate() {
        // Becuz getMonth() start from 0. You need to date.getMonth() - 1 to achieve what u want
        var basicFormat = new Date()

        var date = {
            currentTime: format(new Date(), 'MMM yyyy'),
            otherFormat: new Date(basicFormat.setMonth(basicFormat.getMonth()))
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

    changeShowingOption(val) {
        // console.log("OPTION IN OVERVIEW", val)
        this.setState({
            currentOption: val,
            expenseOrIncomeVisible: !this.state.expenseOrIncomeVisible
        })
    }

    // MARK: - ACTION
    reportView = () => {
        console.log("Overview Screen: - Report view")
        return (
            (!this.state.chartView) ?
                <ItemsOverView
                    onPressTransactionEditor={this.onPressTransactionEditor}
                    data={this.state.overviewData.trans}
                    currentOption={this.state.currentOption}
                />
                :
                <ChartOverview
                    onPressShowing={this.onPressShowing}
                    data={this.state.categoriesData}
                    currentOption={this.state.currentOption}
                />
        )
    }

    render() {

        console.log("Overview Screen: - Render")

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>

                        <WalletHeader
                            data={this.state.overviewData}
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
                        </SafeAreaView>
                    </View>


                </ScrollView>

                <TransactionModal
                    isVisible={this.state.visible}
                    onRequestClose={() => this.setState({ visible: false })}
                    currentData={this.state.currentData}
                    onCategoriesPress={this.onCategoriesPress}
                    onRecurringPress={this.onRecurringPress}
                />

                <ExpenseOrIncomeModal
                    isVisible={this.state.expenseOrIncomeVisible}
                    currentOption='Expense'
                    changeShowingOption={this.changeShowingOption}
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