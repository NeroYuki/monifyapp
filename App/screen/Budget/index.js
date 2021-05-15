import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, icons, images, SIZES } from '../../assets/constants';
import { FONTS } from '../../assets/constants/theme';
import { BudgetHeader, TabSwitcher } from '../../components';
import { ExpenseReportView } from '../../components/BudgetScreen/ExpenseReportView';
import { Greet } from '../../components/BudgetScreen/Greet';
import { IncomeReportView } from '../../components/BudgetScreen/IncomeReportView';
import { Messages } from '../../components/BudgetScreen/Messages';

export class BudgetScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            income: {
                current: '320.000',
                total: '600.000'
            }
        }

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
                            <TabSwitcher text="MARCH 2021"></TabSwitcher>

                            <IncomeReportView current={this.state.income.current} total={this.state.income.total} />

                            <ExpenseReportView />

                        </View>

                        {/* Render Header */}
                        <BudgetHeader current={this.state.income.current} total={this.state.income.total} />
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