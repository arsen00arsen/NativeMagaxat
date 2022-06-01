import React, {useState, memo} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import VideoPlayer from 'react-native-video-player';
import LikeButton from '../components/LikeButton';
import ShareButton from './ShareButton';

const VideoComponent = props => {
  const navigation = useNavigation();
  const [longDis, setLongDis] = useState(false);
  let user = props.uri.user;
  let post = props.uri;
  let likeCounts = post?.likes?.length + 1;
  let postCounts = post.comments?.length;

  let isLongDs = () => {
    setLongDis(!longDis);
  };
  let userTitle;
  if (longDis === false) {
    userTitle = (
      <Text style={styles.usersTitle} numberOfLines={2}>
        {post?.title}
      </Text>
    );
  } else {
    userTitle = <Text style={styles.longDis}>{post?.title}</Text>;
  }
  const userProfilePage = () => {
    navigation.navigate('AccounProfiletScreen', {
      id: user?.id,
    });
  };

  const time = moment().startOf(user?.created_at).format('LL');
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <TouchableOpacity onPress={userProfilePage}>
          <Image source={{uri: user?.image}} style={styles.userspic} />
        </TouchableOpacity>
        <View style={styles.inf}>
          <View style={styles.usersnames}>
            {props.post === 'post' ? (
              <TouchableOpacity style={styles.delete}>
                <Icon name="delete-circle-outline" color="red" size={32} />
              </TouchableOpacity>
            ) : null}

            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={styles.usersname}>{user?.name} </Text>
              <Text style={styles.usersname}>{user?.lastname} </Text>
            </View>
            <Text style={styles.timeData}>{time} </Text>
          </View>
          <TouchableOpacity onPress={isLongDs}>{userTitle}</TouchableOpacity>
        </View>
      </View>
      <VideoPlayer
        video={{uri: props.uri.video}}
        autoplay={false}
        defaultMuted={true}
        thumbnail={require('../assets/logo.png')}
        style={styles.mediaVideo}
        fullscreen={true}
        resizeMode="contain"
      />
      {props.post === 'post' ? null : (
        <View style={styles.postIcons}>
          <LikeButton
            likeCounts={likeCounts}
            id={post.id}
            authLiked={post.authLiked}
          />
          <View style={styles.shareButton}>
            <ShareButton />
          </View>
          <TouchableOpacity
            style={styles.videoCount}
            onPress={() =>
              navigation.navigate('CommentScreen', {
                description: post.title,
                post: post.comments,
                user: user,
                video: post.video,
              })
            }>
            <Icon name={'comment-outline'} size={24} color={'#8A8A8A'} />
            <Text>{postCounts} </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default memo(VideoComponent);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userspic: {
    height: 52,
    width: 52,
    borderRadius: 50,
  },
  inf: {
    width: '80%',
  },
  usersname: {
    color: '#666666',
    fontSize: 16,
  },
  usersnames: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
  postIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 10,
  },
  usersTitle: {
    maxWidth: '100%',
    paddingBottom: 15,
    paddingTop: 10,
  },
  timeData: {
    maxWidth: '40%',
    fontSize: 12,
  },
  longDis: {
    maxWidth: '100%',
    paddingBottom: 15,
    paddingTop: 10,
  },
  videoCount: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    marginBottom: 20,
  },
  delete: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
  },
});
