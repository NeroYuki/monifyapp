import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';
import { ProgressBar } from 'react-native-paper'

export class IncomeReportView extends Component {
    render() {

        console.log(this.props)
        return (
            <View style={styles.container}>
                <View style={styles.constraint}>
                    <Text style={styles.title}> Income </Text>

                    <Text style={styles.reportText}> {this.props.current} added of {this.props.total} </Text>
                </View>

                <View style={styles.constraint} >
                    <View style={{ flex: 1, backgroundColor: 'red' }}></View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100,
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