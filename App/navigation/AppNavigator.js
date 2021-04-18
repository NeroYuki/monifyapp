import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TestScreen } from '../screen';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={TestScreen} />
    </Tab.Navigator>
  );
}

export default AppNavigator;