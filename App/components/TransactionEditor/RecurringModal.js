import React, { Component } from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { COLORS } from '../../assets/constants';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RadioButton } from "react-native-paper"

export class RecurringModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedType: this.props.periodCurrent
        }
    }

    render() {

        console.log("PERIOD", this.state.selectedType)
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
                        <Text style={styles.title}> RECURRING TRANSACTION </Text>

                        <TouchableWithoutFeedback
                            onPress={(this.props.changePeriod) ?
                                () => this.props.changePeriod(this.state.selectedType)
                                :
                                () => { console.log(this.state.selectedType) }}

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
                            <ScrollView>
                                <RadioButton.Item label="Never repeat" value="Never repeat" />
                                <RadioButton.Item label="Every day" value="Every day" />
                                <RadioButton.Item label="Every weak" value="Every weak" />
                                <RadioButton.Item label="Every month" value="Every month" />
                                <RadioButton.Item label="Every year" value="Every year" />
                            </ScrollView>


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