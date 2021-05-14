import React, { Component } from "react";
import { View, Modal, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import { Divider, Avatar } from "react-native-paper"
import { stylesheet } from './style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export class CategoriesModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: this.props.isVisible,
            typeSelection: 1,
            //placeholder, replace with props
            income_cat_list: ["Salary", "Bonus", "Interest", "Gift", "Others"],
            expense_cat_list: ["Food", "Clothes", "Utility", "Travel", "Entertainment", "Others"],
        }
    }

    render() {
        const style = stylesheet
        //console.log('Here: ' + this.state.isVisible)
        const income_type_style = (this.state.typeSelection == 2) ? style.on_select : style.on_nonselect
        const expense_type_style = (this.state.typeSelection == 1) ? style.on_select : style.on_nonselect
        const income_text_style = (this.state.typeSelection == 2) ? { color: '#000000' } : { color: 'white' }
        const expense_text_style = (this.state.typeSelection == 1) ? { color: '#000000' } : { color: 'white' }

        const content_list = (this.state.typeSelection === 1) ?
            (this.state.expense_cat_list.map((val) => {
                return (
                    <View style={style.category_entry}>
                        <View style={style.category_entry_content}>
                            <Avatar.Icon size={20} style={{ backgroundColor: "red" }} />
                            <Text style={[style.modal_text, style.content_list_text]}>{val}</Text>
                        </View>
                        <Divider style={{ backgroundColor: 'white' }}></Divider>
                    </View>
                )
            }))
            : (this.state.income_cat_list.map((val) => {
                return (
                    <View style={style.category_entry}>
                        <View style={style.category_entry_content}>
                            <Avatar.Icon size={20} style={{ backgroundColor: "green" }} />
                            <Text style={[style.modal_text, style.content_list_text]}>{val}</Text>
                        </View>
                        <Divider style={{ backgroundColor: 'white' }}></Divider>
                    </View>
                )
            }))

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onRequestClose}

            >
                <View style={style.modal_view}>
                    <View style={style.header}>
                        <TouchableOpacity onPress={this.props.onRequestClose}>
                            <Icon name="close" size={25} color="#fff"></Icon>
                        </TouchableOpacity>
                        <Text style={[style.modal_text, style.modal_text_header]}>CATEGORIES</Text>
                        <Icon name="square-edit-outline" size={25} color="#fff"></Icon>
                        <Icon name="plus" size={25} color="#fff"></Icon>
                    </View>
                    <View style={style.tab_switcher}>
                        <View style={style.tab_switcher_frame}>
                            <TouchableHighlight style={expense_type_style} onPress={() => { this.setState({ typeSelection: 1 }) }}><Text style={expense_text_style}>Expense</Text></TouchableHighlight>
                            <TouchableHighlight style={income_type_style} onPress={() => { this.setState({ typeSelection: 2 }) }}><Text style={income_text_style}>Income</Text></TouchableHighlight>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: 'white', marginTop: 10 }}></Divider>
                    <View style={style.content_list}>
                        {content_list}
                    </View>
                </View>
            </Modal>
        )
    }
}