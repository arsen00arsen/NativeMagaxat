import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabScreens from '../Screens/MaintbScreens/MainTabs/TabScreens';
import {createStackNavigator} from '@react-navigation/stack';
import RootStackScreen from '../Screens/RootStackScreen/RootStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
export const AuthContainer = ({isAuth}) => {

  let content = (
    <Stack.Navigator>
      <Stack.Screen
        name="TabScreens"
        options={{
          headerShown: false,
        }}
        component={TabScreens}
      />
    </Stack.Navigator>
  );
  return (
    <NavigationContainer>
      {isAuth ? content : <RootStackScreen />}
    </NavigationContainer>
  );
};
