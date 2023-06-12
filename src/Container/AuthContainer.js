import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from '../Screens/RootStackScreen/RootStackScreen';

export const AuthContainer = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};
