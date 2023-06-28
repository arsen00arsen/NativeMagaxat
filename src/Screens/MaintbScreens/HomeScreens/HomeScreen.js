import * as React from 'react';
import {View} from 'react-native';
import UserInfo from '../../../Components/UserInfo';

const HomeScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <UserInfo />
    </View>
  );
};
export default HomeScreen;
