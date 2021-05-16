import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { SyncData, Tools } from '../screen';

const Stack = createStackNavigator()

const ToolsNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Tools">
            <Stack.Screen name="Tools" component={Tools}/>
            <Stack.Screen name="SyncData" component={SyncData}/>
        </Stack.Navigator>
    )
}

export default ToolsNavigator