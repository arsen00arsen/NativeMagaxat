import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import IconSearch from 'react-native-vector-icons/Feather';
// const BadgedIcon = withBadge(2)(Icon);

const HeaderBackSearch = props => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
      />
      {props.serachFalse === 'false' ? (
        <View style={styles.empoty} />
      ) : (
        <LinearGradient
          style={styles.searchIcon}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0.0, 0.3]}
          colors={['#cccccc', '#c4c4c4']}>
          <IconSearch name="search" size={24} color="black" />
        </LinearGradient>
      )}
    </View>
  );
};

export default HeaderBackSearch;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: Platform.OS === 'ios' ? 33 : 10,
  },
  logo: {
    width: 156,
    height: 37,
    marginHorizontal: 45,
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
  empoty: {
    width: 30,
  },
});
