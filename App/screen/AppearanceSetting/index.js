import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { GenericSelectionModal, GenericSettingField } from "../../components";
import { stylesheet } from './style'
import { FAB, Snackbar } from 'react-native-paper'
import { fetchSetting, saveSetting } from "../../logic/Screen-AppearanceSetting";
import sessionStore from "../../logic/sessionStore";

export class AppearanceSetting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appThemeModalVisible: false,
            appThemeOption: ['Light', 'Dark'],
            appThemeCurrent: 'Dark',
            languageModalVisible: false,
            languageOption: ['System Deafult', 'English', 'Vietnam'],
            languageCurrent: 'System Default',
            currencyModalVisible: false,
            currencyOption: ['VND', 'USD'],
            currencyCurrent: 'VND',
            strictModeModalVisible: false,
            strictModeOption: ['Enable', 'Disable'],
            strictModeCurrent: 'Enable',

            snackbarMessage: "",
            snackbarMessageVisible: false,
        }

        this.onAppThemeChange = this.onAppThemeChange.bind(this)
        this.onLanguageChange = this.onLanguageChange.bind(this)
        this.onCurrencyChange = this.onCurrencyChange.bind(this)
        this.onStrictModeChange = this.onStrictModeChange.bind(this)

        this.getData()
    }

    getData = async () => {
        var data = await fetchSetting({})
        console.log(data)


        this.setState({
            appThemeCurrent: data.chedo,
            languageCurrent: (data.ngonngu == 'EN') ? 'English' : 'Vietnam',
            currencyCurrent: (data.loaitien),
            strictModeCurrent: (data.chedo == true) ? 'Enable' : 'Disable',
        })
    }

    handleSaveSetting = async () => {
        console.log("Save Setting")

        var caidattest = {
            idnguoidung: sessionStore.activeUserId,
            loaitien: this.state.currencyCurrent,
            chedo: this.state.appThemeCurrent,
            ngonngu: this.state.languageCurrent,
            chedonghiemngat: (this.state.strictModeCurrent == 'Enable') ? true : false,
        }

        // console.log(await saveSetting(caidattest))
    }

    async componentDidMount() {
        let obj = await fetchSetting()
        //let obj = JSON.parse(res)
        if (!obj) return
        this.setState({
            appThemeCurrent: obj.chedo,
            currencyCurrent: obj.loaitien,
            languageCurrent: obj.ngonngu,
            strictModeCurrent: (obj.chedonghiemngat === true) ? "Enable" : "Disable"
        })
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
                    onPress={async () => {
                        const data = {
                            idnguoidung: sessionStore.activeUserId,
                            loaitien: this.state.currencyCurrent,
                            ngonngu: this.state.languageCurrent,
                            chedonghiemngat: (this.state.strictModeCurrent === "Enable") ? true : false,
                            chedo: this.state.appThemeCurrent,
                        }
                        let res = await saveSetting(data)
                        if (res.result === true) this.setState({ snackbarMessage: "Your settings have been saved" })
                        else this.setState({ snackbarMessage: "Failed to save your settings" })

                        this.setState({ snackbarMessageVisible: true })
                    }}
                />

                <Snackbar
                    visible={this.state.snackbarMessageVisible}
                    onDismiss={() => { this.setState({ snackbarMessageVisible: false }) }}>
                    {this.state.snackbarMessage}
                </Snackbar>

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