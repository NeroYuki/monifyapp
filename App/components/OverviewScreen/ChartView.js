import React, { Component } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { icons } from '../../assets/constants';
import { fetchCategory } from '../../logic/Component-CategoryEditor';
import { increase_brightness } from '../../utils/increase_brightness';

export class ChartView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            labelWidth: 0,
            selectedIndex: "",
            selectedAmount: "",
            selectedIcon: "",

            listData: [],
        }

        this.getData()
    }

    fetchDataList = async (array, datas, total, title) => {

        var colorPercentage = '#a96300'
        for (var i in array) {
            total += array[i].amount

            var icon = JSON.parse(JSON.stringify(await fetchCategory({ categoryId: array[i].categoryId })))

            colorPercentage = increase_brightness(colorPercentage, 20)

            var value = {
                key: icon[0].tenhangmuc,
                amount: array[i].amount,
                icon: icon[0].iconhangmuc,
                svg: { fill: icon[0].color }
            }

            datas.push(value)
        }

        this.setState({
            listData: datas
        })
    }

    getData = async () => {

        var trans = this.props.data
        var datas = []
        var total = 0

        if (this.props.currentOption == 'Expense')
            this.fetchDataList(trans.expense, datas, total, 'Expense')
        else
            if (this.props.currentOption == 'Income')
                this.fetchDataList(trans.income, datas, total, 'Income')
    }

    render() {

        // Dummy Data
        const data = this.state.listData

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