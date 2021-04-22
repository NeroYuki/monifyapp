import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Login, TestScreen, BudgetScreen } from '../screen';
import { COLORS, icons, SIZES } from '../assets/constants/';
import { Image, Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

const tabOptions = {
  showLabel: false,
  style: {
    height: '10%',
  },
}

const CreateInput = () => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: 19, backgroundColor: COLORS.yellow }}>
      <Image source={icons.plus} resizeMode='contain' style={{ height: 19, width: 19 }} />
    </View>
  )
}

const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={tabOptions}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.pink : COLORS.gray;

          switch (route.name) {
            case 'Overview':
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={icons.overview} resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 25,
                      height: 25,
                    }}
                  />
                  <Text style={{ color: tintColor, paddingTop: 5 }}> Overview </Text>
                </View>

              );
            case 'Budget':
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={icons.budget} resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 25,
                      height: 25,
                    }}
                  />
                  <Text style={{ color: tintColor, paddingTop: 5 }}> Budget </Text>
                </View>
              );
            case 'CreateInput':
              return (
                <CreateInput />
              );
            case 'Profile':
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={icons.profile} resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 25,
                      height: 25,
                    }}
                  />
                  <Text style={{ color: tintColor, paddingTop: 5 }}> Profile </Text>
                </View>
              );
            case 'Tools':
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={icons.tools} resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 25,
                      height: 25,
                    }}
                  />
                  <Text style={{ color: tintColor, paddingTop: 5 }}> Tools </Text>
                </View>
              );
          }
        }
      })}
    >
      <Tab.Screen name='Overview' component={TestScreen} />
      <Tab.Screen name='Budget' component={BudgetScreen} />
      <Tab.Screen name='CreateInput' component={TestScreen} />
      <Tab.Screen name='Profile' component={TestScreen} />
      <Tab.Screen name='Tools' component={TestScreen} />
    </Tab.Navigator>
  );
}

export default AppNavigator;