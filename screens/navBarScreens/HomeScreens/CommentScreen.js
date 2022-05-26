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
  let video = props.route.params.video;
  let image = props.route.params.image;
  let description = props.route.params.description;
  let img;
  if (user.image !== null) {
    img = {uri: user.image};
  } else {
    img = require('../../../assets/defoult.png');
  }

  let imgPost;
  if (image !== null) {
    imgPost = {uri: image};
  } else {
    imgPost = require('../../../assets/defoult.png');
  }

  console.log(user, 'll88888888888lll');
  let commentContent = props.route.params.post?.map(elem => {
    let imgComment;
    if (elem.user.image !== null) {
      imgComment = {uri: elem.user.image};
    } else {
      imgComment = require('../../../assets/defoult.png');
    }
    return (
      <View key={elem.id}>
        <View style={styles.userProfile}>
          <View style={styles.imgFrame}>
            <Image source={imgComment} style={styles.userImage} />
          </View>
          <View>
            <Text>{elem.name} </Text>
            <Text />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{elem.user.name} </Text>
            <Text style={styles.userName}>{elem.user.lastname} </Text>
          </View>
        </View>
        <View style={styles.commentBody}>
          <Text style={styles.timeText}>{elem.created_at} </Text>
          <Text style={styles.commentText}>{elem.title}</Text>
        </View>
      </View>
    );
  });
  let content;
  if (props.route.params.video) {
    content = (
      <VideoPlayer
        video={{uri: video}}
        autoplay={false}
        defaultMuted={true}
        thumbnail={require('./../../../assets/logo.png')}
        style={styles.mediaVideo}
      />
    );
  } else if (props.route.params.image) {
    content = (
      <ImageBackground
        source={imgPost}
        resizeMode="stretch"
        style={styles.usersProfileBGimage}
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
            <View style={styles.userInfoNames}>
              <Text style={styles.userNames}>{user.name} </Text>
              <Text style={styles.userNames}>{user.lastname} </Text>
            </View>
            {/* <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.description} </Text>
            </View> */}
          </View>
          <View style={styles.vedioBodyContent}>{content}</View>
          <Text>{description} </Text>
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
  },
  userProfile: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
    paddingLeft: 5,
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
    borderWidth: 2.5,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 2,

    paddingTop: 5,
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
  timeText: {
    fontSize: 10,
    textAlign: 'right',
  },
  userInfoNames: {
    paddingLeft: 20,
  },
  userNames: {
    fontSize: 18,
  },
});
