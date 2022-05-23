import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Entypo';

export const AvatarAdd = props => {
  const [uri, setUri] = useState(props.source?.uri || undefined);

  const pickPicture = () => {
    ImagePicker.openPicker({
      width: 110,
      height: 110,
      cropping: true,
    }).then(image => {
      setUri(image.path);
      console.log(image.path, 'image.pathimage.pathimage.path');
      props.onChange?.(image);
    });
  };
  return (
    <TouchableOpacity onPress={pickPicture} style={styles.container}>
      <Image
        style={styles.avatar}
        {...props}
        source={uri ? {uri} : props.source}
      />
      <View style={styles.icon}>
        <Icon name="camera" size={24} color="#B9B9B9" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
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
});
