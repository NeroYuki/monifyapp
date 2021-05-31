import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { PieChart } from 'react-native-svg-charts'

export class ChartView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        }
    }

    render() {

        const data = [
            {
                key: 1,
                amount: 50,
                svg: { fill: '#600080' },
            },
            {
                key: 2,
                amount: 50,
                svg: { fill: '#9900cc' },
                // arc: { outerRadius: '130%' }
            },
            {
                key: 3,
                amount: 40,
                svg: { fill: '#c61aff' }
            },
            {
                key: 4,
                amount: 95,
                svg: { fill: '#d966ff' }
            },
            {
                key: 5,
                amount: 35,
                svg: { fill: '#ecb3ff' }
            }
        ]


        const pieData = data.map((value) => {
            return {
                key: value.key,
                amount: value.amount,
                svg: {
                    fill: value.svg.fill,
                    onPress: () => {
                        this.setState({ selectedIndex: value.key })
                    },
                },
                arc: {
                    outerRadius: (value.key === this.state.selectedIndex) ? '130%' : '100%'
                }
            }
        })

        return (
            <View style={{ height: 300 }}>
                <PieChart
                    style={{ height: 250, paddingTop: 50 }}
                    valueAccessor={({ item }) => item.amount}
                    data={pieData}
                    spacing={0}
                    outerRadius={'95%'}
                >

                </PieChart>
            </View>

        )
    }

}