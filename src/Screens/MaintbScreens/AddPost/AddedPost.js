import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SafeAreaViewContainer from '../../../Elements/SafeAreaViewContainer';
import Button from '../../../Elements/Button';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const AddedPost = ({navigation}) => {
  const {t} = useTranslation();
  const {user} = useSelector(state => state.user);
  return (
    <View style={styles.container}>
      <SafeAreaViewContainer>
        <View style={{height: '80%', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.mainTitle}>
              {t('thank_you')} {user.name}!
            </Text>
            <Text style={styles.subTitle}>{t('added_post_text1')}</Text>
            <Text style={styles.subTitle}>{t('added_post_text2')}</Text>
          </View>
          <Button
            style={{marginTop: 50, marginBottom: 10}}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonTitle}>{t('back_home')}</Text>
          </Button>
        </View>
      </SafeAreaViewContainer>
    </View>
  );
};

export default AddedPost;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  mainTitle: {
    color: '#ED7B12',
    fontSize: 24,
    fontWeight: '700',
  },
  subTitle: {
    color: '#52525B',
    fontSize: 17,
    marginTop: 10,
  },
  buttonTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});
