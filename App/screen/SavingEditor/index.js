import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { stylesheet } from './style'
import { ColorPickerModal, GenericInputModal, GenericSelectionModal, GenericSettingField } from '../../components'
import { FAB } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

export class SavingEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "BIDV Saving",
            color: '#ddddff',
            amount: '3.000.000',
            duration: new Date(),
            interest: "0.3",
            applied_wallet_values: ['Credit Card', 'Cash Wallet', 'Secret Fund'],
            applied_wallet: 'Credit Card',
            early_interest: "0.1",
            creation_date: new Date(),

            nameInputVisible: false,
            durationPickerVisible: false,
            walletSelectionVisible: false,
            interestInputVisible: false,
            earlyInterestInputVisible: false,
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
                        title="Saving Name"
                        value={this.state.name}
                        description="Change name of the saving fund" 
                        onPress={() => {this.setState({nameInputVisible: true})}}/>

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Saving Color"
                        color={this.state.color}
                        value={this.state.color}
                        description="Pick a color to represent the saving fund" 
                        onPress={() => {this.setState({colorPickerVisible: true})}}/>  

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Wallet Amount"
                        value={this.state.amount}
                        description="The current amount of the wallet, can only be changed by transactions" />
                    
                    <GenericSettingField
                        style={style.setting_entry}
                        title="Saving Expire on"
                        value={this.state.duration.toDateString()}
                        description="Indicate time the saving find should expire" 
                        onPress={() => {this.setState({durationPickerVisible: true})}}
                    />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Interest Rate"
                        value={this.state.interest + " %"}
                        description="The interest rate of saving fund, change to this only apply from the next interest cycle" 
                        onPress={() => {this.setState({interestInputVisible: true})}}
                    />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Inherited Wallet"
                        value={this.state.applied_wallet}
                        description="The wallet that will get the saving fund withdrawal amount after the fund expire" 
                        onPress={() => {this.setState({walletSelectionVisible: true})}}
                    />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Early Withdrawal Interest"
                        value={this.state.early_interest + " %"}
                        description="Interest rate if the saving find is withdrawn early" 
                        onPress={() => {this.setState({earlyInterestInputVisible: true})}}
                    />

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

                <GenericInputModal
                    initialValue={this.state.interest}
                    isVisible={this.state.interestInputVisible}
                    onRequestClose={() => {this.setState({interestInputVisible: false})}}
                    onSubmit={(val) => {this.setState({interestInputVisible: false, interest: val})}}
                    inputType='numeric'
                    affixText="%"
                />

                <GenericInputModal
                    initialValue={this.state.early_interest}
                    isVisible={this.state.earlyInterestInputVisible}
                    onRequestClose={() => {this.setState({earlyInterestInputVisible: false})}}
                    onSubmit={(val) => {this.setState({earlyInterestInputVisible: false, early_interest: val})}}
                    inputType='numeric'
                    affixText="%"
                />

                <ColorPickerModal
                    initialValue={this.state.color}
                    isVisible={this.state.colorPickerVisible}
                    onRequestClose={() => {this.setState({colorPickerVisible: false})}}
                    onSubmit={(val) => {this.setState({colorPickerVisible: false, color: val})}}
                />

                {this.state.durationPickerVisible && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.duration}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={(e, val) => {
                            const currentDate = val || this.state.duration;
                            this.setState({duration: currentDate})
                            this.setState({durationPickerVisible: Platform.OS === 'ios'});
                        }}
                    />
                )}

                <GenericSelectionModal
                    isVisible={this.state.walletSelectionVisible}
                    onRequestClose={() => { this.setState({ walletSelectionVisible: false }) }}
                    selectionEntry={this.state.applied_wallet_values}
                    onSelection={(val) => {
                        this.setState({
                            walletSelectionVisible: false,
                            applied_wallet: val,
                        })
                    }} />

            </View>
        )
    }
}