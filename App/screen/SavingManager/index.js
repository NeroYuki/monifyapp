import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FAB, Searchbar, Dialog, Paragraph, Button } from "react-native-paper";
import { SavingDepositModal, SavingEntry, SavingSearchModal, SavingWithdrawModal } from "../../components";
import { stylesheet } from './style'
import { deactivateSaving, deleteSaving, querySaving } from "../../logic/Screen-saving";
import moment from "moment";

export class SavingManager extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            savingList: [
            ],
            advanceSearchVisible: false,
            deactivatePromptVisible: false,
            deletePromptVisible: false,
            depositModalVisible: false,
            withdrawModalVisible: false,
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
        let data = await querySaving({savingName: this.state.quickQueryString})
        console.log(data)
        this.setState({
            savingList: data
        })
    }

    async queryData(input) {
        let data = await querySaving({savingName: input.name_input, minAmount: input.min_amount, maxAmount: input.max_amount})
        this.setState({
            savingList: data
        })
    }

    render() {
        const style = stylesheet
        const savingDisplay = this.state.savingList.map((val) => {
            //console.log(val)
            return <SavingEntry
                key={val.savingId} style={[style.saving_entry, {backgroundColor: val.color}]} name={val.name + ((val.deactivate)? " (Deactivated)" : "" )} due_duration={moment(JSON.stringify(val.expire_on), "YYYY-MM-DDTHH:mm:ss.SSSZ").format("DD/MM/YYYY")} amount={(val.amount + " đ")} interest_string={(val.interest + "%")} 
                active={!val.deactivate}
                onDepositPress={() => {this.setState({depositModalVisible: true, selectedId: val.savingId})}}
                onWithdrawPress={() => {this.setState({withdrawModalVisible: true,  selectedId: val.savingId})}}
                onDeactivatePress={() => {this.setState({deactivatePromptVisible: true, selectedId: val.savingId})}}
                onViewPress={() => {this.props.navigation.navigate("SavingEditor", {mode: "view", id: val.savingId})}}
                onDeletePress={() => {this.setState({deletePromptVisible: true,  selectedId: val.savingId})}}
                onEditPress={() => {this.props.navigation.navigate("SavingEditor", {mode: "edit", id: val.savingId})}}
            ></SavingEntry>
        })

        return (
            <View style={style.container}>
                <View style={style.search_bar}>
                    <Searchbar style={{flex: 1}}
                    onChangeText={(e) => {
                        //console.log(e)
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
                    {savingDisplay}
                </ScrollView>
                <FAB style={style.fab}
                    big
                    icon='plus'
                    onPress={() => {this.props.navigation.navigate("SavingEditor", {mode: "edit", id: ""})}}
                />

                <SavingSearchModal isVisible={this.state.advanceSearchVisible} 
                    onRequestClose={() => {this.setState({advanceSearchVisible: false})}} 
                    onFilterRequest={(data) => {
                        console.log(data); 
                        this.queryData(data)
                    }}>
                </SavingSearchModal>


                <SavingDepositModal isVisible={this.state.depositModalVisible} 
                    onRequestClose={() => {this.setState({depositModalVisible: false})}}
                    srcId={this.state.selectedId}>
                </SavingDepositModal>
                
                <SavingWithdrawModal isVisible={this.state.withdrawModalVisible} 
                    onRequestClose={() => {this.setState({withdrawModalVisible: false})}}
                    srcId={this.state.selectedId}>
                </SavingWithdrawModal>

                <Dialog visible={this.state.deletePromptVisible} onDismiss={() => {this.setState({deletePromptVisible: false})}}>
                    <Dialog.Title>Confirm</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Are you sure you want to delete this saving account? The account will no longer be visible </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                    <Button onPress={() => {this.setState({deletePromptVisible: false})}}>Cancel</Button>
                    <Button mode='contained' onPress={async () => {
                        if (this.state.selectedId) {
                            let result = await deleteSaving(this.state.selectedId)
                            if (result) {
                                this.setState({selectedId: ""})
                                this.fetchData()
                            }
                        }
                        this.setState({deletePromptVisible: false})}
                    }>Confirm</Button>
                    </Dialog.Actions>
                </Dialog>

                <Dialog visible={this.state.deactivatePromptVisible} onDismiss={() => {this.setState({deactivatePromptVisible: false})}}>
                    <Dialog.Title>Confirm</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Are you sure you want to deactivate this saving account? All remaining saving value will be lost</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                    <Button onPress={() => {this.setState({deactivatePromptVisible: false})}}>Cancel</Button>
                        <Button mode='contained' onPress={async () => {
                            if (this.state.selectedId) {
                                let result = await deactivateSaving(this.state.selectedId)
                                if (result) {
                                    this.setState({selectedId: ""})
                                    this.fetchData()
                                }
                            }
                            this.setState({deactivatePromptVisible: false})}
                        }>Confirm</Button>
                    </Dialog.Actions>
                </Dialog>
            </View>
        )
    }
}