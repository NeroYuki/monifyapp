import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button, Divider, Menu, Provider } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from "../../../assets/constants";
import { stylesheet } from './style';

export class WalletEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    render() {
        const style = stylesheet
        return (
            <View style={[style.container, this.props.style]}>
                <View style={style.info_view}>
                    <View style={style.left_container}>
                        <Text style={style.name}>{this.props.name}</Text>
                        <Text style={style.last_tran}>Last transaction: {this.props.last_tran}</Text>
                    </View>
                    <View style={style.right_container}>
                        <Text style={style.amount}>{this.props.amount}</Text>
                    </View>
                </View>
                <View style={style.option}>
                    <Menu
                        visible={this.state.visible}
                        onDismiss={() => {this.setState({visible: false})}}
                        anchor={<TouchableOpacity onPress={() => {this.setState({visible: true})}}><Icon name='dots-vertical' size={24}></Icon></TouchableOpacity>}>
                            <Menu.Item onPress={() => {this.setState({visible: false}); (this.props.onTransferPress)? this.props.onTransferPress() : () => {}}} icon="cash-refund" title="Transfer" />
                            <Divider></Divider>
                            <Menu.Item onPress={() => {this.setState({visible: false}); (this.props.onViewPress)? this.props.onViewPress() : () => {}}} icon="eye" title="View" />
                            <Menu.Item onPress={() => {this.setState({visible: false}); (this.props.onEditPress)? this.props.onEditPress() : () => {}}} icon="file-edit" title="Edit" />
                            <Menu.Item onPress={() => {this.setState({visible: false}); (this.props.onDeletePress)? this.props.onDeletePress() : () => {}}} icon="delete" title="Delete" />
                    </Menu>
                </View>
            </View>
        )
    }
}