import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import AccountInfoScreen from './AccountInfoScreen';
import IneterestingAreaScreen from './IneterestingAreaScreen';
import PriorityPageScreen from './PriorityPageScreen';
import CreatePasswordScreen from './CreatePasswordScreen';
import LocationPageScreen from './LocationPageScreen';

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator screenOptions={{headerShown: false}}>
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="AccountInfoScreen" component={AccountInfoScreen} />
    <RootStack.Screen
      name="IneterestingAreaScreen"
      component={IneterestingAreaScreen}
    />
    <RootStack.Screen
      name="PriorityPageScreen"
      component={PriorityPageScreen}
    />
    <RootStack.Screen
      name="CreatePasswordScreen"
      component={CreatePasswordScreen}
    />
    <RootStack.Screen
      name="LocationPageScreen"
      component={LocationPageScreen}
    />
  </RootStack.Navigator>
);
export default RootStackScreen;
