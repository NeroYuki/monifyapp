import React, { Component } from "react";
import { Text } from "react-native";
import { Button, Paragraph, Dialog, TextInput, Modal } from "react-native-paper";
import { stylesheet } from './style';
import { TriangleColorPicker } from 'react-native-color-picker'

export class ColorPickerModal extends Component {
    render() {
        const style = stylesheet
        return (
            <Modal visible={this.props.isVisible} onDismiss={this.props.onRequestClose} contentContainerStyle={style.modal_container} style={style.modal}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Color Picker</Text>
                <Text>Press the color bar below to confirm change</Text>
                <TriangleColorPicker 
                    style={{flex: 1}} 
                    onColorSelected={(val) => {(this.props.onSubmit)? this.props.onSubmit(val) : console.log('ColorPicker: default handler')}} 
                    oldColor={this.props.initialValue}/>
            </Modal>
        )

    }
}