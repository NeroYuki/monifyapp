import React, { Component } from "react";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import { Modal as PModal, Portal } from 'react-native-paper';
import { TransactionEditor } from '../TransactionEditor'
import { DescriptiveButton } from "..";
import { stylesheet } from './style';
import { TransactionModal } from "../TransactionEditor/TransactionModal";

export class CreateModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: this.props.isVisible,
            transactionEditorVisible: false,
        }
    }

    render() {
        const style = stylesheet
        const defaultData = {
            money: 0,
            describe: "",
            key: "",
        }
        //console.log('createModal: re-render')
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onRequestClose}
            >
                <Portal.Host>
                    <View style={style.overlay}>
                        <Portal>
                            <TransactionModal
                                isVisible={this.state.transactionEditorVisible}
                                onRequestClose={() => this.setState({ transactionEditorVisible: false })}
                                currentData={defaultData}
                                // onCategoriesPress={this.onCategoriesPress}
                                // onRecurringPress={this.onRecurringPress}
                            />
                        </Portal>
                        <View style={{ backgroundColor: "#00000070", height: "70%" }}></View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.props.isVisible}
                            onRequestClose={this.props.onRequestClose}
                        >
                            <View style={style.main_view}>
                                <Text style={style.main_view_header}>Create...</Text>
                                <View style={style.main_view_tab}>
                                    <DescriptiveButton title="Transaction" icon="cash-refund" desc="Add a new transaction" style={style.main_view_button_container}
                                        onPress={() => this.setState({ transactionEditorVisible: true })}></DescriptiveButton>
                                    <DescriptiveButton title="Budget" icon="wallet" desc="Add a new budget" style={style.main_view_button_container}></DescriptiveButton>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </Portal.Host>
            </Modal>
        )
    }
}