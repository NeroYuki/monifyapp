import React, { Component } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, Modal } from "react-native-paper";

import { TestText, WalletHeader, TransactionEditor, TabSwitcher, CategoriesModal, TimespanPicker } from '../components'
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
        this.setState({ categoriesVisible: !this.state.CategoriesModal })
    }

    onTimeTextPress() {
        this.setState({ periodVisible: !this.state.periodVisible })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <WalletHeader />
                        <View style={{ flex: 1 }}>
                            <TabSwitcher text="May 2021" onTimeTextPress={this.onTimeTextPress}></TabSwitcher>

                            {/* <Button onPress={() => { this.setState({ visible: true }) }}>Click me</Button>
                    <Button onPress={() => { this.setState({ categoriesVisible: !this.state.categoriesModal }) }}>Click me 2</Button>

                    <Modal visible={this.state.visible} onDismiss={() => { this.setState({ visible: false }) }} contentContainerStyle={containerStyle} style={style}>
                        <TransactionEditor></TransactionEditor>
                    </Modal>

                    <TimespanPicker isVisible={this.state.periodVisible} onRequestClose={() => { this.setState({ periodVisible: false }) }}></TimespanPicker>

                    <CategoriesModal isVisible={this.state.categoriesVisible} onRequestClose={() => { this.setState({ categoriesVisible: false }) }}></CategoriesModal> */}
                        </View>
                    </View>
                </ScrollView>

            </SafeAreaView>
        )
    }
}