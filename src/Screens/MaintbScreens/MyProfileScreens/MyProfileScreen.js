import React, {useState, useEffect} from 'react';
import {Pressable, Text, StyleSheet, View, ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ProfileInfo from '../../../Components/Profile/ProfileInfo';
import DeleteAccountModal from '../../../Components/Profile/DeleteAccountModal';
import LogOutModal from '../../../Components/Profile/LogOutModal';
import UserService from '../../../http/Account/account';

function MyProfileScreen({navigation}) {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [logOutModal, setLogOutModal] = useState(false);
  const [user, setUserInfos] = useState();

  useEffect(() => {
    if (isFocused) {
      userInfo();
    }
  }, [isFocused]);
  const userInfo = async () => {
    try {
      const {data} = await UserService.getMe();
      setUserInfos(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProfileInfo user={user} t={t} />
        <View style={styles.component}>
          <Pressable
            style={styles.botton}
            onPress={() => navigation.navigate('Language')}>
            <Text style={styles.title}>{t('language_title')}</Text>
            <Ionicons
              name="ios-chevron-forward-sharp"
              color={'#B5B5BE'}
              size={20}
            />
          </Pressable>
          <Pressable
            style={styles.botton}
            onPress={() => navigation.navigate('MyBio', {user: user})}>
            <Text style={styles.title}>{t('bio')}</Text>
            <Ionicons
              name="ios-chevron-forward-sharp"
              color={'#B5B5BE'}
              size={20}
            />
          </Pressable>
          <Pressable
            style={styles.botton}
            onPress={() =>
              navigation.navigate('MyPosts', {posts: user?.patrons})
            }>
            <Text style={styles.title}>{t('my_account_posts')}</Text>
            <Ionicons
              name="ios-chevron-forward-sharp"
              color={'#B5B5BE'}
              size={20}
            />
          </Pressable>
          <Pressable
            style={styles.botton}
            onPress={() => navigation.navigate('SuportScreen')}>
            <Text style={styles.title}>{t('support')}</Text>
            <Ionicons
              name="ios-chevron-forward-sharp"
              color={'#B5B5BE'}
              size={20}
            />
          </Pressable>
          <Pressable
            style={styles.botton}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.title}>{t('delete_account')}</Text>
            <Ionicons
              name="ios-chevron-forward-sharp"
              color={'#B5B5BE'}
              size={20}
            />
          </Pressable>
          <Pressable style={styles.botton} onPress={() => setLogOutModal(true)}>
            <Text style={styles.title}>{t('sign_out')}</Text>
            <Feather name="log-out" color={'#B5B5BE'} size={20} />
          </Pressable>
        </View>
        <DeleteAccountModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <LogOutModal
          modalVisible={logOutModal}
          setModalVisible={setLogOutModal}
        />
      </View>
    </ScrollView>
  );
}
export default MyProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  component: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  botton: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#C6C6C8',
  },
  title: {
    color: '#000000',
    fontSize: 16,
  },
});
