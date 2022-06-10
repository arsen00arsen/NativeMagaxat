import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from '../screens/navBarScreens/Chat';
import MainTabScreen from '../screens/navBarScreens/MainTabScreen';
import RootStackScreen from '../screens/RootStackScreen';
import {useGetNotifications} from '../components/hooks/useGetNotifications';
import {useDispatch} from 'react-redux';
import {
  loadAllNewMessages,
  loadLastMessages,
} from '../stores/messages/messageActions';

const Stack = createNativeStackNavigator();

export const AuthContainer = ({isAuth, userId}) => {
  const dispatch = useDispatch();
  const {echoClient} = useGetNotifications();

  useEffect(() => {
    echoe();
  }, [echoClient]);

  const echoe = () => {
    return echoClient
      ?.private(`notifications.${userId}`)
      .listen('.notification', sms => {
        dispatch(loadAllNewMessages(sms.message));
        dispatch(loadLastMessages(sms));
      });
  };

  return (
    <NavigationContainer>
      {isAuth ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Homes" component={MainTabScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      ) : (
        <RootStackScreen />
      )}
    </NavigationContainer>
  );
};
