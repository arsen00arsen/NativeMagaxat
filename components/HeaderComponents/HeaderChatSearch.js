import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native';

import IconSearch from 'react-native-vector-icons/Feather';
// const BadgedIcon = withBadge(2)(Icon);

const HeaderChatSearch = props => {
  const navigation = useNavigation();
  let count = props.count;
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <LinearGradient
        style={styles.badgedIcon}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0.3, 0.8]}
        colors={['#fff', '#fff']}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MessageStack')}>
          <Icon name="message-circle" size={24} color="#606163" />
          {count === 0 ? null : (
            <View style={styles.titlebg}>
              <Text style={styles.text}>{count}</Text>
            </View>
          )}
        </TouchableOpacity>
      </LinearGradient>
      <Image
        source={require('../../assets/logoHeader.png')}
        style={styles.logo}
      />
      <LinearGradient
        style={styles.searchIcon}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0.3, 0.8]}
        colors={['#fff', '#fff']}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PostSearch')}>
          <IconSearch name="search" size={24} color="#606163" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default HeaderChatSearch;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 5,
    marginTop: Platform.OS === 'ios' ? 33 : 0,
  },
  logo: {
    width: 150,
    height: 37,
    marginHorizontal: 45,
  },
  badgedIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 47,
    height: 47,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  searchIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 47,
    height: 47,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  titlebg: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 2,
    top: 2,
    backgroundColor: 'red',
    width: 22,
    borderRadius: 10,
    opacity: 0.6,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    opacity: 5,
  },
});
