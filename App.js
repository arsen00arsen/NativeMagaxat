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
import {ActivityIndicator, StatusBar, View} from 'react-native';
import i18n from './i18n';

const App = () => {
  const dispatch = useDispatch();
  const {loading, isAuth} = useSelector(state => state.user);
  useEffect(() => {
    requestUserPermission();
    dispatch(getMe());
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <I18nextProvider i18n={i18n}>
        <AuthContainer isAuth={isAuth} />
      </I18nextProvider>
    </>
  );
};

export default App;
