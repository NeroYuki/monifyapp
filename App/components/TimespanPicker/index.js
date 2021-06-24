import React, { Component } from "react";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import { stylesheet } from './style';
import TimespanPickerNavigation from "../../navigation/TimespanPickerNavigator";
import { COLORS } from "../../assets/constants";

export class TimespanPicker extends Component {
    constructor(props) {

        // console.log("TIMESPAN PICKER: - CONSTRUCTOR")
        super(props)
        this.state = {
            isVisible: this.props.isVisible,
        }
    }

    handleChangePeriod = (value) => {
        if (this.props.handleChangePeriod) {
            this.props.handleChangePeriod(value)
        } else
            console.log("Timespan Picker error change period")
    }

    handleSetStartDate = (value) => {
        if (this.props.handleSetStartDate) {
            this.props.handleSetStartDate(value)
        }
        else console.log("TimeSpanPicker: ERROR CHANGE CUSTOM")
    }

    handleSetEndDate = (value) => {
        if (this.props.handleSetEndDate) {
            this.props.handleSetEndDate(value)
        }
        else console.log("TimeSpanPicker: ERROR CHANGE CUSTOM")
    }

    render() {

        // console.log("TIMESPAN PICKER: - Render ")
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
                        <TimespanPickerNavigation
                            startDate={this.props.startDate}
                            endDate={this.props.endDate}
                            currentPeriod={this.props.currentPeriod}
                            handleChangePeriod={this.handleChangePeriod}

                            handleSetStartDate={this.handleSetStartDate}
                            handleSetEndDate={this.handleSetEndDate}
                        />
                    </View>
                </View>

            </Modal>
        )
    }
}