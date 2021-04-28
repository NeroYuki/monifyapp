import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, icons, images, SIZES } from '../../assets/constants';
import { FONTS } from '../../assets/constants/theme';

export class BudgetScreen extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={styles.container}>
                {/* Banner Photo */}
                <View style={{ height: '40%' }}>
                    <Image
                        source={images.backgroundBlue}
                        resizeMode='cover'
                        style={{
                            height: '100%',
                            width: '100%'
                        }}
                    />
                </View>

                {/* Detail of Budget */}
                <View style={styles.detailBudget}></View>

                {/* Render Header */}
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', top: 50 }}>
                        <TouchableOpacity style={{ width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => console.log("Cài đặt Budget")}
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
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    detailBudget: {
        flex: 1,
    },

    header: {
        position: 'absolute',
        left: SIZES.padding16,
        right: SIZES.padding16,
        height: '40%',
    }
})