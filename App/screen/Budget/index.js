import { format } from 'date-fns';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View, Dimensions, Text, RefreshControl, TouchableOpacity } from 'react-native';
import { COLORS, images } from '../../assets/constants';
import { BudgetHeader, TabSwitcher } from '../../components';
import { ExpenseReportView } from '../../components/BudgetScreen/ExpenseReportView';
import { IncomeReportView } from '../../components/BudgetScreen/IncomeReportView';
import { BudgetSettingModal } from '../../components/BudgetSettingScreen/BudgetSettingModel';
import { checkGoalForBudget } from '../../logic/callonappopenning';
import { fetchBudget, fetchBugetList } from '../../logic/Screen-budget';
import { queryTranCategories, queryTransactions } from '../../logic/Screen-Overview';
import sessionStore from '../../logic/sessionStore';


export class BudgetScreen extends React.Component {
    constructor(props) {
        super(props)

        console.log("BUDGET - constructor")

        this.state = {
            income: {
                sotienmuctieu: 1,
                idmuctieu: '',
                ngaybatdau: '',
                ngayketthuc: ''
            },

            expense: {
                sotienmuctieu: 1,
                idmuctieu: '',
                ngaybatdau: '',
                ngayketthuc: ''
            },

            balance: {
                sotienmuctieu: 1,
                idmuctieu: '',
                ngaybatdau: '',
                ngayketthuc: ''
            },

            transData: {
                expenseCurrent: 0,
                incomeCurrent: 0,
                balanceCurrent: 0
            },

            currentPeriod: 'month',
            startDate: '2011-10-05T14:48:00.000Z',
            endDate: '2011-10-05T14:48:00.000Z',

            settingVisible: false,

            isHaveBudgetData: false,

            isLoading: true,
            isRefreshing: false,
        }

        this.showSettingScreen = this.showSettingScreen.bind(this)

        this.getAllBudgetData = this.getAllBudgetData.bind(this)
    }

    componentDidMount = async () => {
        console.log("BUDGET - Component Did Mount")

        this.getAllBudgetData()

        console.log("RESult INCOME", await checkGoalForBudget('60e26298e4ddf0e2231fc8b1'))
        console.log("RESult EXPENSE", await checkGoalForBudget('60e26298e4ddf0e2231fc8b2'))
        console.log("RESult BALANCE ", await checkGoalForBudget('60e26298e4ddf0e2231fc8b3'))
    }

    getAllBudgetData = async () => {

        // Target Money: Income, Expense, Balance 
        var budgetData = JSON.parse(JSON.stringify(await fetchBugetList()))

        // console.log("BUDGET DATAAAA ", budgetData)
        this.setState({
            isLoading: false,
            isHaveBudgetData: (budgetData.length != 0)
        })

        this.setUpBudgetData(budgetData)

        // Total money of Wallet 
        var transData = JSON.parse(JSON.stringify(
            await queryTransactions({
                walletId: sessionStore.activeWalletId,
                period: this.state.currentPeriod
            })
        ))

        var balanceCurrent = transData.income - transData.expense
        this.setState({
            transData: {
                expenseCurrent: transData.expense,
                incomeCurrent: transData.income,
                balanceCurrent,
            }
        })

    }

    setUpBudgetData = (budgetData) => {
        for (var i in budgetData) {
            if (budgetData[i].loaimuctieu.tietkiemdenmuc) {
                this.setState({
                    income: budgetData[i],
                })
            }
            else if (budgetData[i].loaimuctieu.tieudungquamuc) {
                this.setState({
                    expense: budgetData[i],
                })
            } else if (budgetData[i].loaimuctieu.sodutoithieu) {
                this.setState({
                    balance: budgetData[i],
                })
            }

            this.setState({
                startDate: new Date(budgetData[i].ngaybatdau).toISOString(),
                endDate: new Date(budgetData[i].ngayketthuc).toISOString(),
            })
        }
    }

    showSettingScreen = () => {
        this.setState({
            settingVisible: !this.state.settingVisible
        })
    }

    wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }


    onRefresh = () => {
        this.setState({
            isRefreshing: true,
        })

        this.wait(1000).then(() => {

            this.getAllBudgetData()

            this.setState({
                isRefreshing: false
            })
        });
    }


    render() {

        console.log("Budget - render")
        const buttonWidth = Dimensions.get('window').width - 100;

        if (this.state.isLoading) {
            return (
                <View></View>
            )
        }
        else
            return (

                (this.state.isHaveBudgetData)
                    ? <View style={{ flex: 1 }}>
                        <SafeAreaView style={{ flex: 0, backgroundColor: COLORS.lightBlue }} />
                        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGray }}>
                            <View style={styles.container}>

                                <ScrollView
                                    style={{ flex: 1, backgroundColor: COLORS.lightGray }}
                                    showsVerticalScrollIndicator={false}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.isRefreshing}
                                            onRefresh={this.onRefresh}
                                        />
                                    }
                                >
                                    {/* Banner Photo */}
                                    <View style={{ height: 400 }}>
                                        <View style={{ flex: 1, backgroundColor: COLORS.lightBlue }}>
                                        </View>
                                    </View>

                                    {/* Detail of Budget */}
                                    <View style={[styles.detailBudget, { backgroundColor: COLORS.lightGray }]}>
                                        <TabSwitcher
                                            text={format(new Date(this.state.startDate), 'dd MMM') + ' - ' + format(new Date(this.state.endDate), 'dd MMM')}
                                            onTimeTextPress={this.showSettingScreen} />

                                        <IncomeReportView
                                            title="Income"
                                            current={this.state.transData.incomeCurrent}
                                            total={this.state.income.sotienmuctieu}
                                        />

                                        <IncomeReportView
                                            title="Expense"
                                            current={this.state.transData.expenseCurrent}
                                            total={this.state.expense.sotienmuctieu}
                                        />
                                    </View>

                                    {/* Render Header */}
                                    <BudgetHeader
                                        current={this.state.transData.balanceCurrent}
                                        total={this.state.balance.sotienmuctieu}
                                        onClick={this.showSettingScreen}
                                    />

                                    {this.state.settingVisible && <BudgetSettingModal
                                        income={this.state.income}
                                        expense={this.state.expense}
                                        balance={this.state.balance}
                                        isHaveBudgetData={this.state.isHaveBudgetData}
                                        isVisible={this.state.settingVisible}
                                        onRequestClose={() => {
                                            this.setState({ settingVisible: false })
                                            this.getAllBudgetData()
                                        }}
                                    />}

                                </ScrollView>

                            </View >
                        </SafeAreaView>
                    </View>
                    :
                    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                        <TouchableOpacity
                            style={[styles.button, { width: buttonWidth }]}
                            onPress={() => {
                                this.setState({ settingVisible: true })
                            }}
                        >
                            <Text style={{ color: COLORS.white, fontSize: 18, }}> CREATE BUDGET </Text>
                        </TouchableOpacity>

                        {this.state.settingVisible && <BudgetSettingModal
                            income={this.state.income}
                            expense={this.state.expense}
                            balance={this.state.balance}
                            isVisible={this.state.settingVisible}
                            isHaveBudgetData={this.state.isHaveBudgetData}
                            onRequestClose={() => {
                                console.log("EXIT SETTINGGGG")
                                this.setState({ settingVisible: false })
                                this.getAllBudgetData()
                            }}
                        />}
                    </View>



            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    detailBudget: {
        flex: 1,
    },

    button: {

        height: 50,

        backgroundColor: COLORS.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        // Drop Shadow 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,

        elevation: 5,
    }
})