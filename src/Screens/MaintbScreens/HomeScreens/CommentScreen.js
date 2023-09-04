import React, {useEffect, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  SectionList,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import VideoPlayer from 'react-native-video-player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';
import PostService from '../../../http/Post/post';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../../../stores/user/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommentScreen = ({route}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const post = route?.params?.post;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState([]);
  const {control, handleSubmit, reset, setValue} = useForm({});
  useEffect(() => {
    getComments();
  }, [post]);

  const submitFormHandler = handleSubmit(async comment => {
    try {
      const {data} = await PostService.sendComment({
        model_id: post.id,
        model_type: 'App\\Models\\Post',
        ...comment,
        parent_id: null,
      });
      reset({}, {keepValues: false});
      setComments([...comments, data.data]);
    } catch (error) {
      console.log(error);
    }
  });

  const getComments = async () => {
    const userAsGuest = await AsyncStorage.getItem('USER_GUEST_TOKEN');
    if (userAsGuest === 'AS_GUEST') {
      dispatch(logoutUser());
    } else {
      setLoading(true);
      try {
        const {data} = await PostService.getComments({id: post?.id, page: 1});
        setComments(data.data);
      } catch (err) {
        console.log(err.response);
      } finally {
        setLoading(false);
      }
    }
  };
  const onEndReached = async () => {
    setPage(page + 1);
    try {
      const {data} = await PostService.getComments({
        id: post?.id,
        page: page + 1,
      });
      if (data.links.last_page > page) {
        setComments([...comments, ...data.data]);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          borderRadius: 8,
          padding: 5,
          marginBottom: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: item.avatar}} style={styles.coverPhoto} />
          <View>
            <Text style={{fontSize: 14, color: 'black'}}>{item.user}</Text>
            <Text style={{fontSize: 12, color: '#5E5E5E'}}>{post.added}</Text>
          </View>
        </View>
        <Text
          style={{fontSize: 14, color: 'black', marginTop: 10, marginLeft: 10}}>
          {item.comment}
        </Text>
      </View>
    );
  };

  if (loading && page === 1) {
    return (
      <View style={styles.loadings}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'position' : null}>
      <View style={styles.container} keyboardShouldPersistTaps="handled">
        <SectionList
          style={{
            width: '100%',
            height: '100%',
          }}
          contentContainerStyle={{
            justifyContent: 'space-between',
          }}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={() => (
            <>
              <View>
                <Text style={{fontSize: 18, fontWeight: '700'}}>Sponsor</Text>
                <Text
                  style={{fontSize: 16, color: '#5E5E5E', paddingBottom: 15}}>
                  {post.added}
                </Text>
              </View>
              {post.files.some(file => file.type.includes('video')) ? (
                <VideoPlayer
                  video={{uri: post.files[0].url}}
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
                <Image
                  source={{uri: post.files[0].url}}
                  style={{width: '100%', minHeight: 250, resizeMode: 'cover'}}
                />
              )}

              <Text style={{paddingHorizontal: 20, marginTop: 10}}>
                {post.bio}
              </Text>
            </>
          )}
          renderItem={() => (
            <>
              {comments.length > 0 ? (
                <FlatList
                  contentContainerStyle={{flexGrow: 1}}
                  data={comments}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                  onEndReached={onEndReached}
                  onEndReachedThreshold={0.5}
                />
              ) : (
                <View style={{height: 200}} />
              )}
            </>
          )}
          renderSectionFooter={() => (
            <View style={styles.inner}>
              <Controller
                control={control}
                name={'comment'}
                secureTextEntry={false}
                render={({
                  field: {value, onChange, onBlur},
                  fieldState: {error: _error},
                }) => (
                  <TextInput
                    style={styles.textinput}
                    placeholder={t('addComment')}
                    multiline
                    secureTextEntry={false}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <TouchableOpacity onPress={submitFormHandler}>
                <Icon
                  name="send-circle"
                  size={54}
                  color="#4F48EC"
                  style={{marginBottom: 5, marginRight: 5}}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
const SECTIONS = [
  {
    data: [
      {
        key: '1',
      },
    ],
  },
];
export default CommentScreen;
const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 100,
  },
  coverPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  inner: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
    justifyContent: 'space-between',
  },
  textinput: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    maxHeight: 150,
    height: 60,
    width: '80%',
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
});
