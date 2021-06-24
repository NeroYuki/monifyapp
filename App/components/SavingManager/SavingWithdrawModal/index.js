import React, { Component } from "react";
import { stylesheet } from './style'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Modal, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Divider } from 'react-native-paper'
import { GenericSelectionModal } from "../..";
import { COLORS } from "../../../assets/constants";
import { querywallet } from "../../../logic/Screen-wallet";
import { createSavingWithdraw } from "../../../logic/Screen-payment";
import { fetchSaving } from "../../../logic/Screen-saving";

export class SavingWithdrawModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            walletOption: [],
            isWalletSelectionVisible: false,
            walletSelectedId: "",
            amount: "0",
            note: "",
            savingName: "",
            savingAmount: "0"
        }
        this.getWalletText = this.getWalletText.bind(this)
        this.getWalletAmount = this.getWalletAmount.bind(this)
        this.onHandleTransfer = this.onHandleTransfer.bind(this)
    }

    async componentDidMount() {
        let wallet_selection = []
        let wallet_query_result = await querywallet({})
        wallet_query_result.forEach((val) => {
            wallet_selection.push({
                key: val.walletId,
                text: val.name,
                amount: parseFloat(val.amount) || 0
            })
        })

        console.log(this.props.srcId)
        

        this.setState({
            walletOption: wallet_selection
        })   
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isVisible && !prevProps.isVisible && this.props.srcId) {
            let saving_result = await fetchSaving(this.props.srcId)
            console.log(saving_result)
            this.setState({
                savingAmount: saving_result.amount,
                savingName: saving_result.name
            })

        }
    }

    getWalletText(id) {
        if (!id) return
        //Fucking String object, not string primitive was returned. Fuck whoever code the fetching function
        id = id.toString()
        let appliedWalletIndex = this.state.walletOption.findIndex((val) => {return val.key === id})
        return (appliedWalletIndex !== -1)? this.state.walletOption[appliedWalletIndex].text : ""
    }

    getWalletAmount(id) {
        if (!id) return 0
        //Fucking String object, not string primitive was returned. Fuck whoever code the fetching function
        id = id.toString()
        let appliedWalletIndex = this.state.walletOption.findIndex((val) => {return val.key === id})
        return (appliedWalletIndex !== -1)? this.state.walletOption[appliedWalletIndex].amount : 0
    }

    async onHandleTransfer() {
        if (!this.props.srcId || this.state.walletSelectedId === this.props.srcId) {
            Alert.alert("Invalid wallet selection")
            return
        }
        // createWalletTransfer({
        //     from_wallet_id: this.props.srcId,
        //     for_wallet_id: this.state.walletSelectedId,
        //     amount: parseFloat(this.state.amount) || 0,
        //     note: this.state.note
        // })
        let res = await createSavingWithdraw({
            for_wallet_id: this.state.walletSelectedId,
            from_saving_id: this.props.srcId,
            amount: parseFloat(this.state.amount) || 0,
            note: this.state.note,
        }).catch(err => {
            console.log(err)
        })
        console.log(res)
    }

    render() {
        const styles = stylesheet
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onRequestClose}
            >
                <View style={styles.background}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={this.props.onRequestClose}>
                                <Icon name='close' size={24} />
                            </TouchableOpacity>

                            <Text style={styles.textHeader}>SAVING WITHDRAW</Text>
                        </View>
                        <View style={styles.moneyTitle}>
                            <TextInput
                                style={{
                                    height: '100%',
                                    fontSize: 40,
                                    fontWeight: '300'
                                }}
                                defaultValue={0}
                                placeholder='0'
                                keyboardType="number-pad"
                                onChangeText={text => {
                                    this.setState({
                                        amount: text
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.info_field}>
                            <View style={styles.info_field_item}>
                                <Icon name="notebook" size={24} />
                                <TextInput
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        fontSize: 17,
                                        marginLeft: 16,
                                    }}
                                    defaultValue=""
                                    placeholder="Note"
                                    onChangeText={text => {
                                        this.setState({
                                            note: text
                                        })
                                    }}
                                />
                            </View>
                            <Divider style={{ height: 1 }} />
                            <View style={styles.info_field_item}>
                                <Icon name="arrow-left" size={24} />
                                <Text
                                    style={[styles.info_field_item_text, {color: COLORS.gray}]}
                                >{this.state.savingName}</Text>
                            </View>
                            <Divider style={{ height: 1 }} />
                            <View style={styles.info_field_item}>
                                <Icon name="cash" size={24} />
                                <Text
                                    style={[styles.info_field_item_text, {color: COLORS.gray}]}
                                >{(parseFloat(this.state.savingAmount) || 0) - (parseFloat(this.state.amount) || 0)}</Text>
                            </View>
                            <Divider style={{ height: 1 }} />
                            <TouchableOpacity onPress={() => {this.setState({isWalletSelectionVisible: true})}}>
                                <View style={styles.info_field_item}>
                                    <Icon name="arrow-right" size={24} />
                                    <Text
                                        style={styles.info_field_item_text}
                                    >{this.getWalletText(this.state.walletSelectedId)}</Text>
                                </View>
                            </TouchableOpacity>
                            <Divider style={{ height: 1 }} />
                            <View style={styles.info_field_item}>
                                <Icon name="cash" size={24} />
                                <Text
                                    style={[styles.info_field_item_text, {color: COLORS.gray}]}
                                >{(this.state.walletSelectedId)? this.getWalletAmount(this.state.walletSelectedId) + (parseFloat(this.state.amount) || 0) : 0}</Text>
                            </View>
                            <Divider style={{ height: 1 }} />
                        </View>
                        <View style={{ height: 64, marginBottom: 16, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', marginRight: 16, marginLeft: 16 }} onPress={this.onHandleTransfer}>
                                <View style={styles.button}>
                                    <Text style={{ fontSize: 17, color: COLORS.white }}> WITHDRAW </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.state.isWalletSelectionVisible && <GenericSelectionModal
                        keyMode={true}
                        isVisible={this.state.walletSelectionVisible}
                        onRequestClose={() => { this.setState({ isWalletSelectionVisible: false }) }}
                        selectionEntry={this.state.walletOption}
                        onSelection={(val) => {
                            console.log(val)
                            this.setState({
                                isWalletSelectionVisible: false,
                                walletSelectedId: val,
                            })
                        }}> </GenericSelectionModal>
                    }
                </View>
            </Modal>
        )
    }
}