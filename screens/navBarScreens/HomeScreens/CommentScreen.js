import React from 'react';
import {View, Image, Text, StyleSheet, SafeAreaView} from 'react-native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import VideoPlayer from 'react-native-video-player';

const CommentScreen = props => {
  const ANIMAL_NAMES = [
    {
      id: 1,
      name: 'Vazgen Sargsyan',
      userVedio: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: 2,
      name: 'Vazgen Sargsyan',
      userVedio: '4',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBackSearch />
      <VideoPlayer
        video={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp'}}
        autoplay={false}
        defaultMuted={true}
        thumbnail={require('../../../assets/logoHeader.png')}
      />
    </SafeAreaView>
  );
};

export default CommentScreen;
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
  mediaVideo: {
    width: '100%',
    height: 170,
    borderRadius: 8,
  },
});
