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
import HeaderBackSearchSecond from '../../../components/HeaderComponents/HeaderBackSearchSecond';
import Icon from 'react-native-vector-icons/Entypo';
import PostIcons from 'react-native-vector-icons/MaterialIcons';
import MediaContent from '../../../components/MediaContent';
import {baseUrl2} from '../../../http';
import DocumentPicker from 'react-native-document-picker';
import {useSelector} from 'react-redux';

const MediaScreen = () => {
  const theme = useTheme();
  const user = useSelector(state => state.usser?.login?.data);
  const [text, onChangeText] = useState('');
  const [image, setImage] = useState(null);
  const [selected, setSelected] = useState(false);
  const [singleFile, setSingleFile] = useState(null);

  const uploadImage = async () => {
    const fileToUpload = singleFile;
    const data = new FormData();
    data.append('image_path', fileToUpload);
    data.append('title', text);
    try {
      const response = await fetch(baseUrl2 + '/posts_api', {
        method: 'post',
        headers: {
          Authorization:
            'Bearer ' + '10|oMlp7229KYP9nfdN2BrtCC2CjCuJIJF48fZsrV0J',
          'Content-Type': 'multipart/form-data',
          Accept: 'aplication/json',
        },
        body: data,
      });
      const json = await response.json();
      setSelected(!selected);
      alert('Your Post is Done');
    } catch (error) {
      console.log('error', error);
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
              <View style={styles.textArea}>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText}
                  value={text}
                  placeholder={'Type your post message ...'}
                />
              </View>
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
          {/* <View style={styles.contentStyle}>
            {image && <Image source={{uri: image}} style={styles.vedioImg} />}
          </View> */}
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
    height: 125,
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
    // height: '65%',
    width: '100%',
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
  // postImg_width: {
  //   backgroundColor: '#DEDCDC',
  //   border: 2,
  //   borderColor: 'silver',
  //   borderBottomLeftRadius: 8,
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   padding: 25,
  //   marginTop: 'auto',
  //   borderBottomRightRadius: 8,
  //   width: '80%',
  // },
  // postImg_cansel: {
  //   width: '20%',
  // },
  // textAdd_post: {
  //   color: '#B9B9B9',
  //   fontSize: 18,
  // },
  io: {
    width: '100%',
    height: 230,
    marginBottom: 'auto',
  },
});
