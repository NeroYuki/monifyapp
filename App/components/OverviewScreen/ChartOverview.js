
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../assets/constants';

export class ChartOverview extends Component {
    render() {

        return (
            <View style={styles.container}>
                <Text> NTLONGGG </Text>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        minHeight: 60,
        width: '100%',
        backgroundColor: COLORS.pink
    },
})