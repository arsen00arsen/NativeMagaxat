import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({
      type: 'LOGIN',
      payload: null,
    });
  };
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={logout}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
