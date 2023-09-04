import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImageModal from 'react-native-image-modal';
import VideoPlayer from 'react-native-video-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ShareButton from '../Elements/ShareButton';
import LikeButton from '../Elements/LikeButton';
import ModalComponent from './PostsComponent/ModalComponent';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logoutUser} from '../../stores/user/userActions';

const UserInfo = ({user}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();

  const _checkIfGuest = async () => {
    const userAsGuest = await AsyncStorage.getItem('USER_GUEST_TOKEN');
    if (userAsGuest === 'AS_GUEST') {
      dispatch(logoutUser());
    } else {
      setModalVisible(true);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.userCard}>
        <View
          style={[
            styles.contentTitle,
            {paddingHorizontal: 15, marginBottom: 20},
          ]}>
          <View style={[styles.contentTitle, {alignItems: 'flex-start'}]}>
            <Image
              source={require('../../assets/Logo.png')}
              style={styles.coverPhoto}
            />
            <View>
              <Text style={{fontSize: 18, fontWeight: '700'}}>Sponsor</Text>
              <Text style={{fontSize: 16, color: '#5E5E5E'}}>{user.added}</Text>
            </View>
          </View>
          <View style={styles.contentTitle}>
            <TouchableOpacity onPress={_checkIfGuest}>
              <MaterialCommunityIcons name="dots-horizontal" size={25} />
            </TouchableOpacity>
            {/* <MaterialCommunityIcons
              name="close"
              size={25}
              style={{marginLeft: 10}}
            /> */}
          </View>
        </View>
        {user.files.some(file => file.type.includes('video')) ? (
          <VideoPlayer
            video={{uri: user.files[0].url}}
            style={{
              width: '100%',
              height: 250,
            }}
            autoplay={false}
            defaultMuted={true}
            fullscreen={true}
            resizeMode="contain"
          />
        ) : (
          <ImageModal
            source={{uri: user.files[0].url}}
            resizeMode="contain"
            style={{width: width, minHeight: 250}}
          />
        )}

        <View>
          <View
            style={[
              styles.contentTitle,
              {paddingHorizontal: 20, marginTop: 10},
            ]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <LikeButton
                likeCounts={user.likes}
                id={user.id}
                authLiked={user.if_like}
              />

              <Pressable
                onPress={() =>
                  navigation.navigate('CommentScreen', {post: user})
                }>
                <FontAwesome
                  name="comment-o"
                  size={25}
                  style={{marginLeft: 10}}
                />
              </Pressable>
              <Text style={{fontSize: 18}}> {user.comments} </Text>
              <ShareButton size={25} />
            </View>
          </View>

          <Text style={{paddingHorizontal: 20, marginTop: 10}}>
            {user.description}
          </Text>
        </View>
      </View>
      <ModalComponent
        id={user.id}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#CFCCCC',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginBottom: 10,
  },
  userCard: {
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  contentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coverPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
});
