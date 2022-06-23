import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import DocumentPicker from 'react-native-document-picker';

export const LoginAvatar = props => {
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
      uploadImage();
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
    const fileToUpload = singleFile;
    const fdata = new FormData();
    fdata.append('image', fileToUpload);
    try {
      dispatch({type: 'FIRST_STEP_SUBMIT', payload: fdata});
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
        <Image style={styles.avatar} {...props} source={{uri: image}} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 130,
    width: 130,
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
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 99,
  },
  iconText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    paddingBottom: 15,
  },
});
