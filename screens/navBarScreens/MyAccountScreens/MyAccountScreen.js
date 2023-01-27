import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import MyaccountUsserInfor from '../../../components/MyaccountUsserInfor';
import {loadMyPosts} from '../../../stores/profileMe/profileMeActions';
import {useTranslation} from 'react-i18next';

const MyAccountScreen = ({navigation}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {myPosts} = useSelector(state => state?.myPosts);
  useEffect(() => {
    dispatch(loadMyPosts());
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch serachFalse="false" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: '100%', paddingHorizontal: 5}}>
        <View style={styles.user}>
          <View>
            <MyaccountUsserInfor />
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('GeneralScreen')}>
          <Text style={styles.buttonText}>{t('my_account_general')}</Text>
          <Icon name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('MyPostsScreen', {
              posts: myPosts,
            })
          }>
          <Text style={styles.buttonText}>{t('my_account_posts')}</Text>
          <Icon name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MySubscribtionsScreen')}>
          <Text style={styles.buttonText}>{t('my_account_folowers')}</Text>
          <Icon name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MySubscribersScreen')}>
          <Text style={styles.buttonText}>{t('my_account_folower')}</Text>
          <Icon name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SettingsScreen')}>
          <Text style={styles.buttonText}>{t('my_account_settings')}</Text>
          <Icon name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MyAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingHorizontal: 5,
    paddingTop: 15,
    backgroundColor: '#f7f7f7',

    height: '100%',
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: '400',
    color: '#727272',
  },
  userDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  userImage: {
    width: 103,
    height: 103,
    borderRadius: 999,
    borderColor: '#E6E6E6',
    borderWidth: 3,
  },
  button: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 45,
    marginBottom: 20,
  },
  buttonText: {
    color: '#303030',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
