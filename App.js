/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import {AuthContainer} from './src/Container/AuthContainer';
import {requestUserPermission} from './src/utils/requestUserPermission';
import {getMe} from './stores/user/userActions';
import {ActivityIndicator, StatusBar, View, Alert} from 'react-native';
import i18n from './i18n';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
const App = () => {
  const dispatch = useDispatch();
  const [userToken, setUserToken] = useState('');
  const {loading, isAuth, asGuest} = useSelector(state => state.user);

  useEffect(() => {
    requestUserPermission();
    if (asGuest !== 'AS_GUEST') {
      dispatch(getMe(setUserToken));
    }
  }, [isAuth]);

  useEffect(() => {
    messaging().onMessage(message => {
      Toast.show({
        type: 'success',
        text1: message.data.title,
        text2: message.notification.title,
      });
    });
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
      <AuthContainer
        isAuth={isAuth}
        userToken={userToken ? userToken : asGuest}
      />
    </I18nextProvider>
  );
};

export default App;
