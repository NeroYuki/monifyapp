import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { GenericSettingField } from "../../components";
import { stylesheet } from './style'

export class SyncData extends Component {
    render() {
        const style = stylesheet
        return(
            <ScrollView>
                <View style={style.container}>
                    <GenericSettingField title="Sync Data" value="Backup Data" description="Backup your Monify data to our remote server, require user to be logged in"
                    onPress={() => {this.props.navigation.navigate("Login")}} />
                    <GenericSettingField value="Restore Data" description="Restore your Monify data from our remote server, require user to be logged in and backed-up their data at least once"
                    onPress={() => {this.props.navigation.navigate("Login")}} />
                </View>
            </ScrollView>
        )
    }
}