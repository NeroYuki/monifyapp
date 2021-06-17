
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { PieChart } from 'react-native-svg-charts';
import { COLORS } from '../../assets/constants';
import { ChartView } from './ChartView';
import { ItemsCategoriesTab } from './ItemsCategoriesTab';

export class ChartOverview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
        }
    }

    render() {
        console.log("CHART OVERVIEW CURRENT OPTION: ", this.props.currentOption)

        return (
            <View style={styles.container}>
                <ChartView />
                <ItemsCategoriesTab
                    currentOption={this.props.currentOption}
                    data={this.state.data}
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