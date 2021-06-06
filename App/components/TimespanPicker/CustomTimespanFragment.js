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
    render() {
        const style = stylesheet

        const onChange = (event, selectedDate) => {
            if (this.state.currentSelection === "from") {
                const currentDate = selectedDate || this.state.customFromDate;
                this.setState({ customFromDate: currentDate })
            }
            else {
                const currentDate = selectedDate || this.state.customToDate;
                this.setState({ customToDate: currentDate })
            }
            this.setState({ showPickerDialog: Platform.OS === 'ios' });
        };

        return (
            <View style={style.custom_selection}>
                <View style={style.custom_selection_column}>
                    <Text style={style.custom_selection_row_text}>From: </Text>
                    <TouchableHighlight style={style.button}
                        onPress={() => {
                            this.setState({
                                currentSelection: 'from',
                                showPickerDialog: true,
                            })
                        }}>
                        <Text>{this.state.customFromDate.toDateString()}</Text>
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
                        <Text>{this.state.customToDate.toDateString()}</Text>
                    </TouchableHighlight>
                </View>
                {this.state.showPickerDialog && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={(this.state.currentSelection === 'from') ? this.state.customFromDate : this.state.customToDate}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
        )
    }
}