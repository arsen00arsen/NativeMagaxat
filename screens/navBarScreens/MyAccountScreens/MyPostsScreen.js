import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import MyaccountUsserInfor from '../../../components/MyaccountUsserInfor';
import ImgComponentpost from '../../../components/ImgComponentpost';
import VideoComponent from '../../../components/VideoComponent';
import {useDispatch, useSelector} from 'react-redux';
import {loadMyPosts} from '../../../stores/profileMe/profileMeActions';
import {useTranslation} from 'react-i18next';

const MyPostsScreen = props => {
  const {t} = useTranslation();
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
        backgroundColor="#FFFFFF"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch serachFalse="false" />
      <MyaccountUsserInfor />
      {myPosts.posts.data.length === 0 ? (
        <View style={styles.usersEmpoty}>
          <Text style={styles.textEmpoty}>{t('havntAnyPosts')}</Text>
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#f7f7f7',
    height: '100%',
  },
  delete: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  usersEmpoty: {
    flex: 1,
    width: '100%',
    height: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textEmpoty: {
    fontSize: 20,
    textAlign: 'center',
    // marginTop: 60,
  },
});
