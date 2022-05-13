import React, {useRef} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import VideoPlayer from 'react-native-video-player';

const CommentScreen = props => {
  const scrollViewRef = useRef();
  let user = props.route.params.user;
  let img;
  if (user.image_name !== null) {
    img = {uri: user.image_path};
  } else {
    img = require('../../../assets/defoult.png');
  }
  const ANIMAL_NAMES = [
    {
      id: user.id,
      name: user.description,
      image: img,
      commentText: user.title,
    },
    {
      id: 2,
      name: 'Nikol Pashinyan',
      image: require('../../../assets/Nikol.png'),
      commentText: 'yev ayt mek marte dues',
    },
  ];

  let commentContent = ANIMAL_NAMES.map(elem => {
    return (
      <View>
        <View style={styles.userProfile}>
          <View style={styles.imgFrame}>
            <Image source={elem.image} style={styles.userImage} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{elem.name} </Text>
          </View>
        </View>
        <View style={styles.commentBody}>
          <Text style={styles.commentText}>{elem.commentText}</Text>
        </View>
      </View>
    );
  });
  let content;
  if (user.image_path !== null) {
    content = (
      <ImageBackground
        source={img}
        resizeMode="stretch"
        style={styles.usersProfileBGimage}
      />
    );
  } else {
    content = (
      <VideoPlayer
        video={{uri: user?.video_path}}
        autoplay={false}
        defaultMuted={true}
        thumbnail={require('./../../../assets/logoHeader.png')}
        style={styles.mediaVideo}
      />
    );
  }
  return (
    <View style={styles.container}>
      <HeaderBackSearch />
      <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal={false}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }
        style={styles.scroll}>
        <View style={styles.vedioContent}>
          <View style={styles.userProfile}>
            <View style={styles.imgFrame}>
              <Image source={img} style={styles.userImage} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.description} </Text>
            </View>
          </View>
          <View style={styles.vedioBodyContent}>
            {/* <VideoPlayer
              video={{
                uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp',
              }}
              autoplay={false}
              defaultMuted={true}
              thumbnail={require('../../../assets/logoHeader.png')}
              style={styles.vedio}
            /> */}
            {content}
          </View>
          <Text style={styles.textDescription}>{user.title}</Text>
        </View>
        <View style={styles.comentBox}>{commentContent}</View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.containerKeyBoard}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <TextInput placeholder="Add Comment" style={styles.textInput} />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
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
  vedioContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: 'silver',
    paddingBottom: 25,
    borderBottomWidth: 1,
  },
  vedio: {
    height: 160,
    borderRadius: 8,
  },
  vedioBodyContent: {
    width: '100%',
  },
  mediaVideo: {
    borderRadius: 8,
    minWidth: 500,
  },
  userProfile: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  imgFrame: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#E6E6E6',
    width: 34,
    height: 34,
  },
  userImage: {
    width: 37,
    height: 37,
    borderRadius: 999,
    borderColor: '#E6E6E6',
    borderWidth: 3,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 20,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  scroll: {
    width: '90%',
  },
  comentBox: {
    marginTop: 30,
  },
  commentBody: {
    minHeight: 60,
    backgroundColor: '#EAEAEA',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  commentText: {
    color: 'black',
  },
  inputStyle: {
    width: '100%',
    height: 60,
  },
  inner: {
    width: '100%',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 70,
    // background: '#FFFFFF',
    borderWidth: 2.5,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    // paddingLeft: 15,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  containerKeyBoard: {
    flex: 1,
    marginBottom: 20,
  },
  textDescription: {
    color: 'black',
    marginTop: 20,
  },
  usersProfileBGimage: {
    width: '100%',
    height: 170,
  },
});
