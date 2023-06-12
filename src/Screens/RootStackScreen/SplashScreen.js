import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import SafeAreaViewContainer from '../../Elements/SafeAreaViewContainer';
import GlobalStyles from '../../Configs/GlobalStyles';
import Text from '../../Elements/Text';
import Button from '../../Elements/Button';

const SplashScreen = () => {
  let height = Dimensions.get('window').height;
  let width = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/RootScreens/mainPic.png')}
        style={[styles.backgroundImage, {width: width, height: height}]}
      />
      <SafeAreaViewContainer>
        <View
          style={[
            GlobalStyles.main__container,
            {
              justifyContent: 'space-between',
            },
          ]}>
          <Text isHeadingTitle isWhite isBold>
            Sponsor
          </Text>
          <View>
            <Text isWhite  style={styles.subtitle}>
              Welcom
            </Text>
            <Text isWhite isBold style={styles.text}>
              Fuel Your Dreams, Find Your Champion!
            </Text>
            <Button disabled style={{marginTop: 50, marginBottom: 10}}>
              <Text isWhite isBold>
                Get STarted
              </Text>
            </Button>
            <Button isTransparent disabled>
              <Text isWhite isBold>
                Register
              </Text>
            </Button>
            {/* <Button onPress={() => console.log('oo')} /> */}
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
    fontSize: 52,
  },
  text: {
    fontSize: 17,
  },
});
