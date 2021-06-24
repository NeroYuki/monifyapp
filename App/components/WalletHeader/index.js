import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, Divider, Surface } from "react-native-paper";
import { stylesheet } from './style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from "../../assets/constants";
import { currencyFormat } from "../../utils/formatNumber";

export class WalletHeader extends Component {
    // Change Color in Button when choose "List" or "Categories"
    TabSelectedButton = () => {
        return (
            (!this.props.currentTab) ?
                <View style={stylesheet.button_group}>
                    <Button
                        icon="format-list-bulleted"
                        mode="contained"

                        contentStyle={stylesheet.button_content}
                        style={[stylesheet.button, { backgroundColor: COLORS.white }]}
                        labelStyle={{ color: COLORS.pink }}
                        onPress={this.props.onListPress}
                    >List</Button>
                    <Button
                        icon="chart-donut"
                        mode="contained"
                        contentStyle={stylesheet.button_content}
                        style={[stylesheet.button, { backgroundColor: COLORS.lightWhite }]}
                        labelStyle={{ color: COLORS.white }}
                        onPress={this.props.onCategoriesPress}
                    >Categories</Button>
                </View>
                :
                <View style={stylesheet.button_group}>
                    <Button
                        icon="format-list-bulleted"
                        mode="contained"

                        contentStyle={stylesheet.button_content}
                        style={[stylesheet.button, { backgroundColor: COLORS.lightWhite }]}
                        labelStyle={{ color: COLORS.white }}
                        onPress={this.props.onListPress}

                    >List</Button>
                    <Button
                        icon="chart-donut"
                        mode="contained"
                        contentStyle={stylesheet.button_content}
                        style={[stylesheet.button, { backgroundColor: COLORS.white }]}
                        labelStyle={{ color: COLORS.pink }}
                        onPress={this.props.onCategoriesPress}
                    >Categories</Button>
                </View>
        )
    }

    render() {
        const style = stylesheet
        return (
            <Surface style={style.surface}>
                <View style={style.selector}>
                    <Text style={style.selector_text}>Overview: </Text>
                    <TouchableOpacity
                        onPress={this.props.handleChooseWallet}
                    >
                        <Text style={style.info_field_text_highlight}>My Wallet
                            <Icon name="chevron-down" size={20} />
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={style.info_field}>
                    <View>
                        <Text style={style.info_field_text_highlight}>{currencyFormat(parseInt(this.props.data.income))}</Text>
                        <Text style={style.info_field_text}>INCOME</Text>
                    </View>
                    <Divider style={style.info_field_divider}></Divider>
                    <View>
                        <Text style={style.info_field_text_highlight}>{currencyFormat(parseInt(this.props.data.expense))}</Text>
                        <Text style={style.info_field_text}>EXPENSES</Text>
                    </View>
                    <Divider style={style.info_field_divider}></Divider>
                    <View>
                        <Text style={style.info_field_text_highlight}>{currencyFormat(parseInt(this.props.data.income) - parseInt(this.props.data.expense))}</Text>
                        <Text style={style.info_field_text}>BALANCE</Text>
                    </View>
                </View>

                <this.TabSelectedButton />
            </Surface>
        )
    }
}