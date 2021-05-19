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
                <TouchableOpacity style={{ marginLeft: 8 }}>
                    <Icon
                        name="chevron-left"
                        size={25}>
                    </Icon>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.button_content}
                    onPress={(this.props.onTimeTextPress) ? this.props.onTimeTextPress : () => { console.log('default handler') }}>
                    <Text style={style.button_label}>{this.props.text}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 8 }}>
                    <Icon
                        name="chevron-right"
                        size={25}>
                    </Icon>
                </TouchableOpacity>
            </View>
        )
    }
}