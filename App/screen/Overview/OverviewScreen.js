import React, { Component } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Button, Modal } from "react-native-paper";
import { COLORS } from "../../assets/constants";
import { CategoriesModal, TabSwitcher, TimespanPicker, TransactionEditor, WalletHeader } from "../../components";
import { ChartOverview } from "../../components/OverviewScreen/ChartOverview";
import { ItemsOverView } from "../../components/OverviewScreen/ItemsOverview";
import { RecurringModal } from "../../components/TransactionEditor/RecurringModal";

export class OverviewScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            categoriesVisible: false,
            recurringVisible: false,
            chartView: false,
            periodVisible: false,

            // Tap on item report then set data on this
            currentData: {

            }
        }

        this.onCategoriesPress = this.onCategoriesPress.bind(this)
        this.onListPress = this.onListPress.bind(this)
        this.onChartCategoriesPress = this.onChartCategoriesPress.bind(this)
        this.onRecurringPress = this.onRecurringPress.bind(this)
        this.onHideRecurring = this.onHideRecurring.bind(this)
        this.onPressTransactionEditor = this.onPressTransactionEditor.bind(this)
        this.onTimeTextPress = this.onTimeTextPress.bind(this)
    }

    onCategoriesPress() {
        this.setState({ categoriesVisible: true })
    }

    onChartCategoriesPress() {
        this.setState({ chartView: true })
    }

    onListPress() {
        this.setState({ chartView: false })
    }

    onHideRecurring() {
        this.setState({ recurringVisible: false })
    }

    onPressTransactionEditor(val) {
        console.log(val)
        this.setState({
            currentData: val,
            visible: !this.state.visible,
        })
    }

    onRecurringPress() {
        this.setState({ recurringVisible: !this.state.recurringVisible })
    }

    onTimeTextPress() {
        this.setState({ periodVisible: !this.state.periodVisible })
    }

    reportView = () => {
        return (
            (!this.state.chartView) ?
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
                            currentTab={this.state.chartView}
                            onCategoriesPress={this.onChartCategoriesPress}
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

                    <TransactionEditor
                        currentData={this.state.currentData}
                        onCategoriesPress={this.onCategoriesPress}
                        onRecurringPress={this.onRecurringPress}
                        onRequestClose={this.onPressTransactionEditor}
                    />

                </Modal>

                <CategoriesModal
                    isVisible={this.state.categoriesVisible}
                    onRequestClose={() => { this.setState({ categoriesVisible: false }) }}
                />

                <RecurringModal
                    isVisible={this.state.recurringVisible}
                    closePeriod={() => {
                        this.setState({ recurringVisible: false })
                    }}
                />

                <TimespanPicker
                    isVisible={this.state.periodVisible}
                    onRequestClose={() => {
                        this.setState({ periodVisible: false })
                    }}
                />
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        height: "70%",
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 20,
    },
    modalStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})