import React, { Component } from "react";
import { stylesheet } from './style'
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Modal, SafeAreaView, Alert } from "react-native";
import { Divider } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { GenericSelectionModal } from '../..'
import { COLORS } from "../../../assets/constants";
import { querywallet } from "../../../logic/Screen-wallet";
import { createWalletTransfer } from "../../../logic/Screen-payment";

export class WalletTransferModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            walletOption: [],
            walletSelectedId: "",
            isWalletSelectionVisible: false,
            amount: "0",
            note: "",
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

        this.setState({
            walletOption: wallet_selection
        })   
        
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

    onHandleTransfer() {
        if (!this.props.srcId || this.state.walletSelectedId === this.props.srcId) {
            Alert.alert("Invalid wallet selection")
            return
        }
        createWalletTransfer({
            from_wallet_id: this.props.srcId,
            for_wallet_id: this.state.walletSelectedId,
            amount: parseFloat(this.state.amount) || 0,
            note: this.state.note
        })
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

                            <Text style={styles.textHeader}>TRANSFER BALANCE</Text>
                        </View>

                        <View style={styles.moneyTitle}>
                            <TextInput
                                style={{
                                    height: '100%',
                                    fontSize: 40,
                                    fontWeight: '300'
                                }}
                                keyboardType='number-pad'
                                defaultValue={this.state.amount}
                                placeholder='0'
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
                                    defaultValue={""}
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
                                >{(this.props.srcId)? this.getWalletText(this.props.srcId) : ""}</Text>
                            </View>
                            <Divider style={{ height: 1 }} />
                            <View style={styles.info_field_item}>
                                <Icon name="cash" size={24} />
                                <Text
                                    style={[styles.info_field_item_text, {color: COLORS.gray}]}
                                >{(this.props.srcId)? this.getWalletAmount(this.props.srcId) - (parseFloat(this.state.amount) || 0) : 0}</Text>
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
                            <TouchableOpacity onPress={this.onHandleTransfer} style={{ flex: 1, justifyContent: 'center', marginRight: 16, marginLeft: 16 }}>
                                <View style={styles.button} >
                                    <Text style={{ fontSize: 17, color: COLORS.white }}> TRANSFER </Text>
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