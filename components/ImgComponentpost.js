import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import LikeButton from '../components/LikeButton';
import ShareButton from './ShareButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const ImgComponentpost = props => {
  const navigation = useNavigation();
  const [longDis, setLongDis] = useState(false);
  let user = props.uri;
  let img;
  if (user.image_name !== null) {
    img = {uri: user.image_path};
  } else {
    img = require('../assets/defoult.png');
  }
  let isLongDs = () => {
    setLongDis(!longDis);
  };
  let imgBG = (
    <ImageBackground
      source={img}
      resizeMode="stretch"
      style={styles.usersProfileBGimage}
    />
  );
  let userTitle;
  if (longDis === false) {
    userTitle = (
      <Text style={styles.usersTitle} numberOfLines={2}>
        {user?.title}
      </Text>
    );
  } else {
    userTitle = (
      <Text style={styles.longDis}>
        <Text>{user?.title} </Text>;
      </Text>
    );
  }
  const time = moment().startOf(user?.created_at).format('LL');
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={img} style={styles.userspic} />
        <View style={styles.inf}>
          <View style={styles.usersnames}>
            <Text style={styles.usersname}>{user.user?.name} </Text>
            <Text style={styles.usersname}>{user.user?.lastname} </Text>
            <Text style={styles.timeData}>{time} </Text>
          </View>
          <TouchableOpacity onPress={isLongDs}>{userTitle}</TouchableOpacity>
        </View>
      </View>
      {imgBG}
      <View style={styles.postIcons}>
        <LikeButton />
        <ShareButton />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CommentScreen', {
              user: user,
            })
          }>
          <Icon name={'comment-outline'} size={24} color={'#8A8A8A'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ImgComponentpost;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: 'white',
  },

  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userspic: {
    height: 32,
    width: 32,
    borderRadius: 50,
  },
  inf: {
    width: '80%',
  },
  usersname: {
    color: '#666666',
    fontSize: 14,
  },
  usersnames: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
  postIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 30,
  },
  usersTitle: {
    maxWidth: '100%',
    paddingBottom: 15,
    paddingTop: 10,
  },
  timeData: {
    maxWidth: '40%',
  },
  longDis: {
    maxWidth: '100%',
    paddingBottom: 15,
    paddingTop: 10,
  },
  usersProfileBGimage: {
    width: '100%',
    height: 170,
  },
});
