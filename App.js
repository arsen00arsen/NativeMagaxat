/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './screens/RootStackScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';

const Drawer = createDrawerNavigator();
const App = () => {
  const name = useSelector(state => state.usser);
  console.log(name);
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default App;
