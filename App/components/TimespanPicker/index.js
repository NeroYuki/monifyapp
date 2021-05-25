import React, { Component } from "react";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import { stylesheet } from './style';
import TimespanPickerNavigation from "../../navigation/TimespanPickerNavigator";
import { COLORS } from "../../assets/constants";

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
            >
                <View style={style.overlay}>
                    <View style={{ backgroundColor: COLORS.blackBlur, height: "60%" }}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={this.props.onRequestClose}
                        >
                            <View style={{ flex: 1 }}></View>
                        </TouchableOpacity>
                    </View>
                    <View style={style.main_view}>
                        <Text style={style.main_view_header}>BUDGET PERIOD</Text>
                        <TimespanPickerNavigation />
                    </View>

                </View>

            </Modal>
        )
    }
}