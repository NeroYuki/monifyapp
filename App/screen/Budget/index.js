import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, icons, images, SIZES } from '../../assets/constants';
import { FONTS } from '../../assets/constants/theme';
import { BudgetHeader, TabSwitcher } from '../../components';
import { Greet } from '../../components/Budget/Greet';
import { Messages } from '../../components/Budget/Messages';

export class BudgetScreen extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                {/* Banner Photo */}
                <View style={{ height: '55%' }}>
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
                <View style={styles.detailBudget}>
                    <TabSwitcher text="MARCH 2021"></TabSwitcher>

                    <Greet name='this' />
                    <Greet name='is' />
                    <Greet name='Props' />

                    <Messages />

                </View>

                {/* Render Header */}
                <BudgetHeader />
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
})