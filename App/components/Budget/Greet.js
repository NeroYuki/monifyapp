import React, { Component } from 'react';
import { Text } from 'react-native';

export class Greet extends Component {
    render() {

        console.log(this.props)
        return (
            <Text> Hello {this.props.name}</Text>
        )
    }
}