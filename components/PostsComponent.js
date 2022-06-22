import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import ImageModal from 'react-native-image-modal';
import ImgComponentpost from './ImgComponentpost';
import VideoComponent from './VideoComponent';

const PostsComponent = props => {
  const {posts, image, video} = props;

  const renderItem = ({item}) => {
    let content;
    if (item?.image_name) {
      content = (
        <ImageModal
          resizeMode="contain"
          imageBackgroundColor="#000000"
          style={styles.usersProfileBGimage}
          source={{uri: item?.image_path || item?.image}}
        />
      );
    }
    return content;
  };
  //   else {
  //     content = <VideoComponent uri={item} key={item.id} />;
  //   }

  return (
    <View>
      <FlatList
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        data={posts}
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
    width: 350,
    height: 170,
  },
});
