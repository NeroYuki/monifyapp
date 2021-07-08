import React, { Component } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { stylesheet } from './style';
import DateTimePicker from '@react-native-community/datetimepicker';

export class CustomTimespanFragment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customFromDate: new Date(),
            customToDate: new Date(),
            showPickerDialog: false,
            currentSelection: 'from',
        }
    }

    handleSetStartDate = (value) => {
        if (this.props.handleSetStartDate) {
            this.props.handleSetStartDate(value)
        } else {
            console.log("Error To Change Custom-Period")
        }
    }

    handleSetEndDate = (value) => {
        if (this.props.handleSetEndDate) {
            this.props.handleSetEndDate(value)
        } else {
            console.log("Error to Change Custome-Period")
        }
    }

    render() {

        console.log(this.props.startDate, ' --- ', this.props.endDate)
        const style = stylesheet

        const onChange = (event, selectedDate) => {
            if (this.state.currentSelection === "from") {
                const currentDate = selectedDate || this.props.startDate;

                this.handleSetStartDate(currentDate)
                // this.setState({ customFromDate: currentDate })
            }
            else {
                const currentDate = selectedDate || this.props.endDate;

                this.handleSetEndDate(currentDate)
                // this.setState({ customToDate: currentDate })
            }
            this.setState({ showPickerDialog: Platform.OS === 'ios' });
        };

        return (
            <View style={style.custom_selection}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={style.custom_selection_column}>
                        <Text style={style.custom_selection_row_text}>From: </Text>
                        <TouchableHighlight style={style.button}
                            onPress={() => {
                                this.setState({
                                    currentSelection: 'from',
                                    showPickerDialog: true,
                                })
                            }}>
                            <Text>{this.props.startDate.toDateString()}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={style.custom_selection_column}>
                        <Text style={style.custom_selection_row_text}>To: </Text>
                        <TouchableHighlight style={style.button}
                            onPress={() => {
                                this.setState({
                                    currentSelection: 'to',
                                    showPickerDialog: true,
                                })
                            }}>
                            <Text>{this.props.endDate.toDateString()}</Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={{ height: 50, width: '100%' }}>
                    {this.state.showPickerDialog && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={(this.state.currentSelection === 'from') ? this.props.startDate : this.props.endDate}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>


            </View>
        )
    }
}