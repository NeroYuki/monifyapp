import React, { Component } from "react";
import { stylesheet } from './style'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Modal, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export class TestModal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const styles = stylesheet
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onRequestClose}
            >
                <View style={styles.background}>
                    <View style={styles.container}></View>
                </View>
            </Modal>
        )
    }
}