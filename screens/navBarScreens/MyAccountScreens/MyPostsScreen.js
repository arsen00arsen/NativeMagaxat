import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {baseUrl2} from '../../../http/index';
import {useTheme} from '@react-navigation/native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import MyaccountUsserInfor from '../../../components/MyaccountUsserInfor';
import ImgComponentpost from '../../../components/ImgComponentpost';
import VideoComponent from '../../../components/VideoComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MyPostsScreen = props => {
  const theme = useTheme();
  let posts = props?.route.params;
  const renderItem = ({item}) => {
    console.log(item, 'lll');
    let content;
    if (item.image_path) {
      content = (
        <>
          <ImgComponentpost
            uri={item}
            key={item.id}
            img={posts.posts.image}
            post="post"
          />
        </>
      );
    } else {
      content = (
        <VideoComponent
          uri={item}
          key={item.id}
          img={posts.posts.image}
          post="post"
        />
      );
    }
    return content;
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch />
      <MyaccountUsserInfor />

      <FlatList
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        data={posts.posts.posts}
        keyExtractor={(items, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MyPostsScreen;

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
  delete: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
