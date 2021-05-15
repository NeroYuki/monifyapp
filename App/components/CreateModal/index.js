import React, { Component } from "react";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import { Modal as PModal} from 'react-native-paper';
import { TransactionEditor } from '../TransactionEditor'
import { DescriptiveButton } from "..";
import { stylesheet } from './style';

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
        //console.log('show')
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onRequestClose}
            >
                <View style={style.overlay}>
                    <View style={{color: "#00000070", height: "70%"}}></View>
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
                                    onPress={() => this.setState({transactionEditorVisible: true})}></DescriptiveButton>
                                <DescriptiveButton title="Budget" icon="wallet" desc="Add a new budget" style={style.main_view_button_container}></DescriptiveButton>
                            </View>
                            
                        </View>
                    </Modal>
                </View>
                <PModal visible={this.state.transactionEditorVisible} onDismiss={() => {this.setState({transactionEditorVisible: false})}} onRequestClose={() => {this.setState({transactionEditorVisible: false})}}
                    contentContainerStyle={style.transaction_container} style={style.transaction}>
                    <TransactionEditor></TransactionEditor>
                </PModal>
            </Modal>
        )
    }
}