import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {baseUrl2} from '../http/index';
import VideoComponent from './VideoComponent';

const PostsComponent = () => {
  const [data, setData] = useState([]);

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

  let content = data?.data?.map(elem => {
    return <VideoComponent uri={elem} key={elem.id} />;
  });

  return <View>{content}</View>;
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
});
