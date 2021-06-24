import { format } from 'date-fns';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { images } from '../../assets/constants';
import { BudgetHeader, TabSwitcher } from '../../components';
import { ExpenseReportView } from '../../components/BudgetScreen/ExpenseReportView';
import { IncomeReportView } from '../../components/BudgetScreen/IncomeReportView';
import { BudgetSettingModal } from '../../components/BudgetSettingScreen/BudgetSettingModel';
import { fetchBugetList } from '../../logic/Screen-budget';
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
            startDate: '',
            endDate: '',

            settingVisible: false,


        }

        this.showSettingScreen = this.showSettingScreen.bind(this)

        this.getAllBudgetData = this.getAllBudgetData.bind(this)
    }

    componentDidMount = async () => {
        console.log("BUDGET - Component Did Mount")


        this.getAllBudgetData()
    }



    getAllBudgetData = async () => {
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

        // Target Money: Income, Expense, Balance 
        var budgetData = JSON.parse(JSON.stringify(await fetchBugetList()))
        this.setUpBudgetData(budgetData)

        console.log(this.state)
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
                startDate: budgetData[i].ngaybatdau,
                endDate: budgetData[i].ngayketthuc,
            })
        }
    }

    showSettingScreen = () => {
        this.setState({
            settingVisible: !this.state.settingVisible
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Banner Photo */}
                        <View style={{ height: 400 }}>
                            <Image
                                source={images.backgroundBlue}
                                resizeMode='cover'
                                style={{
                                    height: '100%',
                                    width: '100%'
                                }}
                            />
                        </View>

                        {/* Detail of Budget */}
                        <View style={styles.detailBudget}>
                            <TabSwitcher
                                text="TeXT"
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

                        <BudgetSettingModal
                            income={this.state.income}
                            expense={this.state.expense}
                            balance={this.state.balance}
                            isVisible={this.state.settingVisible}
                            onRequestClose={() => { this.setState({ settingVisible: false }) }}
                        ></BudgetSettingModal>

                    </ScrollView>

                </View >
            </SafeAreaView>

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
})