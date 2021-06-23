
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import { PieChart } from 'react-native-svg-charts';
import { COLORS } from '../../assets/constants';
import { ChartView } from './ChartView';
import { ItemsCategoriesTab } from './ItemsCategoriesTab';

export class ChartOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labelWidth: 0,
            selectedIndex: "",
            selectedAmount: "",
            selectedIcon: "",
        }
    }

    render() {
        // Dummy Data
        const data = this.props.chartData

        const pieData = data.map((value) => {
            return {
                key: value.key,
                amount: value.amount,
                icon: value.icon,
                svg: {
                    fill: value.svg.fill,
                    onPress: () => {
                        this.setState({
                            selectedIndex: value.key,
                            selectedAmount: (value.amount + '%'),
                            selectedIcon: value.icon,
                        })
                    },
                },
                arc: {
                    outerRadius: (value.key === this.state.selectedIndex) ? '120%' : '100%'
                }
            }
        })

        const deviceWidth = Dimensions.get('window').width

        return (
            <View style={styles.container}>
                {/* <ChartView
                    currentOption={this.props.currentOption}
                    data={this.props.data}
                /> */}

                {/* PIE CHART */}
                <View style={{ height: 300, justifyContent: 'center' }}>
                    <PieChart
                        style={{ height: 300 }}
                        valueAccessor={({ item }) => item.amount}
                        data={pieData}
                        spacing={0}
                        outerRadius={100}
                    />
                    <View
                        onLayout={({ nativeEvent: { layout: { width } } }) => {
                            this.setState({ labelWidth: width })
                        }}

                        style={{
                            position: 'absolute',
                            left: deviceWidth / 2 - this.state.labelWidth / 2,
                            alignItems: 'center'
                        }}>
                        <Image
                            style={{
                                height: 32,
                                width: 32
                            }}
                            source={this.state.selectedIcon}
                            resizeMode='contain'
                        />

                        <Text style={{
                            paddingTop: 8,
                            fontSize: 17,
                            fontWeight: '500',
                        }}>
                            {this.state.selectedAmount}
                        </Text>
                        <Text>{this.state.selectedIndex}</Text>
                    </View>
                </View>

                {/* LIST DATA  */}
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