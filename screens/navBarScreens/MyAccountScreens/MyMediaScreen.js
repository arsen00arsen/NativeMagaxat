import React from 'react';
import {View, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import MyaccountUsserInfor from '../../../components/MyaccountUsserInfor';
import MediaContent from '../../../components/MediaContent';

const MyMediaScreen = ({navigation}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#F2F2F2"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch />
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <MyaccountUsserInfor />
        <MediaContent />
      </ScrollView>
    </View>
  );
};

export default MyMediaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
});
