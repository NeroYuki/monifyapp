import React, { Component } from "react";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import { stylesheet } from './style';
import TimespanPickerNavigation from "../../navigation/TimespanPickerNavigator";

export class TimespanPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: this.props.isVisible,
        }
    }

    render() {
        const style = stylesheet
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onRequestClose}
            >
                <View style={style.overlay}>
                    <View style={{backgroundColor: "#000000e0", height: "60%"}}></View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.props.isVisible}
                        onRequestClose={this.props.onRequestClose}
                    >
                        <View style={style.main_view}>
                            <Text style={style.main_view_header}>Budget Period</Text>
                            <TimespanPickerNavigation />
                        </View>
                    </Modal>
                </View>

            </Modal>
        )
    }
}