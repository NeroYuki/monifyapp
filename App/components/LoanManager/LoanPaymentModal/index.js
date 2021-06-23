import React, { Component } from "react";
import { stylesheet } from './style'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Modal, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Divider } from 'react-native-paper'
import { GenericSelectionModal } from "../..";
import { COLORS } from "../../../assets/constants";
import { querywallet } from "../../../logic/Screen-wallet";

export class LoanPaymentModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            walletOption: ['Cash Money', 'Secret Fund'],
            isWalletSelectionVisible: false,
            walletSelectedId: "",
        }
        this.getWalletText = this.getWalletText.bind(this)
    }

    async componentDidMount() {
        let wallet_selection = []
        let wallet_query_result = await querywallet({})
        wallet_query_result.forEach((val) => {
            wallet_selection.push({
                key: val.walletId,
                text: val.name,
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

                            <Text style={styles.textHeader}>LOAN PAYMENT</Text>
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
                                onChangeText={text => console.log(text)}
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
                                    onChangeText={text => console.log(text)}
                                />
                            </View>
                            <Divider style={{ height: 1 }} />
                            <View style={styles.info_field_item}>
                                <Icon name="arrow-right" size={24} />
                                <Text
                                    style={[styles.info_field_item_text, {color: COLORS.gray}]}
                                >Credit Debt</Text>
                            </View>
                            <Divider style={{ height: 1 }} />
                            <View style={styles.info_field_item}>
                                <Icon name="cash" size={24} />
                                <Text
                                    style={[styles.info_field_item_text, {color: COLORS.gray}]}
                                >1.400.000</Text>
                            </View>
                            <Divider style={{ height: 1 }} />
                            <TouchableOpacity onPress={() => {this.setState({isWalletSelectionVisible: true})}}>
                                <View style={styles.info_field_item}>
                                    <Icon name="arrow-left" size={24} />
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
                                >500.000</Text>
                            </View>
                            <Divider style={{ height: 1 }} />
                        </View>
                        <View style={{ height: 64, marginBottom: 16, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', marginRight: 16, marginLeft: 16 }}>
                                <View style={styles.button}>
                                    <Text style={{ fontSize: 17, color: COLORS.white }}> CONFIRM PAYMENT </Text>
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