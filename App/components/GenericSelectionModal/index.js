import React, { Component } from "react";
import { Text, TouchableOpacity, View, Modal, ScrollView, TouchableHighlight } from "react-native";
import { Divider } from "react-native-paper";
import { stylesheet } from './style';

export class GenericSelectionModal extends Component {
    render() {
        const style = stylesheet
        const keyMode = this.props.keyMode
        const selectionList = (this.props.selectionEntry) ? (this.props.selectionEntry.map((val, index) => {
            //TODO: overload an onSelection here
            return (
                <View key={(keyMode)? val.key : index} style={style.selection_entry}>
                    <TouchableHighlight
                        onPress={(this.props.onSelection) ?
                            () => this.props.onSelection((keyMode)? val.key : val)
                            :
                            () => { console.log(val) }} underlayColor="#00000030"
                    >
                        <Text style={style.selection_entry_text}>{(keyMode)? val.text : val}</Text>
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
                // onDismiss={this.props.onRequestClose}
                >
                    <View style={{backgroundColor: '#00000060', height: "70%"}}>
                        
                    </View>
                    <View style={style.main_view}>
                        <Text style={style.main_view_header}>Select one...</Text>
                        <View style={{flex: 1}}>
                            <ScrollView contentContainerStyle={{flexGrow: 1 }}>
                                {selectionList}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
        )
    }
}