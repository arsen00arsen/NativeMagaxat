import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import IconSearch from 'react-native-vector-icons/Feather';
import moment from 'moment';
// const BadgedIcon = withBadge(2)(Icon);

const ChatHeader = props => {
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
         <View style={styles.userChat}>
            {console.log(props)}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AccounProfiletScreen', {
                  id: props?.user.uid,
                })
              }>
              <Image
                source={{uri: props?.user.image}}
                resizeMode="center"
                style={styles.usersProfileBGimage}
              />
            </TouchableOpacity>
            <View style={styles.chatTitle}>
              <Text style={styles.paramsName}>{props?.user?.name}</Text>
              <Text style={styles.status}>
                {moment(props?.user?.status).fromNow()}
              </Text>
            </View>
          </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  badgedIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 47,
    height: 47,
    borderRadius: 5,
  },
  logo: {
    width: 146,
  },
  logoContainer: {
    paddingTop: 10,
  },
  paramsName: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  chatTitle: {
    display: 'flex',
    flexDirection: 'column',
  },
  usersProfileBGimage: {
    width: 44,
    height: 44,
    borderRadius: 50,
    marginRight: 30,
  },
  userChat: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
});
