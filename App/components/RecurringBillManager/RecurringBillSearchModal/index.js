import React, { Component } from "react";
import { Text, View, TouchableHighlight, Modal, ScrollView, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Picker } from '@react-native-picker/picker';
import { stylesheet } from './style';

export class RecurringBillSearchModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name_input: "",
            min_amount: "",
            max_amount: "",
            sort_mode: "alphabet",
        }
    }

    render() {
        const style = stylesheet
        return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.isVisible}
            onRequestClose={this.props.onRequestClose}
            onDismiss={this.props.onRequestClose}
        >
            <View style={style.main_view}>
                <Text style={style.main_view_header}>Advance Filter</Text>
                <ScrollView contentContainerStyle={style.main_view_tab}>
                    <TextInput mode="outlined" label="Bill's name" placeholder="Type something" onChange={(t) => {this.setState({name_input: t})}}></TextInput>
                    <View style={style.amount_group}>
                        <TextInput mode="outlined" label="Minimum amount" placeholder="Insert a number" onChange={(t) => {this.setState({min_amount: t})}} style={{flex: 1}}></TextInput>
                        <Text style={{marginHorizontal: 10}}> to </Text>
                        <TextInput mode="outlined" label="Maximum amount" placeholder="Insert a number" onChange={(t) => {this.setState({max_amount: t})}} style={{flex: 1}}></TextInput>
                    </View>
                    <View style={style.amount_group}>
                        <Text>Sorting Mode: </Text>
                        <Picker selectedValue={this.state.sort_mode} style={{flex: 1}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({sort_mode: itemValue})
                        }>
                            <Picker.Item label="Alphabet" value="alphabet" />
                            <Picker.Item label="Latest Transaction" value="latest_tran" />
                            <Picker.Item label="Higher Amount" value="high_amount" />
                            <Picker.Item label="Lower Amount" value="low_amount" />
                        </Picker>
                    </View>
                    <Button mode='contained' onPress={() => {
                        (this.props.onFilterRequest) ? this.props.onFilterRequest({
                            name_input: this.state.name_input,
                            min_amount: parseFloat(this.state.min_amount) || undefined,
                            max_amount: parseFloat(this.state.max_amount) || undefined,
                            sort_mode: this.state.sort_mode,
                        }) : () => {console.log('default handler')}
                        this.props.onRequestClose()
                    }}
                        labelStyle={style.button_label}>Filter</Button>
                </ScrollView>
            </View>
        </Modal>)
    }
}