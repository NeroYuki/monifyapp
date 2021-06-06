import * as React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CustomTimespanFragment, TimespanDefaultFragment } from '../components';

const Tab = createMaterialTopTabNavigator();

const TimespanPickerNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Period"
        tabBarOptions={{
            activeTintColor: 'black',
            labelStyle: { fontSize: 12 },
            style: { backgroundColor: 'white' },
        }}>
        <Tab.Screen name="Period" component={TimespanDefaultFragment} options={{ tabBarLabel: 'Period' }} />
        <Tab.Screen name="Custom" component={CustomTimespanFragment} options={{ tabBarLabel: 'Custom' }} />
    </Tab.Navigator>
  );
}

export default TimespanPickerNavigation