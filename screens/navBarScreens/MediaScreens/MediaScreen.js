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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import DocumentPicker from 'react-native-document-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import VideoPlayer from 'react-native-video-player';
import PostIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderBackSearchSecond from '../../../components/HeaderComponents/HeaderBackSearchSecond';
import MediaContent from '../../../components/MediaContent';
import {setSinglePost} from '../../../stores/post/postActions';
import {baseUrl2} from '../../../http';

const MediaScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user.user);
  const [image, setImage] = useState(null);
  const [selected, setSelected] = useState(false);
  const [singleFile, setSingleFile] = useState(null);
  const {control, handleSubmit, reset} = useForm();
  const options = {
    title: 'Video Picker',
    mediaType: 'video',
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
      name: fileToUpload.fileName ? fileToUpload.fileName : fileToUpload.name,
    });
    fdata.append('title', title.title);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(baseUrl2 + '/api/posts_api', {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
        body: fdata,
      });
      const data = await res.json();
      dispatch(setSinglePost(data));
      setSelected(!selected);
      reset({}, {keepValues: false});
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
    }
  });
  const selectFile = async () => {
    setImage({type: 'image'});
    setSelected(true);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      if (res[0].size < 2097152) {
        setSingleFile(res[0]);
        setImage({uri: res[0].uri, type: 'image'});
      } else {
        alert('Max size of image must be 2 mb');
        setSelected(false);
      }
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
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
        alert('Max size of video mast be 10 mb');
        setSelected(false);
      }
    } catch (err) {
      alert('Max size of video mast be 10 mb');
      setSingleFile(null);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#F2F2F2"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearchSecond pageTo={'MediaSearch'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.postContainer}>
          <View
            style={[selected !== true ? styles.postBody : styles.postUnheight]}>
            <View style={styles.addPost}>
              <View style={styles.imgBody}>
                <Image style={styles.img} source={{uri: user.image}} />
              </View>
              <Controller
                control={control}
                name="title"
                render={({field: {onChange, value, onBlur}}) => {
                  return (
                    <TextInput
                      placeholder="Add Your post ..."
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
                  <Image source={{uri: image?.uri}} style={styles.io} />
                ) : (
                  <VideoPlayer
                    video={{uri: image?.uri}}
                    autoplay={false}
                    defaultMuted={true}
                    // thumbnail={require('../assets/logo.png')}
                    style={styles.io}
                    fullscreen={true}
                    resizeMode="contain"
                  />
                )}

                <View style={styles.uploadImgVedio}>
                  <TouchableOpacity
                    style={styles.postImg}
                    onPress={submitFormHandler}>
                    <PostIcons name="post-add" size={24} color="#B9B9B9" />
                    <Text style={styles.textAdd}>Add your Post</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.postVedio}
                    onPress={() => setSelected(!selected)}>
                    <PostIcons name="cancel" size={24} color="#B9B9B9" />
                    <Text style={styles.textAdd}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.addImgVedio}>
                <TouchableOpacity
                  style={styles.postImg}
                  onPress={() => selectFile()}>
                  <Icon name="camera" size={24} color="#B9B9B9" />
                  <Text style={styles.textAdd}>Add Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.postVedio}
                  onPress={selectFileVideo}>
                  <Icon name="video-camera" size={24} color="#B9B9B9" />
                  <Text style={styles.textAdd}>Add Vedio</Text>
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
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
  postContainer: {
    width: '100%',
    height: '90%',
  },
  postBody: {
    width: '100%',
    height: 200,
    minHeight: 175,
    backgroundColor: '#E8E5E1',
    borderRadius: 8,
  },
  postUnheight: {
    width: '100%',
    height: 370,
    backgroundColor: '#E8E5E1',
    borderRadius: 8,
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
    alignItems: 'center',
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
    height: '100%',
    backgroundColor: '#DEDCDC',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRightWidth: 2,
    borderColor: 'silver',
    borderBottomLeftRadius: 8,
    paddingLeft: 10,
  },
  postVedio: {
    width: '50%',
    height: '100%',
    backgroundColor: '#DEDCDC',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomRightRadius: 8,
    paddingLeft: 10,
  },
  textAdd: {
    color: '#B9B9B9',
    fontSize: 10,
    fontWeight: 'bold',
    paddingLeft: 20,
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
    paddingHorizontal: 15,
  },
});
