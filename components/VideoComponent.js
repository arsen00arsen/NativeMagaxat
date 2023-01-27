import React, {useState, memo, useRef} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';
import LikeButton from '../components/LikeButton';
import ShareButton from './ShareButton';
import {removeMyPosts} from '../stores/profileMe/profileMeActions';
import {useDispatch} from 'react-redux';
import RadiusButton from './RadiusButton';
import {useTranslation} from 'react-i18next';
import armLocale from 'moment/locale/hy-am';
import ruLocale from 'moment/locale/ru';
import enLocale from 'moment/locale/en-in';
import i18next from 'i18next';

const VideoComponent = props => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const [longDis, setLongDis] = useState(false);
  let user = props?.uri.user;
  let post = props?.uri;
  let likeCounts = post?.likes?.length + 1;
  let postCounts = post.comments?.length;
  const lang = i18next.language;

  if (lang === 'ru') {
    moment.locale('ru', [ruLocale]);
  } else if (lang === 'hy') {
    moment.locale('hy-am', [armLocale]);
  } else {
    moment.locale('en-in', [enLocale]);
  }

  let isLongDs = () => {
    setLongDis(!longDis);
  };
  let userTitle;
  if (longDis === false) {
    userTitle = (
      <Text style={styles.usersTitle} numberOfLines={2}>
        {post?.title === 'undefined' ? null : post?.title}
      </Text>
    );
  } else {
    userTitle = (
      <Text style={styles.longDis}>
        {post?.title === 'undefined' ? null : post?.title}
      </Text>
    );
  }
  const userProfilePage = () => {
    navigation.navigate('AccounProfiletScreen', {
      id: user?.id,
    });
  };
  const deletePost = () => {
    dispatch(removeMyPosts(post?.id));
    alert(`${t('postDelete')}`);
  };

  const time = moment(
    moment(props?.uri.created_at, 'DD/MM/YYYY HH:mm').format(
      'YYYY-MM-DD HH:mm:ss',
    ),
  ).fromNow();
  return (
    <View style={styles.post__container}>
      <View style={styles.post__header}>
        <View style={styles.post__author}>
          <TouchableOpacity onPress={userProfilePage}>
            <View style={styles.post__author__avatar__view}>
              <Image
                source={{uri: user?.image}}
                style={styles.post__author__avatar}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={userProfilePage}>
            <View style={styles.post__author__name}>
              <Text style={styles.post__author__name__text}>
                {user?.name || props?.user?.name}{' '}
                {user?.lastname || props?.user?.lastname}
              </Text>
              <Text style={styles.post__date}>{time}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {props.post === 'post' ? (
          <TouchableOpacity style={styles.delete} onPress={deletePost}>
            <Icon name="delete-circle-outline" color="red" size={32} />
          </TouchableOpacity>
        ) : null}
        <View style={styles.post__date__view}>
          <View style={styles.post__report}>
            {props?.isMyne === true ? null : (
              <RadiusButton id={post.id} types="post" />
            )}
          </View>
        </View>
      </View>
      <View style={[styles.post__content, {zIndex: -1}]}>
        {post?.title && (
          <TouchableOpacity onPress={isLongDs}>{userTitle}</TouchableOpacity>
        )}
        <View style={styles.post__content__media__view}>
          <ImageBackground
            style={styles.post__content__media}
            source={{uri: props?.uri.image_path || props?.uri.image}}
            blurRadius={90}>
            <View style={styles.post__media__view}>
              <VideoPlayer
                resizeMode={'contain'}
                ref={videoRef}
                video={{uri: props?.uri?.video}}
                autoplay={false}
                defaultMuted={false}
                thumbnail={{uri: props?.uri?.video_name}}
                style={styles.post__media}
                fullscreen={true}
                videoWidth={100}
                // controls={true}
                // resizeMode="contain"
              />
            </View>
          </ImageBackground>
        </View>
      </View>
      {props.post === 'post' ? null : (
        <LinearGradient
          style={styles.post__actions}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0.3, 0.9]}
          colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.8)']}>
          <LikeButton
            likeCounts={likeCounts}
            id={post.id}
            authLiked={post.authLiked}
          />
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() =>
              navigation.navigate('CommentScreen', {
                description: post?.title,
                post: post.comments,
                user: user,
                image: user.image,
                id: post.id,
                img: props?.uri.image_path || props?.uri.image,
              })
            }>
            <Ionicons
              name={'ios-chatbubble-ellipses'}
              size={20}
              color={'#c5c3c3'}
            />
            <Text style={styles.comments__count}>
              {postCounts !== 0 ? postCounts : null}{' '}
            </Text>
          </TouchableOpacity>
          <View style={styles.shareButton}>
            <ShareButton size={24} />
          </View>
        </LinearGradient>
      )}
    </View>
  );
};
export default memo(VideoComponent);

const styles = StyleSheet.create({
  post__container: {
    backgroundColor: '#fff',
    padding: 15,
    paddingBottom: 0,
    overflow: 'hidden',
    //borderRadius: 8,
    marginTop: 5,
  },
  post__header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  post__author: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  post__author__avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  post__author__name: {
    marginLeft: 10,
  },
  post__author__name__text: {
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#555',
  },
  post__date__view: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    textAlign: 'justify',
  },
  post__date: {
    fontSize: 11,
    marginTop: 3,
    marginRight: 11,
    color: '#555',
  },
  post__content__text: {
    fontSize: 15,
    marginBottom: 15,
    color: '#555',
  },
  post__content__media__view: {
    marginHorizontal: -15,
  },
  post__content__media: {
    width: '100%',
    height: 200,
  },
  post__media__view: {
    //borderRadius: 8,
    overflow: 'hidden',
  },
  post__media: {
    minWidth: '100%',
    height: 200,
    backgroundColor: 'transparent',
  },
  post__actions: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  comments__count: {
    marginLeft: 5,
    fontWeight: '700',
    fontSize: 16,
    color: '#727272',
  },
});
