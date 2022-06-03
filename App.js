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
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {getMe} from './stores/user/userActions';
import {ActivityIndicator, View} from 'react-native';
import PushNotification from 'react-native-push-notification';
// import {createSocketConnection} from './http/socketService/socketService';
const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const {loading, isAuth} = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getMe());
    // createSocketConnection();
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
      <LinearGradient
        start={{x: 1, y: 1}}
        end={{x: 1, y: 0}}
        colors={['#D6AB6F', '#B8B8B8', '#674C31']}
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animatable.Image
          animation="fadeInUpBig"
          duraton="1500"
          source={require('./assets/logo.png')}
          style={{width: 237, marginBottom: 100}}
          resizeMode="stretch"
        />
        <ActivityIndicator size="large" color="white" />
      </LinearGradient>
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
