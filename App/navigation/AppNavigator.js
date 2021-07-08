import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Login, TestScreen, BudgetScreen, ToolsContainer, OverviewScreen, ProfileContainer } from '../screen';
import { COLORS, icons, SIZES } from '../assets/constants/';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { CreateModal, TransactionEditor } from '../components';
import { Component } from 'react';
import { AddNewTransaction } from '../screen/AddNewTransaction/AddNewTransaction';

const Tab = createBottomTabNavigator();

const tabOptions = {
  showLabel: false,
  style: {
    height: '10%',
  },
}

const CreateInput = (props) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 38, height: 38,
        borderRadius: 19,
        backgroundColor: COLORS.yellow
      }}
      onPress={() => console.log("Create Input")}
      >
      <Image
        source={icons.plus}
        resizeMode='contain'
        style={{
          height: 19,
          width: 19
        }}
      />
    </View>
  )
}

const AppNavigator = () => {

  return (
    <Tab.Navigator
      initialRouteName="CreateInput"
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
      <Tab.Screen name='Overview' component={OverviewScreen} />
      <Tab.Screen name='Budget' component={BudgetScreen} />
      <Tab.Screen name='CreateInput' component={AddNewTransaction} />
      <Tab.Screen name='Profile' component={ProfileContainer} />
      <Tab.Screen name='Tools' component={ToolsContainer} />
    </Tab.Navigator >
  );
}

export default AppNavigator;