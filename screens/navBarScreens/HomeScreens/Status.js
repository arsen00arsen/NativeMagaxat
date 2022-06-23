import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import {useDispatch} from 'react-redux';
import {removeMyStory} from '../../../stores/stories/storiesAction';

const Status = ({route, navigation}) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const {name, image, user, video, isMy, id} = route.params;

  useEffect(() => {
    let timer = setTimeout(() => {
      navigation.goBack();
    }, 10000);

    Animated.timing(progress, {
      toValue: 10,
      duration: 10000,
      useNativeDriver: false,
    }).start();
    return () => clearTimeout(timer);
  }, []);

  const [progress, setProgress] = useState(new Animated.Value(0));

  const progressAnimation = progress.interpolate({
    inputRange: [1, 10],
    outputRange: ['0%', '100%'],
  });
  const deletePost = () => {
    dispatch(removeMyStory(id));
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.mainContainer}>
        <Animated.View
          style={{
            height: '100%',
            backgroundColor: 'white',
            width: progressAnimation,
          }}
        />
      </View>
      <View style={styles.secondContainer}>
        <View style={styles.smallContainer}>
          <Image source={{uri: user?.image}} style={styles.userImage} />
        </View>
        <View style={styles.storiContent}>
          <Text style={styles.storiText}>{name}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionic
              name="close"
              style={{fontSize: 20, color: 'white', opacity: 0.6}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {image === null ? (
        <Video
          ref={videoRef}
          source={{uri: video}}
          style={styles.storiVideo}
          resizeMod={'contain'}
        />
      ) : (
        <Image source={{uri: image}} style={styles.storiImage} />
      )}
      <View style={styles.storiView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name="navigation"
            style={{fontSize: 30, color: 'white', marginLeft: 'auto'}}
          />
        </TouchableOpacity>
        {isMy === true ? (
          <TouchableOpacity style={styles.delete} onPress={deletePost}>
            <Icon name="delete-circle-outline" color="red" size={32} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    height: 3,
    width: '95%',
    borderWidth: 1,
    backgroundColor: 'gray',
    position: 'absolute',
    top: 18,
  },
  secondContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 12,
    left: 0,
    width: '90%',
  },
  smallContainer: {
    borderRadius: 100,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    borderRadius: 100,
    backgroundColor: '#E4E3E1',
    resizeMode: 'cover',
    width: '92%',
    height: '92%',
  },
  storiContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  storiView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
    width: '100%',
  },
  storiText: {color: 'white', fontSize: 15, paddingLeft: 10},
  storiImage: {position: 'absolute', width: '60%', height: '70%'},
  storiVideo: {position: 'absolute', width: '60%', height: '70%'},
});
