import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { AppearanceSetting, Login, Register, SyncData, Tools } from '../screen';

const Stack = createStackNavigator()

const ToolsNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Tools">
            <Stack.Screen name="Tools" component={Tools} options={{title: "Tools"}}/>
            <Stack.Screen name="SyncData" component={SyncData} options={{title: "Sync Data"}}/>
            <Stack.Screen name="Appearance" component={AppearanceSetting} options={{title: "Appearance Setting"}}/>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}

export default ToolsNavigator