import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import LikeButton from '../components/LikeButton';
import ShareButton from './ShareButton';

const VideoComponent = props => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={require('../assets/Nikol.png')}
          style={styles.userspic}
        />
        <Text style={styles.usersname}>Nikol Pashinyan</Text>
      </View>
      <VideoPlayer
        video={{uri: props.uri}}
        autoplay={false}
        defaultMuted={true}
        thumbnail={require('../assets/logoHeader.png')}
        style={styles.mediaVideo}
      />
      <View style={styles.postIcons}>
        <LikeButton />
        <ShareButton />
      </View>
    </View>
  );
};

export default VideoComponent;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: 292,
    marginTop: 20,
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'white',
  },
  mediaVideo: {
    width: '100%',
    height: 170,
    borderRadius: 8,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 17,
    paddingBottom: 17,
  },
  userspic: {
    height: 32,
    width: 32,
    borderRadius: 50,
  },
  usersname: {
    color: '#666666',
    paddingLeft: 10,
    fontSize: 14,
  },
  postIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
});
