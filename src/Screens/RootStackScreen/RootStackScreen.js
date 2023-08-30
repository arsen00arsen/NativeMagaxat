import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import Registration from './Registration';
import SignIn from './SignIn';

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator
    initialRouteName="SplashScreen"
    screenOptions={{headerShown: false, statusBarColor: 'light'}}>
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignIn" component={SignIn} />
    <RootStack.Screen name="Registration" component={Registration} />
  </RootStack.Navigator>
);
export default RootStackScreen;
