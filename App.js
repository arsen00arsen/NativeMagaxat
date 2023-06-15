/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import 'react-native-gesture-handler';
import {AuthContainer} from './src/Container/AuthContainer';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      {/* <StatusBar backgroundColor="transparent" barStyle="dark-content" /> */}
      <AuthContainer />
    </>
  );
};

export default App;
