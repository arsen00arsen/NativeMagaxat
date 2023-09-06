import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {useTranslation} from 'react-i18next';
import SafeAreaViewContainer from '../../Elements/SafeAreaViewContainer';
import GlobalStyles from '../../Configs/GlobalStyles';
import Text from '../../Elements/Text';
import Button from '../../Elements/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {requestUserPermission} from '../../utils/requestUserPermission';

const SplashScreen = ({navigation}) => {
  const {t} = useTranslation();
  let height = Dimensions.get('window').height;
  let width = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const signInAsGuest = async () => {
    await AsyncStorage.setItem('USER_GUEST_TOKEN', 'AS_GUEST');
    try {
      const userAsGuest = await AsyncStorage.getItem('USER_GUEST_TOKEN');
      dispatch({type: 'LOGIN_AS_GUEST', payload: userAsGuest});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/RootScreens/mainPic.png')}
        style={[styles.backgroundImage, {width: width, height: height}]}
      />
      <View
        style={[
          styles.backgroundImage,
          {
            backgroundColor: 'black',
            opacity: 0.5,
            width: width,
            height: height,
          },
        ]}
      />
      <SafeAreaViewContainer>
        <View
          style={[
            GlobalStyles.main__container,
            {
              justifyContent: 'space-between',
            },
          ]}>
          {/* <Text isHeadingTitle isWhite isBold>
            Sponsor
          </Text> */}
          <Image
            source={require('../../../assets/RootScreens/logoWhite.png')}
            style={[{height: 30, width: 200}]}
          />
          <View>
            <Text isWhite style={styles.subtitle}>
              {t('xelcomTo')}
            </Text>
            <Text isWhite isBold style={styles.text}>
              {t('fuel_dreams')}
            </Text>
            <Button
              style={{marginTop: 50, marginBottom: 10}}
              onPress={() => {
                navigation.navigate('SignIn'), requestUserPermission();
              }}>
              <Text isWhite isBold>
                {t('get_started')}
              </Text>
            </Button>
            <Button
              isTransparent
              onPress={() => {
                navigation.navigate('Registration'), requestUserPermission();
              }}>
              <Text isWhite isBold>
                {t('registracion')}
              </Text>
            </Button>
            <Button
              isTransparent
              style={{marginTop: 10, marginBottom: 10}}
              onPress={signInAsGuest}>
              <Text isWhite isBold>
                {t('as_guest')}
              </Text>
            </Button>
          </View>
        </View>
      </SafeAreaViewContainer>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 32,
    color: 'white',
  },
  subtitle: {
    // fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 48,
  },
  text: {
    fontSize: 17,
  },
});
