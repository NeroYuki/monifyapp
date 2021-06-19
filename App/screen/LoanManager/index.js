import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FAB, Searchbar, Dialog, Paragraph, Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoanEntry, LoanPaymentModal, LoanSearchModal } from "../../components";
import { deleteLoan, queryLoan } from "../../logic/Screen-loan";
import { stylesheet } from './style'
import moment from 'moment'

export class LoanManager extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            loanList: [

            ],
            advanceSearchVisible: false,
            deactivatePromptVisible: false,
            deletePromptVisible: false,
            paymentModalVisible: false,
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
        let data = await queryLoan({loanName: this.state.quickQueryString})
        //console.log(data)
        this.setState({
            loanList: data
        })
    }

    async queryData(input) {
        let data = await queryLoan({loanName: input.name_input, minAmount: input.min_amount, maxAmount: input.max_amount})
        this.setState({
            loanList: data
        })
    }

    render() {
        const style = stylesheet
        const loanDisplay = this.state.loanList.map((val) => {
            return <LoanEntry
                key={val.loanId} style={[style.loan_entry, {backgroundColor: val.color}]} name={val.name} due_duration={moment(JSON.stringify(val.expire_on), "YYYY-MM-DDTHH:mm:ss.SSSZ").format("DD/MM/YYYY")} amount={(val.amount + " đ")} interest_string={(val.interest + "%")}
                onPaymentPress={() => {this.setState({paymentModalVisible: true})}}
                onDeactivatePress={() => {this.setState({deactivatePromptVisible: true})}}
                onViewPress={() => {this.props.navigation.navigate("LoanEditor", {mode: "view", id: val.loanId})}}
                onDeletePress={() => {this.setState({deletePromptVisible: true, selectedId: val.loanId})}}
                onEditPress={() => {this.props.navigation.navigate("LoanEditor", {mode: "edit", id: val.loanId})}}
            ></LoanEntry>
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
                    {loanDisplay}
                </ScrollView>
                <FAB style={style.fab}
                    big
                    icon="plus"
                    onPress={() => {this.props.navigation.navigate("LoanEditor", {mode: "edit", id: ""})}}
                />
                <LoanSearchModal isVisible={this.state.advanceSearchVisible} 
                    onRequestClose={() => {this.setState({advanceSearchVisible: false})}} 
                    onFilterRequest={(data) => {
                        console.log(data); 
                        this.queryData(data)
                    }}>
                </LoanSearchModal>

                <LoanPaymentModal isVisible={this.state.paymentModalVisible} 
                    onRequestClose={() => {this.setState({paymentModalVisible: false})}} >
                </LoanPaymentModal>

                <Dialog visible={this.state.deletePromptVisible} onDismiss={() => {this.setState({deletePromptVisible: false})}}>
                    <Dialog.Title>Confirm</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Are you sure you want to delete this loan account? The account will no longer be visible </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                    <Button onPress={() => {this.setState({deletePromptVisible: false})}}>Cancel</Button>
                    <Button mode='contained' onPress={async () => {
                        if (this.state.selectedId) {
                            let result = await deleteLoan(this.state.selectedId)
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
                        <Paragraph>Are you sure you want to deactivate this loan account? All remaining loan value will be neglected</Paragraph>
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