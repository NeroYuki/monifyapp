import React, { Component } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { Divider } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { stylesheet } from './style';

export class GenericSettingField extends Component {
    render() {
        const style = stylesheet
        const title_section = (this.props.title)? (
            <View>
                <Text style={style.title}>{this.props.title}</Text>
            </View>
        ) : (
            <View></View>
        )

        const desc_section = (this.props.description)? (
            <View>
                <Text style={style.description}>{this.props.description}</Text>
            </View>
        ) : (
            <View></View>
        )

        return (
            <View style={[style.container, this.props.style]}>
                {title_section}
                <Divider></Divider>
                <TouchableHighlight underlayColor="#00000030" onPress={(this.props.onPress)? this.props.onPress : () => {console.log("GenericSettingField: default handler")}}>
                    <Text style={style.value}>{this.props.value}</Text>
                </TouchableHighlight>
                <Divider></Divider>
                {desc_section}
            </View>
        )
    }
}