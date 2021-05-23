import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Searchbar } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WalletEntry, WalletSearchModal } from "../../components";
import { stylesheet } from './style'

export class WalletManager extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            walletList: [
                {
                    id: '1',
                    name: 'Cash Wallet',
                    last_tran: '24-01-2021',
                    amount: '200.000 đ',
                    color: '#ffdddd'
                },
                {
                    id: '2',
                    name: 'Credit Loan',
                    last_tran: '11-05-2021',
                    amount: '3.400.000 đ',
                    color: '#ddffdd',
                },
                {
                    id: '3',
                    name: 'Secret Fund',
                    last_tran: '22-03-2021',
                    amount: '500.000 đ',
                    color: '#ddddff',
                }
            ],
            advanceSearchVisible: false,
        }
    }
    
    render() {
        const style = stylesheet
        const walletDisplay = this.state.walletList.map((val) => {
            return <WalletEntry 
                key={val.id} style={[style.wallet_entry, {backgroundColor: val.color}]} name={val.name} last_tran={val.last_tran} amount={val.amount}
                onViewPress={() => {}}
                onDeletePress={() => {}}
                onEditPress={() => {}}
            ></WalletEntry>
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
                
                {walletDisplay}
                <WalletSearchModal isVisible={this.state.advanceSearchVisible} 
                    onRequestClose={() => {this.setState({advanceSearchVisible: false})}} 
                    onFilterRequest={(data) => {console.log(data); }}>
                </WalletSearchModal>
            </View>
        )
    }
}