import React, { Component } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { icons } from '../../assets/constants';

export class ChartView extends Component {

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
        const data = [
            {
                key: 'Salary',
                amount: '25',
                icon: icons.salaryIcon,
                svg: { fill: '#600080' },
            },
            {
                key: 'Food',
                amount: '15',
                icon: icons.foodIcon,
                svg: { fill: '#9900cc' },
                // arc: { outerRadius: '130%' }
            },
            {
                key: 'Electric Bill',
                amount: '40',
                icon: icons.electricBillIcon,
                svg: { fill: '#c61aff' }
            },
            {
                key: 'Internet',
                amount: '10',
                icon: icons.educationIcon,
                svg: { fill: '#d966ff' }
            },
            {
                key: 'Drug',
                amount: '10',
                icon: icons.investmentIcon,
                svg: { fill: '#ecb3ff' }
            }
        ]


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

        )
    }

}