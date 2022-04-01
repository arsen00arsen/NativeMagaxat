import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const SplashScreen = ({navigation}) => {
  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#D6AB6F', '#B8B8B8', '#674C31']}
      style={styles.linearGradien}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.text}>Welcome to</Text>
        <Animatable.Image
          animation="fadeInUpBig"
          duraton="1500"
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignInScreen')}>
          <Text style={styles.textSign}>Next</Text>
          <Icon name="home-outline" color={'#FFFFFF'} size={20} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  linearGradien: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70%',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    width: 237,
    height: 57,
    justifyContent: 'space-around',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
  },
  logo: {
    width: 237,
    height: 57,
  },
});
