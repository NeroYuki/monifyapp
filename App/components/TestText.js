import React, { Component } from "react";
import { Text } from 'react-native';
import I18n from '../i18n'

export class TestText extends Component {
    render() {
        return (
            <Text>{I18n.t('welcome')}</Text>
        )
    }
}
