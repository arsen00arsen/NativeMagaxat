import React, {useEffect} from 'react';
import {NavigationContainer, StatusBar} from '@react-navigation/native';
import RootStackScreen from '../Screens/RootStackScreen/RootStackScreen';
import TabScreens from '../Screens/MaintbScreens/MainTabs/TabScreens';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
export const AuthContainer = () => {
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
      {/* <RootStackScreen /> */}
      {content}
    </NavigationContainer>
  );
};
