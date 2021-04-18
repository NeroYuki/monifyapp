import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';

import AppNavigator from './AppNavigator';

function RootNavigator() {
    return (
        <NavigationContainer>
            <AppNavigator></AppNavigator>
        </NavigationContainer>
    );
}

export default RootNavigator;