import React, { Component } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from '../../assets/constants';
import { ItemsBudget } from '../../components/BudgetSettingScreen/ItemsBudget';

export class BudgetSetting extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>

                {/* Header */}
                <View style={{ alignItems: 'center', flexDirection: 'row', height: 48, backgroundColor: 'red' }}>
                    <TouchableOpacity style={{ marginLeft: 16, height: 32, width: 32 }} >
                        <Icon size={32} name='close' />
                    </TouchableOpacity>
                    <Text style={{ flex: 1, textAlign: 'center', marginRight: 16 }}> EDIT BUDGET </Text>
                </View>

                {/* Name  */}
                <View style={{ marginTop: 20, height: 100, backgroundColor: 'white' }}>
                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <Text style={{ marginTop: 20, color: COLORS.blueText }}> NAME </Text>
                    </View>
                    <View style={{ justifyContent: 'center', flex: 1, marginLeft: 20 }}>
                        <TextInput
                            style={{
                                height: 32,
                                fontSize: 17
                            }}
                            placeholder="Type here to translate!"
                            defaultValue='My Wallet'
                            onChangeText={text => console.log(text)}
                        />
                    </View>
                </View>

                {/* Setting Period */}
                <View style={{ marginTop: 20, height: 100, backgroundColor: 'white' }}>
                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <Text style={{ marginTop: 20, color: COLORS.blueText }}> SETTING PERIOD </Text>
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center', flex: 1 }}>
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text style={{ marginLeft: 20, fontSize: 17 }}> Monthly Budget </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <ItemsBudget />

            </SafeAreaView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})