import React, { Component } from 'react';
import { View, StyleSheet, SectionList, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, icons } from '../../assets/constants';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { fetchCategory } from '../../logic/Component-CategoryEditor';
import { currencyFormat, percentageFormat } from '../../utils/formatNumber';


export class ItemsCategoriesTab extends Component {

    constructor(props) {
        super(props)

        this.state = {
            listData: '',
        };

        // this.getData()
    }

    // fetchDataList = async (array, data, total, title) => {
    //     for (var i in array) {
    //         total += array[i].amount

    //         var icon = JSON.parse(JSON.stringify(await fetchCategory({ categoryId: array[i].categoryId })))
    //         var value = {
    //             amount: array[i].amount,
    //             icon: icon,
    //         }

    //         data.push(value)
    //     }

    //     console.log(data)

    //     this.setState({
    //         listData: [
    //             {
    //                 title: title,
    //                 // title: this.props.currentOption,
    //                 total: total,
    //                 data: data,
    //             }
    //         ]
    //     })
    // }

    // getData = async () => {

    //     var trans = this.props.data
    //     var data = []
    //     var total = 0

    //     if (this.props.currentOption == 'Expense')
    //         this.fetchDataList(trans.expense, data, total, 'Expense')
    //     else
    //         if (this.props.currentOption == 'Income')
    //             this.fetchDataList(trans.income, data, total, 'Income')
    // }

    Item = ({ items }) => (
        <View style={styles.item}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    style={{
                        height: 32,
                        width: 32
                    }}
                    source={items.icon[0].iconhangmuc}
                    resizeMode='contain'
                />
                <View style={{ flex: 1, marginLeft: 16, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{currencyFormat(items.amount)}</Text>
                        <Text style={styles.describe}>{items.icon[0].tenhangmuc}  </Text>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={styles.percentage}>{percentageFormat((items.amount / this.props.data[0].total) * 100)}%</Text>
                    </View>
                </View>

            </View>
            <View style={{ height: 1, backgroundColor: COLORS.separateLine }}></View>
        </View>
    );

    Header = ({ section }) => (
        <TouchableOpacity
            style={styles.header}
            onPress={this.props.onPressShowing}
        >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.titleHeader}>Showing: </Text>
                    <Text style={styles.totalHeader}>{this.props.currentOption}</Text>
                </View>

                <View style={{ marginRight: 20, height: 25, width: 25 }}>
                    <Icon
                        name="chevron-right"
                        size={25}>
                    </Icon>
                </View>
            </View>

            <View style={{ height: 1, backgroundColor: COLORS.separateLine }}></View>
        </TouchableOpacity>
    );

    Footer = () => (
        <View style={styles.footer}>
        </View>

    );

    render() {

        return (
            <View style={styles.container}>
                <SectionList
                    style={styles.selectionList}
                    scrollEnabled={false}
                    sections={this.props.data}
                    renderItem={({ item }) => <this.Item items={item} />}
                    renderSectionHeader={({ section }) => <this.Header section={section} />}
                    renderSectionFooter={() => <this.Footer />}
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
        backgroundColor: COLORS.white
    },

    selectionList: {
    },

    header: {
        height: 48,
        justifyContent: 'space-between'
    },

    footer: {
        height: 48,
        backgroundColor: COLORS.grayBackground,
        marginTop: -1
    },
    item: {
        flex: 1,
        minHeight: 70,
        marginLeft: 20,
        marginRight: 20,
    },
    title: {
        fontSize: 17
    },
    describe: {
        fontSize: 15,
        marginTop: 4,
        color: COLORS.gray
    },
    percentage: {
        fontSize: 20,
    },
    titleHeader: {
        marginLeft: 20,
        color: COLORS.gray
    },

    totalHeader: {
        marginRight: 20,
        color: COLORS.black,
        fontWeight: 'bold'
    },

})