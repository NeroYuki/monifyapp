import React, { Component } from "react";
import { View } from "react-native";
import { Button, Modal } from "react-native-paper";

import { TestText, WalletHeader, TransactionEditor, TabSwitcher, CategoriesModal, TimespanPicker} from '../components'
import GlobalStyle from '../styles/GlobalStyle'

export class TestScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            categoriesVisible: false,
            periodVisible: false,
        }

        this.onCategoriesPress = this.onCategoriesPress.bind(this)
        this.onTimeTextPress = this.onTimeTextPress.bind(this)
    }

    onCategoriesPress() {
        this.setState({categoriesVisible: !this.state.CategoriesModal})
    }

    onTimeTextPress() {
        this.setState({periodVisible: !this.state.periodVisible})
    }

    render() {
        //console.log(this.state)
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
                    <TabSwitcher text="May 2021" onTimeTextPress={this.onTimeTextPress}></TabSwitcher>
                    <Button onPress={() => {this.setState({visible: true})}}>Click me</Button>
                    <Button onPress={() => {this.setState({categoriesVisible: !this.state.categoriesModal})}}>Click me 2</Button>
                    
                    <Modal visible={this.state.visible} onDismiss={() => {this.setState({visible: false})}} contentContainerStyle={containerStyle} style={style}>
                        <TransactionEditor></TransactionEditor>
                    </Modal>

                    <TimespanPicker isVisible={this.state.periodVisible} onRequestClose={() => {this.setState({periodVisible: false})}}></TimespanPicker>

                    <CategoriesModal isVisible={this.state.categoriesVisible} onRequestClose={() => {this.setState({categoriesVisible: false})}}></CategoriesModal>
                </View>
                
            </View>
        )
    }
}