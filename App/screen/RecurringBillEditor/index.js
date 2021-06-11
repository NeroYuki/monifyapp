import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { stylesheet } from './style'
import { ColorPickerModal, GenericInputModal, GenericSelectionModal, GenericSettingField } from '../../components'
import { FAB } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveBill } from "../../logic/screen-RecurringBillEditor";

export class RecurringBillEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            desc: "",
            color: '#ddddff',
            amount: '0',
            cycle_start: new Date(),
            cycle_duration_value: "1",
            cycle_duration_type_values: ['Day', 'Week', 'Month', 'Year'],
            //TODO: if day/week => cycle_duration_day = week*7/day
            //else => cycle_duration_month = month/year*12
            cycle_duration_type: 'Month',
            creation_date: new Date(),

            nameInputVisible: false,
            descInputVisible: false,
            amountInputVisible: false,
            cycleStartPickerVisible: false,
            cycleDurationInputVisible: false,
            cycleTypeSelectionVisible: false,
            colorPickerVisible: false,
        }
    }

    handleSaveButton = async () => {
        console.log("SAVE BILL")

        // console.log("STATE: ", this.state)

        let thoigiancuoicungcheck = new Date('2011-04-11T10:20:30.000Z')
        Bill = {
            // billId: '60c0d8c26638c98738494f2e',
            userId: '60bf81c035582676b155066e',
            loaihangmucId: '60c0cb55a09b8f641df3ca13',//60c0cb2a62cd926b5f692f72,60c0cb55a09b8f641df3ca13
            name: 'TLONGGGG',
            color: '#00000',
            note: 'bán hàng tự vận',
            amount: 1234567890,
            cycle_start: thoigiancuoicungcheck,
            cycle_duration_day: 5,
            cycle_duration_month: null,
            creation_date: thoigiancuoicungcheck,
        }

        await saveBill(Bill)
        // console.log(JSON.parse(JSON.stringify(await saveBill(Bill))))
    }

    render() {
        const style = stylesheet
        return (
            <View style={style.container}>
                <ScrollView>
                    <GenericSettingField
                        style={style.setting_entry}
                        title="Recurring Bill Name"
                        value={this.state.name}
                        description="Change name of the bill"
                        onPress={() => { this.setState({ nameInputVisible: true }) }} />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Recurring Bill Description"
                        value={this.state.desc}
                        description="Change description of the bill"
                        onPress={() => { this.setState({ descInputVisible: true }) }} />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Recurring Bill Color"
                        color={this.state.color}
                        value={this.state.color}
                        description="Pick a color to represent the bill"
                        onPress={() => { this.setState({ colorPickerVisible: true }) }} />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Bill Value"
                        value={this.state.amount}
                        description="The current value of the bill, one transaction will be made based on this value every cycle. Do note that a transaction value can still be changed later"
                        onPress={() => { this.setState({ amountInputVisible: true }) }} />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Cycle Start Date"
                        value={this.state.cycle_start.toDateString()}
                        description="Indicate time the billing cycle begin"
                        onPress={() => { this.setState({ cycleStartPickerVisible: true }) }}
                    />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Cycle Duration"
                        value={this.state.cycle_duration_value + " " + this.state.cycle_duration_type}
                        description="The length of the billing cycle as numeral value"
                        onPress={() => { this.setState({ cycleDurationInputVisible: true }) }}
                    />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Cycle Type"
                        value={this.state.cycle_duration_type}
                        description="The type of the billing cycle"
                        onPress={() => { this.setState({ cycleTypeSelectionVisible: true }) }}
                    />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Creation Date"
                        value={this.state.creation_date.toDateString()}
                        description="Creation date of the recurring bill entry, cannot be changed"
                    />
                </ScrollView>

                <FAB style={style.fab}
                    big
                    icon="content-save"
                    onPress={this.handleSaveButton}
                />

                <GenericInputModal
                    initialValue={this.state.name}
                    isVisible={this.state.nameInputVisible}
                    onRequestClose={() => { this.setState({ nameInputVisible: false }) }}
                    onSubmit={(val) => { this.setState({ nameInputVisible: false, name: val }) }}
                />

                <GenericInputModal
                    initialValue={this.state.desc}
                    isVisible={this.state.descInputVisible}
                    onRequestClose={() => { this.setState({ descInputVisible: false }) }}
                    onSubmit={(val) => { this.setState({ descInputVisible: false, desc: val }) }}
                />

                <GenericInputModal
                    initialValue={this.state.cycle_duration_value}
                    isVisible={this.state.cycleDurationInputVisible}
                    onRequestClose={() => { this.setState({ cycleDurationInputVisible: false }) }}
                    onSubmit={(val) => { this.setState({ cycleDurationInputVisible: false, cycle_duration_value: val }) }}
                    inputType='numeric'
                    affixText={this.state.cycle_duration_type}
                />

                <GenericInputModal
                    initialValue={this.state.amount}
                    isVisible={this.state.amountInputVisible}
                    onRequestClose={() => { this.setState({ amountInputVisible: false }) }}
                    onSubmit={(val) => { this.setState({ amountInputVisible: false, amount: val }) }}
                    inputType='numeric'
                    affixText={this.state.cycle_duration_type}
                />

                <ColorPickerModal
                    initialValue={this.state.color}
                    isVisible={this.state.colorPickerVisible}
                    onRequestClose={() => { this.setState({ colorPickerVisible: false }) }}
                    onSubmit={(val) => { this.setState({ colorPickerVisible: false, color: val }) }}
                />

                {this.state.cycleStartPickerVisible && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.cycle_start}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={(e, val) => {
                            const currentDate = val || this.state.cycle_start;
                            this.setState({ cycle_start: currentDate })
                            this.setState({ cycleStartPickerVisible: Platform.OS === 'ios' });
                        }}
                    />
                )}

                <GenericSelectionModal
                    isVisible={this.state.cycleTypeSelectionVisible}
                    onRequestClose={() => { this.setState({ cycleTypeSelectionVisible: false }) }}
                    selectionEntry={this.state.cycle_duration_type_values}
                    onSelection={(val) => {
                        this.setState({
                            cycleTypeSelectionVisible: false,
                            cycle_duration_type: val,
                        })
                    }} />

            </View>
        )
    }
}