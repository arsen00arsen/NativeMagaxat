import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userPhotoChange} from '../../stores/user/userActions';

export const AvatarAdd = props => {
  // const navigation = useNavigationn();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [selected, setSelected] = useState(false);
  const [singleFile, setSingleFile] = useState('');

  const selectFile = async () => {
    setSelected(true);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setSingleFile(res[0]);
      setImage(res[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    } finally {
    }
  };

  const uploadImage = async () => {
    setSelected(false);
    const fileToUpload = singleFile;
    const fdata = new FormData();
    fdata.append('image', fileToUpload);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch('https://magaxat.com/api/profile/change', {
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
              <Text style={styles.iconText}> Add Photo</Text>
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
    height: '50%',
    opacity: 0.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
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
