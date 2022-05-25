/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './screens/RootStackScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabScreen from './screens/navBarScreens/MainTabScreen';
import {
  requestUserPermission,
  NotificationListner,
} from './utils/pushNotification';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {getMe} from './stores/user/userActions';
import {Text, View} from 'react-native';
const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const {loading, isAuth} = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  // useEffect(() => {
  //   const unregister = auth().onAuthStateChanged(userExist => {
  //     if (userExist) {
  //       firestore().collection('users').doc(userExist.uid).update({
  //         status: 'online',
  //       });
  //       setuser(userExist);
  //       dispatch({
  //         type: 'FIRE_BASE_USSER',
  //         payload: userExist,
  //       });
  //     } else {
  //       setuser(null);
  //     }
  //   });
  //   return () => {
  //     unregister();
  //   };
  // }, []);

  useEffect(() => {
    requestUserPermission();
    NotificationListner();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStackScreen />
      {/* {isAuth ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Homes" component={MainTabScreen} />
        </Stack.Navigator>
      ) : (
        <RootStackScreen />
      )} */}
    </NavigationContainer>
  );
};

export default App;
