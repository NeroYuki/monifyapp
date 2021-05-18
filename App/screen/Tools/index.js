import React, { Component } from "react";
import { Text, View } from "react-native";
import { DescriptiveButton, CategoriesModal } from "../../components";
import { stylesheet } from './style'

export class Tools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoriesVisible: false,
        }
    }

    render() {
        const style = stylesheet
        return (
            <View style={style.container}>
                {/* <View style={style.header}>
                    <Text style={style.header_text}>TOOLS</Text>
                </View> */}
                <View style={style.button_grid}>
                    <DescriptiveButton icon="wallet-outline" title="Categories" desc="Create, edit, or even remove any of your categories" style={style.button_entry} onPress={() => { this.setState({ categoriesVisible: true }) }}></DescriptiveButton>
                    <DescriptiveButton icon="eye-outline" title="Appearance" desc="Change how your app look" style={style.button_entry} onPress={() => { this.props.navigation.push("Appearance") }}></DescriptiveButton>
                    <DescriptiveButton icon="cloud-sync-outline" title="Sync Data" desc="Create, edit, or even remove any of your categories" style={style.button_entry} onPress={() => { this.props.navigation.push("SyncData") }}></DescriptiveButton>
                </View>

                <CategoriesModal
                    isVisible={this.state.categoriesVisible}
                    onRequestClose={() => { this.setState({ categoriesVisible: false }) }}
                ></CategoriesModal>
            </View>
        )
    }
}