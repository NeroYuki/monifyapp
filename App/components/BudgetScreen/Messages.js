import React, { Component } from 'react';
import { Text } from 'react-native';

export class Messages extends Component {

    constructor() {
        super()
        this.state = {
            messages: 'Welcome React Native'
        }
    }

    render() {

        return (
            <Text> {this.state.messages} </Text>
        )
    }
}