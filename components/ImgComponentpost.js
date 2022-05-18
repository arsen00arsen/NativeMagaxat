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
// import moment from 'moment';

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
        <Text style={styles.usersTitle}>{user?.title} </Text>;
      </Text>
    );
  }
  // const time = moment().startOf(user?.created_at).format('LL');
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={img} style={styles.userspic} />
        <Text style={styles.usersname}>{user?.user_name} </Text>
        <TouchableOpacity onPress={isLongDs}>{userTitle}</TouchableOpacity>
        {/* <Text style={styles.timeData}>{time} </Text> */}
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
    height: 292,
    marginTop: 20,
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'white',
    aspectRatio: 1.2,
  },

  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 17,
    paddingBottom: 17,
  },
  userspic: {
    height: 32,
    width: 32,
    borderRadius: 50,
  },
  usersname: {
    color: '#666666',
    paddingLeft: 10,
    fontSize: 14,
  },
  postIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  usersTitle: {
    maxWidth: '80%',
  },
  timeData: {
    maxWidth: '20%',
  },
  longDis: {
    marginTop: 10,
  },
  usersProfileBGimage: {
    width: '100%',
    height: 170,
  },
});
