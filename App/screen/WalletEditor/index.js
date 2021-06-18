import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { stylesheet } from './style'
import { ColorPickerModal, GenericInputModal, GenericSettingField } from '../../components'
import { FAB } from "react-native-paper";

export class WalletEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            amount: "0",
            color: '#ffffff',
            creation_date: new Date(),

            nameInputVisible: false,
            colorPickerVisible: false,
        }
    }

    render() {
        const style = stylesheet
        return (
            <View style={style.container}>
                <ScrollView>
                    <GenericSettingField
                        style={style.setting_entry}
                        title="Wallet Name"
                        value={this.state.name}
                        description="Change name of the wallet" 
                        onPress={() => {this.setState({nameInputVisible: true})}}/>

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Wallet Color"
                        color={this.state.color}
                        value={this.state.color}
                        description="Pick a color to represent the wallet"
                        onPress={() => {this.setState({colorPickerVisible: true})}}/>

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Wallet Amount"
                        value={this.state.amount}
                        description="The current amount of the wallet, can only be changed by transactions" />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Creation Date"
                        value={this.state.creation_date.toDateString()}
                        description="Creation date of the saving fund, cannot be changed" 
                    />
                </ScrollView>

                <FAB style={style.fab}
                    big
                    icon="content-save"
                    onPress={() => console.log('Pressed')}
                />

                <GenericInputModal
                    initialValue={this.state.name}
                    isVisible={this.state.nameInputVisible}
                    onRequestClose={() => {this.setState({nameInputVisible: false})}}
                    onSubmit={(val) => {this.setState({nameInputVisible: false, name: val})}}
                />

                <ColorPickerModal
                    initialValue={this.state.color}
                    isVisible={this.state.colorPickerVisible}
                    onRequestClose={() => {this.setState({colorPickerVisible: false})}}
                    onSubmit={(val) => {this.setState({colorPickerVisible: false, color: val})}}
                />

            </View>
        )
    }
}