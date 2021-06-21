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
import { format, addDays, addMonths, addYears, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns'
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
            currentOption: 'Expense', // Income

            // Period
            dateTime: "",
            currentPeriod: 'month', // week, year, custom

            startDate: '',
            endDate: '',
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
        var data = JSON.parse(JSON.stringify(
            await queryTransactions({
                walletId: '60c96efa9bd6d1e6e1aed7a6',
                period: this.state.currentPeriod
            })
        ))

        var percentageData = JSON.parse(JSON.stringify(
            await queryTranCategories({
                walletId: '60c96efa9bd6d1e6e1aed7a6',
                period: this.state.currentPeriod
            })
        ))

        console.log("Overview Data: ", data)

        this.setState({
            overviewData: data,
            categoriesData: percentageData,
        })
    }

    getDataOverviewWith2Date = async (start, end) => {
        var data = JSON.parse(JSON.stringify(
            await queryTransactions({
                walletId: '60c96efa9bd6d1e6e1aed7a6',
                start_day: start,
                end_day: end
            })
        ))

        var percentageData = JSON.parse(JSON.stringify(
            await queryTranCategories({
                walletId: '60c96efa9bd6d1e6e1aed7a6',
                start_day: start,
                end_day: end
            })
        ))

        console.log("Overview Data: ", data)

        this.setState({
            overviewData: data,
            categoriesData: percentageData,
        })
    }

    handleChangePeriod = (value) => {
        this.setState({
            currentPeriod: value
        })

        console.log("Overview: - Change Period", this.state.currentPeriod)


        if (this.state.currentPeriod == 'week') {
            var start = startOfWeek(new Date(Date.now()), { weekStartsOn: 1 })
            var end = endOfWeek(new Date(Date.now()), { weekStartsOn: 1 })

            var date = {
                currentTime: format(new Date(start), 'dd MMM') + ' - ' + format(new Date(end), 'dd MMM'),
                otherFormat: '',
            }

            this.setState({
                dateTime: date,
                startDate: start,
                endDate: end,
            })
        }
        else if (this.state.currentPeriod == 'month') {
            var basicFormat = new Date()

            var date = {
                currentTime: format(new Date(), 'MMM yyyy'),
                otherFormat: new Date(basicFormat.setMonth(basicFormat.getMonth()))
            };

            this.setState({
                dateTime: date
            });
        }
        else if (this.state.currentPeriod == 'year') {
            var basicFormat = new Date()

            var date = {
                currentTime: format(new Date(), 'yyyy'),
                otherFormat: new Date(basicFormat.setMonth(basicFormat.getMonth()))
            };

            this.setState({
                dateTime: date
            });
        }

        this.getDataOverview()
    }

    getDate() {
        console.log("Overview DateTime")
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
        if (this.state.currentPeriod == 'week') {
            var start = this.state.startDate
            var end = this.state.endDate

            start = startOfWeek(start.setDate(start.getDate() - 7), { weekStartsOn: 1 })
            end = endOfWeek(end.setDate(end.getDate() - 7), { weekStartsOn: 1 })

            var date = {
                currentTime: format(new Date(start), 'dd MMM') + ' - ' + format(new Date(end), 'dd MMM'),
                otherFormat: '',
            }

            this.setState({
                dateTime: date,
                startDate: start,
                endDate: end
            })

            this.getDataOverviewWith2Date(start, end)
        }
        else if (this.state.currentPeriod == 'month') {
            var currentDate = this.state.dateTime.otherFormat
            var newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

            var start = startOfMonth(new Date(newDate), { startOfMonth: 1 })
            var end = endOfMonth(new Date(newDate), { startOfMonth: 1 })

            var date = {
                currentTime: format(newDate, 'MMM yyyy'),
                otherFormat: newDate
            }

            this.setState({
                dateTime: date
            });

            this.getDataOverviewWith2Date(start, end)
        }
        else if (this.state.currentPeriod == 'year') {
            var currentDate = this.state.dateTime.otherFormat
            var newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 12));

            var start = startOfYear(new Date(newDate), { startOfYear: 1 })
            var end = endOfYear(new Date(newDate), { startOfYear: 1 })

            console.log("YEAR START: ", start, " - END: ", end)

            var date = {
                currentTime: format(newDate, 'yyyy'),
                otherFormat: newDate
            }

            this.setState({
                dateTime: date
            });

            this.getDataOverviewWith2Date(start, end)
        }
    }

    increasePeriod() {
        if (this.state.currentPeriod == 'week') {
            var start = this.state.startDate
            var end = this.state.endDate

            start = startOfWeek(start.setDate(start.getDate() + 7), { weekStartsOn: 1 })
            end = endOfWeek(end.setDate(end.getDate() + 7), { weekStartsOn: 1 })

            var date = {
                currentTime: format(new Date(start), 'dd MMM') + ' - ' + format(new Date(end), 'dd MMM'),
                otherFormat: '',
            }

            this.setState({
                dateTime: date,
                startDate: start,
                endDate: end
            })

            this.getDataOverviewWith2Date(start, end)
        }
        else if (this.state.currentPeriod == 'month') {
            var currentDate = this.state.dateTime.otherFormat
            var newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));

            var start = startOfMonth(new Date(newDate), { startOfMonth: 1 })
            var end = endOfMonth(new Date(newDate), { startOfMonth: 1 })

            var date = {
                currentTime: format(newDate, 'MMM yyyy'),
                otherFormat: newDate
            }

            this.setState({
                dateTime: date
            });

            this.getDataOverviewWith2Date(start, end)
        }
        else if (this.state.currentPeriod == 'year') {
            var currentDate = this.state.dateTime.otherFormat
            var newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 12));

            var start = startOfYear(new Date(newDate), { startOfYear: 1 })
            var end = endOfYear(new Date(newDate), { startOfYear: 1 })

            var date = {
                currentTime: format(newDate, 'yyyy'),
                otherFormat: newDate
            }

            this.setState({
                dateTime: date
            });

            this.getDataOverviewWith2Date(start, end)
        }
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

                        <View style={{ flex: 1 }}>
                            <TabSwitcher
                                text={this.state.dateTime.currentTime}
                                onTimeTextPress={this.onTimeTextPress}
                                decreasePeriod={this.decreasePeriod}
                                increasePeriod={this.increasePeriod}
                            />

                            <this.reportView />
                        </View>
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
                    currentPeriod={this.state.currentPeriod}
                    handleChangePeriod={this.handleChangePeriod}
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