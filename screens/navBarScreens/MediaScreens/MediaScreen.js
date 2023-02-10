import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import VideoPlayer from 'react-native-video-player';
import {useTranslation} from 'react-i18next';
import PostIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderBackSearchSecond from '../../../components/HeaderComponents/HeaderBackSearchSecond';
import MediaContent from '../../../components/MediaContent';
import {setSinglePost} from '../../../stores/post/postActions';
import {baseUrl2} from '../../../http';

const MediaScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user.user);
  const [image, setImage] = useState(null);
  const [selected, setSelected] = useState(false);
  const [singleFile, setSingleFile] = useState(null);
  const [load, setLoad] = useState();
  const {control, handleSubmit, reset} = useForm();
  const options = {
    title: 'Select video',
    mediaType: 'video',
    path: 'video',
    quality: 1,
  };

  const options2 = {
    title: 'Image Picker',
    mediaType: 'photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const submitFormHandler = handleSubmit(async title => {
    const fileToUpload = singleFile;
    const fdata = new FormData();
    fdata.append(image.type === 'image' ? 'image_path' : 'video_path', {
      uri: fileToUpload.uri,
      type: fileToUpload.type,
      name: fileToUpload.fileName,
    });
    fdata.append('title', title.title);

    try {
      setLoad('true');
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(baseUrl2 + '/posts_api', {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
        body: fdata,
      });
      const data = await res.json();
      setLoad('false');
      dispatch(setSinglePost(data));
      setLoad('false');
      setSelected(!selected);
      reset({}, {keepValues: false});
      navigation.navigate('HomeScreen');
    } catch (error) {
      alert(error.message);
    } finally {
    }
  });

  const selectFile = async () => {
    setImage({type: 'image'});
    setSelected(true);
    try {
      const res = await launchImageLibrary(options2);
      if (res.assets[0].fileSize < 2097152) {
        setSingleFile(res.assets[0]);
        setImage({uri: res.assets[0].uri, type: 'image'});
      } else {
        alert(`${t('maksSizeOfImage')}`);
        setSelected(false);
      }
    } catch (err) {
      setSingleFile(null);
      setSelected(false);
    }
  };

  const selectFileVideo = async () => {
    setImage({type: 'video'});
    setSelected(true);
    try {
      const res = await launchImageLibrary(options);
      if (res.assets[0].fileSize < 10485760) {
        setSingleFile(res.assets[0]);
        setImage({uri: res.assets[0].uri, type: 'video'});
      } else {
        alert(`${t('maksSizeOfVideo')}`);
        setSelected(false);
      }
    } catch (err) {
      setSelected(false);
      setSingleFile(null);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearchSecond pageTo={'MediaSearch'} />
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <View style={styles.postContainer}>
          <View
            style={[selected !== true ? styles.postBody : styles.postUnheight]}>
            <View style={styles.addPost}>
              <View style={styles.imgBody}>
                <Image style={styles.img} source={{uri: user?.image}} />
              </View>
              <Controller
                control={control}
                name="title"
                render={({field: {onChange, value, onBlur}}) => {
                  return (
                    <TextInput
                      placeholder={t('addPost')}
                      value={value}
                      style={styles.textInput}
                      multiline
                      onChangeText={onChange}
                      underlineColorAndroid="white"
                    />
                  );
                }}
              />
            </View>
            {selected !== false && image !== null ? (
              <>
                {image.type == 'image' ? (
                  <View>
                    {load === 'true' ? (
                      <ActivityIndicator style={styles.io} />
                    ) : (
                      <Image source={{uri: image?.uri}} style={styles.io} />
                    )}
                  </View>
                ) : (
                  <View>
                    {load === 'true' ? (
                      <ActivityIndicator style={styles.io} />
                    ) : (
                      <VideoPlayer
                        video={{uri: image?.uri}}
                        //thumbnail=
                        autoplay={true}
                        defaultMuted={true}
                        style={styles.io}
                        fullscreen={true}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                )}
                <View style={styles.uploadImgVedio}>
                  <TouchableOpacity
                    style={styles.postImg}
                    onPress={submitFormHandler}>
                    <PostIcons name="post-add" size={24} color="#1f1f1f" />
                    <Text style={styles.textAdd}>{t('addPostButton')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.postVedio}
                    onPress={() => setSelected(false)}>
                    <PostIcons name="cancel" size={24} color="#1f1f1f" />
                    <Text style={styles.textAdd}>{t('cancel')}</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.addImgVedio}>
                <TouchableOpacity
                  style={styles.postImg}
                  onPress={() => selectFile()}>
                  <Icon name="camera" size={24} color="#1f1f1f" />
                  <Text style={styles.textAdd}>{t('addImage')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.postVedio}
                  onPress={selectFileVideo}>
                  <Icon name="video-camera" size={24} color="#1f1f1f" />
                  <Text style={styles.textAdd}>{t('addVideo')}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <MediaContent />
        </View>
      </ScrollView>
    </View>
  );
};

export default MediaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: -5,
    paddingTop: 15,
    backgroundColor: '#f7f7f7',
    height: '100%',
  },
  postContainer: {
    width: '100%',
    height: '100%',
  },
  postBody: {
    width: '100%',
    height: 100,
    minHeight: 170,
    backgroundColor: '#E8E5E1',
    borderRadius: 8,
  },
  postUnheight: {
    width: '100%',
    height: 360,
    backgroundColor: '#E8E5E1',
    borderRadius: 8,
    marginBottom: 20,
  },
  addPost: {
    padding: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    maxHeight: 115,
  },
  imgBody: {
    width: 71,
    height: 71,
    borderColor: 'silver',
    borderWidth: 4,
    borderRadius: 50,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  img: {
    position: 'absolute',
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  input: {
    color: 'black',
    fontSize: 14,
    width: '100%',
    flex: 1,
    alignItems: 'stretch',
  },
  addImgVedio: {
    height: '35%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  uploadImgVedio: {
    height: '15%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'auto',
  },
  postImg: {
    width: '50%',
    height: '80%',
    backgroundColor: '#cccccc',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderColor: 'silver',
    borderBottomLeftRadius: 8,
    paddingLeft: 10,
  },
  postVedio: {
    width: '50%',
    height: '80%',
    backgroundColor: '#cccccc',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 8,
    paddingLeft: 10,
  },
  textAdd: {
    color: '#1f1f1f',
    fontSize: 12,
    fontWeight: 'bold',
    paddingLeft: 8,
    textTransform: 'uppercase',
  },
  vedioImg: {
    width: 160,
    height: 100,
  },
  contentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  io: {
    width: '100%',
    height: 230,
    marginBottom: 'auto',
  },
  textInput: {
    height: '100%',
    paddingVertical: 10,
    // borderWidth: 2.5,
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
    maxHeight: 180,
    width: '70%',
    maxWidth: 230,
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 10,
  },
});
