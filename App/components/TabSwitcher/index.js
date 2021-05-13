import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { stylesheet } from './style'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export class TabSwitcher extends Component {
    render() {
        const style = stylesheet
        return (
            <View style={style.button}>
                <TouchableOpacity><Icon name="chevron-left" size={25}></Icon></TouchableOpacity>
                <TouchableOpacity style={style.button_content}>
                <Text style={style.button_label}>{this.props.text}</Text>
                </TouchableOpacity>
                <TouchableOpacity><Icon name="chevron-right" size={25}></Icon></TouchableOpacity>
            </View>
        )
    }
}