import React, { Component } from 'react';
import { Button, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { COLORS } from '../../assets/constants';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RadioButton } from "react-native-paper"

export class BudgetSettingPeriodModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedType: this.props.period
        }
    }

    render() {
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
                        <Text style={styles.title}> BUDGET PERIOD </Text>

                        <TouchableWithoutFeedback
                            onPress={this.props.closePeriod}
                        >
                            <Icon name='check' size={25} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ flex: 1 }}>
                        <RadioButton.Group
                            value={this.state.selectedType}
                            onValueChange={value => {
                                this.setState({ selectedType: value })
                            }}
                        >
                            <RadioButton.Item label="Weekly" value="Weekly" />
                            <RadioButton.Item label="Monthly" value="Monthly" />
                            <RadioButton.Item label="Yearly" value="Yearly" />
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
        height: '70%',
        backgroundColor: COLORS.blackBlur
    },
    popup: {
        height: '30%',
        backgroundColor: COLORS.white
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