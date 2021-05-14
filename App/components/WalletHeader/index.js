import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, Divider, Surface} from "react-native-paper";
import { stylesheet } from './style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export class WalletHeader extends Component {
    render() {
        const style = stylesheet

        return (
            <Surface style={style.surface}>
                <View style={style.selector}>
                    <Text style={style.selector_text}>Overview: </Text>
                    <TouchableOpacity><Text style={style.info_field_text_highlight}>My Wallet <Icon name="chevron-down" size={20}/></Text></TouchableOpacity>
                </View>
                <View style={style.info_field}>
                    <View>
                        <Text style={style.info_field_text_highlight}>500.000</Text>
                        <Text style={style.info_field_text}>INCOME</Text>
                    </View>
                    <Divider style={style.info_field_divider}></Divider>
                    <View>
                        <Text style={style.info_field_text_highlight}>150.000</Text>
                        <Text style={style.info_field_text}>EXPENSES</Text>
                    </View>
                    <Divider style={style.info_field_divider}></Divider>
                    <View>
                        <Text style={style.info_field_text_highlight}>350.000</Text>
                        <Text style={style.info_field_text}>BALANCE</Text>
                    </View>
                </View>
                <View style={style.button_group}>
                    <Button icon="format-list-bulleted" mode="contained" contentStyle={style.button_content} style={style.button} labelStyle={style.button_label}>List</Button>
                    <Button icon="chart-donut" mode="contained" contentStyle={style.button_content} style={style.button} labelStyle={style.button_label} 
                        onPress={(this.props.onCategoriesPress)? this.props.onCategoriesPress : () => {console.log('default handler')}}>Categories</Button>
                </View>
            </Surface>
        )
    }
}