import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
// import TestSerachBar from './TestSerachBar';

const HeaderBackSearchSecond = props => {
  const navigation = useNavigation();
  const {pageTo} = props;
  console.log(props, 'ppppp');
  let content = (
    <Animatable.View
      animation="slideInDown"
      duraton="500"
      style={styles.container}>
      <LinearGradient
        style={styles.badgedIcon}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0.0, 0.9]}
        colors={['#D1C7B9', '#D2C8B9']}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
      </LinearGradient>
      <Image
        source={require('../../assets/logoHeader.png')}
        style={styles.logo}
        resizeMode="stretch"
      />
      <LinearGradient
        style={styles.searchIcon}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0.0, 0.3]}
        colors={['#cccccc', '#c4c4c4']}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(`${pageTo}`)}>
          <Icon name="search" size={24} color="black" />
        </TouchableOpacity>
      </LinearGradient>
    </Animatable.View>
  );

  return <>{content}</>;
};

export default HeaderBackSearchSecond;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: 40,
    marginVertical: 20,
  },
  logo: {
    width: 146,
  },
  badgedIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 47,
    height: 47,
    borderRadius: 5,
  },
  searchIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 47,
    height: 47,
    borderRadius: 5,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  searchbody: {
    width: '100%',
    height: 47,
    borderColor: 'silver',
    borderWidth: 1,
  },
});
