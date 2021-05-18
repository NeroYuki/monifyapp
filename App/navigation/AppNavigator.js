import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Login, TestScreen, BudgetScreen, ToolsContainer } from '../screen';
import { COLORS, icons, SIZES } from '../assets/constants/';
import { ProfileScreen } from '../screen/Profile';
import { BudgetSetting } from '../screen/BudgetSetting';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { CreateModal, TransactionEditor } from '../components';
import { Component } from 'react';

const Tab = createBottomTabNavigator();

const tabOptions = {
  showLabel: false,
  style: {
    height: '10%',
  },
}

const CreateInput = (props) => {
  return (
    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: 19, backgroundColor: COLORS.yellow }} onPress={props.onPress}>
      <Image source={icons.plus} resizeMode='contain' style={{ height: 19, width: 19 }} />
    </TouchableOpacity>
  )
}

const AppNavigator = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false)
  const [procOnce, setProcOnce] = React.useState(true)

  const CreateModalWrapper = ({ navigation }) => {

    return (
      <View>
        <TestScreen />
        <CreateModal isVisible={showCreateModal} onRequestClose={() => { console.log('close'); setShowCreateModal(false) }}></CreateModal>
      </View>
    )
  }

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
                <CreateInput onPress={() => setShowCreateModal(true)} />
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
      <Tab.Screen name='CreateInput' component={CreateModalWrapper} listeners={{
        tabPress: e => {
          // Prevent default action

          e.preventDefault();
        },
      }} />
      <Tab.Screen name='Profile' component={BudgetSetting} />
      <Tab.Screen name='Tools' component={ToolsContainer} />
    </Tab.Navigator >
  );
}

export default AppNavigator;