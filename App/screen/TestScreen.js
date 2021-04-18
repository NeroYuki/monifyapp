import React, { Component } from "react";
import { View } from "react-native";

import { TestText, TestButton } from '../components'
import GlobalStyle from '../styles/GlobalStyle'

export class TestScreen extends Component {
    render() {
        return (
            <View style={GlobalStyle.header}>
                <TestText></TestText>
                <TestButton></TestButton>
            </View>
        )
    }
}