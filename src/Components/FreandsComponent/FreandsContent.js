import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../Elements/Button';
import UserService from '../../http/Account/account';
import {useTranslation} from 'react-i18next';

function FreandsContent({user}) {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [folow, isFollowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const isFollow = async id => {
    setLoading(true);
    try {
      const {data} = await UserService.follow(id);
      isFollowed(true);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };
  const unFollow = async id => {
    setLoading(true);
    try {
      const {data} = await UserService.unFollow(id);
      isFollowed(false);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{width: '100%'}}>
      <View style={styles.container}>
        <View style={styles.component}>
          <Image
            source={{uri: user?.avatar}}
            style={{width: 78, height: 78, borderRadius: 45}}
          />
          <View style={{width: '70%', marginHorizontal: 10}}>
            <TouchableOpacity
              style={styles.titleContent}
              onPress={() =>
                navigation.navigate('FreandsSingleScreen', {id: user.id})
              }>
              <Text style={styles.title}>{user?.name}</Text>
              {/* <Ionicons name="md-star" color={'#4F48EC'} size={30} /> */}
            </TouchableOpacity>
            <View style={styles.titleContent}>
              <Text style={styles.email}>{user?.email}</Text>
            </View>
            <View style={styles.titleContent}>
              <Text style={[styles.email, {fontSize: 15, color: '#333'}]}>
                {t('followers')} ({user?.followers}), {t('following')} (
                {user?.followings})
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button
            isPrimary
            style={{width: '50%'}}
            onPress={() => {
              !user?.if_follow || !folow
                ? isFollow(user?.id)
                : unFollow(user?.id);
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 18,
              }}>
              {loading ? (
                <ActivityIndicator />
              ) : !user?.if_follow || !folow ? (
                t('follow')
              ) : (
                t('unfollow')
              )}
            </Text>
          </Button>
          <Button
            isTransparent
            onPress={() =>
              navigation.navigate('Home', {
                screen: 'ChatContent',
                params: {chatUser: user},
              })
            }>
            <Text
              style={{
                color: '#4F48EC',
                fontWeight: '600',
                fontSize: 18,
                paddingHorizontal: 40,
              }}>
              {t('messaging')}
            </Text>
          </Button>
        </View>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={[
          styles.scrollcontainer,
          {height: user?.categories.length > 0 ? 50 : 0, width: '100%'},
        ]}>
        {user?.categories.map(elem => {
          return (
            <View style={styles.orangeLine} key={elem.key}>
              <Text
                style={{color: '#ffffff', fontSize: 16, paddingHorizontal: 15}}>
                {elem.value}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
export default FreandsContent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#CFCCCC',
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#242424',
    fontSize: 32,
  },
  email: {
    color: '#5F5F5F',
    fontSize: 16,
  },
  titleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  orangeLine: {
    backgroundColor: '#ED7B12',
  },
  scrollcontainer: {
    flexDirection: 'row',
    backgroundColor: '#ED7B12',
    // height: 50,
    alignItems: 'center',
  },
});
