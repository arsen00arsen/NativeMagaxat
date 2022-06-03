import React, {useState, memo} from 'react';
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
import {removeMyPosts} from '../stores/profileMe/profileMeActions';
import {useDispatch} from 'react-redux';

const ImgComponentpost = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [longDis, setLongDis] = useState(false);
  let user = props.uri?.user;
  let post = props?.uri;
  let postCounts = post.comments?.length;
  let isLongDs = () => {
    setLongDis(!longDis);
  };

  let imgBG = (
    <ImageBackground
      source={{uri: props?.uri.image_path || props?.uri.image}}
      resizeMode="stretch"
      style={styles.usersProfileBGimage}
    />
  );
  let userTitle;
  if (longDis === false) {
    userTitle = (
      <Text style={styles.usersTitle} numberOfLines={2}>
        {post?.title}
      </Text>
    );
  } else {
    userTitle = (
      <Text style={styles.longDis}>
        <Text> {post?.title} </Text>;
      </Text>
    );
  }
  let likeCounts = post?.likes?.length + 1;
  const time = moment().startOf(user?.created_at).format('LL');
  const userProfilePage = () => {
    navigation.navigate('AccounProfiletScreen', {
      id: user?.user.id,
    });
  };
  let img;
  if (!user?.image) {
    img = props.user.image;
  } else {
    img = user?.image;
  }
  const deletePost = () => {
    dispatch(removeMyPosts(post?.id));
  };
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <TouchableOpacity onPress={userProfilePage}>
          <Image source={{uri: img}} style={styles.userspic} />
        </TouchableOpacity>
        <View style={styles.inf}>
          <View style={styles.usersnames}>
            {props.post === 'post' ? (
              <TouchableOpacity style={styles.delete} onPress={deletePost}>
                <Icon name="delete-circle-outline" color="red" size={32} />
              </TouchableOpacity>
            ) : null}
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={styles.usersname}>
                {user?.name || props?.user.name}{' '}
              </Text>
              <Text style={styles.usersname}>
                {user?.lastname || props?.user.lastname}{' '}
              </Text>
            </View>
            <Text style={styles.timeData}>{time} </Text>
          </View>
          <TouchableOpacity onPress={isLongDs}>{userTitle}</TouchableOpacity>
        </View>
      </View>
      {imgBG}
      {props.post === 'post' ? null : (
        <View style={styles.postIcons}>
          <LikeButton
            likeCounts={likeCounts}
            id={post.id}
            authLiked={post.authLiked}
          />
          <View style={styles.shareButton}>
            <ShareButton />
          </View>
          <TouchableOpacity
            style={styles.imgCount}
            onPress={() =>
              navigation.navigate('CommentScreen', {
                description: user.title,
                post: post.comments,
                user: user,
                image: user.image,
                id: post.id,
                img: props?.uri.image_path || props?.uri.image,
              })
            }>
            <Icon name={'comment-outline'} size={24} color={'#8A8A8A'} />
            <Text>{postCounts} </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default memo(ImgComponentpost);

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
    height: 52,
    width: 52,
    borderRadius: 50,
  },
  inf: {
    width: '80%',
  },
  usersname: {
    color: '#666666',
    fontSize: 16,
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
    marginTop: 20,
    paddingBottom: 10,
  },
  usersTitle: {
    maxWidth: '100%',
    paddingBottom: 15,
    paddingTop: 10,
  },
  timeData: {
    maxWidth: '40%',
    fontSize: 12,
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
  shareButton: {
    marginBottom: 20,
  },
  imgCount: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
  },
});