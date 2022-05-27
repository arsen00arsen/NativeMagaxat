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
import {useTheme} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import DocumentPicker from 'react-native-document-picker';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import HeaderBackSearchSecond from '../../../components/HeaderComponents/HeaderBackSearchSecond';
import PostIcons from 'react-native-vector-icons/MaterialIcons';
import MediaContent from '../../../components/MediaContent';
import ImageUploadService from '../../../http/uploadImageSevice/uplouadImageService';

const MediaScreen = () => {
  const theme = useTheme();
  const user = useSelector(state => state.user.user);
  const [image, setImage] = useState(null);
  const [selected, setSelected] = useState(false);
  const [singleFile, setSingleFile] = useState(null);
  const {control, handleSubmit, reset} = useForm();

  const submitFormHandler = handleSubmit(async submitData => {
    try {
      reset({}, {keepValues: false});
      console.log(submitData);
    } catch (error) {
      console.log(error);
    }
  });
  const uploadImage = async () => {
    submitFormHandler();
    const fileToUpload = singleFile;
    const data = new FormData();
    data.append('image_path', fileToUpload);
    data.append('title', 'lo');
    try {
      await ImageUploadService.uploadImage({data});
      setSelected(!selected);
      alert('Your Post is Done');
    } catch (error) {
      alert(error);
    } finally {
      // dispatch(startLoadPosts(false));
    }
  };

  const selectFile = async () => {
    setSelected(true);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setSingleFile(res[0]);
      setImage(res[0].uri);
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
  let img;
  if (user.image !== undefined) {
    img = {uri: user.image};
  } else {
    img = require('./../../../assets/defoult.png');
  }
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearchSecond pageTo={'MediaSearch'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.postContainer}>
          <View
            style={[selected !== true ? styles.postBody : styles.postUnheight]}>
            <View style={styles.addPost}>
              <View style={styles.imgBody}>
                <Image style={styles.img} source={img} />
              </View>
              <Controller
                control={control}
                name="title"
                render={({field: {onChange, value, onBlur}}) => {
                  return (
                    <TextInput
                      placeholder="Add Your post"
                      value={value}
                      style={styles.textInput}
                      multiline
                      onChangeText={onChange}
                    />
                  );
                }}
              />
            </View>
            {selected !== false ? (
              <>
                <View>
                  <Image source={{uri: image}} style={styles.io} />
                </View>
                <View style={styles.uploadImgVedio}>
                  <TouchableOpacity
                    style={styles.postImg}
                    onPress={() => uploadImage()}>
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
                  onPress={() => selectFile()}>
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
    width: 51,
    height: 51,
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
    width: 45,
    height: 45,
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
    borderWidth: 2.5,
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
    maxHeight: 180,
    width: '70%',
    maxWidth: 230,
    color: 'red',
    fontSize: 16,
    paddingHorizontal: 15,
  },
});
