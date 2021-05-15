import React, { Component } from "react";
import { Text, View } from "react-native";
import { DescriptiveButton } from "../../components";
import { stylesheet } from './style'

export class Tools extends Component {
    render() {
        const style = stylesheet
        return(
            <View style={style.container}>
                <View style={style.header}>
                    <Text style={style.header_text}>TOOLS</Text>
                </View>
                <View style={style.button_grid}>
                    <DescriptiveButton icon="wallet-outline" title="Categories" desc="Create, edit, or even remove any of your categories" style={style.button_entry} ></DescriptiveButton>
                    <DescriptiveButton icon="eye-outline" title="Appearance" desc="Create, edit, or even remove any of your categories" style={style.button_entry} ></DescriptiveButton>
                    <DescriptiveButton icon="cloud-sync-outline" title="Sync Data" desc="Create, edit, or even remove any of your categories" style={style.button_entry} ></DescriptiveButton>
                </View>
            </View>
        )
    }
}