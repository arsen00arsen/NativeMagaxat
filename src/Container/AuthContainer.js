import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabScreens from '../Screens/MaintbScreens/MainTabs/TabScreens';
import {createStackNavigator} from '@react-navigation/stack';
import RootStackScreen from '../Screens/RootStackScreen/RootStackScreen';
import {PusherProvider} from '@harelpls/use-pusher/react-native';
import Toast from 'react-native-toast-message';
const Stack = createStackNavigator();

const getConfig = token => {
  return {
    clientKey: 'sponsor1222',
    cluster: 'mt1',
    authEndpoint: 'https://sponsor.am/api/broadcast/auth',
    auth: {
      headers: {Authorization: `Bearer ${token}`},
    },
    httpsPort: 443,
    wsHost: 'sponsor.am',
    forceTLS: true,
  };
};
export const AuthContainer = ({isAuth, userToken}) => {
  let content;

  if (isAuth && userToken) {
    content = (
      <PusherProvider {...getConfig(userToken)}>
        <Stack.Navigator>
          <Stack.Screen
            name="TabScreens"
            options={{
              headerShown: false,
            }}
            component={TabScreens}
          />
        </Stack.Navigator>
        <Toast />
      </PusherProvider>
    );
  } else {
    content = <RootStackScreen />;
  }

  return <NavigationContainer>{content}</NavigationContainer>;
};
