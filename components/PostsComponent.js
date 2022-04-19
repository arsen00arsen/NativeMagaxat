import React from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import VideoComponent from './VideoComponent';

const PostsComponent = () => {
  const data = [
    {
      id: 1,
      name: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 2,
      name: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 3,
      name: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 4,
      name: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  ];
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={data}
        horizontal={false}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => {
          return (
              <VideoComponent uri={item.name} />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default PostsComponent;

const styles = StyleSheet.create({
  toolbar: {
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
    flex: 1,
    width: '100%'
  },
  scroll: {
    marginTop: 10,
  },
});
