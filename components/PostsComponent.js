import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {baseUrl2} from '../http/index';
import VideoComponent from './VideoComponent';

const PostsComponent = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const url = baseUrl2 + '/videos_api';
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={data.data}
        horizontal={false}
        keyExtractor={(item, index) => `${data.data.id}`}
        renderItem={({item, index}) => {
          return <VideoComponent uri={item} />;
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
    width: '100%',
  },
  scroll: {
    marginTop: 10,
  },
});
