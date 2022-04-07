import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

const Media = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Media</Text>
    </View>
  );
};

export default Media;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
