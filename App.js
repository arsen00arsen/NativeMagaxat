/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
// import RootStackScreen from './screens/RootStackScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabScreen from './screens/navBarScreens/MainTabScreen';
// import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const App = () => {
  // const loginState = useSelector(state => state.usser.login);
  // console.log(name.success);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={MainTabScreen} />
      </Stack.Navigator>
      {/* {loginState?.success === true ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={MainTabScreen} />
        </Stack.Navigator>
      ) : (
        <RootStackScreen />
      )} */}
    </NavigationContainer>
  );
};

export default App;
