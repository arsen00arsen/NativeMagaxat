import React, {useState, memo, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import ImageModal from 'react-native-image-modal';
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';
import {removeMyPosts} from '../stores/profileMe/profileMeActions';
import RadiusButton from './RadiusButton';
import {useTranslation} from 'react-i18next';
import {PostService} from '../http/postService/postService';

const ImgComponentpost = props => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [longDis, setLongDis] = useState(false);
  let user = props.uri?.user;
  let post = props?.uri;
  let postCounts = post.comments?.length;
  let isLongDs = () => {
    setLongDis(!longDis);
  };
  const [width, setWidth] = useState(380);
  const [height, setHeight] = useState(380);

  useEffect(() => {
    Image.getSize(
      props?.uri?.image_path || props?.uri?.image,
      (width, height) => {
        const screenWidth = Dimensions.get('window').width;
        const scaleFactor = width / screenWidth;
        const imageHeight = height / scaleFactor;
        setWidth(screenWidth);
        setHeight(imageHeight);
      },
    );
    return () => {
      setWidth(0), setHeight(0);
    };
  }, []);
  let imgBG = (
    <Image
      resizeMode="cover"
      // style={styles.post__media}
      style={{
        width: width + 20,
        height: height,
        marginHorizontal: -10,
      }}
      // swipeToDismiss={false}
      // modalImageStyle={{
      //   borderTopRightRadius: 10,
      // }}
      source={{uri: props?.uri?.image_path || props?.uri?.image}}
    />
  );
  let userTitle;
  if (longDis === false) {
    userTitle = (
      <Text style={[styles.usersTitle, {marginBottom: 5}]} numberOfLines={2}>
        {post?.title === 'undefined' ? null : post?.title}
      </Text>
    );
  } else {
    userTitle = (
      <Text style={[styles.longDis, {marginBottom: 5}]}>
        {post?.title === 'undefined' ? null : post?.title}
      </Text>
    );
  }
  let likeCounts = post?.likes?.length + 1;

  const userProfilePage = () => {
    navigation.navigate('AccounProfiletScreen', {
      id: user?.id,
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
    alert(`${t('postDelete')}`);
    navigation.navigate('MyAccountScreen');
  };
  const time = moment(
    moment(props?.uri.created_at, 'DD/MM/YYYY HH:mm').format(
      'YYYY-MM-DD HH:mm:ss',
    ),
  ).fromNow();
  const sharePost = async () => {
    const {data} = await PostService.sharePost(props?.uri?.id);
    try {
      alert(t('postShared'));
    } catch (error) {
      alert('Reposted Error');
    }
  };

  return (
    <View style={styles.post__container}>
      <View style={styles.post__header}>
        <View style={styles.post__author}>
          <TouchableOpacity onPress={userProfilePage}>
            <View style={styles.post__author__avatar__view}>
              <Image source={{uri: img}} style={styles.post__author__avatar} />
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
            <Icon name="delete-circle-outline" color="#c5c3c3" size={32} />
          </TouchableOpacity>
        ) : null}
        {props.post !== 'post' ? (
          <View style={styles.post__date__view}>
            <View style={styles.post__report}>
              {props?.isMyne === true ? null : (
                <RadiusButton id={post.id} types="post" />
              )}
            </View>
          </View>
        ) : null}
      </View>
      <View style={[styles.post__content, {zIndex: -1}]}>
        {post?.title !== 'undefined' && (
          <TouchableOpacity onPress={isLongDs}>{userTitle}</TouchableOpacity>
        )}
        <View style={styles.post__content__media__view}>
          <View style={styles.post__media__view}>{imgBG}</View>
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
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => sharePost()}>
            <Ionicons name={'duplicate'} size={20} color={'#c5c3c3'} />
          </TouchableOpacity>
          <View style={styles.shareButton}>
            <ShareButton size={24} />
          </View>
        </LinearGradient>
      )}
    </View>
  );
};
export default memo(ImgComponentpost);

const styles = StyleSheet.create({
  post__container: {
    backgroundColor: '#fff',
    padding: 15,
    paddingBottom: 0,
    overflow: 'hidden',
    //borderRadius: 8,
    marginTop: 5,
    zIndex: -1,
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
  usersTitle: {
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
    overflow: 'hidden',
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
