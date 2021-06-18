import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FAB, Searchbar, Dialog, Paragraph, Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WalletEntry, WalletSearchModal, WalletTransferModal } from "../../components";
import { deleteWallet, querywallet } from "../../logic/Screen-wallet";
import { stylesheet } from './style'
import { withNavigation } from '@react-navigation/native';

export class WalletManager extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            walletList: [
                {
                    walletId: '1',
                    name: 'Cash Wallet',
                    last_tran: '24-01-2021',
                    amount: '200.000 đ',
                    color: '#ffdddd'
                },
                {
                    walletId: '2',
                    name: 'Credit Loan',
                    last_tran: '11-05-2021',
                    amount: '3.400.000 đ',
                    color: '#ddffdd',
                },
                {
                    walletId: '3',
                    name: 'Secret Fund',
                    last_tran: '22-03-2021',
                    amount: '500.000 đ',
                    color: '#ddddff',
                }
            ],
            advanceSearchVisible: false,
            transferModalVisible: false,
            deletePromptVisible: false,
            selectedId: "",
            quickQueryString: "",
            unsubscribe: undefined,
        }
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
        let data = await querywallet({walletName: this.state.quickQueryString})
        //console.log(data)
        this.setState({
            walletList: data
        })
    }

    async queryData(input) {
        let data = await querywallet({walletName: input.name_input, minAmount: input.min_amount, maxAmount: input.max_amount})
        this.setState({
            walletList: data
        })
    }
    
    render() {
        const style = stylesheet
        const walletDisplay = this.state.walletList.map((val) => {
            return <WalletEntry 
                key={val.walletId} style={[style.wallet_entry, {backgroundColor: val.color}]} name={val.name} last_tran={val.last_tran} amount={(val.amount + " đ")}
                onTransferPress={() => {this.setState({transferModalVisible: true})}}
                onViewPress={() => {this.props.navigation.navigate("WalletEditor", {mode: "view", id: val.walletId})}}
                onDeletePress={() => {this.setState({deletePromptVisible: true, selectedId: val.walletId})}}
                onEditPress={() => {this.props.navigation.navigate("WalletEditor", {mode: "edit", id: val.walletId})}}
            ></WalletEntry>
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
                    onPress={() => {this.props.navigation.navigate("WalletEditor", {mode: "edit", id: ""})}}
                />
                <WalletSearchModal isVisible={this.state.advanceSearchVisible} 
                    onRequestClose={() => {this.setState({advanceSearchVisible: false})}} 
                    onFilterRequest={(data) => {
                        console.log(data); 
                        this.queryData(data)
                    }}>
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
                        <Button mode='contained' onPress={async () => {
                            if (this.state.selectedId) {
                                let result = await deleteWallet(this.state.selectedId)
                                if (result) {
                                    this.setState({selectedId: ""})
                                    this.fetchData()
                                }
                            }
                            this.setState({deletePromptVisible: false})}
                        }>Confirm</Button>
                    </Dialog.Actions>
                </Dialog>
            </View>
        )
    }
}