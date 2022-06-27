import React from 'react';
import {StyleSheet, View, FlatList, Image, Text} from 'react-native';
import ImageModal from 'react-native-image-modal';
import VideoPlayer from 'react-native-video-player';
import moment from 'moment';
const PostsComponent = props => {
  const {posts, image, user, loadMoreItem} = props;
  const userPost = posts?.data;

  const renderItem = ({item}) => {
    let content;
    if (item?.image) {
      content = (
        <View style={styles.imgComp}>
          <View style={styles.userInfo}>
            <Image source={{uri: user?.image}} style={styles.userspic} />
            <Text style={styles.userTitle}>{item.title} </Text>
            <Text style={styles.userCreate}>
              {moment().startOf(user?.created_at).format('LL')}
            </Text>
          </View>
          <ImageModal
            resizeMode="contain"
            imageBackgroundColor="#000000"
            style={styles.usersProfileBGimage}
            source={{uri: item?.image_path || item?.image}}
            modalImageStyle={{
              borderRadius: 8,
            }}
          />
        </View>
      );
    } else {
      content = (
        <View style={styles.vidComp}>
          <View style={styles.userInfo}>
            <Image source={{uri: user?.image}} style={styles.userspic} />
            <Text style={styles.userTitle}>{item.title} </Text>
            <Text style={styles.userCreate}>
              {moment().startOf(user?.created_at).format('LL')}
            </Text>
          </View>
          <VideoPlayer
            video={{uri: item.video}}
            autoplay={false}
            defaultMuted={true}
            thumbnail={require('../assets/logo.png')}
            style={styles.mediaVideo}
            fullscreen={true}
            resizeMode="contain"
          />
        </View>
      );
    }
    return content;
  };

  return (
    <View>
      <FlatList
        nestedScrollEnabled
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        data={userPost}
        onEndReached={() => loadMoreItem()}
        keyExtractor={(items, index) => index.toString()}
        onEndReachedThreshold={0.5}
        renderItem={renderItem}
      />
    </View>
  );
};

export default PostsComponent;

const styles = StyleSheet.create({
  toolbar: {
    flex: 1,
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  safeAreaView: {
    width: '100%',
  },
  scroll: {
    marginTop: 10,
  },
  usersProfileBGimage: {
    minWidth: 370,
    width: '100%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    height: 180,
    paddingBottom: 10,
  },
  mediaVideo: {
    minWidth: 370,
    width: '100%',
    height: 170,
    borderRadius: 8,
    marginBottom: 10,
  },
  imgComp: {
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'silver',
    padding: 5,
  },
  vidComp: {
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'silver',
    padding: 5,
  },
  userspic: {
    height: 52,
    width: 52,
    borderRadius: 50,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 15,
    paddingVertical: 5,
  },
  userCreate: {
    color: 'black',
    width: '30%',
  },
  userTitle: {
    color: 'black',
    width: '50%',
    paddingHorizontal: 5,
  },
});
