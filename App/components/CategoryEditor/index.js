import React, { Component } from "react";
import { stylesheet } from './style'
import { Text, View } from "react-native";
import { Button, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export class CategoryEditor extends Component {
    render() {
        const style = stylesheet
        //console.log(Icon)
        return (
            <View style={style.container}>
                <View style={style.header}>
                    <Icon name="close" size={20}></Icon>
                    <Text style={style.header_text}>NEW CATEGORY</Text>
                </View>
                <View style={style.icon_field}>
                    <Icon name="wallet" size={50}></Icon>
                    <View>
                        <Text style={{marginBottom: 10}}>question_mark</Text>
                        <Button mode="contained">
                            Change Icon
                        </Button>
                    </View>
                </View>
                <View style={style.info_field}>
                    <View style={style.info_field_item}>
                        <Icon name="tag" size={20}></Icon>
                        <Text style={style.info_field_item_text}>Insert name...</Text>
                    </View>
                    <Divider></Divider>
                    <View style={style.info_field_item}>
                        <Icon name="notebook" size={20}></Icon>
                        <Text style={style.info_field_item_text}>Type</Text>          
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