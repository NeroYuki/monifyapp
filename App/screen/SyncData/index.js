import React, { Component } from "react";
import { Text, View } from "react-native";
import { stylesheet } from './style'

export class SyncData extends Component {
    render() {
        const style = stylesheet
        return(
            <View style={style.container}>
                <View style={style.header}>
                    <Text style={style.header_text}>SYNC DATA</Text>
                </View>
            </View>
        )
    }
}