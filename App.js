/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import {AuthContainer} from './src/Container/AuthContainer';
import {requestUserPermission} from './src/utils/requestUserPermission';
import {getMe} from './stores/user/userActions';
import {ActivityIndicator, StatusBar, View, Alert} from 'react-native';
import i18n from './i18n';
import messaging from '@react-native-firebase/messaging';
const App = () => {
  const dispatch = useDispatch();
  const {loading, isAuth} = useSelector(state => state.user);
  useEffect(() => {
    requestUserPermission();
    dispatch(getMe());
    // showLoacalNotifications();
  }, []);

  useEffect(() => {
    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage.notification,
    //   );
    //   // navigation.navigate(remoteMessage.data.type);
    // });
    messaging().onMessage(message => {
      console.log(message);
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <I18nextProvider i18n={i18n}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <AuthContainer isAuth={isAuth} />
    </I18nextProvider>
  );
};

export default App;
