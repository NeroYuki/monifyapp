import React, { Component } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet, Text } from "react-native";
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
import { fetchCategory } from "../../logic/Component-CategoryEditor";

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
            listData: [
                {
                    title: '',
                    total: 0,
                    data: [
                        {
                            datas: {
                                sotienthunhap: null,
                                sotientieudung: 0,
                            },
                            icon: [
                                {
                                    color: '',
                                    iconhangmuc: 10,
                                }
                            ]
                        }
                    ]
                }
            ],

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

            isLoading: true,
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

    async componentDidMount() {
        console.log("Overview Screen: - Component Did Mount")

        try {
            const [overviewData, categoriesData, dateTime] = await Promise.all([
                this.getDataOverview(), this.getPercentageData(), this.getDate()
            ]);

            this.parseDataToProps(overviewData)
            this.setState({ isLoading: false, overviewData, categoriesData, dateTime });
        } catch (error) {

            console.log("LOADING......", error)
            this.setState({
                isLoading: false
            })
        }

        // this.getDate()
        // this.getDataOverview()
    }

    getDate() {
        console.log("Overview GET DateTime")
        var basicFormat = new Date()

        var date = {
            currentTime: format(new Date(), 'MMM yyyy'),
            otherFormat: new Date(basicFormat.setMonth(basicFormat.getMonth()))
        };

        return date
    }

    getPercentageData = async () => {
        var percentageData = JSON.parse(JSON.stringify(
            await queryTranCategories({
                walletId: '60c96efa9bd6d1e6e1aed7a6',
                period: this.state.currentPeriod
            })
        ))

        return percentageData
    }

    getDataOverview = async () => {
        var data = JSON.parse(JSON.stringify(
            await queryTransactions({
                walletId: '60c96efa9bd6d1e6e1aed7a6',
                period: this.state.currentPeriod
            })
        ))

        return data
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

        this.parseDataToProps(data)


        // console.log("Overview Data: ", data)

        this.setState({
            overviewData: data,
            categoriesData: percentageData,
        })
    }

    getDataOverviewWithPeriod = async (period) => {
        var data = JSON.parse(JSON.stringify(
            await queryTransactions({
                walletId: '60c96efa9bd6d1e6e1aed7a6',
                period: period
            })
        ))

        var percentageData = JSON.parse(JSON.stringify(
            await queryTranCategories({
                walletId: '60c96efa9bd6d1e6e1aed7a6',
                period: period
            })
        ))

        this.parseDataToProps(data)


        this.setState({
            overviewData: data,
            categoriesData: percentageData,
        })
    }

    handleChangePeriod = (value) => {
        this.setState({
            currentPeriod: value
        })

        if (value == 'week') {
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
        else if (value == 'month') {
            var basicFormat = new Date()

            var date = {
                currentTime: format(new Date(), 'MMM yyyy'),
                otherFormat: new Date(basicFormat.setMonth(basicFormat.getMonth()))
            };

            this.setState({
                dateTime: date
            });
        }
        else if (value == 'year') {
            var basicFormat = new Date()

            var date = {
                currentTime: format(new Date(), 'yyyy'),
                otherFormat: new Date(basicFormat.setMonth(basicFormat.getMonth()))
            };

            this.setState({
                dateTime: date
            });
        }

        this.getDataOverviewWithPeriod(value)
    }

    parseDataToProps = async (overviewData) => {
        var dataFetched = overviewData.trans

        var trans = []

        for (var i in dataFetched) {

            var datas = []
            var total = 0

            for (var j in dataFetched[i].data) {
                var icon = JSON.parse(JSON.stringify(await fetchCategory({ categoryId: dataFetched[i].data[j].loaihangmucgd })))
                datas.push({
                    icon: icon,
                    datas: dataFetched[i].data[j],
                })


                // total = total + (dataFetched[i].data[j].sotientieudung) ? -dataFetched[i].data[j].sotientieudung : +dataFetched[i].data[j].sotienthunhap
                if (dataFetched[i].data[j].sotientieudung != null) {
                    total -= dataFetched[i].data[j].sotientieudung
                } else {
                    total += dataFetched[i].data[j].sotienthunhap
                }
            }


            var value = {
                title: dataFetched[i].time,
                total: total,
                data: datas,
            }

            trans.push(value)
        }

        this.setState({ listData: trans })
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

        if (this.state.isLoading) {
            return <View></View>
        }
        return (
            (!this.state.chartView) ?
                <ItemsOverView
                    onPressTransactionEditor={this.onPressTransactionEditor}
                    data={this.state.listData}
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
                {/* <ScrollView style={{ flex: 1 }}> */}
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

                {
                    (this.state.isLoading)
                        ? <View></View>
                        : <View>
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
                        </View>
                }

                {/* </ScrollView> */}

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