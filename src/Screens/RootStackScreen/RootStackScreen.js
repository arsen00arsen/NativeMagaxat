import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import Registration from './Registration';

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator
    screenOptions={{headerShown: false, statusBarColor: 'light'}}>
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="Registration" component={Registration} />
  </RootStack.Navigator>
);
export default RootStackScreen;
