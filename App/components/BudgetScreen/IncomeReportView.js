import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../assets/constants';
import * as Progress from 'react-native-progress';
import { currencyFormat } from '../../utils/formatNumber';


export class IncomeReportView extends Component {

    windowWidth = Dimensions.get('window').width - 40;

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.constraint}>
                    <Text style={styles.title}>{this.props.title} </Text>

                    <Text style={styles.reportText}> {currencyFormat(this.props.current)} added of {currencyFormat(this.props.total)} </Text>
                </View>

                <View style={styles.constraint} >
                    <View style={{ flex: 1 }}>
                        <Progress.Bar
                            style={styles.progressBar}
                            width={this.windowWidth}
                            progress={this.props.current / this.props.total}
                            color={COLORS.blueProgress}
                            unfilledColor={COLORS.ligtBlueProgress}
                            borderWidth={0}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 100,
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
    },
    progressBar: {
        marginTop: 16,
        justifyContent: 'center',
    }
})