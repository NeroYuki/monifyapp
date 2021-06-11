import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { stylesheet } from './style'
import { ColorPickerModal, GenericInputModal, GenericSelectionModal, GenericSettingField } from '../../components'
import { FAB } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

export class LoanEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Credit Debt",
            color: '#ddddff',
            amount: '1.300.000',
            duration: new Date(),
            interest: "1",
            creation_date: new Date(),

            nameInputVisible: false,
            durationPickerVisible: false,
            interestInputVisible: false,
            colorPickerVisible: false,
        }
    }

    componentDidMount() {
        
    }

    render() {
        const style = stylesheet
        return (
            <View style={style.container}>
                <ScrollView>
                    <GenericSettingField
                        style={style.setting_entry}
                        title="Loan Name"
                        value={this.state.name}
                        description="Change name of the loan " 
                        onPress={() => {this.setState({nameInputVisible: true})}}/>

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Loan Color"
                        color={this.state.color}
                        value={this.state.color}
                        description="Pick a color to represent the loan" 
                        onPress={() => {this.setState({colorPickerVisible: true})}}/>  

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Loan Value"
                        value={this.state.amount}
                        description="The current value of the loan, can only be changed by transactions" />
                    
                    <GenericSettingField
                        style={style.setting_entry}
                        title="Due Date"
                        value={this.state.duration.toDateString()}
                        description="Indicate time the loan is due to payment" 
                        onPress={() => {this.setState({durationPickerVisible: true})}}
                    />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Interest Rate"
                        value={this.state.interest + " %"}
                        description="The interest rate of loan, change to this only apply from the next interest cycle" 
                        onPress={() => {this.setState({interestInputVisible: true})}}
                    />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Creation Date"
                        value={this.state.creation_date.toDateString()}
                        description="Creation date of the loan, cannot be changed" 
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

            </View>
        )
    }
}