import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FAB, Searchbar, Dialog, Paragraph, Button } from "react-native-paper";
import { SavingDepositModal, SavingEntry, SavingSearchModal, SavingWithdrawModal } from "../../components";
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
            deactivatePromptVisible: false,
            deletePromptVisible: false,
            depositModalVisible: false,
            withdrawModalVisible: false,
        }
    }

    render() {
        const style = stylesheet
        const savingDisplay = this.state.savingList.map((val) => {
            return <SavingEntry
                key={val.id} style={[style.saving_entry, {backgroundColor: val.color}]} name={val.name} due_duration={val.due_duratuion} amount={val.amount} interest_string={val.interest_string}
                onDepositPress={() => {this.setState({depositModalVisible: true})}}
                onWithdrawPress={() => {this.setState({withdrawModalVisible: true})}}
                onDeactivatePress={() => {this.setState({deactivatePromptVisible: true})}}
                onViewPress={() => {this.props.navigation.navigate("SavingEditor")}}
                onDeletePress={() => {this.setState({deletePromptVisible: true})}}
                onEditPress={() => {this.props.navigation.navigate("SavingEditor")}}
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
                <ScrollView>
                    {savingDisplay}
                </ScrollView>
                <FAB style={style.fab}
                    big
                    icon='plus'
                    onPress={() => {this.props.navigation.navigate("SavingEditor")}}
                />

                <SavingSearchModal isVisible={this.state.advanceSearchVisible} 
                    onRequestClose={() => {this.setState({advanceSearchVisible: false})}} 
                    onFilterRequest={(data) => {console.log(data); }}>
                </SavingSearchModal>

                <SavingDepositModal isVisible={this.state.depositModalVisible} 
                    onRequestClose={() => {this.setState({depositModalVisible: false})}}>
                </SavingDepositModal>
                
                <SavingWithdrawModal isVisible={this.state.withdrawModalVisible} 
                    onRequestClose={() => {this.setState({withdrawModalVisible: false})}}>
                </SavingWithdrawModal>

                <Dialog visible={this.state.deletePromptVisible} onDismiss={() => {this.setState({deletePromptVisible: false})}}>
                    <Dialog.Title>Confirm</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Are you sure you want to delete this saving account? The account will no longer be visible </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                    <Button onPress={() => {this.setState({deletePromptVisible: false})}}>Cancel</Button>
                        <Button mode='contained' onPress={() => {this.setState({deletePromptVisible: false})}}>Confirm</Button>
                    </Dialog.Actions>
                </Dialog>

                <Dialog visible={this.state.deactivatePromptVisible} onDismiss={() => {this.setState({deactivatePromptVisible: false})}}>
                    <Dialog.Title>Confirm</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Are you sure you want to deactivate this saving account? All remaining saving value will be lost</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                    <Button onPress={() => {this.setState({deactivatePromptVisible: false})}}>Cancel</Button>
                        <Button mode='contained' onPress={() => {this.setState({deactivatePromptVisible: false})}}>Confirm</Button>
                    </Dialog.Actions>
                </Dialog>
            </View>
        )
    }
}