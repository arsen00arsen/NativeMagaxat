import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import MyaccountUsserInfor from '../../../components/MyaccountUsserInfor';
import ImgComponentpost from '../../../components/ImgComponentpost';
import VideoComponent from '../../../components/VideoComponent';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {loadMyPosts} from '../../../stores/profileMe/profileMeActions';
import {useTranslation} from 'react-i18next';

const MyPostsScreen = props => {
  const {t} = useTranslation();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state?.user);
  const {myPosts} = useSelector(state => state?.myPosts);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (isFocused) {
      dispatch(loadMyPosts());
    }
  }, [isFocused]);

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    dispatch(loadMyPosts(currentPage + 1));
  };

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
        img={myPosts?.posts?.image}
        user={user}
        post="post"
      />
    );
  };
  //console.log(myPosts?.posts?.data, 'myPosts?.posts?.data');
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch serachFalse="false" />
      <View style={{paddingHorizontal: 5}}>
        <MyaccountUsserInfor />
      </View>
      {myPosts?.posts?.data.length === 0 ? (
        <View style={styles.usersEmpoty}>
          <Text style={styles.textEmpoty}>{t('havntAnyPosts')}</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreItem}
          data={myPosts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.5}
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
    alignItems: 'center',
  },
  textEmpoty: {
    fontSize: 20,
    textAlign: 'center',
    // marginTop: 60,
  },
});
