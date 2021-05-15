import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export class ExpenseReportView extends Component {
    render() {

        console.log(this.props)
        return (
            <View style={styles.container}>
                <View style={styles.constraint}>
                    <Text style={styles.title}> Expense </Text>

                </View>

                <View style={styles.constraint} >

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 200,
        marginTop: 20,
        backgroundColor: COLORS.white
    },
    constraint: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
    },
    title: {
        top: 16,
        fontSize: 17,
        fontWeight: '500',
    },
    reportText: {
        top: 16,
        fontSize: 17,
        fontWeight: 'normal'
    }
})