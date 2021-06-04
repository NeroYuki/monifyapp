import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FAB, Searchbar, Dialog, Paragraph, Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WalletEntry, WalletSearchModal, WalletTransferModal } from "../../components";
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
            transferModalVisible: false,
            deletePromptVisible: false,
        }
    }
    
    render() {
        const style = stylesheet
        const walletDisplay = this.state.walletList.map((val) => {
            return <WalletEntry 
                key={val.id} style={[style.wallet_entry, {backgroundColor: val.color}]} name={val.name} last_tran={val.last_tran} amount={val.amount}
                onTransferPress={() => {this.setState({transferModalVisible: true})}}
                onViewPress={() => {this.props.navigation.navigate("WalletEditor")}}
                onDeletePress={() => {this.setState({deletePromptVisible: true})}}
                onEditPress={() => {this.props.navigation.navigate("WalletEditor")}}
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
                <ScrollView>
                    {walletDisplay}
                </ScrollView>
                <FAB style={style.fab}
                    big
                    icon="plus"
                    onPress={() => {this.props.navigation.navigate("WalletEditor")}}
                />
                <WalletSearchModal isVisible={this.state.advanceSearchVisible} 
                    onRequestClose={() => {this.setState({advanceSearchVisible: false})}} 
                    onFilterRequest={(data) => {console.log(data); }}>
                </WalletSearchModal>

                <WalletTransferModal isVisible={this.state.transferModalVisible} 
                    onRequestClose={() => {this.setState({transferModalVisible: false})}} >
                </WalletTransferModal>

                <Dialog visible={this.state.deletePromptVisible} onDismiss={() => {this.setState({deletePromptVisible: false})}}>
                    <Dialog.Title>Confirm</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Are you sure you want to delete this wallet? The wallet will no longer be visible </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                    <Button onPress={() => {this.setState({deletePromptVisible: false})}}>Cancel</Button>
                        <Button mode='contained' onPress={() => {this.setState({deletePromptVisible: false})}}>Confirm</Button>
                    </Dialog.Actions>
                </Dialog>
            </View>
        )
    }
}