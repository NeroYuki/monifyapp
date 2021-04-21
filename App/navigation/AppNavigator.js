import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Login, TestScreen, Register } from '../screen';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={TestScreen} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Register" component={Register} />
    </Tab.Navigator>
  );
}

export default AppNavigator;