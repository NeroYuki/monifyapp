import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FAB, Searchbar } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoanEntry, LoanSearchModal } from "../../components";
import { stylesheet } from './style'

export class LoanManager extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            loanList: [
                {
                    id: '1',
                    name: 'Friend Borrow',
                    due_duratuion: '88 days',
                    amount: '1.200.000 đ',
                    interest_string: 'None',
                    color: '#ffdddd'
                },
                {
                    id: '2',
                    name: 'Credit debt',
                    due_duratuion: '22 days',
                    interest_string: '1% / year',
                    amount: '1.400.000 đ',
                    color: '#ddffdd',
                },
            ],
            advanceSearchVisible: false,
        }
    }

    render() {
        const style = stylesheet
        const loanDisplay = this.state.loanList.map((val) => {
            return <LoanEntry
                key={val.id} style={[style.loan_entry, {backgroundColor: val.color}]} name={val.name} due_duration={val.due_duratuion} amount={val.amount} interest_string={val.interest_string}
                onViewPress={() => {this.props.navigation.navigate("LoanEditor")}}
                onDeletePress={() => {}}
                onEditPress={() => {this.props.navigation.navigate("LoanEditor")}}
            ></LoanEntry>
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
                <ScrollView>
                    {loanDisplay}
                </ScrollView>
                <FAB style={style.fab}
                    big
                    icon="plus"
                    onPress={() => {this.props.navigation.navigate("LoanEditor")}}
                />
                <LoanSearchModal isVisible={this.state.advanceSearchVisible} 
                    onRequestClose={() => {this.setState({advanceSearchVisible: false})}} 
                    onFilterRequest={(data) => {console.log(data); }}>
                </LoanSearchModal>
            </View>
        )
    }
}