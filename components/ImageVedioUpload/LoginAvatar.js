import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import DocumentPicker from 'react-native-document-picker';
// import ImgToBase64 from 'react-native-image-base64';

export const LoginAvatar = props => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [singleFile, setSingleFile] = useState('');

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      uploadImage();
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

  const uploadImage = () => {
    try {
      console.log(singleFile);
      dispatch({type: 'FIRST_STEP_SUBMIT', payload: singleFile});
    } catch (error) {
      alert(error);
    } finally {
    }
  };
  return (
    <>
      <TouchableOpacity onPress={selectFile} style={styles.container}>
        <Image style={styles.avatar} {...props} source={{uri: image}} />
        <View style={styles.icon}>
          <Icon name="camera" size={24} color="#B9B9B9" />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 150,
    width: 150,
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
    borderBottomLeftRadius: 75,
    borderBottomRightRadius: 75,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 99,
    marginBottom: 10,
  },
  iconText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    paddingBottom: 15,
  },
});
