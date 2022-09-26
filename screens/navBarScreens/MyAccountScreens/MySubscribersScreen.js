import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import MyaccountUsserInfor from '../../../components/MyaccountUsserInfor';
import {loadMyPosts} from '../../../stores/profileMe/profileMeActions';
import {useIsFocused} from '@react-navigation/native';
const MySubscribersScreen = () => {
  const isFocused = useIsFocused();
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const users = useSelector(state => state?.myPosts);

  useEffect(() => {
    if (isFocused) {
      dispatch(loadMyPosts());
    }
  }, [isFocused]);

  let content = users?.myPosts.subscribers?.map(elem => {
    return (
      <View key={elem.id} style={styles.users}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('MyPageUsersAccount', {
              user: elem.subscriber,
            })
          }>
          <View style={[styles.userProfile, styles.shadowProp]}>
            <View style={styles.imgFrame}>
              <Image
                source={{uri: elem?.subscriber.image}}
                style={styles.userImage}
              />
            </View>
            <Text style={styles.userName}>{elem?.subscriber.name}</Text>
            <Text style={styles.userName}>{elem?.subscriber.lastname}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#F2F2F2"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch />
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        <View style={styles.wrapStyle}>
          <View style={{marginBottom: 20}}>
            <MyaccountUsserInfor />
          </View>
          {users?.length < 1 ? (
            <View style={styles.users}>
              <Text style={styles.textEmpoty}>
                You havn`t any subscribers yet
              </Text>
            </View>
          ) : (
            content
          )}
        </View>
      </ScrollView>
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
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
  users: {
    width: '100%',
    marginBottom: 10,
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
