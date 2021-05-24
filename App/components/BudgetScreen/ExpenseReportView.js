import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Dimensions, Image, SafeAreaView } from 'react-native';
import { COLORS, icons } from '../../assets/constants';
import Svg, { G, Circle, Line, } from 'react-native-svg';


export class ExpenseReportView extends Component {

    radius = 40
    strokeWidth = 10

    constructor(props) {
        super(props)

        this.state = {
            numColumns: 3,
            data: [
                {
                    key: 'Food',
                    money: '200.000'
                },
                {
                    key: 'Entertainment',
                    money: '300.000'
                },
                {
                    key: 'C',
                    money: '400.000'
                },
                {
                    key: 'D',
                    money: '600.000'
                },
            ]
        };
    }

    renderItem = ({ item, index }) => {

        const halfCircle = this.radius + this.strokeWidth
        const cirleCircumFerence = 2 * Math.PI * this.radius

        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            <View style={[styles.item, { height: 180 }]}>

                {/* Donut Chart */}
                <View style={styles.chartStyle} >
                    <View style={{ width: this.radius * 2, height: this.radius * 2 }}>
                        <Svg
                            width={this.radius * 2}
                            height={this.radius * 2}
                            viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
                        >
                            <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
                                <Circle
                                    cx='50%'
                                    cy='50%'
                                    stroke={COLORS.black}
                                    strokeWidth={this.strokeWidth}
                                    r={this.radius}
                                    fill='transparent'
                                    strokeOpacity={0.2}
                                />
                                <Circle
                                    cx='50%'
                                    cy='50%'
                                    stroke={COLORS.pink}
                                    strokeWidth={this.strokeWidth}
                                    r={this.radius}
                                    fill='transparent'
                                    strokeDasharray={cirleCircumFerence}

                                    // Set Progress data
                                    strokeDashoffset={cirleCircumFerence / 4}
                                    strokeLinecap='round'
                                />
                            </G>
                        </Svg>
                        <View style={[
                            StyleSheet.absoluteFillObject,
                            { justifyContent: 'center', alignItems: 'center', margin: this.strokeWidth, backgroundColor: COLORS.lightPink, borderRadius: this.radius }
                        ]}>
                            <Image
                                style={{
                                    height: 32,
                                    width: 32
                                }}
                                source={icons.setting}
                                resizeMode='contain'
                            />
                        </View>
                    </View>
                </View>

                <Text style={styles.itemText}> {item.key}</Text>
                <Text style={{ marginTop: 8 }}> {item.money} Left</Text>
            </View>
        );
    }

    formatRow = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);
        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }
        return data;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}> Expense </Text>
                </View>
                <SafeAreaView style={styles.constraint}>
                    <FlatList
                        scrollEnabled={false}
                        nestedScrollEnabled={true}
                        data={this.formatRow(this.state.data, this.state.numColumns)}
                        style={styles.flatListStyle}
                        renderItem={this.renderItem}
                        numColumns={this.state.numColumns}
                    />
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 300,
        marginTop: 20,
        backgroundColor: COLORS.white
    },
    header: {
        height: 48,
        marginLeft: 20,
    },
    constraint: {
        flex: 1,
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
    // FlatList
    flatListStyle: {
        flex: 1,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        marginTop: 8,
        color: COLORS.gray,
        fontSize: 15,
        fontWeight: 'bold',
    },
    chartStyle: {
        height: 80,
        width: 80,
    },
    dropShadow: {
        // Shadow 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})