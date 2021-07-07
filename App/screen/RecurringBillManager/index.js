import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { FAB, Searchbar, Dialog, Paragraph, Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RecurringBillEntry, RecurringBillSearchModal } from "../../components";
import { deleteBill, pauseBill, queryBill, resumeBill } from "../../logic/Screen-RecurringBillManager";
import { stylesheet } from './style'
import moment from 'moment'
import { currencyFormat } from "../../utils/formatNumber";

export class RecurringBillManager extends Component {
    constructor(props) {
        super(props)

        this.state = {
            billList: [
            ],
            advanceSearchVisible: false,
            deletePromptVisible: false,
            selectedId: "",
            quickQueryString: "",
            unsubscribe: undefined,
        }

        this.handlePauseBill = this.handlePauseBill.bind(this)
        this.handleResumeBill = this.handleResumeBill.bind(this)
    }

    componentDidMount() {
        this.fetchData()
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            //console.log('focus')
            this.fetchData()
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        this.setState({unsubscribe: unsubscribe})
    }

    componentWillUnmount() {
        if (this.state.unsubscribe) {
            this.state.unsubscribe()
        }
    }

    async fetchData() {
        let data = await queryBill({billName: this.state.quickQueryString})
        //console.log(data)
        this.setState({
            billList: data
        })
        console.log(data)
    }

    async queryData(input) {
        let data = await queryBill({billName: input.name_input, minAmount: input.min_amount, maxAmount: input.max_amount})
        this.setState({
            billList: data
        })
    }

    async handlePauseBill(id) {
        console.log(id)
        let result = await pauseBill({billId: id})
        console.log(result)
        this.fetchData()
    }

    async handleResumeBill(id) {
        console.log(id)
        let result = await resumeBill({billId: id})
        console.log(result)
        this.fetchData()
    }

    render() {
        const style = stylesheet
        const billDisplay = this.state.billList.map((val) => {
            //TODO: calculate next transaction
            const id = new String(val.idgiaodichtheochuky).toString()
            //console.log(val.idgiaodichtheochuky)
            return <RecurringBillEntry
                key={id} style={[style.bill_entry, {backgroundColor: val.color}]} name={val.name + ((val.pause) ? " (Paused)" : "")} next_tran={moment(JSON.stringify(val.thoigianbatdau), "YYYY-MM-DDTHH:mm:ss.SSSZ").format("DD/MM/YYYY")} amount={(currencyFormat(parseFloat(val.sotientieudung || val.sotienthunhap)))} desc={val.ghichu}
                paused={val.pause}
                onPausePress={() => {this.handlePauseBill(id)}}
                onResumePress={() => {this.handleResumeBill(id)}}
                onViewPress={() => {this.props.navigation.navigate("RecurringBillEditor", {mode: "view", id: id})}}
                onDeletePress={() => {this.setState({deletePromptVisible: true, selectedId: id})}}
                onEditPress={() => {this.props.navigation.navigate("RecurringBillEditor", {mode: "edit", id: id})}}
            ></RecurringBillEntry>
        })

        return (
            <View style={style.container}>
                <View style={style.search_bar}>
                    <Searchbar style={{flex: 1}}
                    onChangeText={(e) => {
                        console.log(e)
                        this.setState({
                            quickQueryString: e
                        })
                        this.fetchData()
                    }}></Searchbar>
                    <TouchableOpacity style={{ backgroundColor: 'white', elevation: 5, borderRadius: 5, marginLeft: 2 }}
                        onPress={() => { this.setState({ advanceSearchVisible: true }) }}>
                        <Icon name="menu-down" size={40}></Icon>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {billDisplay}
                </ScrollView>
                <FAB style={style.fab}
                    big
                    icon="plus"
                    onPress={() => {this.props.navigation.navigate("RecurringBillEditor", {mode: "edit", id: ""})}}
                />
                <RecurringBillSearchModal isVisible={this.state.advanceSearchVisible}
                     onRequestClose={() => {this.setState({advanceSearchVisible: false})}} 
                     onFilterRequest={(data) => {
                         console.log(data); 
                         this.queryData(data)
                     }}>
                </RecurringBillSearchModal>

                <Dialog visible={this.state.deletePromptVisible} onDismiss={() => { this.setState({ deletePromptVisible: false }) }}>
                    <Dialog.Title>Confirm</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Are you sure you want to delete this recurring bill? This action is irreversible</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => { this.setState({ deletePromptVisible: false }) }}>Cancel</Button>
                        <Button mode='contained' onPress={async () => { 
                            if (this.state.selectedId) {
                                let result = await deleteBill({billId: this.state.selectedId})
                                if (result) {
                                    this.setState({selectedId: ""})
                                    this.fetchData()
                                }
                            }
                            this.setState({ deletePromptVisible: false }) 
                        }}>Confirm</Button>
                    </Dialog.Actions>
                </Dialog>
            </View>
        )
    }
}