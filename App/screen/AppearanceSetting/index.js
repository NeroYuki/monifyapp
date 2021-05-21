import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { GenericSelectionModal, GenericSettingField } from "../../components";
import { stylesheet } from './style'
import { FAB } from 'react-native-paper'

export class AppearanceSetting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appThemeModalVisible: false,
            appThemeOption: ['Light', 'Dark'],
            appThemeCurrent: 'Light',
            languageModalVisible: false,
            languageOption: ['System Deafult', 'English', 'Vietnam'],
            languageCurrent: 'System Default',
            currencyModalVisible: false,
            currencyOption: ['VND (Vietnamese Dong)', 'USD (US Dollar)'],
            currencyCurrent: 'VND (Vietnamese Dong)',
            strictModeModalVisible: false,
            strictModeOption: ['Enable', 'Disable'],
            strictModeCurrent: 'Enable'
        }

        this.onAppThemeChange = this.onAppThemeChange.bind(this)
        this.onLanguageChange = this.onLanguageChange.bind(this)
        this.onCurrencyChange = this.onCurrencyChange.bind(this)
        this.onStrictModeChange = this.onStrictModeChange.bind(this)
    }

    onAppThemeChange(val) {
        this.setState({
            appThemeModalVisible: false,
            appThemeCurrent: val,
        })
    }

    onLanguageChange(val) {
        this.setState({
            languageModalVisible: false,
            languageCurrent: val,
        })
    }

    onCurrencyChange(val) {
        this.setState({
            currencyModalVisible: false,
            currencyCurrent: val,
        })
    }

    onStrictModeChange(val) {
        this.setState({
            strictModeModalVisible: false,
            strictModeCurrent: val,
        })
    }

    render() {
        const style = stylesheet
        return (

            <View style={style.container}>
                <ScrollView>
                    <GenericSettingField
                        style={style.setting_entry}
                        title="App theme"
                        value={this.state.appThemeCurrent}
                        description="Change whether your app will use Dark or Light theme"
                        onPress={() => { this.setState({ appThemeModalVisible: true }) }} />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Language"
                        value={this.state.languageCurrent}
                        description="Change the language shown by the app"
                        onPress={() => { this.setState({ languageModalVisible: true }) }} />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Currency"
                        value={this.state.currencyCurrent}
                        description="Change which currency to be shown after the value number, this does not convert your value to the respective currency"
                        onPress={() => { this.setState({ currencyModalVisible: true }) }} />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Strict Mode"
                        value={this.state.strictModeCurrent}
                        description="Toggle 'strict mode' that enforce a certain rule to your budget"
                        onPress={() => { this.setState({ strictModeModalVisible: true }) }} />
                </ScrollView>
                <FAB
                    style={style.fab}
                    big
                    icon="content-save"
                    onPress={() => console.log('Pressed')}
                />

                <GenericSelectionModal
                    isVisible={this.state.appThemeModalVisible}
                    onRequestClose={() => { this.setState({ appThemeModalVisible: false }) }}
                    selectionEntry={this.state.appThemeOption}
                    onSelection={this.onAppThemeChange} />

                <GenericSelectionModal
                    isVisible={this.state.languageModalVisible}
                    onRequestClose={() => { this.setState({ languageModalVisible: false }) }}
                    selectionEntry={this.state.languageOption}
                    onSelection={this.onLanguageChange} />

                <GenericSelectionModal
                    isVisible={this.state.currencyModalVisible}
                    onRequestClose={() => { this.setState({ currencyModalVisible: false }) }}
                    selectionEntry={this.state.currencyOption}
                    onSelection={this.onCurrencyChange} />

                <GenericSelectionModal
                    isVisible={this.state.strictModeModalVisible}
                    onRequestClose={() => { this.setState({ strictModeModalVisible: false }) }}
                    selectionEntry={this.state.strictModeOption}
                    onSelection={this.onStrictModeChange} />
            </View>
        )
    }
}