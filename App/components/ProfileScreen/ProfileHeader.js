import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, icons, SIZES, FONTS } from '../../assets/constants';

export class ProfileHeader extends Component {

    render() {

        return (
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
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
                        <Text style={{ color: COLORS.white, ...FONTS.body2 }}> Profile </Text>
                    </TouchableOpacity>
                </View>

                {/* Donut Chart */}

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
        top: 50,
    }
})

// export default BudgetHeader