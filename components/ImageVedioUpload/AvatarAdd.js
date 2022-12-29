import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userPhotoChange} from '../../stores/user/userActions';
import {baseUrl2} from '../../http';

export const AvatarAdd = props => {
  // const navigation = useNavigationn();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const options2 = {
    title: 'Image Picker',
    mediaType: 'photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const selectFile = async () => {
    const image = await launchImageLibrary(options2);
    setLoading(true);
    setImage(image.assets[0].uri);
    if (image.assets[0].fileSize > 20000) {
      return alert('Max size of image must be 2 mb'), setLoading(false);
    }
    const fileToUpload = image.assets[0];
    const fdata = new FormData();
    fdata.append('image', {
      uri: fileToUpload.uri,
      type: fileToUpload.type,
      name: fileToUpload.fileName,
    });
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(baseUrl2 + '/profile/change', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
      body: fdata,
    });
    try {
      const {data} = await res.json();
      dispatch(userPhotoChange(data));
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  let img;
  if (props?.image !== undefined) {
    img = {uri: props?.image};
  }

  return (
    <>
      {selected === false ? (
        <TouchableOpacity onPress={selectFile} style={styles.container}>
          <Image style={styles.avatar} {...props} source={img} />
          <View style={styles.icon}>
            {loading === false ? (
              <Icon name="camera" size={24} color="#B9B9B9" />
            ) : (
              <ActivityIndicator size="large" color="white" />
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.container}>
          <Image style={styles.avatar} {...props} source={{uri: image}} />
          {selected === true ? <View style={styles.icon} /> : null}
        </View>
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
    opacity: 0.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});
