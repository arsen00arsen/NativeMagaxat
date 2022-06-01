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
import {ActivityIndicator, View} from 'react-native';
import PushNotification from 'react-native-push-notification';
const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const {loading, isAuth} = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  useEffect(() => {
    createChanels();
    requestUserPermission();
    NotificationListner();
  }, []);

  const createChanels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };
  if (loading) {
    return (
      <View style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuth ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Homes" component={MainTabScreen} />
        </Stack.Navigator>
      ) : (
        <RootStackScreen />
      )}
    </NavigationContainer>
  );
};

export default App;
