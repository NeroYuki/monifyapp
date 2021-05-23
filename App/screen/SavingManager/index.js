import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Searchbar } from "react-native-paper";
import { SavingEntry, SavingSearchModal } from "../../components";
import { stylesheet } from './style'

export class SavingManager extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            savingList: [
                {
                    id: '1',
                    name: 'BIDV Saving',
                    due_duratuion: '88 days',
                    amount: '2.200.000 đ',
                    interest_string: '2% / year',
                    color: '#ffdddd'
                },
                {
                    id: '2',
                    name: 'Piggybank',
                    due_duratuion: 'Never',
                    interest_string: 'None',
                    amount: '3.400.000 đ',
                    color: '#ddffdd',
                },
            ],
            advanceSearchVisible: false,
        }
    }

    render() {
        const style = stylesheet
        const savingDisplay = this.state.savingList.map((val) => {
            return <SavingEntry
                key={val.id} style={[style.saving_entry, {backgroundColor: val.color}]} name={val.name} due_duration={val.due_duratuion} amount={val.amount} interest_string={val.interest_string}
                onViewPress={() => {}}
                onDeletePress={() => {}}
                onEditPress={() => {}}
            ></SavingEntry>
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
                {savingDisplay}
                <SavingSearchModal isVisible={this.state.advanceSearchVisible} 
                    onRequestClose={() => {this.setState({advanceSearchVisible: false})}} 
                    onFilterRequest={(data) => {console.log(data); }}>
                </SavingSearchModal>
            </View>
        )
    }
}