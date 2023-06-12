import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './SplashScreen';

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator screenOptions={{headerShown: false}}>
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
  </RootStack.Navigator>
);
export default RootStackScreen;
