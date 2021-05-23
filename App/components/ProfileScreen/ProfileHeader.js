import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, icons, SIZES, FONTS } from '../../assets/constants';

export class ProfileHeader extends Component {

    render() {

        return (
            <View style={[styles.header, this.props.style]}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <TouchableOpacity style={{position: 'absolute', padding: 16, zIndex: 2,}}
                        onPress={() => console.log("Cài đặt user")}
                    >
                        <Image
                            source={icons.setting}
                            resizeMode="contain"
                            style={{ flex: 1, height: 30, width: 30 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10,}}>
                        <Text style={{ color: COLORS.white, ...FONTS.body2 }}> Profile </Text>
                    </TouchableOpacity>
                </View>

            </View >
        )
    }
}

const styles = StyleSheet.create({
    header: {
        minHeight: 50,
        width: '100%',
    }
})

// export default BudgetHeader