import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { stylesheet } from './style'
import { ColorPickerModal, GenericInputModal, GenericSettingField } from '../../components'
import { FAB, Snackbar } from "react-native-paper";
import { fetchWallet, saveWallet } from "../../logic/Screen-wallet";
import moment from "moment";

export class WalletEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            amount: "0",
            color: '#ffffff',
            creation_date: new Date(),

            nameInputVisible: false,
            colorPickerVisible: false,
            snackbarMessage: "",
            snackbarMessageVisible: false
        }
    }

    async componentDidMount() {
        const id = this.props.route.params.id
        if (id) {
            let data = await fetchWallet(id)
            if (!data) return
            this.setState({
                name: data.name,
                amount: data.amount,
                color: data.color,
                creation_date: moment(JSON.stringify(data.creationDate), "YYYY-MM-DDTHH:mm:ss.SSSZ").toDate()
            })
            console.log(this.state)
        }
    }

    render() {
        const style = stylesheet
        const mode = this.props.route.params.mode
        return (
            <View style={style.container}>
                <ScrollView>
                    <GenericSettingField
                        style={style.setting_entry}
                        title="Wallet Name"
                        value={this.state.name}
                        testTouchaID="WalletName"
                        description="Change name of the wallet"
                        onPress={(mode === "edit") ? () => { this.setState({ nameInputVisible: true }) } : null} />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Wallet Color"
                        color={this.state.color}
                        value={this.state.color}
                        description="Pick a color to represent the wallet"
                        onPress={(mode === "edit") ? () => { this.setState({ colorPickerVisible: true }) } : null} />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Wallet Amount"
                        value={this.state.amount}
                        description="The current amount of the wallet, can only be changed by transactions" />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Creation Date"
                        value={this.state.creation_date.toDateString()}
                        description="Creation date of the saving fund, cannot be changed"
                    />
                </ScrollView>

                {mode === "edit" && <FAB style={style.fab}
                    big
                    testID="SaveWallet"
                    icon="content-save"
                    onPress={async () => {
                        const id = this.props.route.params.id

                        let saved_data = {
                            walletId: (id) ? id : undefined,
                            walletName: this.state.name,
                            color: this.state.color,
                            amount: parseFloat(this.state.amount)
                        }

                        let data_result = await saveWallet(saved_data)
                        console.log(data_result)

                        if (data_result) this.setState({ snackbarMessage: "Your wallet info have been saved" })
                        else this.setState({ snackbarMessage: "Failed to save your wallet info" })

                        this.setState({ snackbarMessageVisible: true })
                    }}
                />}

                <Snackbar
                    visible={this.state.snackbarMessageVisible}
                    onDismiss={() => { this.setState({ snackbarMessageVisible: false }) }}>
                    {this.state.snackbarMessage}
                </Snackbar>

                <GenericInputModal
                    initialValue={this.state.name}
                    isVisible={this.state.nameInputVisible}
                    onRequestClose={() => { this.setState({ nameInputVisible: false }) }}
                    onSubmit={(val) => { this.setState({ nameInputVisible: false, name: val }) }}
                />

                <ColorPickerModal
                    initialValue={this.state.color}
                    isVisible={this.state.colorPickerVisible}
                    onRequestClose={() => { this.setState({ colorPickerVisible: false }) }}
                    onSubmit={(val) => { this.setState({ colorPickerVisible: false, color: val }) }}
                />

            </View>
        )
    }
}