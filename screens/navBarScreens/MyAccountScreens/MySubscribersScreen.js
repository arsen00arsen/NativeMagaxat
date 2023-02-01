import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import MyaccountUsserInfor from '../../../components/MyaccountUsserInfor';
import {loadMuSubrcribers} from '../../../stores/profileMe/profileMeActions';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
const MySubscribersScreen = () => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const {subscribers} = useSelector(state => state?.myPosts);

  useEffect(() => {
    if (isFocused) {
      dispatch(loadMuSubrcribers(1));
    }
  }, [isFocused]);
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    dispatch(loadMuSubrcribers(currentPage + 1));
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={item.id} style={styles.users}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('MyPageUsersAccount', {
              user: item.subscriber,
            })
          }>
          <View style={[styles.userProfile, styles.shadowProp]}>
            <View style={styles.imgFrame}>
              <Image
                source={{uri: item?.subscriber.image}}
                style={styles.userImage}
              />
            </View>
            <Text style={styles.userName}>{item?.subscriber.name}</Text>
            <Text style={styles.userName}>{item?.subscriber.lastname}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  console.log(subscribers, 'oooooiioiii');
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch serachFalse="false" />
      {subscribers?.length < 1 ? (
        <View style={styles.users}>
          <Text style={styles.textEmpoty}>{t('youHavntUsers')}</Text>
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <View style={{marginBottom: 20, paddingHorizontal: 5}}>
              <MyaccountUsserInfor />
            </View>
          )}
          contentContainerStyle={{flexGrow: 1}}
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreItem}
          data={subscribers}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

export default MySubscribersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 15,
    backgroundColor: '#f7f7f7',
    height: '100%',
  },
  users: {
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  userProfile: {
    width: '100%',
    height: 75,
    display: 'flex',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imgFrame: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#E6E6E6',
    width: 50,
    height: 50,
    marginHorizontal: 20,
  },
  userImage: {
    width: 43,
    height: 43,
    borderRadius: 50,
  },
  userName: {
    fontSize: 16,
    color: '#727272',
    textAlign: 'left',
    fontWeight: '600',
    paddingLeft: 10,
  },
  shadowProp: {
    elevation: 7,
    shadowColor: '#785425',
    borderRadius: 8,
  },
  wrapStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  textEmpoty: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
  },
});
