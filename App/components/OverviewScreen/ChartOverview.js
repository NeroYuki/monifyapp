
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { PieChart } from 'react-native-svg-charts';
import { COLORS } from '../../assets/constants';
import { ChartView } from './ChartView';
import { ItemsCategoriesTab } from './ItemsCategoriesTab';

export class ChartOverview extends Component {
    render() {
        // console.log("Chart OverView: - Render")

        return (
            <View style={styles.container}>
                <ChartView
                    currentOption={this.props.currentOption}
                    data={this.props.data}
                />
                <ItemsCategoriesTab
                    currentOption={this.props.currentOption}
                    data={this.props.data}
                    onPressShowing={this.props.onPressShowing}
                />
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