import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { stylesheet } from './style'

export class TransactionEditor extends Component {
    render() {
        const style = stylesheet
        return (
            <View style={style.container}>
                <View style={style.header}>
                    <Icon name="close" size={20}></Icon>
                    <Text style={style.header_text}>NEW TRANSACTION</Text>
                </View>
                <View style={style.amount_field}>
                    <Text style={style.amount_field_text}>200.000 đ</Text>
                </View>
                <View style={style.info_field}>
                    <View style={style.info_field_item}>
                        <Icon name="sack" size={20}></Icon>
                        <Text style={style.info_field_item_text}>Category</Text>
                    </View>
                    <Divider></Divider>
                    <View style={style.info_field_item}>
                        <Icon name="notebook" size={20}></Icon>
                        <Text style={style.info_field_item_text}>Note</Text>          
                    </View>
                    <Divider></Divider>
                    <View style={style.info_field_item}>
                        <Icon name="calendar" size={20}></Icon>
                        <Text style={style.info_field_item_text}>Tuesday, 5 Mar</Text>            
                    </View>
                    <Divider></Divider>
                    <View style={style.info_field_item}>
                        <Icon name="repeat" size={20}></Icon>
                        <Text style={style.info_field_item_text}>Make Recurring</Text>
                    </View>
                    <Divider></Divider>
                </View>
                <View style={style.footer}>
                    <Button mode="contained" contentStyle={style.footer_button_content} style={style.footer_button}>
                        Save
                    </Button>
                </View>
            </View>
        )

    }
}

