import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { checkInitialLaunch, checkSavingsForCycle } from '../logic/callonappopenning';

import AppNavigator from './AppNavigator';

const useComponentWillMount = (func) => {
    const willMount = React.useRef(true)
    if (willMount.current) func()
    willMount.current = false
}

function RootNavigator() {
    //This is the very first thing the app will try to run before any rendering
    useComponentWillMount(async () => {

    });

    return (
        <NavigationContainer>
            <AppNavigator></AppNavigator>
        </NavigationContainer>
    );
}

export default RootNavigator;