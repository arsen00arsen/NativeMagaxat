import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {loadMuSubrcribtions} from '../../../stores/profileMe/profileMeActions';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import MyaccountUsserInfor from '../../../components/MyaccountUsserInfor';
import {useTranslation} from 'react-i18next';

const MySubscribtionsScreen = props => {
  const {t} = useTranslation();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const {subscriptions} = useSelector(state => state?.myPosts);

  useEffect(() => {
    if (isFocused) {
      dispatch(loadMuSubrcribtions(1));
    }
  }, [isFocused]);
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    dispatch(loadMuSubrcribtions(currentPage + 1));
  };
  const renderItem = ({item, index}) => {
    return (
      <View key={item.id} style={styles.users}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('MyPageUsersAccount', {
              user: item.subscription,
            })
          }>
          <View style={[styles.userProfile, styles.shadowProp]}>
            <View style={styles.imgFrame}>
              <Image
                source={{uri: item?.subscription.image}}
                style={styles.userImage}
              />
            </View>
            <Text style={styles.userName}>{item?.subscription.name}</Text>
            <Text style={styles.userName}>{item?.subscription.lastname}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch serachFalse="false" />
      {subscriptions?.length < 1 ? (
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
          data={subscriptions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

export default MySubscribtionsScreen;

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
  usersNull: {
    width: '100%',
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  wrapStyle: {
    marginBottom: 60,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shadowProp: {
    elevation: 7,
    shadowColor: '#785425',
    borderRadius: 8,
  },
  textEmpoty: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
  },
});
