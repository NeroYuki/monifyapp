import React, { Component } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { stylesheet } from './style';

export class DescriptiveButton extends Component {
    render() {
        const style = stylesheet
        return (
            <TouchableHighlight style={[style.button, this.props.style]} onPress={(this.props.onPress)? this.props.onPress : () => {console.log('default handler')}} underlayColor="#dddddddd">
                <View style={style.button_layout}>
                    <Icon name={(this.props.icon)? this.props.icon : "close"} size={64} style={style.icon}/>
                    <Text style={style.title_text}>{this.props.title}</Text>
                    <Text style={style.description_text}>{this.props.desc}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}