import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

const SafeAreaViewContainer = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default SafeAreaViewContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
