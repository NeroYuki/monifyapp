import React, { Component } from "react";
import { View } from "react-native";
import { Button, Modal } from "react-native-paper";

import { TestText, WalletHeader, TransactionEditor, TabSwitcher } from '../components'
import GlobalStyle from '../styles/GlobalStyle'

export class TestScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    render() {
        const containerStyle = {
            padding: 10, 
            height: "90%", 
            width: "90%", 
            backgroundColor: 'white', 
            
        };

        const style = {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            elevation: 20,
        };

        return (
            <View style={GlobalStyle.header}>
                <View>
                    <WalletHeader></WalletHeader>
                </View>
                <View style={{flex: 1}}>
                    <TestText></TestText>
                    <TabSwitcher></TabSwitcher>
                    <Button onPress={() => {this.setState({visible: true})}}>Click me</Button>
                    <Modal visible={this.state.visible} onDismiss={() => {this.setState({visible: false})}} contentContainerStyle={containerStyle} style={style}>
                        <TransactionEditor></TransactionEditor>
                    </Modal>
                </View>
                
            </View>
        )
    }
}