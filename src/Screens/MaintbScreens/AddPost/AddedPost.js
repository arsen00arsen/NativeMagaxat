import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import SafeAreaViewContainer from '../../../Elements/SafeAreaViewContainer';
import Button from '../../../Elements/Button';
import {useSelector} from 'react-redux';

const AddedPost = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  return (
    <View style={styles.container}>
      <SafeAreaViewContainer>
        <View style={{height: '80%', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.mainTitle}>Thank you {user.name}!</Text>
            <Text style={styles.subTitle}>
              Thank you, our moderator will check your announcement, if
              approved, it will appear in the announcements section
            </Text>
            <Text style={styles.subTitle}>
              If you have anymore to share, please add it below.
            </Text>
          </View>
          <Button
            style={{marginTop: 50, marginBottom: 10}}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonTitle}>Back To Home</Text>
          </Button>
        </View>
      </SafeAreaViewContainer>
    </View>
  );
};

export default AddedPost;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  mainTitle: {
    color: '#ED7B12',
    fontSize: 24,
    fontWeight: '700',
  },
  subTitle: {
    color: '#52525B',
    fontSize: 17,
    marginTop: 10,
  },
  buttonTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});
