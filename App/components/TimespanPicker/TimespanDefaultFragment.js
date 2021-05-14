import React, { Component } from "react";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper"
import { stylesheet } from './style';

export class TimespanDefaultFragment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedType: "weekly"
        }
    }
    
    render() {
        return (
            <View>
                <RadioButton.Group onValueChange={value => this.setState({selectedType: value})} value={this.state.selectedType}>
                    <RadioButton.Item label="Weekly" value="weekly" />
                    <RadioButton.Item label="Monthly" value="monthly" />
                    <RadioButton.Item label="Yearly" value="yearly" />
                    <RadioButton.Item label="Custom" value="custom" />
                </RadioButton.Group>
            </View>
        )
    }
}