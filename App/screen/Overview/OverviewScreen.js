import React, { Component } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet, Text, RefreshControl } from "react-native";
import { Button, Modal, Snackbar } from "react-native-paper";
import { COLORS } from "../../assets/constants";
import { CategoriesModal, TabSwitcher, TimespanPicker, TransactionEditor, WalletHeader } from "../../components";
import { ChartOverview } from "../../components/OverviewScreen/ChartOverview";
import { ExpenseOrIncomeModal } from "../../components/OverviewScreen/ExpenseOrIncomeModal";
import { ItemsOverView } from "../../components/OverviewScreen/ItemsOverview";
import { RecurringModal } from "../../components/TransactionEditor/RecurringModal";
import { TransactionModal } from "../../components/TransactionEditor/TransactionModal";

import { format, addDays, addMonths, addYears, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns'
import { queryTranCategories, queryTransactions } from "../../logic/Screen-Overview";
import { fetchCategory } from "../../logic/Component-CategoryEditor";
import { percentageFormat } from "../../utils/formatNumber";
import { increase_brightness } from "../../utils/increase_brightness";
import sessionStore from "../../logic/sessionStore";
import { ChangeWalletModal } from "../../components/OverviewScreen/ChangeWalletModal";
import { querywallet } from "../../logic/Screen-wallet";

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
            changeWalletModalVisible: false,
            isRefreshing: false,

            // All trans data 
            overviewData: {},
            categoriesData: {},
            listDataAtListTab: [
                {
                    title: '2011-10-05T14:48:00.000Z',
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

            listDataAtCategoriesTab: [
                {
                    title: '',
                    total: 0,
                    data: [
                        {
                            amount: 0,
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

            listDataChart: [],


            // Tap on item report then set data on this
            // List - Tab 
            currentData: {
                datas: {
                    ghichu: '',
                    sotienthunhap: null,
                    sotientieudung: 0,
                },
                icon: [
                    {
                        color: '',
                        iconhangmuc: '',
                    }
                ]
            },

            // Wallet 
            walletList: [],
            currentWallet: '',

            // Categories - Tab
            currentOption: 'Expense', // Income

            // Period
            dateTime: "",
            currentPeriod: 'month', // week, year, custom

            startDate: new Date(),
            endDate: new Date(),

            isLoading: true,

            snackbarMessage: "",
            snackbarMessageVisible: false,
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
            const [overviewData, categoriesData, dateTime, walletList] = await Promise.all([
                this.getDataOverview(), this.getPercentageData(), this.getDate(), this.getListOfWallet()
            ]);

            const currentWallet = sessionStore.activeWalletId

            this.setState({
                isLoading: false,
                overviewData,
                categoriesData,
                dateTime,
                walletList,
                currentWallet
            });

            this.parseDataToProps(overviewData)
            this.getDataAtCategoriesTab()
        } catch (error) {

            console.log("OVERVIEW: LOADING......", error)
            this.setState({
                isLoading: false
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentOption != this.state.currentOption) {
            this.getDataAtCategoriesTab()
        }
    }

    getListOfWallet = async () => {
        let data = await querywallet({ walletName: '' })
        return data
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
                walletId: sessionStore.activeWalletId,
                period: this.state.currentPeriod
            })
        ))

        return percentageData
    }

    getDataOverview = async () => {
        var data = JSON.parse(JSON.stringify(
            await queryTransactions({
                walletId: sessionStore.activeWalletId,
                period: this.state.currentPeriod
            })
        ))

        //console.log(JSON.stringify(data.trans, {}, " "))

        return data
    }

    getDataOverviewWith2Date = async (start, end) => {
        var data = JSON.parse(JSON.stringify(
            await queryTransactions({
                walletId: sessionStore.activeWalletId,
                start_day: start,
                end_day: end
            })
        ))

        var percentageData = JSON.parse(JSON.stringify(
            await queryTranCategories({
                walletId: sessionStore.activeWalletId,
                start_day: start,
                end_day: end
            })
        ))

        // console.log("Overview Data: ", data)

        this.setState({
            overviewData: data,
            categoriesData: percentageData,
        })

        this.parseDataToProps(data)
        this.getDataAtCategoriesTab()
    }

    getDataOverviewWithPeriod = async (period) => {
        var data = JSON.parse(JSON.stringify(
            await queryTransactions({
                walletId: sessionStore.activeWalletId,
                period: period
            })
        ))

        var percentageData = JSON.parse(JSON.stringify(
            await queryTranCategories({
                walletId: sessionStore.activeWalletId,
                period: period
            })
        ))

        this.setState({
            overviewData: data,
            categoriesData: percentageData,
        })

        this.parseDataToProps(data)
        this.getDataAtCategoriesTab()
    }

    handleChangePeriod = (value) => {
        this.setState({
            currentPeriod: value
        })

        if (value == 'week') {
            var start = startOfWeek(new Date(Date.now()), { weekStartsOn: 1 })
            var end = endOfWeek(new Date(Date.now()), { weekStartsOn: 1 })

            console.log(start, " - ", end)

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
        else {
            // console.log("CUSTOM PERIOD ", this.state.startDate, '  -  ', this.state.endDate)

            var date = {
                currentTime: format(new Date(this.state.startDate), 'dd MMM') + ' - ' + format(new Date(this.state.endDate), 'dd MMM'),
                otherFormat: '',
            }

            this.setState({
                dateTime: date,
            })

            this.getDataOverviewWith2Date(this.state.startDate, this.state.endDate)
            return
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

        this.setState({ listDataAtListTab: trans })
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

    fetchDataList = async (array, data, total, title) => {
        for (var i in array) {
            total += array[i].amount

            var icon = JSON.parse(JSON.stringify(await fetchCategory({ categoryId: array[i].categoryId })))
            var value = {
                amount: array[i].amount,
                icon: icon,
            }

            data.push(value)
        }

        this.setState({
            listDataAtCategoriesTab: [
                {
                    title: title,
                    // title: this.props.currentOption,
                    total: total,
                    data: data,
                }
            ]
        })
    }

    fetchDataChart = async (array, datas, total, title) => {

        datas = []
        total = 0

        var colorPercentage = '#a96300'

        for (var i in array) {
            total += array[i].amount
        }

        for (var i in array) {
            var icon = JSON.parse(JSON.stringify(await fetchCategory({ categoryId: array[i].categoryId })))

            colorPercentage = increase_brightness(colorPercentage, 20)

            var value = {
                key: icon[0].tenhangmuc,
                amount: percentageFormat(array[i].amount / total * 100),
                icon: icon[0].iconhangmuc,
                svg: { fill: icon[0].color }
            }

            datas.push(value)
        }

        this.setState({
            listDataChart: datas
        })
    }

    getDataAtCategoriesTab() {
        var trans = this.state.categoriesData
        var data = []
        var total = 0

        if (this.state.currentOption == 'Expense') {
            this.fetchDataList(trans.expense, data, total, 'Expense')
            this.fetchDataChart(trans.expense, data, total, 'Expense')
        }

        else
            if (this.state.currentOption == 'Income') {
                this.fetchDataList(trans.income, data, total, 'Income')
                this.fetchDataChart(trans.income, data, total, 'Income')

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

    handleShowListOfWallet = () => {
        console.log("CHOOSE WALLET")

        this.setState({
            changeWalletModalVisible: true
        })
    }

    handleChangeWallet = async (val) => {
        console.log("HANDLE CHANGE WALLET ID: ", val)

        this.setState({
            currentWallet: val,
            changeWalletModalVisible: !this.state.changeWalletModalVisible
        })

        sessionStore.activeWalletId = val

        this.reloadData()
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
                    data={this.state.listDataAtListTab}
                    currentOption={this.state.currentOption}
                />
                :
                <ChartOverview
                    onPressShowing={this.onPressShowing}
                    chartData={this.state.listDataChart}
                    data={this.state.listDataAtCategoriesTab}
                    currentOption={this.state.currentOption}
                />
        )
    }

    wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    reloadData = async () => {
        try {
            const [overviewData, categoriesData, dateTime, walletList] = await Promise.all([
                this.getDataOverview(), this.getPercentageData(), this.getDate(), this.getListOfWallet()
            ]);

            const currentWallet = sessionStore.activeWalletId

            this.setState({
                isLoading: false,
                overviewData,
                categoriesData,
                dateTime,
                walletList,
                currentWallet
            });

            this.parseDataToProps(overviewData)
            this.getDataAtCategoriesTab()
        } catch (error) {

            console.log("OVERVIEW: LOADING......", error)
            this.setState({
                isLoading: false
            })
        }
    }

    onRefresh = () => {
        this.setState({
            isRefreshing: true,
        })

        this.wait(1000).then(() => {

            this.reloadData()

            this.setState({
                isRefreshing: false
            })
        });
    }

    render() {
        console.log("Overview Screen: - Render")

        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#ff92a7' }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGray }}>
                    <ScrollView
                        style={{ flex: 1, backgroundColor: COLORS.lightGray }}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                    >
                        <View style={{ flex: 1, backgroundColor: COLORS.lightGray }}>

                            <WalletHeader
                                data={this.state.overviewData}
                                currentTab={this.state.chartView}
                                onCategoriesPress={this.onChartCategoriesPress}
                                onListPress={this.onListPress}

                                handleChooseWallet={this.handleShowListOfWallet}
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
                                    {this.state.visible && <TransactionModal
                                        isVisible={this.state.visible}
                                        onRequestClose={() => this.setState({ visible: false })}
                                        currentData={this.state.currentData}
                                        onCategoriesPress={this.onCategoriesPress}
                                        onRecurringPress={this.onRecurringPress}
                                        onComplete={(msg) => {this.setState({snackbarMessage: msg, snackbarMessageVisible: true, visible: false}); this.reloadData()}}
                                    />}

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

                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        handleSetStartDate={(value) => this.setState({ startDate: value })}
                                        handleSetEndDate={(value) => this.setState({ endDate: value })}

                                        onRequestClose={() => {
                                            this.setState({ periodVisible: false })
                                        }}
                                    />

                                    <ChangeWalletModal
                                        isVisible={this.state.changeWalletModalVisible}
                                        data={this.state.walletList}
                                        currentWallet={this.state.currentWallet}
                                        handleChangeWallet={this.handleChangeWallet}
                                        closePeriod={() => {
                                            this.setState({ changeWalletModalVisible: false })
                                        }}
                                    />

                                </View>
                        }
                        
                    </ScrollView>
                    <Snackbar
                        visible={this.state.snackbarMessageVisible}
                        onDismiss={() => {this.setState({snackbarMessageVisible: false})}}>
                        {this.state.snackbarMessage}
                    </Snackbar>
                </SafeAreaView>
            </View >

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