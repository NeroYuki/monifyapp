import React, { Component } from 'react'
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, icons, SIZES, FONTS } from '../../assets/constants';
import Svg, { G, Circle, Line, } from 'react-native-svg';

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

        return (
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
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
                <View style={{ height: 270, flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ top: 16, width: this.radius * 2, height: this.radius * 2 }}>
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
                                    stroke={COLORS.white}
                                    strokeWidth={this.strokeWidth}
                                    r={this.radius}
                                    fill='transparent'
                                    strokeDasharray={cirleCircumFerence}

                                    // Set Progress data
                                    strokeDashoffset={cirleCircumFerence * (this.props.current / this.props.total)}
                                    strokeLinecap='round'
                                />
                            </G>
                        </Svg>
                        <View style={[
                            StyleSheet.absoluteFillObject,
                            { justifyContent: 'center', alignItems: 'center', flex: 1 }
                        ]}>
                            <Image
                                source={icons.setting}
                                resizeMode='contain'
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        fontSize: 24,
                        color: COLORS.white,
                        fontWeight: 'bold'
                    }}> {this.props.total} VND</Text>
                    <Text style={{
                        top: 8,
                        fontSize: 17,
                        color: COLORS.lightText
                    }}>LEFT TO SPEND</Text>
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