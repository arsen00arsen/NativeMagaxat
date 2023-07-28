/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {AuthContainer} from './src/Container/AuthContainer';
import {requestUserPermission} from './src/utils/requestUserPermission';
// import {StatusBar} from 'react-native';

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);
  return (
    <>
      {/* <StatusBar backgroundColor="transparent" barStyle="dark-content" /> */}
      <AuthContainer />
    </>
  );
};

export default App;
