import * as React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CustomTimespanFragment, TimespanDefaultFragment } from '../components';

const Tab = createMaterialTopTabNavigator();

const TimespanPickerNavigation = (props) => {

  handleChangePeriod = (value) => {
    if (props.handleChangePeriod) {
      props.handleChangePeriod(value)
    }
    else console.log("TTimeSpanPicker: ERROR CHANGE PERIOD")
  }

  return (
    <Tab.Navigator initialRouteName="Period"
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: 'white' },
      }}>
      <Tab.Screen
        name="Period"
        options={{ tabBarLabel: 'Period' }}
        children={() =>
          <TimespanDefaultFragment
            currentPeriod={props.currentPeriod}
            handleChangePeriod={this.handleChangePeriod}
          />}
      />
      <Tab.Screen name="Custom" component={CustomTimespanFragment} options={{ tabBarLabel: 'Custom' }} />
    </Tab.Navigator>
  );
}

export default TimespanPickerNavigation