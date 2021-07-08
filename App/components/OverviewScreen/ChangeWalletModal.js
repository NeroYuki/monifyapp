import React, { Component } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { COLORS } from '../../assets/constants';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RadioButton } from "react-native-paper"

export class ChangeWalletModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedType: this.props.currentWallet
        }
    }

    render() {

        const renderWalletList = this.props.data.map((val) => {
            return (
                <RadioButton.Item label={val.name} value={val.walletId} />
            )
        })

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.closePeriod}
            >
                <View style={styles.backgroundBlur}>
                    <TouchableWithoutFeedback style={{ flex: 1 }}
                        onPress={this.props.closePeriod}
                    >
                        <View style={{ flex: 1 }}></View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.popup}>
                    <View style={styles.header}>
                        <Text style={styles.title}> SWITCH WALLET</Text>

                        <TouchableOpacity
                            onPress={
                                (this.props.handleChangeWallet) ?
                                    () => this.props.handleChangeWallet(this.state.selectedType)
                                    :
                                    () => console.log(this.state.selectedType)
                            }

                        >
                            <Icon name='check' size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <RadioButton.Group
                            value={this.state.selectedType}
                            onValueChange={value => {
                                this.setState({ selectedType: value })
                            }}
                        >
                            {renderWalletList}
                        </RadioButton.Group>
                    </View>
                </View>
            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: '40%',
        backgroundColor: 'red',
    },
    backgroundBlur: {
        height: '60%',
        backgroundColor: COLORS.blackBlur
    },
    popup: {
        height: '40%',
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    header: {
        marginLeft: 10,
        marginRight: 20,
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        color: COLORS.gray
    }

})