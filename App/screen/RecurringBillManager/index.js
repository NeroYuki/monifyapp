import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Searchbar } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RecurringBillEntry, RecurringBillSearchModal } from "../../components";
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
                    amount: 'Custom',
                    desc: 'Monthly electricity bill',
                    color: '#ddffdd',
                },
            ],
            advanceSearchVisible: false,
        }
    }

    render() {
        const style = stylesheet
        const billDisplay = this.state.billList.map((val) => {
            return <RecurringBillEntry
                key={val.id} style={[style.bill_entry, {backgroundColor: val.color}]} name={val.name} next_tran={val.next_tran} amount={val.amount} desc={val.desc}
                onViewPress={() => {}}
                onDeletePress={() => {}}
                onEditPress={() => {}}
            ></RecurringBillEntry>
        })

        return (
            <View style={style.container}>
                <View style={style.search_bar}>
                    <Searchbar style={{flex: 1}}></Searchbar>
                    <TouchableOpacity style={{backgroundColor: 'white', elevation: 5, borderRadius: 5, marginLeft: 2}}
                        onPress={() => {this.setState({advanceSearchVisible: true})}}>
                        <Icon name="menu-down" size={40}></Icon>
                    </TouchableOpacity>
                </View>
                
                {billDisplay}
                <RecurringBillSearchModal isVisible={this.state.advanceSearchVisible} 
                    onRequestClose={() => {this.setState({advanceSearchVisible: false})}} 
                    onFilterRequest={(data) => {console.log(data); }}>
                </RecurringBillSearchModal>
            </View>
        )
    }
}