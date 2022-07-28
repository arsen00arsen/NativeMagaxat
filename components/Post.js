import React, {memo, useState, useRef} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import ImageModal from 'react-native-image-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {StyleSheet, Dimensions} from 'react-native';

const Post = props => {
  const playerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <View>
          {props.post.video === null ? (
            <Image
              resizeMode="contain"
              imageBackgroundColor="#000000"
              style={styles.video}
              source={{uri: props?.post.image}}
            />
          ) : (
            <Video
              source={{uri: props.post.video}}
              style={styles.video}
              onError={e => console.log(e)}
              resizeMode={'cover'}
              repeat={false}
              paused={paused}
              controls={true}
              ref={playerRef}
            />
          )}

          <View style={styles.uiContainer}>
            <View style={styles.rightContainer}>
              <Image
                style={styles.profilePicture}
                source={{uri: props.post.user.image}}
              />

              {/* <TouchableOpacity
                style={styles.iconContainer}
                onPress={onLikePress}>
                <AntDesign
                  name={'heart'}
                  size={40}
                  color={isLiked ? 'red' : 'white'}
                />
                <Text style={styles.statsLabel}>{props.post.user.likes}</Text>
              </TouchableOpacity> */}

              {/* <View style={styles.iconContainer}>
                <FontAwesome name={'commenting'} size={40} color="white" />
                <Text style={styles.statsLabel}>
                  {props.post.user.comments}
                </Text>
              </View> */}
              {/*
              <View style={styles.iconContainer}>
                <Fontisto name={'share-a'} size={35} color="white" />
                <Text style={styles.statsLabel}>{props.post.user.shares}</Text>
              </View> */}
            </View>
            {/*
            <View style={styles.bottomContainer}>
              <View>
                <Text style={styles.handle}>@{props.post.user.username}</Text>
                <Text style={styles.description}>
                  {props.post.user.description}
                </Text>
              </View>
            </View> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default memo(Post);

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    height: Dimensions.get('window').height - 78,
  },
  videPlayButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  uiContainer: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  handle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 10,
  },
  //  right container
  rightContainer: {
    alignSelf: 'flex-end',
    height: 300,
    justifyContent: 'space-between',
    marginRight: 5,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },

  iconContainer: {
    alignItems: 'center',
  },
  statsLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
});
