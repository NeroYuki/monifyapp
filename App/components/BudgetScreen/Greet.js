import React, { Component } from 'react';
import { Text } from 'react-native';

export class Greet extends Component {
    render() {

        console.log(this.props)
        return (
            <Text style={{ top: 50 }}> Hello {this.props.name}</Text>
        )
    }
}