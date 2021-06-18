import React, { Component } from "react";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper"
import { stylesheet } from './style';

export class TimespanDefaultFragment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedType: this.props.currentPeriod
        }
    }

    // onPress={(this.props.changePeriod) ?
    //     () => this.props.changePeriod(this.state.selectedType)
    //     :
    //     () => { console.log(this.state.selectedType) }}

    handleChangeValue = (value) => {
        if (this.props.handleChangePeriod) {
            this.props.handleChangePeriod(value)
        }
        else {
            console.log("ERROR TO CHANGE PERIOD")
        }
    }

    render() {
        return (
            <View>
                <RadioButton.Group


                    onValueChange={(value) => {
                        this.setState({ selectedType: value })
                        this.handleChangeValue(value)
                    }}
                    value={this.state.selectedType}
                >
                    <RadioButton.Item label="Weekly" value="week" />
                    <RadioButton.Item label="Monthly" value="month" />
                    <RadioButton.Item label="Yearly" value="year" />
                    <RadioButton.Item label="Custom" value="custom" />
                </RadioButton.Group>
            </View>
        )
    }
}