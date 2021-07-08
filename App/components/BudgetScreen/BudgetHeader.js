import React, { Component } from 'react'
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, icons, SIZES, FONTS } from '../../assets/constants';
import Svg, { G, Circle, Line, } from 'react-native-svg';
import { currencyFormat } from '../../utils/formatNumber';

import { ProgressCircle } from 'react-native-svg-charts'


export class BudgetHeader extends Component {

    percentage = 100
    radius = 120
    strokeWidth = 20
    duration = 500
    delay = 0
    textColor
    max = 100

    render() {
        const halfCircle = this.radius + this.strokeWidth
        const cirleCircumFerence = 2 * Math.PI * this.radius

        var currentData = this.props.current
        var totalData = this.props.total

        console.log(currentData, ' ', totalData)

        if (currentData < 0) currentData = 0

        const percentage = (currentData / totalData)


        return (
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={this.props.onClick}
                    >
                        <Image
                            source={icons.setting}
                            resizeMode="contain"
                            style={{ flex: 1 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: COLORS.white, ...FONTS.body2 }}> Budget: My Wallet </Text>
                    </TouchableOpacity>
                </View>

                {/* Donut Chart */}
                <View style={{ height: 270, flex: 1, flexDirection: 'row', }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ justifyContent: 'center', top: 16, width: this.radius * 2, height: this.radius * 2 }}>
                        <View style={{}}>
                            <ProgressCircle
                                style={{ height: 200 }}
                                progress={percentage}
                                strokeWidth={10}
                                progressColor={'rgb(10,134,255)'}
                            />
                        </View>

                        <View style={[
                            StyleSheet.absoluteFillObject,
                            { justifyContent: 'center', alignItems: 'center', flex: 1 }
                        ]}>
                            <TouchableOpacity
                            //onPress={() => console.log((this.props.current / this.props.total))}
                            >
                                <Image
                                    source={icons.earth}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        fontSize: 24,
                        color: COLORS.white,
                        fontWeight: 'bold'
                    }}> {currencyFormat(totalData - currentData)} VND</Text>
                    <Text style={{
                        top: 8,
                        fontSize: 17,
                        color: COLORS.lightText
                    }}>BALANCE LEFT</Text>
                </View>

            </View >
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        position: 'absolute',
        left: SIZES.padding16,
        right: SIZES.padding16,
        top: 16
    }
})

// export default BudgetHeader