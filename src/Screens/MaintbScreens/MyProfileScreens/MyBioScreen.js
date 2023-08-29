import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, View, Image, StyleSheet, Text} from 'react-native';

function MyBioScreen({route}) {
  const user = route?.params?.user;
  const {t} = useTranslation();

  return (
    <ScrollView style={{padding: 15}}>
      <View style={styles.component}>
        <Image
          source={{uri: user?.avatar}}
          style={{width: 78, height: 78, borderRadius: 45}}
        />
        <View style={{width: '70%', marginHorizontal: 10}}>
          <View style={[styles.titleContent, {justifyContent: 'flex-start'}]}>
            <Text style={[styles.title, {marginRight: 10}]}>{user?.name}</Text>
            <Text style={styles.title}>{user?.last_name}</Text>
          </View>
          <View style={styles.titleContent}>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.titleContent}>
        <Text style={[styles.email, {fontSize: 15, color: '#333'}]}>
          {t('my_account_folowers')}({user?.followers}),{' '}
          {t('my_account_folower')}({user?.followings}), {t('posts')}(
          {user?.post_count})
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <Text
          style={[
            styles.email,
            {fontSize: 18, color: 'black', fontWeight: '500'},
          ]}>
          {t('date')}:
        </Text>
        <Text
          style={[styles.email, {fontSize: 16, color: '#333', marginTop: 10}]}>
          {user?.dob}
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <Text
          style={[
            styles.email,
            {fontSize: 18, color: 'black', fontWeight: '500'},
          ]}>
          {t('bio')}:
        </Text>
        <Text
          style={[styles.email, {fontSize: 16, color: '#333', marginTop: 10}]}>
          {user?.bio}
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <Text
          style={[
            styles.email,
            {fontSize: 18, color: 'black', fontWeight: '500'},
          ]}>
          {t('profession')}:
        </Text>
        <Text
          style={[styles.email, {fontSize: 16, color: '#333', marginTop: 10}]}>
          {user?.profession}
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <Text
          style={[
            styles.email,
            {fontSize: 18, color: 'black', fontWeight: '500'},
          ]}>
          {t('education')}:
        </Text>
        <Text
          style={[styles.email, {fontSize: 16, color: '#333', marginTop: 10}]}>
          {user?.education}
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <Text
          style={[
            styles.email,
            {fontSize: 18, color: 'black', fontWeight: '500'},
          ]}>
          {t('country')}:
        </Text>
        <Text
          style={[styles.email, {fontSize: 16, color: '#333', marginTop: 10}]}>
          {user?.country}
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <Text
          style={[
            styles.email,
            {fontSize: 18, color: 'black', fontWeight: '500'},
          ]}>
          {t('phoneNumber')}:
        </Text>
        <Text
          style={[styles.email, {fontSize: 16, color: '#333', marginTop: 10}]}>
          {user?.phone}
        </Text>
      </View>
    </ScrollView>
  );
}
export default MyBioScreen;

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
