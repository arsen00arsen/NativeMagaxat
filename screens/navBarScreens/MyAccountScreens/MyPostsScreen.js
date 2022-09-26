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
import {useDispatch, useSelector} from 'react-redux';
import {loadMyPosts} from '../../../stores/profileMe/profileMeActions';

const MyPostsScreen = props => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state?.user);
  const {myPosts} = useSelector(state => state?.myPosts);
  useEffect(() => {
    dispatch(loadMyPosts());
  }, []);

  const renderItem = ({item}) => {
    if (item.image) {
      return (
        <ImgComponentpost uri={item} key={item?.id} user={user} post="post" />
      );
    }
    return (
      <VideoComponent
        uri={item}
        key={item?.id}
        img={myPosts?.posts.image}
        user={user}
        post="post"
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#F2F2F2"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch />
      <MyaccountUsserInfor />
      {myPosts.posts?.length < 1 ? (
        <View style={styles.usersEmpoty}>
          <Text style={styles.textEmpoty}>You havn`t any Posts yet</Text>
        </View>
      ) : (
        <FlatList
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}
          data={myPosts.posts.data}
          keyExtractor={(items, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
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
  usersEmpoty: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpoty: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 60,
  },
});
