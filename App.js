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
import {useDispatch} from 'react-redux';
const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setuser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unregister = auth().onAuthStateChanged(userExist => {
      if (userExist) {
        firestore().collection('users').doc(userExist.uid).update({
          status: 'online',
        });
        setuser(userExist);
        console.log(userExist, 'llll');
        dispatch({
          type: 'FIRE_BASE_USSER',
          payload: userExist,
        });
      } else {
        setuser(null);
      }
    });
    return () => {
      unregister();
    };
  }, []);

  useEffect(() => {
    requestUserPermission();
    NotificationListner();
  }, []);

  return (
    <NavigationContainer>
      {/* <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={MainTabScreen} />
      </Stack.Navigator> */}
      {user ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={MainTabScreen} />
        </Stack.Navigator>
      ) : (
        <RootStackScreen />
      )}
    </NavigationContainer>
  );
};

export default App;
