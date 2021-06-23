import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, icons, images, SIZES } from '../../assets/constants';
import { FONTS } from '../../assets/constants/theme';
import { BudgetHeader, CategoriesModal, TabSwitcher } from '../../components';
import { ExpenseReportView } from '../../components/BudgetScreen/ExpenseReportView';
import { Greet } from '../../components/BudgetScreen/Greet';
import { IncomeReportView } from '../../components/BudgetScreen/IncomeReportView';
import { Messages } from '../../components/BudgetScreen/Messages';
import { BudgetSettingModal } from '../../components/BudgetSettingScreen/BudgetSettingModel';
import { fetchBugetList } from '../../logic/Screen-Budget';
import { queryTranCategories } from '../../logic/Screen-Overview';


export class BudgetScreen extends React.Component {
    constructor(props) {
        super(props)

        console.log("BUDGET - constructor")

        this.state = {
            income: {
                current: '320.000',
                total: '600.000'
            },

            expense: {
                current: '',
                total: '',
            },

            balance: {
                current: '',
                total: '',
            },

            transData: '',

            currentPeriod: 'month',

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

        // const data = this.getAllTransactionData()

        // DATAS TRANS 
        var transData = JSON.parse(JSON.stringify(
            await queryTranCategories({
                walletId: '60c96efa9bd6d1e6e1aed7a6',
                period: this.state.currentPeriod
            })
        ))

        console.log(transData)


        // var budgetData = JSON.parse(JSON.stringify(
        //     await fetchBugetList({})
        // ))

        // console.log(budgetData)

        this.setState({
            transData: transData
        })





        // var data = JSON.parse(JSON.stringify(await fetchBugetList({})))
        // for (var i in data) {
        //     console.log(data[i].sotienmuctieu, ' - ', data[i].loaimuctieu)
        // if (data[i].loaimuctieu.tietkiemdenmuc) {
        //     this.setState({
        //         income: {
        //             total: moneyTarget
        //         }
        //     })
        // }
        // else if (data[i].loaimuctieu.tieudungquamuc) {
        //     this.setState({
        //         expense: {
        //             total: moneyTarget
        //         }
        //     })
        // }
        // else if ((data[i].loaimuctieu.sodutoithieu)) {
        //     this.setState({
        //         total: {
        //             total: moneyTarget
        //         }
        //     })
        // }
        // }

        // console.log(this.state)

    }

    showSettingScreen = () => {
        this.setState({
            settingVisible: !this.state.settingVisible
        })
    }

    render() {
        console.log("BUDGET - render")

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    {/* <ScrollView showsVerticalScrollIndicator={false}> */}
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
                        <TabSwitcher text="March 2021"
                            onTimeTextPress={this.showSettingScreen} />

                        <IncomeReportView
                            current={this.state.income.current}
                            total={this.state.income.total}
                        />

                        <ExpenseReportView />

                    </View>

                    {/* Render Header */}
                    <BudgetHeader
                        current={this.state.income.current}
                        total={this.state.income.total}
                        onClick={this.showSettingScreen}
                    />

                    <BudgetSettingModal
                        isVisible={this.state.settingVisible}
                        onRequestClose={() => { this.setState({ settingVisible: false }) }}
                    ></BudgetSettingModal>

                    {/* </ScrollView> */}

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