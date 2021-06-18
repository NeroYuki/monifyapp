import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { FAB, Searchbar, Dialog, Paragraph, Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RecurringBillEntry, RecurringBillSearchModal } from "../../components";
import { queryBill } from "../../logic/Screen-RecurringBillManager";
import { stylesheet } from './style'

export class RecurringBillManager extends Component {
    constructor(props) {
        super(props)

        this.state = {
            billList: [
                {
                    id: '1',
                    name: 'Netflix Subscription',
                    next_tran: '12 days',
                    amount: '202.000 đ',
                    desc: 'Monthly subscription for Netflix',
                    color: '#ffdddd'
                },
                {
                    id: '2',
                    name: 'Electricity Bill',
                    next_tran: '8 days',
                    amount: '0 đ',
                    desc: 'Monthly electricity bill',
                    color: '#ddffdd',
                },
            ],
            advanceSearchVisible: false,
            deletePromptVisible: false,
        }

        
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        let data = await queryBill({})
        console.log(data)
        //if (data.length === 0) console.error("error")
        this.setState({
            billList: data
        })
    }

    render() {
        const style = stylesheet
        const billDisplay = this.state.billList.map((val) => {
            return <RecurringBillEntry
                key={val.id} style={[style.bill_entry, {backgroundColor: val.color}]} name={val.name} next_tran={val.next_tran} amount={val.amount} desc={val.desc}
                onViewPress={() => {this.props.navigation.navigate("RecurringBillEditor", {mode: "view", id: val.id})}}
                onDeletePress={() => {this.setState({deletePromptVisible: true})}}
                onEditPress={() => {this.props.navigation.navigate("RecurringBillEditor", {mode: "edit", id: val.id})}}
            ></RecurringBillEntry>
        })

        return (
            <View style={style.container}>
                <View style={style.search_bar}>
                    <Searchbar style={{ flex: 1 }}></Searchbar>
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
                    onRequestClose={() => { this.setState({ advanceSearchVisible: false }) }}
                    onFilterRequest={(data) => { console.log(data); }}>
                </RecurringBillSearchModal>

                <Dialog visible={this.state.deletePromptVisible} onDismiss={() => { this.setState({ deletePromptVisible: false }) }}>
                    <Dialog.Title>Confirm</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Are you sure you want to delete this recurring bill? This action is irreversible</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => { this.setState({ deletePromptVisible: false }) }}>Cancel</Button>
                        <Button mode='contained' onPress={() => { this.setState({ deletePromptVisible: false }) }}>Confirm</Button>
                    </Dialog.Actions>
                </Dialog>
            </View>
        )
    }
}