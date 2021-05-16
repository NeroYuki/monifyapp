import React, { Component } from "react";
import { Text, TouchableOpacity, View, Modal, ScrollView, TouchableHighlight } from "react-native";
import { Divider } from "react-native-paper";
import { stylesheet } from './style';

export class GenericSelectionModal extends Component {
    render() {
        const style = stylesheet

        const selectionList = (this.props.selectionEntry)? (this.props.selectionEntry.map((val, index) => {
            //TODO: overload an onSelection here
            return (
                <View key={index} style={style.selection_entry}>
                    <TouchableHighlight onPress={(this.props.onSelection)? () => this.props.onSelection(val) : () => {console.log(val)}} underlayColor="#00000030">
                        <Text style={style.selection_entry_text}>{val}</Text>
                    </TouchableHighlight>
                    <Divider></Divider>
                </View>
            )
        })) : (
            <View></View>
        )

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onRequestClose}
            >
                <View style={{ backgroundColor: "#00000070", height: "70%" }}></View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.isVisible}
                    onRequestClose={this.props.onRequestClose}
                    // onDismiss={this.props.onRequestClose}
                >
                    <View style={style.main_view}>
                        <Text style={style.main_view_header}>Select one...</Text>
                        <ScrollView contentContainerStyle={style.main_view_tab}>
                            {selectionList}
                        </ScrollView>
                    </View>
                </Modal>
            </Modal>
        )
    }
}