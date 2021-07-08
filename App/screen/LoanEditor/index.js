import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { stylesheet } from './style'
import { ColorPickerModal, GenericInputModal, GenericSelectionModal, GenericSettingField } from '../../components'
import { FAB, Snackbar } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { querywallet } from "../../logic/Screen-wallet";
import { fetchLoan, saveLoan } from "../../logic/Screen-loan";
import moment from 'moment'

export class LoanEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            color: '#ffffff',
            amount: '0',
            duration: new Date(),
            interest: "0",
            creation_date: new Date(),
            applied_wallet_values: [], //{key: id, text: name}
            applied_wallet: '', //id

            nameInputVisible: false,
            durationPickerVisible: false,
            amountInputVisible: false,
            interestInputVisible: false,
            colorPickerVisible: false,
            walletSelectionVisible: false,

            snackbarMessage: "",
            snackbarMessageVisible: false,
        }
    }

    async componentDidMount() {
        const id = this.props.route.params.id
        let wallet_selection = []
        let wallet_query_result = await querywallet({})
        wallet_query_result.forEach((val) => {
            wallet_selection.push({
                key: val.walletId,
                text: val.name,
            })
        })

        if (id) {
            //console.log(this.state)
            let data = await fetchLoan(id)
            //console.log('UI', data)
            if (!data) return
            this.setState({
                name: data.name,
                color: data.color,
                amount: data.amount,
                duration: moment(JSON.stringify(data.expire_on), "YYYY-MM-DDTHH:mm:ss.SSSZ").toDate(),
                interest: data.interest,
                applied_wallet_values: wallet_selection,
                creation_date: moment(JSON.stringify(data.creationDate), "YYYY-MM-DDTHH:mm:ss.SSSZ").toDate()
            })
            //console.log(this.state)
        }
        else {
            this.setState({
                applied_wallet_values: wallet_selection
            })
        }
    }

    getWalletText(id) {
        if (!id) return
        //Fucking String object, not string primitive was returned. Fuck whoever code the fetching function
        
        id = id.toString()
        let appliedWalletIndex = this.state.applied_wallet_values.findIndex((val) => {return val.key === id})
        return (appliedWalletIndex !== -1)? this.state.applied_wallet_values[appliedWalletIndex].text : ""
    }


    render() {
        const style = stylesheet
        const id = this.props.route.params.id
        const mode = this.props.route.params.mode
        return (
            <View style={style.container}>
                <ScrollView>
                    <GenericSettingField
                        style={style.setting_entry}
                        title="Loan Name"
                        value={this.state.name}
                        description="Change name of the loan " 
                        onPress={(mode === "edit") ? () => {this.setState({nameInputVisible: true})} : null}/>

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Loan Color"
                        color={this.state.color}
                        value={this.state.color}
                        description="Pick a color to represent the loan" 
                        onPress={(mode === "edit") ? () => {this.setState({colorPickerVisible: true})} : null}/>  

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Loan Value"
                        value={this.state.amount}
                        description="The current value of the loan, can only be changed by transactions, or on creation" 
                        onPress={(mode === "edit") ? (id)? null : () => {this.setState({amountInputVisible: true})} : null}/>
                    
                    <GenericSettingField
                        style={style.setting_entry}
                        title="Due Date"
                        value={this.state.duration.toDateString()}
                        description="Indicate time the loan is due to payment" 
                        onPress={(mode === "edit") ? () => {this.setState({durationPickerVisible: true})} : null}
                    />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Interest Rate"
                        value={this.state.interest + " %"}
                        description="The interest rate of loan, change to this only apply from the next interest cycle" 
                        onPress={(mode === "edit") ? () => {this.setState({interestInputVisible: true})} : null}
                    />

                    {(!id) && <GenericSettingField
                        style={style.setting_entry}
                        title="Receiving Wallet"
                        value={this.getWalletText(this.state.applied_wallet)}
                        description="The wallet that will immediately receive the loaned fund after loan creation" 
                        onPress={(mode === "edit") ? () => {this.setState({walletSelectionVisible: true})} : null}
                    />
                    }

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Creation Date"
                        value={this.state.creation_date.toDateString()}
                        description="Creation date of the loan, cannot be changed" 
                    />
                </ScrollView>

                {(mode === "edit") && <FAB style={style.fab}
                    big
                    icon="content-save"
                    onPress={async () => {
                        const id = this.props.route.params.id
                        let saved_data = {
                            loanId: (id)? id : undefined,
                            loanName: this.state.name,
                            color: this.state.color,
                            amount: parseFloat(this.state.amount) || 0,
                            expire_on: this.state.duration,
                            interest: parseFloat(this.state.interest) || 0,
                            creationDate: this.state.creation_date,
                            applied_wallet_id: this.state.applied_wallet,
                            // early_interest: "0",
                            
                        }
                        //console.log(saved_data)
                        let data_result = await saveLoan(saved_data)
                        //console.log(data_result)
                        if (data_result) this.setState({snackbarMessage: "Your loan info have been saved"})
                        else this.setState({snackbarMessage: "Failed to save your loan info"})

                        this.setState({snackbarMessageVisible: true})
                    }}
                />}

                <Snackbar
                    visible={this.state.snackbarMessageVisible}
                    onDismiss={() => {this.setState({snackbarMessageVisible: false})}}>
                    {this.state.snackbarMessage}
                </Snackbar>

                <GenericInputModal
                    initialValue={this.state.name}
                    isVisible={this.state.nameInputVisible}
                    onRequestClose={() => {this.setState({nameInputVisible: false})}}
                    onSubmit={(val) => {this.setState({nameInputVisible: false, name: val})}}
                />

                <GenericInputModal
                    initialValue={this.state.interest}
                    isVisible={this.state.interestInputVisible}
                    onRequestClose={() => {this.setState({interestInputVisible: false})}}
                    onSubmit={(val) => {this.setState({interestInputVisible: false, interest: val})}}
                    inputType='numeric'
                    affixText="%"
                />

                <GenericInputModal
                    initialValue={this.state.amount}
                    isVisible={this.state.amountInputVisible}
                    onRequestClose={() => {this.setState({amountInputVisible: false})}}
                    onSubmit={(val) => {this.setState({amountInputVisible: false, amount: val})}}
                    inputType='numeric'
                />

                <ColorPickerModal
                    initialValue={this.state.color}
                    isVisible={this.state.colorPickerVisible}
                    onRequestClose={() => {this.setState({colorPickerVisible: false})}}
                    onSubmit={(val) => {this.setState({colorPickerVisible: false, color: val})}}
                />

                {this.state.durationPickerVisible && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.duration}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={(e, val) => {
                            const currentDate = val || this.state.duration;
                            this.setState({duration: currentDate})
                            this.setState({durationPickerVisible: Platform.OS === 'ios'});
                        }}
                    />
                )}

                <GenericSelectionModal
                    keyMode={true}
                    isVisible={this.state.walletSelectionVisible}
                    onRequestClose={() => { this.setState({ walletSelectionVisible: false }) }}
                    selectionEntry={this.state.applied_wallet_values}
                    onSelection={(val) => {
                        this.setState({
                            walletSelectionVisible: false,
                            applied_wallet: val,
                        })
                    }} />

            </View>
        )
    }
}