/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './screens/RootStackScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabScreen from './screens/navBarScreens/MainTabScreen';
import {useSelector} from 'react-redux';
// import {
//   requestUserPermission,
//   NotificationListner,
// } from './utils/pushNotification';

const Stack = createNativeStackNavigator();
const App = () => {
  const loginState = useSelector(state => state.usser.login);
  // console.log(name.success);
  // useEffect(() => {
  //   requestUserPermission();
  //   NotificationListner();
  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
     <NavigationContainer>
      {/* <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={MainTabScreen} />
      </Stack.Navigator> */}
      {/* {loginState?.success === true ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={MainTabScreen} />
        </Stack.Navigator>
      ) : (
        <RootStackScreen />
      )} */}
      <RootStackScreen />
     </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
