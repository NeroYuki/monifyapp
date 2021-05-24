import React, { Component } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Button, Modal } from "react-native-paper";
import { COLORS } from "../../assets/constants";
import { TabSwitcher, TransactionEditor, WalletHeader } from "../../components";
import { ChartOverview } from "../../components/OverviewScreen/ChartOverview";
import { ItemsOverView } from "../../components/OverviewScreen/ItemsOverview";

export class OverviewScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            categoriesVisible: false,
            periodVisible: false,
        }

        this.onCategoriesPress = this.onCategoriesPress.bind(this)
        this.onTimeTextPress = this.onTimeTextPress.bind(this)
        this.onListPress = this.onListPress.bind(this)
        this.onPressTransactionEditor = this.onPressTransactionEditor.bind(this)
    }

    onCategoriesPress() {
        this.setState({ categoriesVisible: true })
    }

    onListPress() {
        this.setState({ categoriesVisible: false })
    }

    onTimeTextPress() {
        this.setState({ periodVisible: !this.state.periodVisible })
    }

    onPressTransactionEditor() {
        this.setState({ visible: !this.state.visible })
    }


    reportView = () => {
        return (
            (!this.state.categoriesVisible) ?
                <ItemsOverView onPressTransactionEditor={this.onPressTransactionEditor} />
                :
                <ChartOverview />
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>

                        <WalletHeader
                            currentTab={this.state.categoriesVisible}
                            onCategoriesPress={this.onCategoriesPress}
                            onListPress={this.onListPress}
                        />

                        <SafeAreaView style={{ flex: 1 }}>
                            <TabSwitcher text="May 2021" onTimeTextPress={this.onTimeTextPress}></TabSwitcher>

                            <this.reportView />


                            {/* <Button onPress={() => { this.setState({ visible: true }) }}>Click me</Button>
                    <Button onPress={() => { this.setState({ categoriesVisible: !this.state.categoriesModal }) }}>Click me 2</Button>

                    <Modal visible={this.state.visible} onDismiss={() => { this.setState({ visible: false }) }} contentContainerStyle={containerStyle} style={style}>
                        <TransactionEditor></TransactionEditor>
                    </Modal>

                    <TimespanPicker isVisible={this.state.periodVisible} onRequestClose={() => { this.setState({ periodVisible: false }) }}></TimespanPicker>

                    <CategoriesModal isVisible={this.state.categoriesVisible} onRequestClose={() => { this.setState({ categoriesVisible: false }) }}></CategoriesModal> */}
                        </SafeAreaView>
                    </View>


                </ScrollView>
                <Modal
                    visible={this.state.visible}
                    onDismiss={() => { this.setState({ visible: false }) }}
                    contentContainerStyle={styles.containerStyle}
                    style={styles.modalStyle}
                >

                    <TransactionEditor />

                </Modal>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        height: "70%",
        width: "90%",
        backgroundColor: 'white',
    },
    modalStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})