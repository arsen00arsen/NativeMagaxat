import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import LikeButton from '../components/LikeButton';
import ShareButton from './ShareButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const VideoComponent = props => {
  const navigation = useNavigation();
  let user = props.uri;
  let img;
  if (user.user_photo !== null) {
    img = {uri: user.user_photo};
  } else {
    img = require('../assets/defoult.png');
  }
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={img} style={styles.userspic} />
        <Text style={styles.usersname}>{user?.user_name} </Text>
        <Text style={styles.usersname}>{user?.user_lastname} </Text>
      </View>
      <VideoPlayer
        video={{uri: user?.video_path}}
        autoplay={false}
        defaultMuted={true}
        thumbnail={require('../assets/logoHeader.png')}
        style={styles.mediaVideo}
      />
      <View style={styles.postIcons}>
        <LikeButton />
        <ShareButton />
        <TouchableOpacity onPress={() => navigation.navigate('CommentScreen')}>
          <Icon name={'comment-outline'} size={24} color={'#8A8A8A'} />
        </TouchableOpacity>
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
