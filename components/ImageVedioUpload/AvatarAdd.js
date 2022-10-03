import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import DocumentPicker from 'react-native-document-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userPhotoChange} from '../../stores/user/userActions';
import {baseUrl2} from '../../http';

export const AvatarAdd = props => {
  // const navigation = useNavigationn();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [selected, setSelected] = useState(false);
  const [singleFile, setSingleFile] = useState('');

  const options2 = {
    title: 'Image Picker',
    mediaType: 'image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const selectFile = async () => {
    setSelected(true);
    try {
      const res = await launchImageLibrary(options2);
      setSingleFile(res.assets[0]);
      setImage(res.assets[0].uri);
    } catch (err) {
      alert('Unknown Error: ' + JSON.stringify(err));
    } finally {
    }
  };

  const uploadImage = async () => {
    setSelected(false);
    const fileToUpload = singleFile;
    const fdata = new FormData();
    fdata.append('image', {
      uri: fileToUpload.uri,
      type: fileToUpload.type,
      name: fileToUpload.fileName,
    });
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(baseUrl2 + '/profile/change', {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
        body: fdata,
      });
      const {data} = await res.json();
      dispatch(userPhotoChange(data));
    } catch (error) {
      alert(error);
    } finally {
    }
  };

  let img;
  if (props?.image !== undefined) {
    img = {uri: props?.image};
  } else {
  }

  return (
    <>
      {selected === false ? (
        <TouchableOpacity onPress={selectFile} style={styles.container}>
          <Image style={styles.avatar} {...props} source={img} />
          <View style={styles.icon}>
            <Icon name="camera" size={24} color="#B9B9B9" />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={uploadImage} style={styles.container}>
          <Image style={styles.avatar} {...props} source={{uri: image}} />
          {selected === true ? (
            <View style={styles.icon}>
              <Text style={styles.iconText}> Change Photo</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
    resizeMode: 'cover',
  },
  icon: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 0,
    minWidth: '100%',
    // height: '50%',
    opacity: 0.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // borderBottomLeftRadius: 80,
    // borderBottomRightRadius: 80,
    borderRadius: 80,
    width: '100%',
    height: '100%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    paddingBottom: 15,
  },
});
