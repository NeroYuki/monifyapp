import React, { Component } from "react";
import { Text, View } from "react-native";
import { stylesheet } from './style'

export class GenericIconList extends Component {
    render() {
        const style = stylesheet
        return (
            <View>
                <Text>List</Text>
            </View>
        )
    }
}