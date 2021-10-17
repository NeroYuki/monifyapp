import React, { Component } from "react";
import { Text } from "react-native";
import { Button, Paragraph, Dialog, TextInput } from "react-native-paper";
import { stylesheet } from './style';

//wrapper for react native paper's input dialog

export class GenericInputModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            val: this.props.initialValue
        }
    }

    render() {
        //TODO: get regex checking for input field
        return(
            <Dialog visible={this.props.isVisible} onDismiss={this.props.onRequestClose}>
                <Dialog.Title>{(this.props.title)? this.props.title : "Input Dialog"}</Dialog.Title>
                <Dialog.Content>
                    <TextInput mode='outlined' label="Insert the value" testID="InputDialog"
                        placeholder={this.props.initialValue} 
                        onChangeText={(v) => {this.setState({val: v})}} 
                        keyboardType={(this.props.inputType)? this.props.inputType : "default"} 
                        right={<TextInput.Affix text={(this.props.affixText)? this.props.affixText : ""} />} />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => {this.props.onSubmit(this.state.val)}}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        )
    }
}