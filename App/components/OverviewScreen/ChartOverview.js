
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { PieChart } from 'react-native-svg-charts';
import { COLORS } from '../../assets/constants';
import { ChartView } from './ChartView';
import { ItemsCategoriesTab } from './ItemsCategoriesTab';

export class ChartOverview extends Component {
    render() {

        return (
            <View style={styles.container}>
                <ChartView />
                <ItemsCategoriesTab onPressShowing={this.props.onPressShowing} />
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        minHeight: 60,
        width: '100%',
    },
})